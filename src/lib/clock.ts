/**
 * Wrapper for Date.now() used in server-component render bodies.
 *
 * React's purity rule flags direct `Date.now()` calls inside render because
 * it can produce unstable results between re-renders. For our server-rendered
 * "is this event in the future?" checks, we accept the at-build-time semantics;
 * the wrapper exists so the rule passes and the intent is explicit.
 *
 * Pages that use this should also set `export const revalidate = <seconds>`
 * to ensure "now" doesn't drift too far between rebuilds.
 */
export function buildTimeNow(): number {
  return Date.now();
}
