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
  {
    id: "1",
    name: "Hon'ble Dr. Anjali Sharma",
    role: "Member - Legal",
    cases: 12,
  },
  {
    id: "2",
    name: "Hon'ble Shri Rajesh Verma",
    role: "Member - Technical",
    cases: 8,
  },
  {
    id: "3",
    name: "Hon'ble Ms. Priya Menon",
    role: "Member - Judicial",
    cases: 15,
  },
  {
    id: "4",
    name: "Hon'ble Shri Arun Patel",
    role: "Member - Technical",
    cases: 10,
  },
];

export const REC_CLASS = {
  "Admit for Hearing": "green",
  Reject: "red",
  "Seek Clarification": "orange",
};
