import { useState, useMemo } from "react";
import { USERS, AUDIT_LOGS } from "../helpfunction/constants";
import { useWorkflow } from "../../../context/WorkflowContext";

const USER_PAGE_SIZE = 8;

export function useSystemAdmin() {
  const { createWorkflow, createRole, createPermission } = useWorkflow();
  /* ── Navigation ─────────────────────────────────────────── */
  const [activeTab, setActiveTab]       = useState("workflow");
  const [activeSubTab, setActiveSubTab] = useState("workflow-templates");

  const handleTab    = (tab) => { setActiveTab(tab); };
  const handleSubTab = (tab) => { setActiveSubTab(tab); };

  /* ── Toast ──────────────────────────────────────────────── */
  const [toast, setToast] = useState(null);
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  /* ── Workflow ────────────────────────────────────────────── */
  const [createWorkflowOpen, setCreateWorkflowOpen] = useState(false);

  const openCreateWorkflow  = () => setCreateWorkflowOpen(true);
  const closeCreateWorkflow = () => setCreateWorkflowOpen(false);
  const saveWorkflow = (wf) => {
    createWorkflow(wf);
    showToast(`Workflow "${wf.name}" created`);
    closeCreateWorkflow();
  };

  const handleContextCreateRole = (role) => {
    createRole(role);
    showToast(`Role "${role.name}" created`);
  };

  const handleContextCreatePermission = (perm) => {
    createPermission(perm);
    showToast(`Permission "${perm.key}" created`);
  };

  /* ── User Management ────────────────────────────────────── */
  const [addUserOpen, setAddUserOpen]   = useState(false);
  const [userSearch, setUserSearch]     = useState("");
  const [userPage, setUserPage]         = useState(1);

  const openAddUser  = () => setAddUserOpen(true);
  const closeAddUser = () => setAddUserOpen(false);
  const handleCreateUser = () => {
    showToast("User created successfully");
    closeAddUser();
  };

  const handleUserSearch = (val) => { setUserSearch(val); setUserPage(1); };

  const filteredUsers = useMemo(() => {
    const q = userSearch.toLowerCase();
    return q
      ? USERS.filter((u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q)
        )
      : USERS;
  }, [userSearch]);

  const totalUserPages = Math.max(1, Math.ceil(filteredUsers.length / USER_PAGE_SIZE));
  const pagedUsers     = filteredUsers.slice(
    (userPage - 1) * USER_PAGE_SIZE,
    userPage * USER_PAGE_SIZE
  );

  const handleEditUser = (user) => showToast(`Editing ${user.name}`);
  const handleDeactivateUser = (user) => showToast(`${user.name} deactivated`);

  /* ── Audit Log ──────────────────────────────────────────── */
  const [auditSearch, setAuditSearch] = useState("");

  const filteredAuditLogs = useMemo(() => {
    const q = auditSearch.toLowerCase();
    return q
      ? AUDIT_LOGS.filter((l) =>
          l.user.toLowerCase().includes(q) ||
          l.action.toLowerCase().includes(q) ||
          l.entity.toLowerCase().includes(q)
        )
      : AUDIT_LOGS;
  }, [auditSearch]);

  /* ── Workflow Templates ──────────────────────────────────── */
  const handleEditWorkflow      = (wf) => showToast(`Editing "${wf.name}"`);
  const handleDuplicateWorkflow = (wf) => showToast(`Duplicated "${wf.name}"`);

  return {
    /* navigation */
    activeTab, handleTab,
    activeSubTab, handleSubTab,

    /* toast */
    toast, showToast,

    /* workflow */
    createWorkflowOpen,
    openCreateWorkflow, closeCreateWorkflow, saveWorkflow,
    handleEditWorkflow, handleDuplicateWorkflow,
    handleContextCreateRole, handleContextCreatePermission,

    /* users */
    addUserOpen,
    openAddUser, closeAddUser, handleCreateUser,
    userSearch, handleUserSearch,
    userPage, setUserPage, totalUserPages, pagedUsers, filteredUsers,
    handleEditUser, handleDeactivateUser,

    /* audit */
    auditSearch, setAuditSearch, filteredAuditLogs,
  };
}
