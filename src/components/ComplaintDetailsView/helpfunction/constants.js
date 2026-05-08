export const CASE = {
  grn: "GRN/2026/DPB/001234",
  subject: "Unauthorized data processing by e-commerce platform",
  respondent: "ShopNow India Pvt Ltd",
  status: "hearing-scheduled",
  priority: "high",
  filedDate: "2026-04-15",
  hearingDate: "2026-05-05",
  hearingTime: "10:30 AM",
  category: "Consent Violation",
};

export const STATUS_STEPS = [
  "submitted",
  "under-scrutiny",
  "admitted",
  "hearing-scheduled",
  "order-issued",
];

export const STATUS_STEP_LABELS = {
  "submitted": "Submitted",
  "under-scrutiny": "Under Scrutiny",
  "admitted": "Admitted",
  "hearing-scheduled": "Hearing Scheduled",
  "order-issued": "Order Issued",
};

export const STATUS_STEP_SUBTITLES = {
  "submitted": "2026-04-15",
  "under-scrutiny": "Verifying documents and facts",
  "admitted": "Accepted for adjudication",
  "hearing-scheduled": "2026-05-05",
  "order-issued": "Final order published",
};

export const TIMELINE_ITEMS = [
  {
    title: "Grievance Submitted",
    desc: "2026-04-15 - Application filed via online portal",
    type: "outline",
  },
  {
    title: "GRN Assigned",
    desc: "2026-04-15 - Grievance Reference Number: GRN/2026/DPB/001234",
    type: "done",
  },
  {
    title: "Scrutiny Initiated",
    desc: "Documents verified and assigned to scrutiny wing",
    type: "done",
  },
  {
    title: "Grievance Admitted",
    desc: "Accepted for adjudication by the Board",
    type: "done",
  },
  {
    title: "Hearing Scheduled",
    desc: "2026-05-05 at 10:30 AM - Bharat VC link sent",
    type: "outline",
  },
];

export const SUBMITTED_DOCS = [
  {
    name: "Grievance Application Form",
    subtitle: "Uploaded on 2026-04-15",
    verified: false,
  },
  {
    name: "Supporting Evidence",
    subtitle: "Email screenshots and communications",
    verified: false,
  },
  {
    name: "Identity Proof",
    subtitle: "Aadhaar verification completed",
    verified: true,
  },
];

export const BOARD_DOCS = [
  {
    name: "Scrutiny Report",
    subtitle: "Board'\''s preliminary assessment",
    verified: false,
  },
];

export const COMM_NOTIFICATIONS = [
  {
    title: "Acknowledgment Email",
    desc: "2026-04-15 - Sent to registered email",
    status: "Delivered",
    type: "done",
  },
  {
    title: "Hearing Notice",
    desc: "Hearing scheduled notification with Bharat VC link",
    status: "Delivered",
    type: "outline",
  },
];

export const RECENT_UPDATES = [
  {
    title: "Hearing Scheduled",
    desc: "Your grievance GRN/2026/DPB/001234 hearing on 05 May 2026",
    time: "2 hours ago",
    type: "done",
  },
  {
    title: "Grievance Admitted",
    desc: "GRN/2026/DPB/001188 has been admitted for adjudication",
    time: "1 day ago",
    type: "outline",
  },
  {
    title: "Clarification Required",
    desc: "Please provide additional documentation for review",
    time: "3 days ago",
    type: "outline",
  },
];

// Legacy exports kept for compatibility
export const DOCUMENTS = [
  { name: "Privacy_Policy_Screenshot.pdf", size: "1.2 MB", date: "2026-04-15", type: "pdf" },
  { name: "Email_Correspondence.pdf", size: "0.8 MB", date: "2026-04-15", type: "pdf" },
];
export const ADDITIONAL_DOC_REQUESTS = [];
export const COMMUNICATIONS = [];
