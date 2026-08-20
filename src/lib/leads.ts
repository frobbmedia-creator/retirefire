export const LEAD_SOURCES = [
  "coast_checklist",
  "sequence_guide",
  "checkup_results",
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidLeadEmail(value: string): boolean {
  const email = value.trim();
  if (email.length < 5 || email.length > 254) return false;
  if (email.includes(" ")) return false;
  return EMAIL_RE.test(email);
}

export function parseLeadSource(value: unknown): LeadSource | null {
  if (typeof value !== "string") return null;
  return (LEAD_SOURCES as readonly string[]).includes(value)
    ? (value as LeadSource)
    : null;
}
