import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import SwRegister from "@/components/SwRegister";

describe("SwRegister", () => {
  let registerSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    registerSpy = vi.fn().mockResolvedValue({ update: vi.fn().mockResolvedValue(undefined) });
    Object.defineProperty(navigator, "serviceWorker", {
      configurable: true,
      value: { register: registerSpy },
    });
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("registers sw.js when NODE_ENV is production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    render(<SwRegister />);
    await new Promise((r) => setTimeout(r, 30));
    expect(registerSpy).toHaveBeenCalledWith("/sw.js", expect.any(Object));
  });

  it("does not register in development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    render(<SwRegister />);
    await new Promise((r) => setTimeout(r, 30));
    expect(registerSpy).not.toHaveBeenCalled();
  });
});
