import { useState } from "react";

export function useRolesPermissions() {
  /* ── Inner tab navigation ───────────────────────────────── */
  const [innerTab, setInnerTab] = useState("role-creation-wizard");
  const handleInnerTab = (tab) => setInnerTab(tab);

  /* ── Accessibility banner ───────────────────────────────── */
  const [showA11y, setShowA11y] = useState(true);
  const dismissA11y = () => setShowA11y(false);

  /* ── Create Role modal ──────────────────────────────────── */
  const [createRoleOpen, setCreateRoleOpen] = useState(false);
  const openCreateRole  = () => setCreateRoleOpen(true);
  const closeCreateRole = () => setCreateRoleOpen(false);

  /* ── Create Permission modal ────────────────────────────── */
  const [createPermOpen, setCreatePermOpen] = useState(false);
  const openCreatePerm  = () => setCreatePermOpen(true);
  const closeCreatePerm = () => setCreatePermOpen(false);

  return {
    /* tab */
    innerTab, handleInnerTab,

    /* a11y banner */
    showA11y, dismissA11y,

    /* create role modal */
    createRoleOpen, openCreateRole, closeCreateRole,

    /* create permission modal */
    createPermOpen, openCreatePerm, closeCreatePerm,
  };
}
