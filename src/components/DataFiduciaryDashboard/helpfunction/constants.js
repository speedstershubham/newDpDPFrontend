export const NOTICES = [
  {
    id: "NOT/2026/DPB/001234",
    grn: "GRN/2026/DPB/001234",
    subject: "Show Cause Notice - Consent Violation",
    issueDate: "2026-05-01",
    deadline: "2026-05-10",
    daysLeft: 4,
    severity: "HIGH",
    content: [
      "You are hereby directed to show cause as to why action should not be taken against your organization for the alleged violation of consent requirements under Section 6 of the Digital Personal Data Protection Act, 2023.",
      "The complainant alleges that personal data was shared with third-party marketing companies without explicit consent, in violation of the consent framework established under the Act.",
    ],
  },
  {
    id: "NOT/2026/DPB/001156",
    grn: "GRN/2026/DPB/001156",
    subject: "Additional Document Request",
    issueDate: "2026-05-03",
    deadline: "2026-05-08",
    daysLeft: 2,
    severity: "MEDIUM",
    content: [
      "The Board requests submission of additional documents pertaining to your data processing register and consent management practices as maintained under the DPDP Act, 2023.",
      "Please provide certified copies of all relevant documentation within the stipulated deadline.",
    ],
  },
  {
    id: "NOT/2026/DPB/000987",
    grn: "GRN/2026/DPB/000987",
    subject: "Hearing Summons",
    issueDate: "2026-05-04",
    deadline: "2026-05-07",
    daysLeft: 1,
    severity: "CRITICAL",
    content: [
      "You are hereby summoned to appear before the Data Protection Board for a hearing regarding the complaint filed against your organization.",
      "Failure to appear at the scheduled hearing may result in an ex-parte order being passed against your organization.",
    ],
  },
];

export const HEARINGS = [
  {
    grn: "GRN/2026/DPB/001234",
    subject: "Hearing - Consent Violation Case",
    date: "2026-05-07",
    time: "10:30 AM",
    bench: "Bench A",
    vcLink: "https://bharatvc.gov.in/dpb/001234",
  },
  {
    grn: "GRN/2026/DPB/000887",
    subject: "Pre-Hearing Conference",
    date: "2026-05-08",
    time: "02:00 PM",
    bench: "Bench B",
    vcLink: "https://bharatvc.gov.in/dpb/000887",
  },
];

export const RECENT_ACTIVITY = [
  { color: "#f59e0b", text: "Notice received for GRN/2026/DPB/001234",              time: "2 hours ago" },
  { color: "#22c55e", text: "Reply submitted for GRN/2026/DPB/000765",               time: "5 hours ago" },
  { color: "#3b82f6", text: "Hearing scheduled for 2026-05-07",                      time: "1 day ago"   },
  { color: "#7c3aed", text: "Additional documents requested for GRN/2026/DPB/001156",time: "2 days ago"  },
];

export const SEVERITY_CLASS = {
  HIGH:     "sev--high",
  MEDIUM:   "sev--medium",
  CRITICAL: "sev--critical",
  LOW:      "sev--low",
};
