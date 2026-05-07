export const GRIEVANCES = [
  {
    key: "1",
    grn: "GRN/2026/DPB/001245",
    subject: "Unauthorized data sharing with third parties",
    respondent: "TechHub Solutions Pvt Ltd",
    category: "consent-violation",
    priority: "urgent",
    scrutinyLevel: "Level 1",
    assignedTo: "Priya Sharma",
    filedDate: "2026-04-28",
    deadline: "2026-05-09",
    status: "pending",
  },
  {
    key: "2",
    grn: "GRN/2026/DPB/001243",
    subject: "Data breach - customer data exposed online",
    respondent: "ShopFast India",
    category: "data-breach",
    priority: "high",
    scrutinyLevel: "Level 2",
    assignedTo: "Rajesh Kumar",
    filedDate: "2026-04-27",
    deadline: "2026-05-08",
    status: "under-review",
  },
  {
    key: "3",
    grn: "GRN/2026/DPB/001240",
    subject: "Failure to honor data deletion request",
    respondent: "DataStore Corp",
    category: "right-to-erasure",
    priority: "medium",
    scrutinyLevel: "Level 1",
    assignedTo: "Amit Verma",
    filedDate: "2026-04-26",
    deadline: "2026-05-07",
    status: "clarification-requested",
  },
  {
    key: "4",
    grn: "GRN/2026/DPB/001238",
    subject: "Incorrect personal data maintained",
    respondent: "FinTech Services Ltd",
    category: "right-to-correction",
    priority: "medium",
    scrutinyLevel: "Level 1",
    assignedTo: "Priya Sharma",
    filedDate: "2026-04-25",
    deadline: "2026-05-06",
    status: "pending",
  },
];

export const PRIORITY_CLASS = {
  urgent: "red",
  high: "orange",
  medium: "blue",
  low: "default",
};

export const STATUS_DOT = {
  pending: "processing",
  "under-review": "processing",
  "clarification-requested": "warning",
  approved: "success",
  rejected: "error",
};

export const STATUS_LABEL = {
  pending: "Pending Review",
  "under-review": "Under Review",
  "clarification-requested": "Clarification Requested",
  approved: "Approved",
  rejected: "Rejected",
};

export function daysLeft(dateStr) {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
}
