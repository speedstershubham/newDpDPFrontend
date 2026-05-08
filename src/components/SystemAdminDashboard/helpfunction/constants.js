export const VISUAL_BUILDER_ROLES = [
  { id: "role-registry", name: "Registry", colorKey: "blue" },
  { id: "role-scrutiny", name: "Scrutiny Wing", colorKey: "green" },
  { id: "role-chairperson", name: "Chairperson", colorKey: "purple" },
  { id: "role-board", name: "Board Member", colorKey: "pink" },
  { id: "role-reader", name: "Reader", colorKey: "teal" },
];

export const USERS = [
  { id: "1", name: "Priya Sharma", email: "priya@dpb.gov.in", role: "scrutiny", status: "active", lastLogin: "2026-05-07" },
  { id: "2", name: "Rajesh Kumar", email: "rajesh@dpb.gov.in", role: "registry", status: "active", lastLogin: "2026-05-07" },
  { id: "3", name: "Amit Verma", email: "amit@dpb.gov.in", role: "scrutiny", status: "inactive", lastLogin: "2026-05-01" },
  { id: "4", name: "Sunita Patel", email: "sunita@dpb.gov.in", role: "board-member", status: "active", lastLogin: "2026-05-06" },
];

export const ALL_ROLES = [
  "data-principal",
  "scrutiny",
  "chairperson",
  "registry",
  "board-member",
  "reader",
  "admin",
  "super-admin",
];

export const WORKFLOW_TEMPLATES = [
  {
    id: "wf-1",
    name: "Standard Grievance Workflow",
    description: "Default workflow for all grievance types",
    category: "General",
    stages: 6,
    status: "ACTIVE",
    lastModified: "2026-04-20",
  },
  {
    id: "wf-2",
    name: "Data Breach Workflow",
    description: "Expedited workflow for data breach complaints",
    category: "Data Breach",
    stages: 3,
    status: "ACTIVE",
    lastModified: "2026-04-15",
  },
];

export const AUDIT_LOGS = [
  { time: "2026-05-07 09:15", user: "Priya Sharma", action: "Approved complaint", entity: "GRN/2026/DPB/001245", ip: "10.0.1.45" },
  { time: "2026-05-07 08:30", user: "Rajesh Kumar", action: "Scheduled hearing", entity: "GRN/2026/DPB/001234", ip: "10.0.1.46" },
  { time: "2026-05-07 08:00", user: "Admin", action: "User created", entity: "Amit Verma", ip: "10.0.1.1" },
];

export function getRolePermissionCount(role) {
  if (role === "scrutiny") return "12 permissions";
  if (role === "chairperson") return "18 permissions";
  return "6 permissions";
}

export const ASSIGNABLE_ROLES = ["scrutiny", "chairperson", "registry", "board-member", "reader"];

export const MAIN_TABS = [
  { key: "workflow", label: "Workflow Management", icon: "⚙" },
  { key: "users", label: "User Management", icon: "👤" },
  { key: "roles", label: "Roles & Permissions", icon: "🛡" },
  { key: "notifications", label: "Notification Templates", icon: "🔔" },
  { key: "api", label: "API Health", icon: "⚡" },
  { key: "audit", label: "Audit Log", icon: "📋" },
];

export const WORKFLOW_SUB_TABS = [
  { key: "visual-builder", label: "Visual Builder" },
  { key: "roles-permissions", label: "Roles & Permissions" },
  { key: "workflow-templates", label: "Workflow Templates" },
  { key: "routing-rules", label: "Routing Rules" },
  { key: "form-fields", label: "Form Fields" },
  { key: "sla-escalation", label: "SLA & Escalation" },
  { key: "workflow-actions", label: "Workflow Actions" },
];

