export function maskEmail(email: string): string {
  const m = /^([^@]+)@(.+)$/.exec(email);
  if (!m) return "[invalid]";
  const local = m[1];
  const domain = m[2];
  const head = local.slice(0, 1);
  const tail = local.length > 2 ? local.slice(-1) : "";
  return `${head}***${tail}@${domain}`;
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 2) return "[redacted]";
  return `***${digits.slice(-2)}`;
}
