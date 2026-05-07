import { useState, useMemo } from "react";
import { REPORTS } from "../helpfunction/constants";

const PAGE_SIZE = 5;

export function useChairpersonDashboard() {
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [benchMembers, setBenchMembers] = useState([]);
  const [toast, setToast] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [timelineCase, setTimelineCase] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleBench = (id) => {
    setBenchMembers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const openTimeline = (r) => { setTimelineCase(r); setTimelineOpen(true); };

  const TAB_FILTERS = {
    all: () => true,
    admit: (r) => r.recommendation === "Admit",
    reject: (r) => r.recommendation === "Reject",
    clarify: (r) => r.recommendation === "Clarification",
  };

  const filteredReports = useMemo(() => {
    const q = search.toLowerCase();
    return REPORTS.filter(TAB_FILTERS[activeTab] ?? (() => true)).filter(
      (r) => !q || r.grn.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q),
    );
  }, [search, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / PAGE_SIZE));
  const pagedReports = filteredReports.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handleTab = (tab) => { setActiveTab(tab); setPage(1); };

  return {
    selected, setSelected,
    drawerOpen, setDrawerOpen,
    noticeOpen, setNoticeOpen,
    benchMembers, setBenchMembers,
    toast,
    showToast,
    toggleBench,
    profileOpen, setProfileOpen,
    timelineOpen, setTimelineOpen, timelineCase, openTimeline,
    search, handleSearch,
    activeTab, handleTab,
    page, setPage, totalPages, pagedReports, filteredReports,
  };
}
