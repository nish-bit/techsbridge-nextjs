export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Very small email format check — good enough for a contact form, not RFC-complete. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Loose phone check: digits, spaces, +, -, ( ) — 7 to 16 significant digits. */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 16 && /^[\d\s+()-]+$/.test(value.trim());
}

/** Trim + strip angle brackets so raw HTML can't be injected via plain-text fields. */
export function sanitizeText(value: unknown, maxLength = 2000): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/[<>]/g, "").slice(0, maxLength);
}

