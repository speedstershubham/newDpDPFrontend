export const HEARINGS = [
  {
    key: "1",
    grn: "GRN/2026/DPB/001234",
    date: "2026-05-05",
    time: "10:30 AM",
    bench: "Bench A - Dr. Sharma, Shri Verma",
    status: "scheduled",
    vcLink: "https://bharatvc.gov.in/dpb/001234",
  },
  {
    key: "2",
    grn: "GRN/2026/DPB/001189",
    date: "2026-05-05",
    time: "02:00 PM",
    bench: "Bench B - Ms. Rao, Shri Kumar",
    status: "scheduled",
    vcLink: "https://bharatvc.gov.in/dpb/001189",
  },
  {
    key: "3",
    grn: "GRN/2026/DPB/001156",
    date: "2026-05-06",
    time: "11:00 AM",
    bench: "Bench A - Dr. Sharma, Shri Verma",
    status: "scheduled",
    vcLink: "https://bharatvc.gov.in/dpb/001156",
  },
];

export const BOARD_MEMBERS = [
  { id: 1, name: "Dr. Meera Sharma",  role: "Board Member", available: true  },
  { id: 2, name: "Shri Rajesh Verma", role: "Board Member", available: true  },
  { id: 3, name: "Ms. Priya Rao",     role: "Board Member", available: false },
  { id: 4, name: "Shri Amit Kumar",   role: "Board Member", available: true  },
];

export const NOTIFICATIONS = [
  { grn: "GRN/2026/DPB/001234", party: "Data Principal", type: "SMTP", status: "delivered", time: "2026-04-29 10:30 AM" },
  { grn: "GRN/2026/DPB/001234", party: "Respondent",     type: "SMTP", status: "delivered", time: "2026-04-29 10:30 AM" },
  { grn: "GRN/2026/DPB/001189", party: "Data Principal", type: "SMS",  status: "pending",   time: "2026-04-29 11:00 AM" },
];
