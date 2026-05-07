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

export const WORKFLOW_STAGES = [
  "Submission",
  "Scrutiny Review",
  "Chairperson Decision",
  "Hearing Scheduling",
  "Hearing Conduct",
  "Order Passing",
  "Order Publishing",
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
