import { useState, useMemo } from "react";
import { useWorkflow } from "../../../context/WorkflowContext";
import { daysAtCurrentStage, getStatsForRole } from "../../../utils/workflowEngine";
import { getRoleId } from "../../Login/helpfunction/constants";

const PAGE_SIZE = 8;

const PRIORITY_ORDER = { Critical: 0, High: 1, Medium: 2, Low: 3 };

export function useRoleDashboard(user) {
  const {
    complaints,
    workflows,
    roles,
    getCurrentStage,
    getComplaintsForRole,
    dispatchAction,
    can,
  } = useWorkflow();

  /* ── Derive role object from user ──────────────────────── */
  // Prefer user.roleId; fall back to deriving from user.role slug
  const roleId = user?.roleId ?? (user?.role ? getRoleId(user.role) : null);
  const roleObj = roles.find((r) => r.id === roleId) ?? null;

  /* ── My complaints ─────────────────────────────────────── */
  const myComplaints = useMemo(
    () => (roleId ? getComplaintsForRole(roleId) : []),
    [roleId, getComplaintsForRole]
  );

  /* ── Stats ──────────────────────────────────────────────── */
  const stats = useMemo(() => getStatsForRole(myComplaints), [myComplaints]);

  /* ── Search + Tab + Sort + Pagination ───────────────────── */
  const [search, setSearch]       = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortKey, setSortKey]     = useState("days");   // "days" | "priority" | "grn"
  const [page, setPage]           = useState(1);

  const TAB_FILTERS = {
    all:      () => true,
    critical: (c) => c.priority === "Critical",
    high:     (c) => c.priority === "High",
    pending:  (c) => daysAtCurrentStage(c) > 3,
  };

  const filtered = useMemo(() => {
    const q   = search.toLowerCase();
    const tab = TAB_FILTERS[activeTab] ?? (() => true);

    return myComplaints
      .filter(tab)
      .filter(
        (c) =>
          !q ||
          c.grn.toLowerCase().includes(q) ||
          c.subject.toLowerCase().includes(q) ||
          c.filedBy.name.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        if (sortKey === "priority")
          return (PRIORITY_ORDER[a.priority] ?? 9) - (PRIORITY_ORDER[b.priority] ?? 9);
        if (sortKey === "days")
          return daysAtCurrentStage(b) - daysAtCurrentStage(a);
        return a.grn.localeCompare(b.grn);
      });
  }, [myComplaints, search, activeTab, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handleTab    = (tab) => { setActiveTab(tab); setPage(1); };
  const handleSort   = (key) => { setSortKey(key); setPage(1); };

  /* ── Stage helpers ──────────────────────────────────────── */
  const getStageFor = (complaint) => getCurrentStage(complaint);
  const getActionsFor = (complaint) => {
    const stage = getStageFor(complaint);
    return stage?.actions ?? [];
  };
  const getWorkflowFor = (complaint) =>
    workflows.find((w) => w.id === complaint.workflowId) ?? null;

  /* ── Action modal ───────────────────────────────────────── */
  const [actionModal, setActionModal] = useState(null);
  // actionModal = { complaint, action } | null

  const openActionModal  = (complaint, action) => setActionModal({ complaint, action });
  const closeActionModal = () => setActionModal(null);

  const [actionNote, setActionNote] = useState("");

  const confirmAction = () => {
    if (!actionModal) return;
    dispatchAction({
      complaintId: actionModal.complaint.id,
      actionKey:   actionModal.action.key,
      userId:      user?.id ?? "unknown",
      userName:    user?.name ?? "Unknown",
      note:        actionNote,
    });
    setActionNote("");
    closeActionModal();
  };

  /* ── Detail drawer ──────────────────────────────────────── */
  const [selected, setSelected]       = useState(null);
  const [drawerOpen, setDrawerOpen]   = useState(false);

  const openDetail  = (c) => { setSelected(c); setDrawerOpen(true); };
  const closeDetail = () => { setDrawerOpen(false); };

  /* ── Toast ──────────────────────────────────────────────── */
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  return {
    /* identity */
    roleObj,

    /* complaints */
    myComplaints, filtered, paged, stats,
    totalPages, page, setPage,

    /* filters */
    search, handleSearch,
    activeTab, handleTab,
    sortKey, handleSort,

    /* stage/action helpers */
    getStageFor, getActionsFor, getWorkflowFor,
    daysAtCurrentStage,

    /* action modal */
    actionModal, openActionModal, closeActionModal,
    actionNote, setActionNote, confirmAction,

    /* detail drawer */
    selected, drawerOpen, openDetail, closeDetail,

    /* toast */
    toast, showToast,

    /* permissions */
    can,
  };
}