/* ── Roles & Permissions data ────────────────────────────── */
export const PERMISSIONS_DATA = [
  { id: "perm-1", name: "View Grievances", code: "grievance.view", description: "View all grievance details", category: "READ", assignedTo: ["Registry", "Scrutiny Wing", "Chairperson", "Board Member", "Reader"] },
  { id: "perm-2", name: "Create Grievance", code: "grievance.create", description: "Submit new grievances", category: "WRITE", assignedTo: ["Registry"] },
  { id: "perm-3", name: "Edit Grievance", code: "grievance.edit", description: "Modify grievance details", category: "WRITE", assignedTo: ["Registry"] },
  { id: "perm-4", name: "Delete Grievance", code: "grievance.delete", description: "Remove grievances", category: "DELETE", assignedTo: [] },
  { id: "perm-5", name: "Approve Grievance", code: "grievance.approve", description: "Approve for processing", category: "WRITE", assignedTo: ["Scrutiny Wing"] },
  { id: "perm-6", name: "Reject Grievance", code: "grievance.reject", description: "Reject grievances", category: "WRITE", assignedTo: ["Scrutiny Wing"] },
  { id: "perm-7", name: "Assign Bench", code: "bench.assign", description: "Assign cases to bench", category: "WRITE", assignedTo: ["Chairperson"] },
  { id: "perm-8", name: "Schedule Hearing", code: "hearing.schedule", description: "Schedule hearing dates", category: "WRITE", assignedTo: ["Board Member"] },
  { id: "perm-9", name: "Issue Notice", code: "notice.issue", description: "Send legal notices", category: "WRITE", assignedTo: ["Board Member"] },
  { id: "perm-10", name: "View Analytics", code: "analytics.view", description: "Access analytics dashboard", category: "READ", assignedTo: ["Reader"] },
];

export const ROLES_DETAIL_DATA = [
  { id: "r1", name: "Registry", description: "Manages incoming grievances and administrative tasks", type: "SYSTEM", permissions: 3, users: 5, colorKey: "blue" },
  { id: "r2", name: "Scrutiny Wing", description: "Reviews and approves grievances for processing", type: "SYSTEM", permissions: 3, users: 8, colorKey: "green" },
  { id: "r3", name: "Chairperson", description: "Senior authority with broad permissions", type: "SYSTEM", permissions: 3, users: 1, colorKey: "purple" },
  { id: "r4", name: "Board Member", description: "Conducts hearings and drafts orders", type: "SYSTEM", permissions: 4, users: 6, colorKey: "pink" },
  { id: "r5", name: "Reader", description: "Read-only access to grievances", type: "SYSTEM", permissions: 2, users: 3, colorKey: "teal" },
];

export const VRB_ROLE_PERMISSIONS = {
  r1: [
    { uid: "r1-0", name: "View Grievances", description: "View all grievance details", category: "READ" },
    { uid: "r1-1", name: "Create Grievance", description: "Submit new grievances", category: "WRITE" },
    { uid: "r1-2", name: "Edit Grievance", description: "Modify grievance details", category: "WRITE" },
  ],
  r2: [
    { uid: "r2-0", name: "View Grievances", description: "View all grievance details", category: "READ" },
    { uid: "r2-1", name: "Approve Grievance", description: "Approve for processing", category: "WRITE" },
    { uid: "r2-2", name: "Reject Grievance", description: "Reject grievances", category: "WRITE" },
  ],
  r3: [
    { uid: "r3-0", name: "View Grievances", description: "View all grievance details", category: "READ" },
    { uid: "r3-1", name: "Assign Bench", description: "Assign cases to bench", category: "WRITE" },
    { uid: "r3-2", name: "Publish Order", description: "Publish final orders", category: "WRITE" },
  ],
  r4: [
    { uid: "r4-0", name: "View Grievances", description: "View all grievance details", category: "READ" },
    { uid: "r4-1", name: "Schedule Hearing", description: "Schedule hearing dates", category: "WRITE" },
    { uid: "r4-2", name: "Issue Notice", description: "Send legal notices", category: "WRITE" },
    { uid: "r4-3", name: "Draft Order", description: "Draft judicial orders", category: "WRITE" },
  ],
  r5: [
    { uid: "r5-0", name: "View Grievances", description: "View all grievance details", category: "READ" },
    { uid: "r5-1", name: "View Analytics", description: "Access analytics dashboard", category: "READ" },
  ],
};

