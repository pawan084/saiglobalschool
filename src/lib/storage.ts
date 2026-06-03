/**
 * Safe localStorage / sessionStorage wrappers.
 * Browsers in private mode (and some embedded webviews) throw on the
 * underlying calls; these helpers swallow those errors so the React tree
 * doesn't crash from a hydration step.
 */

export function safeGet(key: string, fallback: string | null = null): string | null {
  try {
    if (typeof window === "undefined") return fallback;
    const v = window.localStorage.getItem(key);
    return v === null ? fallback : v;
  } catch {
    return fallback;
  }
}

export function safeSet(key: string, value: string): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

export function safeRemove(key: string): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function safeGetJson<T>(key: string, fallback: T): T {
  const raw = safeGet(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function safeSetJson<T>(key: string, value: T): void {
  try {
    safeSet(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}
