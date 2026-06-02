import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ApplyWizard from "@/app/apply/ApplyWizard";
import { ToastProvider } from "@/components/Toast";
import GradeFitQuiz from "@/app/grade-fit/GradeFitQuiz";
import OpenHouseModal from "@/components/OpenHouseModal";

function wrap(ui: React.ReactNode) {
  return render(<ToastProvider>{ui}</ToastProvider>);
}

describe("ApplyWizard — additional coverage", () => {
  it("Back step navigation works", async () => {
    const user = userEvent.setup();
    wrap(<ApplyWizard />);
    await user.type(screen.getByLabelText(/^full name/i), "Alice");
    await user.type(screen.getByLabelText(/^email/i), "alice@example.com");
    await user.type(screen.getByLabelText(/phone/i), "12345678");
    await user.click(screen.getByText(/continue/i));
    expect(await screen.findByText(/about your child/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /^back$/i }));
    expect(screen.getByText(/parent \/ guardian details/i)).toBeInTheDocument();
  });

  it("hydrates a saved draft", () => {
    localStorage.setItem(
      "sssgs:apply-draft",
      JSON.stringify({ parentName: "Restored Person", parentEmail: "r@example.com" })
    );
    wrap(<ApplyWizard />);
    const input = screen.getByLabelText(/^full name/i) as HTMLInputElement;
    expect(input.value).toBe("Restored Person");
  });

  it("shows server error toast when submit fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: "Boom" }), { status: 500 })
    );
    const user = userEvent.setup();
    wrap(<ApplyWizard />);
    await user.type(screen.getByLabelText(/^full name/i), "Alice");
    await user.type(screen.getByLabelText(/^email/i), "alice@example.com");
    await user.type(screen.getByLabelText(/phone/i), "12345678");
    await user.click(screen.getByText(/continue/i));
    await user.type(await screen.findByLabelText(/^full name/i), "Bob");
    await user.type(screen.getByLabelText(/date of birth/i), "2018-04-12");
    await user.click(screen.getByText(/continue/i));
    await user.selectOptions(await screen.findByLabelText(/grade applying for/i), "Grade 3");
    await user.click(screen.getByText(/continue/i));
    await screen.findByRole("heading", { name: /^documents$/i });
    await user.click(screen.getByText(/continue/i));
    await screen.findByText(/review & submit/i);
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByText(/submit application/i));
    await screen.findByText(/boom/i);
  }, 20000);
});

describe("GradeFitQuiz — additional coverage", () => {
  it("Retake button resets state", async () => {
    const user = userEvent.setup({ delay: null });
    render(<GradeFitQuiz />);
    for (let i = 0; i < 5; i++) {
      const buttons = screen.getAllByRole("button");
      const choice = buttons.find((b) => /5–6|letters|counting|kinder|asap/i.test(b.textContent || ""));
      if (choice) await user.click(choice);
      await new Promise((r) => setTimeout(r, 250));
    }
    await screen.findByText(/likely best fit/i);
    await user.click(screen.getByText(/retake quiz/i));
    expect(screen.getByText(/question 1 of 5/i)).toBeInTheDocument();
  });
});

describe("OpenHouseModal — additional coverage", () => {
  it("Escape key dismisses the modal", () => {
    vi.useFakeTimers();
    render(<OpenHouseModal />);
    act(() => vi.advanceTimersByTime(15_000));
    expect(screen.getByText(/see sssgs/i)).toBeInTheDocument();
    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(screen.queryByText(/see sssgs in motion/i)).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});
