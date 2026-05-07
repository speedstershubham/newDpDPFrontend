import { useState, useMemo } from "react";
import { GRIEVANCES } from "../helpfunction/constants";

const PAGE_SIZE = 5;

export function useScrutinyDashboard() {
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [actionModal, setActionModal] = useState({ open: false, action: "" });
  const [remarks, setRemarks] = useState("");
  const [toast, setToast] = useState(null);
  // Edit
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({});
  // Profile
  const [profileOpen, setProfileOpen] = useState(false);
  // Grouping / filtering
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [groupBy, setGroupBy] = useState("none");
  const [page, setPage] = useState(1);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (action) => setActionModal({ open: true, action });

  const submitAction = () => {
    showToast(`Grievance ${actionModal.action} successfully`);
    setActionModal({ open: false, action: "" });
    setDrawerOpen(false);
    setRemarks("");
  };

  const openEdit = (g) => { setSelected(g); setEditForm({ ...g }); setEditOpen(true); };
  const submitEdit = () => {
    showToast("Complaint updated successfully");
    setEditOpen(false);
  };

  const TAB_FILTERS = {
    all: () => true,
    pending: (g) => g.status === "pending-review",
    under: (g) => g.status === "under-review",
    clarification: (g) => g.status === "clarification-requested",
    approved: (g) => g.status === "approved",
  };

  const filteredGrievances = useMemo(() => {
    const q = search.toLowerCase();
    return GRIEVANCES.filter(TAB_FILTERS[activeTab] ?? (() => true)).filter(
      (g) => !q || g.grn.toLowerCase().includes(q) || g.subject.toLowerCase().includes(q) || g.respondent.toLowerCase().includes(q),
    );
  }, [search, activeTab]);

  const groupedGrievances = useMemo(() => {
    if (groupBy === "none") return { "": filteredGrievances };
    return filteredGrievances.reduce((acc, g) => {
      const key = g[groupBy] ?? "Other";
      acc[key] = acc[key] ? [...acc[key], g] : [g];
      return acc;
    }, {});
  }, [filteredGrievances, groupBy]);

  const totalPages = Math.max(1, Math.ceil(filteredGrievances.length / PAGE_SIZE));
  const pagedGrievances = filteredGrievances.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handleTab = (tab) => { setActiveTab(tab); setPage(1); };

  return {
    selected, setSelected,
    drawerOpen, setDrawerOpen,
    actionModal, setActionModal,
    remarks, setRemarks,
    toast,
    showToast,
    handleAction,
    submitAction,
    editOpen, setEditOpen, editForm, setEditForm, openEdit, submitEdit,
    profileOpen, setProfileOpen,
    search, handleSearch,
    activeTab, handleTab,
    groupBy, setGroupBy,
    page, setPage, totalPages, pagedGrievances, filteredGrievances,
    groupedGrievances,
  };
}
