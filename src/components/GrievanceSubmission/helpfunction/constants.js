export const STEPS = [
  "Ask a Question",
  "Basic Information",
  "Respondent Details",
  "Evidence Upload",
  "Preview & Submit",
];

export const ASK_QUESTION_FAQ = [
  {
    q: "What is a valid grievance under DPDP Act 2023?",
    a: "A valid grievance involves violation of your rights as a Data Principal — e.g., unlawful data processing, denial of erasure/correction requests, or a data breach affecting you.",
  },
  {
    q: "Who can I file a complaint against?",
    a: "You may file against any Data Fiduciary (company/government entity) or Consent Manager that has processed your personal data in violation of the Act.",
  },
  {
    q: "Is there a time limit to file?",
    a: "Yes. A grievance should be filed within 30 days of the incident or within 30 days of receiving a response (or no response) from the Data Fiduciary.",
  },
  {
    q: "Have you already approached the Data Fiduciary?",
    a: "You must first submit a grievance to the Data Fiduciary and receive an unsatisfactory response (or no response within 30 days) before approaching the DPB.",
  },
];

export const CATEGORY_OPTIONS = [
  { value: "consent-violation", label: "Consent Violation" },
  { value: "data-breach", label: "Data Breach" },
  { value: "right-to-erasure", label: "Right to Erasure" },
  { value: "right-to-correction", label: "Right to Correction" },
  { value: "data-portability", label: "Data Portability" },
  { value: "other", label: "Other" },
];

export const RESPONDENT_TYPES = [
  { value: "data-fiduciary", label: "Data Fiduciary" },
  { value: "consent-manager", label: "Consent Manager" },
  { value: "data-processor", label: "Data Processor" },
  { value: "government", label: "Government Entity" },
  { value: "other", label: "Other" },
];

export const DF_SPECIFIC_CATEGORIES = ["consent-violation", "data-breach", "right-to-erasure", "right-to-correction", "data-portability"];
export const CM_SPECIFIC_CATEGORIES = ["consent-violation", "right-to-erasure", "other"];

export const INITIAL_FORM = {
  category: "",
  subject: "",
  description: "",
  respondentName: "",
  respondentEmail: "",
  respondentType: "",
  respondentRegNo: "",
  respondentAddress: "",
  approachDate: "",
  approachResponseReceived: "",
  incidentDate: "",
  evidence: "",
  agreedToTerms: false,
};

export function generateGRN() {
  return `GRN/2026/DPB/${String(Math.floor(Math.random() * 9000) + 1000).padStart(6, "0")}`;
}
