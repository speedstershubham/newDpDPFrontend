export const TENANTS = [
  { id: "1", name: "Data Protection Board of India", domain: "dpb.gov.in", status: "active", users: 24 },
  { id: "2", name: "CERT-In (Demo)", domain: "certin.gov.in", status: "inactive", users: 5 },
];

export const PLATFORM_SERVICES = [
  ["Email Gateway", "SMTP — Configured ✅"],
  ["SMS Gateway", "MSG91 — Configured ✅"],
  ["Storage", "AWS S3 — Active ✅"],
  ["Video Conferencing", "Bharat VC — Integrated ✅"],
  ["e-Sign Service", "eMudhra — Configured ✅"],
  ["DigiLocker", "Gov API — Active ✅"],
];

export const MONITORING_METRICS = [
  { label: "API Response Time", value: "142ms", ok: true },
  { label: "DB Response Time", value: "28ms", ok: true },
  { label: "Error Rate", value: "0.02%", ok: true },
  { label: "Active Sessions", value: "18", ok: true },
];
