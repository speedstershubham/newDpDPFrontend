// Re-export shared data constants used by RolesPermissions
export { PERMISSIONS_DATA, ROLES_DETAIL_DATA, VRB_ROLE_PERMISSIONS } from "./constants";

/* ── Inner tab navigation ─────────────────────────────── */
export const RP_INNER_TABS = [
  { key: "role-creation-wizard", label: "Role Creation Wizard", icon: "🛡" },
  { key: "visual-role-builder",  label: "Visual Role Builder",  icon: "👁" },
  { key: "roles-list",           label: "Roles List",           icon: "👤" },
  { key: "permissions-list",     label: "Permissions List",     icon: "🔒" },
];

/* ── Role colours (used by wizard, modal, and VRB) ────── */
export const ROLE_COLORS = [
  { key: "blue",   label: "Blue",   hex: "#3b82f6" },
  { key: "green",  label: "Green",  hex: "#22c55e" },
  { key: "orange", label: "Orange", hex: "#f97316" },
  { key: "red",    label: "Red",    hex: "#ef4444" },
  { key: "purple", label: "Purple", hex: "#a855f7" },
  { key: "cyan",   label: "Cyan",   hex: "#06b6d4" },
  { key: "pink",   label: "Pink",   hex: "#ec4899" },
];

/* ── Role → colour map (used in PermissionsList chips) ── */
export const ROLE_COLOR_MAP = {
  "Registry":      "blue",
  "Scrutiny Wing": "green",
  "Chairperson":   "purple",
  "Board Member":  "pink",
  "Reader":        "teal",
};

/* ── Permission category options (Create Permission modal) */
export const PERM_CATEGORIES = [
  { key: "READ",   label: "View/Read operations (non-destructive)" },
  { key: "WRITE",  label: "Create/Update operations" },
  { key: "DELETE", label: "Delete operations (destructive)" },
  { key: "ADMIN",  label: "Administrative operations" },
];
