import React from "react";

export const GRIEVANCES = [
  {
    key: "1",
    grn: "GRN/2026/DPB/001234",
    subject: "Unauthorized data processing by e-commerce platform",
    respondent: "ShopNow India Pvt Ltd",
    status: "hearing-scheduled",
    priority: "high",
    filedDate: "2026-04-15",
    hearingDate: "2026-05-05",
    hearingTime: "10:30 AM",
  },
  {
    key: "2",
    grn: "GRN/2026/DPB/001189",
    subject: "Data breach - personal information exposed",
    respondent: "TechCorp Solutions",
    status: "admitted",
    priority: "urgent",
    filedDate: "2026-04-10",
  },
  {
    key: "3",
    grn: "GRN/2026/DPB/001156",
    subject: "Consent withdrawal request ignored",
    respondent: "DataHub Analytics",
    status: "under-scrutiny",
    priority: "medium",
    filedDate: "2026-04-05",
  },
  {
    key: "4",
    grn: "GRN/2026/DPB/001098",
    subject: "Right to erasure not honored",
    respondent: "CloudStore Services",
    status: "order-issued",
    priority: "medium",
    filedDate: "2026-03-28",
  },
];

export const STATUS_CONFIG = {
  submitted: { dot: "processing", label: "Submitted" },
  "under-scrutiny": { dot: "processing", label: "Under Scrutiny" },
  admitted: { dot: "info", label: "Admitted" },
  "hearing-scheduled": { dot: "success", label: "Hearing Scheduled" },
  "order-issued": { dot: "success", label: "Order Issued" },
  revoked: { dot: "default", label: "Revoked" },
};

export const PRIORITY_CONFIG = {
  urgent: "red",
  high: "orange",
  medium: "blue",
  low: "default",
};

export const NOTIFICATIONS = [
  {
    time: "2 hours ago",
    title: "Hearing Scheduled",
    desc: "Your grievance GRN/2026/DPB/001234 has been scheduled for hearing on 05 May 2026",
    type: "success",
  },
  {
    time: "1 day ago",
    title: "Grievance Admitted",
    desc: "GRN/2026/DPB/001189 has been admitted for adjudication",
    type: "info",
  },
  {
    time: "3 days ago",
    title: "Clarification Required",
    desc: "Please provide additional documents for GRN/2026/DPB/001156",
    type: "warning",
  },
];

export const MAX_COMPLAINTS = 10;
export const MAX_ACTIVE = 5;

export const DRAFTS = [
  {
    id: "DRAFT-001",
    subject: "Data breach by online shopping platform",
    subjectShort: "Data breach by o...",
    respondent: "ShopFast India",
    step: "Document Upload",
    completion: 75,
    lastSaved: "2026-04-29 03:45 PM",
  },
  {
    id: "DRAFT-002",
    subject: "Unauthorized employee data sharing",
    subjectShort: "Unauthorized em...",
    respondent: "TechCorp Solutions",
    step: "Grievance Details",
    completion: 50,
    lastSaved: "2026-04-28 11:20 AM",
  },
  {
    id: "DRAFT-003",
    subject: "Personal data not deleted on request",
    subjectShort: "Personal data not...",
    respondent: "DataHub Analytics",
    step: "Respondent Details",
    completion: 25,
    lastSaved: "2026-04-27 06:30 PM",
  },
];

export const RECYCLE_BIN_ITEMS = [
  {
    grn: "GRN/2026/DPB/001220",
    subject: "Duplicate submission of consent complaint",
    subjectShort: "Duplicate submissio...",
    respondent: "CloudStore Services",
    deletedDate: "2026-04-25",
    daysLeft: 5,
    reason: "Duplicate complaint",
  },
  {
    grn: "GRN/2026/DPB/001198",
    subject: "Issue resolved directly with company",
    subjectShort: "Issue resolved direc...",
    respondent: "FinTech Systems",
    deletedDate: "2026-04-20",
    daysLeft: 10,
    reason: "Resolved outside Board",
  },
];

export const STATUS_TIMELINE_STEPS = [
  "submitted",
  "under-scrutiny",
  "admitted",
  "hearing-scheduled",
  "order-issued",
];

export function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || { dot: "default", label: status };
  return <span className={`badge badge--${cfg.dot}`}>{cfg.label}</span>;
}

export function PriorityTag({ priority }) {
  const color = PRIORITY_CONFIG[priority] || "default";
  return (
    <span className={`tag tag--${color}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}