/* ── Routing Rules data ───────────────────────────────────── */
export const ROUTING_RULES_DATA = [
  { id: "rr1", name: "Auto-assign by Category", condition: "Category = Data Breach", action: "Assign to Senior Scrutiny Officer", priority: "High", enabled: true },
  { id: "rr2", name: "Load Balancing", condition: "Queue > 10 cases", action: "Distribute to available officers", priority: "Medium", enabled: true },
  { id: "rr3", name: "Jurisdiction-based", condition: "State = Maharashtra", action: "Assign to Mumbai Bench", priority: "Medium", enabled: true },
];

/* ── Form Fields data ─────────────────────────────────────── */
export const FORM_FIELDS_DATA = [
  { order: 1, name: "Complainant Name", type: "Text Input", typeKey: "text", required: true, validation: "Min 3 chars", conditional: "Always Show" },
  { order: 2, name: "Email Address", type: "Email", typeKey: "email", required: true, validation: "Valid email", conditional: "Always Show" },
  { order: 3, name: "Grievance Category", type: "Dropdown", typeKey: "dropdown", required: true, validation: "Required", conditional: "Always Show" },
  { order: 4, name: "Data Breach Details", type: "Text Area", typeKey: "textarea", required: false, validation: "Max 5000 chars", conditional: "Conditional" },
];

/* ── SLA & Escalation data ────────────────────────────────── */
export const SLA_RULES_DATA = [
  { id: "sla1", stage: "Under Scrutiny", trigger: "SLA breached by 24 hours", action: "Escalate to Senior Officer", notifications: ["Email", "SMS"], enabled: true },
  { id: "sla2", stage: "Bench Assignment", trigger: "Pending for 48 hours", action: "Notify Chairperson", notifications: ["Email"], enabled: true },
  { id: "sla3", stage: "Hearing Scheduled", trigger: "Hearing date within 24 hours", action: "Send reminder to all parties", notifications: ["Email", "SMS", "Push"], enabled: true },
];

/* ── Workflow Actions data ────────────────────────────────── */
export const WORKFLOW_ACTIONS_DATA = [
  { id: "wa1", name: "View", description: "View grievance details", category: "READ", key: "view" },
  { id: "wa2", name: "Edit", description: "Edit grievance information", category: "WRITE", key: "edit" },
  { id: "wa3", name: "Delete", description: "Delete grievance", category: "DELETE", key: "delete" },
  { id: "wa4", name: "Approve", description: "Approve the grievance", category: "WRITE", key: "approve" },
  { id: "wa5", name: "Reject", description: "Reject the grievance", category: "WRITE", key: "reject" },
  { id: "wa6", name: "Forward", description: "Forward to another stage", category: "WRITE", key: "forward" },
  { id: "wa7", name: "Assign Bench", description: "Assign to a bench", category: "WRITE", key: "assign-bench" },
  { id: "wa8", name: "Schedule Hearing", description: "Schedule hearing date", category: "WRITE", key: "schedule-hearing" },
  { id: "wa9", name: "Issue Notice", description: "Issue notice to parties", category: "WRITE", key: "issue-notice" },
  { id: "wa10", name: "Draft Order", description: "Draft an order", category: "WRITE", key: "draft-order" },
  { id: "wa11", name: "Publish Order", description: "Publish final order", category: "WRITE", key: "publish-order" },
  { id: "wa12", name: "Request Info", description: "Request additional information", category: "WRITE", key: "request-info" },
  { id: "wa13", name: "Upload Document", description: "Upload supporting documents", category: "WRITE", key: "upload-document" },
  { id: "wa14", name: "Add Comment", description: "Add internal comment", category: "WRITE", key: "add-comment" },
];
