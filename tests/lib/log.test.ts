import { describe, it, expect } from "vitest";
import { maskEmail, maskPhone } from "@/lib/log";

describe("maskEmail", () => {
  it("masks a normal email: head + *** + tail @domain", () => {
    expect(maskEmail("alice@example.com")).toBe("a***e@example.com");
  });

  it("preserves multi-segment domains", () => {
    expect(maskEmail("bob@mail.co.uk")).toBe("b***b@mail.co.uk");
  });

  it("omits the tail for very short local parts (≤2 chars)", () => {
    // local "ab" → head="a", tail="" (length > 2 is false)
    expect(maskEmail("ab@example.com")).toBe("a***@example.com");
    expect(maskEmail("a@example.com")).toBe("a***@example.com");
  });

  it("returns [invalid] when there's no @", () => {
    expect(maskEmail("not-an-email")).toBe("[invalid]");
    expect(maskEmail("")).toBe("[invalid]");
  });
});

describe("maskPhone", () => {
  it("returns ***NN preserving the last two digits", () => {
    expect(maskPhone("+65 8123 4567")).toBe("***67");
    expect(maskPhone("01234567890")).toBe("***90");
  });

  it("strips non-digits before masking", () => {
    expect(maskPhone("(555) 123-4567 ext. 89")).toBe("***89");
  });

  it("returns [redacted] when fewer than 2 digits remain", () => {
    expect(maskPhone("")).toBe("[redacted]");
    expect(maskPhone("no-digits-here")).toBe("[redacted]");
    expect(maskPhone("a1b")).toBe("[redacted]");
  });

  it("works at the exact 2-digit boundary", () => {
    expect(maskPhone("12")).toBe("***12");
  });
});
