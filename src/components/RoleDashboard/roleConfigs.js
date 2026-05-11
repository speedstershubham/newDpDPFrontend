/**
 * roleConfigs.js
 *
 * Single source of truth for every role's dashboard configuration.
 * To add a NEW role, just add one entry to ROLE_CONFIGS below — no other file change needed.
 *
 * Config shape
 * ─────────────
 * {
 *   roleLabel    : string
 *   roleSubtitle : string
 *   getData      : () => item[]          — returns the data array (sync, from constants)
 *   searchKeys   : string[]              — item fields to search by
 *   tabs         : { key, label, filter: (item)=>bool }[]
 *   stats        : (items) => { label, value, icon, color }[]
 *   columns      : { key, header, render: (item) => CellDescriptor }[]
 *   rowActions   : { key, label, icon, variant, internal?, onAction? }[]
 *   detailFields : { label, getValue: (item)=>string }[]
 * }
 *
 * CellDescriptor types
 * ─────────────────────
 *  { type:"text",     text }
 *  { type:"mono",     text }
 *  { type:"badge",    label, color }        — color: blue|orange|green|red|default
 *  { type:"tag",      text }
 *  { type:"status",   dot, label }          — dot: processing|warning|success|error
 *  { type:"deadline", date, days }          — days: number (negative = overdue)
 *  { type:"days",     days }                — days remaining number
 *
 * rowAction fields
 * ─────────────────
 *  key      : unique action id
 *  label    : button text
 *  icon     : key in ICONS map ("eye"|"edit"|"check"|"x"|"video"|"send")
 *  variant  : "link" | "primary" | "success" | "danger" | "default"
 *  internal : true → opens detail drawer (no external handler needed)
 *  onAction : (item, navigate) => void  — provide for navigation or custom side-effects
 *             omit to get a generic confirmation modal
 */

import { GRIEVANCES, STATUS_LABEL, daysLeft } from "../ScrutinyDashboard/helpfunction/constants";
import { REPORTS } from "../ChairpersonDashboard/helpfunction/constants";
import { HEARINGS as REGISTRY_HEARINGS } from "../RegistryDashboard/helpfunction/constants";
import { NOTICES } from "../DataFiduciaryDashboard/helpfunction/constants";

const TODAY = new Date().toISOString().slice(0, 10);

/* ── Priority badge helper ── */
const PRIORITY_COLORS = { urgent: "red", high: "orange", medium: "blue", low: "default" };
const priorityBadge = (p) => ({
  type: "badge",
  label: p ? p.charAt(0).toUpperCase() + p.slice(1) : "",
  color: PRIORITY_COLORS[p] ?? "default",
});

/* ── Status dot helper ── */
const STATUS_DOT_MAP = {
  pending: "processing",
  "under-review": "processing",
  "clarification-requested": "warning",
  approved: "success",
  rejected: "error",
  "pending-decision": "processing",
  scheduled: "success",
};

/* ════════════════════════════════════════════
   SCRUTINY
   ════════════════════════════════════════════ */
