/**
 * Browser-friendly fetch with a hard timeout via AbortController.
 *
 * Default 15s timeout — sized to comfortably outlast our own API routes
 * (chat streaming target ~10s, form posts <1s) without trapping users on
 * a flaky network. Customise with `timeoutMs`.
 *
 * Throws a TimeoutError with `.cause: "timeout"` so callers can show
 * differentiated UX vs network failures.
 */

export class TimeoutError extends Error {
  cause = "timeout" as const;
  constructor(ms: number) {
    super(`Request timed out after ${ms}ms`);
    this.name = "TimeoutError";
  }
}

type FetchOptions = RequestInit & { timeoutMs?: number };

export async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { timeoutMs = 15_000, signal: externalSignal, ...rest } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  // Chain external abort signals (e.g. component unmount) with our timeout.
  if (externalSignal) {
    if (externalSignal.aborted) controller.abort();
    else externalSignal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  try {
    return await fetch(url, { ...rest, signal: controller.signal });
  } catch (err) {
    if (controller.signal.aborted && externalSignal?.aborted !== true) {
      // Our timeout fired, not an external cancellation
      throw new TimeoutError(timeoutMs);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
