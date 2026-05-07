export const REPORTS = [
  {
    key: "1",
    grn: "GRN/2026/DPB/001245",
    subject: "Unauthorized data sharing - TechHub Solutions",
    scrutinyLevel: "Level 2",
    recommendation: "Admit for Hearing",
    respondent: "TechHub Solutions Pvt Ltd",
    receivedDate: "2026-04-29",
    status: "pending-decision",
  },
  {
    key: "2",
    grn: "GRN/2026/DPB/001243",
    subject: "Data breach - ShopFast India",
    scrutinyLevel: "Level 3",
    recommendation: "Admit for Hearing",
    respondent: "ShopFast India",
    receivedDate: "2026-04-28",
    status: "pending-decision",
  },
  {
    key: "3",
    grn: "GRN/2026/DPB/001240",
    subject: "Data deletion not honored",
    scrutinyLevel: "Level 1",
    recommendation: "Seek Clarification",
    respondent: "DataStore Corp",
    receivedDate: "2026-04-27",
    status: "pending-decision",
  },
];

export const BENCH_MEMBERS = [
  { id: "1", name: "Dr. Meera Sharma", role: "Board Member", available: true },
  { id: "2", name: "Shri Rajesh Verma", role: "Board Member", available: true },
  { id: "3", name: "Ms. Priya Rao", role: "Board Member", available: false },
  { id: "4", name: "Shri Amit Kumar", role: "Board Member", available: true },
];

export const REC_CLASS = {
  "Admit for Hearing": "green",
  Reject: "red",
  "Seek Clarification": "orange",
};
