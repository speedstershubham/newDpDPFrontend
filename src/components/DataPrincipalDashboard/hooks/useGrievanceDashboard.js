import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { GRIEVANCES, MAX_COMPLAINTS, MAX_ACTIVE, RECYCLE_BIN_ITEMS } from "../helpfunction/constants.jsx";

const PAGE_SIZE = 5;

export function useGrievanceDashboard() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [revokeOpen, setRevokeOpen] = useState(false);
  const [revokeReason, setRevokeReason] = useState("");
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);

  // Draft & Recycle Bin modal states
  const [draftsOpen, setDraftsOpen] = useState(false);
  const [recycleBinOpen, setRecycleBinOpen] = useState(false);
  const [recycleBinItems, setRecycleBinItems] = useState(RECYCLE_BIN_ITEMS);
  const [autosaveBannerVisible, setAutosaveBannerVisible] = useState(true);

  const totalComplaints = GRIEVANCES.length;
  const activeComplaints = GRIEVANCES.filter(
    (g) => !["order-issued", "revoked"].includes(g.status),
  ).length;

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFileNew = () => {
    if (totalComplaints >= MAX_COMPLAINTS) {
      showToast(`Maximum limit of ${MAX_COMPLAINTS} complaints reached.`, "error");
      return;
    }
    navigate("/grievance/new");
  };

  const upcomingHearing = GRIEVANCES.find((g) => g.status === "hearing-scheduled");

  const TAB_FILTERS = {
    all: () => true,
    active: (g) => !["order-issued", "revoked"].includes(g.status),
    resolved: (g) => g.status === "order-issued",
    revoked: (g) => g.status === "revoked",
  };

  const filteredGrievances = useMemo(() => {
    const q = search.toLowerCase();
    return GRIEVANCES.filter(TAB_FILTERS[activeTab] ?? (() => true)).filter(
      (g) =>
        !q ||
        g.grn.toLowerCase().includes(q) ||
        g.subject.toLowerCase().includes(q) ||
        g.respondent.toLowerCase().includes(q),
    );
  }, [search, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filteredGrievances.length / PAGE_SIZE));
  const pagedGrievances = filteredGrievances.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handleTab = (tab) => { setActiveTab(tab); setPage(1); };

  const handleRestoreItem = (grn) => {
    setRecycleBinItems((prev) => prev.filter((i) => i.grn !== grn));
    showToast("Complaint restored successfully");
  };

  const handleDeleteForever = (grn) => {
    setRecycleBinItems((prev) => prev.filter((i) => i.grn !== grn));
    showToast("Complaint permanently deleted", "error");
  };

  const handleEmptyRecycleBin = () => {
    setRecycleBinItems([]);
    showToast("Recycle bin emptied", "error");
  };

  return {
    drawerOpen, setDrawerOpen,
    selected, setSelected,
    revokeOpen, setRevokeOpen,
    revokeReason, setRevokeReason,
    toast,
    totalComplaints,
    activeComplaints,
    showToast,
    handleFileNew,
    upcomingHearing,
    search, handleSearch,
    activeTab, handleTab,
    page, setPage, totalPages,
    pagedGrievances,
    filteredGrievances,
    draftsOpen, setDraftsOpen,
    recycleBinOpen, setRecycleBinOpen,
    recycleBinItems,
    autosaveBannerVisible, setAutosaveBannerVisible,
    handleRestoreItem,
    handleDeleteForever,
    handleEmptyRecycleBin,
  };
}
