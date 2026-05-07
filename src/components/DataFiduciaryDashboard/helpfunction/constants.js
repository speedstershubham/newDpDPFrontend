export const COMPLAINTS = [
  {
    grn: "GRN/2026/DPB/001234",
    subject: "Unauthorized data processing",
    status: "hearing-scheduled",
    date: "2026-04-15",
  },
  {
    grn: "GRN/2026/DPB/001189",
    subject: "Data breach notification delay",
    status: "admitted",
    date: "2026-04-10",
  },
];

export const COMPLIANCE_ITEMS = [
  { item: "Privacy Policy Updated", status: "compliant" },
  { item: "Data Processing Register", status: "compliant" },
  { item: "Consent Management", status: "warning" },
  { item: "Breach Notification", status: "compliant" },
];

export const RECENT_ACTIVITY = [
  { time: "2 hours ago", title: "Notice received for GRN/2026/DPB/001234", type: "warning" },
  { time: "1 day ago", title: "Hearing scheduled for 05 May 2026", type: "info" },
  { time: "3 days ago", title: "New complaint filed against your org", type: "error" },
];

export const NOTICES = [
  { title: "Hearing Notice — GRN/2026/DPB/001234", date: "2026-04-29", type: "Hearing Notice" },
  { title: "Admission Notice — GRN/2026/DPB/001189", date: "2026-04-25", type: "Admission Notice" },
];