const SCRUTINY_CONFIG = {
  roleLabel: "Scrutiny Wing",
  roleSubtitle: "Review and process grievances under DPDP Act 2023",
  getData: () => GRIEVANCES,
  searchKeys: ["grn", "subject", "respondent"],
  tabs: [
    { key: "all",           label: "All",          filter: () => true },
    { key: "pending",       label: "Pending",       filter: (i) => i.status === "pending" },
    { key: "under-review",  label: "Under Review",  filter: (i) => i.status === "under-review" },
    { key: "clarification", label: "Clarification", filter: (i) => i.status === "clarification-requested" },
    { key: "resolved",      label: "Resolved",      filter: (i) => i.status === "approved" },
  ],
  stats: (items) => [
    { label: "Total",          value: items.length,                                                    icon: "📋", color: "blue"   },
    { label: "Pending",        value: items.filter((i) => i.status === "pending").length,              icon: "⏱",  color: "orange" },
    { label: "Resolved",       value: items.filter((i) => i.status === "approved").length,             icon: "✅", color: "green"  },
    { label: "Overdue",        value: items.filter((i) => daysLeft(i.deadline) < 0).length,            icon: "⚠️", color: "red"    },
  ],
  columns: [
    { key: "grn",       header: "GRN",            render: (i) => ({ type: "mono",     text: i.grn }) },
    { key: "subject",   header: "Subject",         render: (i) => ({ type: "text",     text: i.subject }) },
    { key: "respondent",header: "Respondent",      render: (i) => ({ type: "text",     text: i.respondent }) },
    { key: "priority",  header: "Priority",        render: (i) => priorityBadge(i.priority) },
    { key: "level",     header: "Scrutiny Level",  render: (i) => ({ type: "tag",      text: i.scrutinyLevel }) },
    { key: "status",    header: "Status",          render: (i) => ({ type: "status",   dot: STATUS_DOT_MAP[i.status], label: STATUS_LABEL[i.status] ?? i.status }) },
    { key: "deadline",  header: "Deadline",        render: (i) => ({ type: "deadline", date: i.deadline, days: daysLeft(i.deadline) }) },
  ],
  rowActions: [
    { key: "view", label: "Review", icon: "eye",  variant: "link", internal: true },
    { key: "edit", label: "Edit",   icon: "edit", variant: "link",
      onAction: (item, navigate) => navigate(`/scrutiny/edit/${encodeURIComponent(item.grn)}`) },
  ],
  detailFields: [
    { label: "GRN",            getValue: (i) => i.grn },
    { label: "Subject",        getValue: (i) => i.subject },
    { label: "Category",       getValue: (i) => i.category },
    { label: "Priority",       getValue: (i) => i.priority },
    { label: "Status",         getValue: (i) => STATUS_LABEL[i.status] ?? i.status },
    { label: "Filed Date",     getValue: (i) => i.filedDate },
    { label: "Deadline",       getValue: (i) => i.deadline },
    { label: "Scrutiny Level", getValue: (i) => i.scrutinyLevel },
    { label: "Assigned To",    getValue: (i) => i.assignedTo },
    { label: "Respondent",     getValue: (i) => i.respondent },
  ],
};

/* ════════════════════════════════════════════
   CHAIRPERSON
   ════════════════════════════════════════════ */
const REC_COLORS = {
  "Admit for Hearing":   "green",
  "Return for Scrutiny": "orange",
  "Seek Clarification":  "blue",
  Reject:                "red",
};

const CHAIRPERSON_CONFIG = {
  roleLabel: "Chairperson",
  roleSubtitle: "Review scrutiny reports and make adjudication decisions",
  getData: () => REPORTS,
  searchKeys: ["grn", "subject", "respondent"],
  tabs: [
    { key: "all",              label: "All",              filter: () => true },
    { key: "pending-decision", label: "Pending Decision", filter: (i) => i.status === "pending-decision" },
  ],
  stats: (items) => [
    { label: "Total Reports",    value: items.length,                                                          icon: "📋", color: "blue"   },
    { label: "Pending Decision", value: items.filter((i) => i.status === "pending-decision").length,          icon: "⏱",  color: "orange" },
    { label: "For Hearing",      value: items.filter((i) => i.recommendation === "Admit for Hearing").length, icon: "🔔", color: "green"  },
    { label: "Level 3+",         value: items.filter((i) => i.scrutinyLevel === "Level 3").length,            icon: "⚠️", color: "red"    },
  ],
  columns: [
    { key: "grn",           header: "GRN",            render: (i) => ({ type: "mono",  text: i.grn }) },
    { key: "subject",       header: "Subject",         render: (i) => ({ type: "text",  text: i.subject }) },
    { key: "respondent",    header: "Respondent",      render: (i) => ({ type: "text",  text: i.respondent }) },
    { key: "scrutinyLevel", header: "Scrutiny Level",  render: (i) => ({ type: "tag",   text: i.scrutinyLevel }) },
    { key: "recommendation",header: "Recommendation",  render: (i) => ({ type: "badge", label: i.recommendation, color: REC_COLORS[i.recommendation] ?? "default" }) },
    { key: "receivedDate",  header: "Received Date",   render: (i) => ({ type: "text",  text: i.receivedDate }) },
    { key: "status",        header: "Status",          render: (i) => ({ type: "status",dot: STATUS_DOT_MAP[i.status], label: i.status?.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase()) }) },
  ],
  rowActions: [
    { key: "view",   label: "Review", icon: "eye",   variant: "link",    internal: true },
    { key: "admit",  label: "Admit",  icon: "check", variant: "success" },
    { key: "reject", label: "Reject", icon: "x",     variant: "danger"  },
  ],
  detailFields: [
    { label: "GRN",            getValue: (i) => i.grn },
    { label: "Subject",        getValue: (i) => i.subject },
    { label: "Respondent",     getValue: (i) => i.respondent },
    { label: "Scrutiny Level", getValue: (i) => i.scrutinyLevel },
    { label: "Recommendation", getValue: (i) => i.recommendation },
    { label: "Received Date",  getValue: (i) => i.receivedDate },
    { label: "Status",         getValue: (i) => i.status },
  ],
};

