import { useState, useMemo } from "react";
import { CASES } from "../helpfunction/constants";

const PAGE_SIZE = 5;

export function useBoardMemberDashboard() {
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderText, setOrderText] = useState("");
  const [toast, setToast] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [timelineCase, setTimelineCase] = useState(null);
  const [activeTab, setActiveTab] = useState("cases");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const openTimeline = (c) => { setTimelineCase(c); setTimelineOpen(true); };

  const TAB_FILTERS = {
    cases: () => true,
    today: (c) => c.status === "hearing-today",
    scheduled: (c) => c.status !== "hearing-today",
  };

  const filteredCases = useMemo(() => {
    const q = search.toLowerCase();
    return CASES.filter(TAB_FILTERS[activeTab] ?? (() => true)).filter(
      (c) => !q || c.grn.toLowerCase().includes(q) || c.subject.toLowerCase().includes(q) || c.respondent.toLowerCase().includes(q),
    );
  }, [search, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filteredCases.length / PAGE_SIZE));
  const pagedCases = filteredCases.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handleTab = (tab) => { setActiveTab(tab); setPage(1); };

  return {
    selected, setSelected,
    drawerOpen, setDrawerOpen,
    orderOpen, setOrderOpen,
    orderText, setOrderText,
    toast,
    showToast,
    profileOpen, setProfileOpen,
    timelineOpen, setTimelineOpen, timelineCase, openTimeline,
    activeTab, handleTab,
    search, handleSearch,
    page, setPage, totalPages, pagedCases, filteredCases,
  };
}
