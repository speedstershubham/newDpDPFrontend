import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "../helpfunction/constants";

/**
 * useRoleDashboard
 *
 * Encapsulates all state and derived data for the generic RoleDashboard.
 *
 * @param {object} config — one entry from ROLE_CONFIGS (roleConfigs.js)
 * @returns dashboard state + handlers
 */
export function useRoleDashboard(config) {
  const navigate = useNavigate();

  /* ── UI state ── */
  const [search,    setSearch]    = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [page,      setPage]      = useState(1);
  const [drawer,    setDrawer]    = useState({ open: false, item: null });
  const [modal,     setModal]     = useState({ open: false, action: null, item: null });
  const [toast,     setToast]     = useState(null);

  /* ── Toast helper ── */
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  /* ── Source data + stats ── */
  const allItems = useMemo(() => config.getData(), [config]);
  const stats    = useMemo(() => config.stats(allItems), [allItems, config]);

  /* ── Filtering (tab + search) ── */
  const filtered = useMemo(() => {
    const tabObj    = config.tabs.find((t) => t.key === activeTab);
    const tabFilter = tabObj?.filter ?? (() => true);
    const q = search.toLowerCase();

    return allItems.filter((item) => {
      if (!tabFilter(item)) return false;
      if (!q) return true;
      return config.searchKeys.some((k) =>
        String(item[k] ?? "").toLowerCase().includes(q)
      );
    });
  }, [allItems, activeTab, search, config]);

  /* ── Pagination ── */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  /* ── Tab / search handlers ── */
  const handleTab    = useCallback((key) => { setActiveTab(key); setPage(1); }, []);
  const handleSearch = useCallback((val) => { setSearch(val);    setPage(1); }, []);

  /* ── Row action handler ── */
  const handleRowAction = useCallback((action, item) => {
    if (action.internal) {
      setDrawer({ open: true, item });
    } else if (typeof action.onAction === "function") {
      action.onAction(item, navigate);
    } else {
      setModal({ open: true, action, item });
    }
  }, [navigate]);

  /* ── Drawer helpers ── */
  const closeDrawer = useCallback(() => setDrawer({ open: false, item: null }), []);

  /* ── Modal confirm ── */
  const confirmAction = useCallback((note) => {
    showToast(`${modal.action?.label} applied successfully`);
    setModal({ open: false, action: null, item: null });
  }, [modal.action, showToast]);

  const closeModal = useCallback(() => setModal({ open: false, action: null, item: null }), []);

  return {
    /* data */
    allItems, stats,
    filtered, paged,
    totalPages,
    /* ui state */
    search, activeTab, page, setPage,
    drawer, modal, toast,
    /* handlers */
    handleTab, handleSearch, handleRowAction,
    closeDrawer, confirmAction, closeModal,
    showToast,
  };
}