/* ════════════════════════════════════════════
   REGISTRY
   ════════════════════════════════════════════ */
const REGISTRY_CONFIG = {
  roleLabel: "Registry",
  roleSubtitle: "Manage hearings, schedules, and official filings",
  getData: () => REGISTRY_HEARINGS,
  searchKeys: ["grn", "bench"],
  tabs: [
    { key: "all",      label: "All",      filter: () => true },
    { key: "today",    label: "Today",    filter: (i) => i.date === TODAY },
    { key: "upcoming", label: "Upcoming", filter: (i) => i.date > TODAY },
  ],
  stats: (items) => [
    { label: "Total Hearings", value: items.length,                                       icon: "📋", color: "blue"   },
    { label: "Today",          value: items.filter((i) => i.date === TODAY).length,       icon: "📅", color: "orange" },
    { label: "Upcoming",       value: items.filter((i) => i.date > TODAY).length,         icon: "🔮", color: "green"  },
    { label: "Scheduled",      value: items.filter((i) => i.status === "scheduled").length,icon: "✅",color: "teal"   },
  ],
  columns: [
    { key: "grn",    header: "GRN",    render: (i) => ({ type: "mono", text: i.grn }) },
    { key: "date",   header: "Date",   render: (i) => ({ type: "text", text: i.date }) },
    { key: "time",   header: "Time",   render: (i) => ({ type: "text", text: i.time }) },
    { key: "bench",  header: "Bench",  render: (i) => ({ type: "text", text: i.bench }) },
    { key: "status", header: "Status", render: (i) => ({ type: "status", dot: STATUS_DOT_MAP[i.status], label: i.status }) },
  ],
  rowActions: [
    { key: "view", label: "View",    icon: "eye",   variant: "link",    internal: true },
    { key: "join", label: "Join VC", icon: "video", variant: "default",
      onAction: (item) => window.open(item.vcLink, "_blank") },
  ],
  detailFields: [
    { label: "GRN",     getValue: (i) => i.grn },
    { label: "Date",    getValue: (i) => i.date },
    { label: "Time",    getValue: (i) => i.time },
    { label: "Bench",   getValue: (i) => i.bench },
    { label: "Status",  getValue: (i) => i.status },
    { label: "VC Link", getValue: (i) => i.vcLink },
  ],
};

/* ════════════════════════════════════════════
   DATA FIDUCIARY
   ════════════════════════════════════════════ */
const SEV_COLORS = { CRITICAL: "red", HIGH: "orange", MEDIUM: "blue", LOW: "green" };

const FIDUCIARY_CONFIG = {
  roleLabel: "Data Fiduciary",
  roleSubtitle: "Manage notices, replies, and compliance hearings under DPDP Act 2023",
  getData: () => NOTICES,
  searchKeys: ["id", "subject"],
  tabs: [
    { key: "all",      label: "All",      filter: () => true },
    { key: "critical", label: "Critical", filter: (i) => i.severity === "CRITICAL" },
    { key: "high",     label: "High",     filter: (i) => i.severity === "HIGH" },
    { key: "medium",   label: "Medium",   filter: (i) => i.severity === "MEDIUM" },
  ],
  stats: (items) => [
    { label: "Active Notices", value: items.length,                                        icon: "🔔", color: "blue"   },
    { label: "Critical",       value: items.filter((i) => i.severity === "CRITICAL").length,icon: "⚠️", color: "red"    },
    { label: "Due ≤ 7 days",   value: items.filter((i) => i.daysLeft <= 7).length,         icon: "⏱",  color: "orange" },
    { label: "High Severity",  value: items.filter((i) => i.severity === "HIGH").length,   icon: "🔺", color: "teal"   },
  ],
  columns: [
    { key: "id",       header: "Notice ID", render: (i) => ({ type: "mono",  text: i.id }) },
    { key: "subject",  header: "Subject",   render: (i) => ({ type: "text",  text: i.subject }) },
    { key: "severity", header: "Severity",  render: (i) => ({ type: "badge", label: i.severity, color: SEV_COLORS[i.severity] ?? "default" }) },
    { key: "issueDate",header: "Issued",    render: (i) => ({ type: "text",  text: i.issueDate }) },
    { key: "deadline", header: "Deadline",  render: (i) => ({ type: "text",  text: i.deadline }) },
    { key: "daysLeft", header: "Days Left", render: (i) => ({ type: "days",  days: i.daysLeft }) },
  ],
  rowActions: [
    { key: "view",  label: "View",  icon: "eye",  variant: "link",    internal: true },
    { key: "reply", label: "Reply", icon: "send", variant: "primary" },
  ],
  detailFields: [
    { label: "Notice ID",  getValue: (i) => i.id },
    { label: "Subject",    getValue: (i) => i.subject },
    { label: "Severity",   getValue: (i) => i.severity },
    { label: "Issued",     getValue: (i) => i.issueDate },
    { label: "Deadline",   getValue: (i) => i.deadline },
    { label: "Days Left",  getValue: (i) => `${i.daysLeft} days` },
    { label: "GRN (Linked)",getValue: (i) => i.grn },
  ],
};

