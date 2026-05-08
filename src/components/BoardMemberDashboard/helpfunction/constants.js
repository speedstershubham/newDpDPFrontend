export const CASES = [
  {
    key: "1",
    grn: "GRN/2026/DPB/001234",
    subject: "Unauthorized data processing by e-commerce platform",
    respondent: "ShopNow India Pvt Ltd",
    hearingDate: "2026-05-05",
    hearingTime: "10:30 AM",
    time: "10:30 AM",
    status: "hearing-today",
    cdvStatus: "hearing-scheduled",
    priority: "high",
    filedDate: "2026-04-15",
    category: "Consent Violation",
  },
  {
    key: "2",
    grn: "GRN/2026/DPB/001189",
    subject: "Personal information exposed without authorization",
    respondent: "TechCorp Solutions",
    hearingDate: "2026-05-05",
    hearingTime: "02:00 PM",
    time: "02:00 PM",
    status: "scheduled",
    cdvStatus: "hearing-scheduled",
    priority: "urgent",
    filedDate: "2026-04-10",
    category: "Data Breach",
  },
  {
    key: "3",
    grn: "GRN/2026/DPB/001156",
    subject: "Consent withdrawal request ignored by platform",
    respondent: "DataHub Analytics",
    hearingDate: "2026-05-06",
    hearingTime: "11:00 AM",
    time: "11:00 AM",
    status: "scheduled",
    cdvStatus: "admitted",
    priority: "medium",
    filedDate: "2026-04-05",
    category: "Consent Violation",
  },
];

export const EXPERTS = [
  { id: "1", name: "Dr. Priya Sharma", specialisation: "Data Privacy & Cybersecurity", organisation: "IIT Delhi" },
  { id: "2", name: "Adv. Ramesh Nair", specialisation: "Digital Law & DPDP Act", organisation: "Bar Council of India" },
  { id: "3", name: "Prof. Anita Gupta", specialisation: "Information Technology", organisation: "NASSCOM Research" },
  { id: "4", name: "Mr. Sanjay Mehta", specialisation: "Forensic Data Analysis", organisation: "CERT-In" },
  { id: "5", name: "Dr. Kavita Joshi", specialisation: "Consumer Rights & Data", organisation: "TRAI Advisory" },
];

export const DECISION_OPTIONS = [
  "In favour of Data Principal",
  "In favour of Respondent",
  "Partially in favour",
  "Case Dismissed",
];
