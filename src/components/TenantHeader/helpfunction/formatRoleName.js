/**
 * Converts a hyphenated role string to Title Case.
 * e.g. "data-principal" → "Data Principal"
 */
export function formatRoleName(role) {
  if (!role) return "";
  return role
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
