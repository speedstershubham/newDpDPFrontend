export const OTP_LENGTH = 6;

export const ID_OPTIONS = [
  { value: "aadhaar", label: "Aadhaar", icon: "🪪", description: "Verify with Aadhaar OTP" },
  { value: "pan", label: "PAN", icon: "💳", description: "Verify with PAN Card" },
  { value: "driving", label: "Driving Licence", icon: "🚗", description: "DL verification" },
  { value: "passport", label: "Passport", icon: "🛂", description: "Passport verification" },
];

export const OFFICIAL_ROLES = [
  { value: "scrutiny",       label: "Scrutiny Wing",        roleId: "role-scrutiny"    },
  { value: "chairperson",    label: "Chairperson",          roleId: "role-chairperson" },
  { value: "registry",      label: "Registry",             roleId: "role-registry"    },
  { value: "board-member",  label: "Board Member",         roleId: "role-board"       },
  { value: "data-fiduciary",label: "Data Fiduciary",       roleId: "role-fiduciary"   },
  { value: "reader",        label: "Reader",               roleId: "role-reader"      },
  { value: "admin",         label: "System Admin",         roleId: "role-admin"       },
  { value: "super-admin",   label: "Platform Super Admin", roleId: "role-super-admin" },
];

/** Returns the context roleId for a given role slug */
export function getRoleId(roleSlug) {
  return OFFICIAL_ROLES.find((r) => r.value === roleSlug)?.roleId ?? `role-${roleSlug}`;
}
