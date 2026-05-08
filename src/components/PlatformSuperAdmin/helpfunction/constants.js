export const TENANTS = [
  {
    id: "1",
    name: "Data Protection Board of India",
    status: "active",
    users: 45,
    grievances: 1250,
    storageUsed: 78,
    created: "2024-01-15",
  },
  {
    id: "2",
    name: "State DPB - Maharashtra",
    status: "active",
    users: 32,
    grievances: 890,
    storageUsed: 62,
    created: "2024-03-20",
  },
  {
    id: "3",
    name: "State DPB - Karnataka",
    status: "onboarding",
    users: 12,
    grievances: 0,
    storageUsed: 5,
    created: "2026-04-01",
  },
];

export const SYSTEM_HEALTH = [
  { label: "CPU Usage",        percent: 45, color: "#1e3a5f" },
  { label: "Memory Usage",     percent: 62, color: "#1e3a5f" },
  { label: "Database Storage", percent: 38, color: "#1e3a5f" },
  { label: "Backup Status",    percent: 100, color: "#22c55e" },
];

export const RECENT_ACTIVITY = [
  { text: "New tenant provisioned: State DPB - Karnataka", time: "2026-04-29 09:30 AM" },
  { text: "System backup completed successfully",          time: "2026-04-29 02:00 AM" },
  { text: "Database maintenance completed",               time: "2026-04-28 11:45 PM" },
];