import { GRIEVANCES as DP_GRIEVANCES, STATUS_CONFIG } from "../DataPrincipalDashboard/helpfunction/constants.jsx";

/* ════════════════════════════════════════════
   DATA PRINCIPAL (Citizen)
   ════════════════════════════════════════════ */
const DP_CONFIG = {
  roleLabel: "My Grievances",
  roleSubtitle: "Track your data protection complaints under DPDP Act 2023",
  getData: () => DP_GRIEVANCES,
  searchKeys: ["grn", "subject", "respondent"],
  tabs: [
    { key: "all",      label: "All",              filter: () => true },
    { key: "active",   label: "Active",           filter: (i) => !["order-issued","revoked"].includes(i.status) },
    { key: "resolved", label: "Order Issued",     filter: (i) => i.status === "order-issued" },
  ],
  stats: (items) => [
    { label: "Total Filed",     value: items.length,                                                        icon: "📋", color: "blue"   },
    { label: "Under Scrutiny",  value: items.filter((i) => i.status === "under-scrutiny").length,           icon: "🔍", color: "orange" },
    { label: "Hearing Scheduled",value: items.filter((i) => i.status === "hearing-scheduled").length,       icon: "📅", color: "teal"   },
    { label: "Order Issued",    value: items.filter((i) => i.status === "order-issued").length,             icon: "✅", color: "green"  },
  ],
  columns: [
    { key: "grn",       header: "GRN",        render: (i) => ({ type: "mono",   text: i.grn }) },
    { key: "subject",   header: "Subject",    render: (i) => ({ type: "text",   text: i.subject }) },
    { key: "respondent",header: "Respondent", render: (i) => ({ type: "text",   text: i.respondent }) },
    { key: "priority",  header: "Priority",   render: (i) => priorityBadge(i.priority) },
    { key: "status",    header: "Status",     render: (i) => ({ type: "status", dot: STATUS_CONFIG[i.status]?.dot ?? "default", label: STATUS_CONFIG[i.status]?.label ?? i.status }) },
    { key: "filedDate", header: "Filed",      render: (i) => ({ type: "text",   text: i.filedDate }) },
  ],
  rowActions: [
    { key: "view", label: "Track", icon: "eye", variant: "link", internal: true },
  ],
  detailFields: [
    { label: "GRN",            getValue: (i) => i.grn },
    { label: "Subject",        getValue: (i) => i.subject },
    { label: "Respondent",     getValue: (i) => i.respondent },
    { label: "Priority",       getValue: (i) => i.priority },
    { label: "Status",         getValue: (i) => STATUS_CONFIG[i.status]?.label ?? i.status },
    { label: "Filed Date",     getValue: (i) => i.filedDate },
    { label: "Hearing Date",   getValue: (i) => i.hearingDate ?? "—" },
    { label: "Hearing Time",   getValue: (i) => i.hearingTime ?? "—" },
  ],
};

/* ════════════════════════════════════════════
   MASTER MAP  ← add new roles here
   ════════════════════════════════════════════ */
export const ROLE_CONFIGS = {
  "data-principal": DP_CONFIG,
  scrutiny:         SCRUTINY_CONFIG,
  chairperson:      CHAIRPERSON_CONFIG,
  registry:         REGISTRY_CONFIG,
  "data-fiduciary": FIDUCIARY_CONFIG,
};
