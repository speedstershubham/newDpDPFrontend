export const OTP_LENGTH = 6;

export const ID_OPTIONS = [
  { value: "aadhaar", label: "Aadhaar", icon: "🪪", description: "Verify with Aadhaar OTP" },
  { value: "pan", label: "PAN", icon: "💳", description: "Verify with PAN Card" },
  { value: "driving", label: "Driving Licence", icon: "🚗", description: "DL verification" },
  { value: "passport", label: "Passport", icon: "🛂", description: "Passport verification" },
];

export const OFFICIAL_ROLES = [
  { value: "scrutiny", label: "Scrutiny Wing" },
  { value: "chairperson", label: "Chairperson" },
  { value: "registry", label: "Registry" },
  { value: "board-member", label: "Board Member" },
  { value: "data-fiduciary", label: "Data Fiduciary" },
  { value: "reader", label: "Reader" },
  { value: "admin", label: "System Admin" },
  { value: "super-admin", label: "Platform Super Admin" },
];
