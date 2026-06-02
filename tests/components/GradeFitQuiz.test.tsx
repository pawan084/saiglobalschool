import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GradeFitQuiz from "@/app/grade-fit/GradeFitQuiz";

describe("GradeFitQuiz", () => {
  it("starts at question 1 of 5", () => {
    render(<GradeFitQuiz />);
    expect(screen.getByText(/question 1 of 5/i)).toBeInTheDocument();
  });

  it("advances and completes the quiz", async () => {
    const user = userEvent.setup({ delay: null });
    render(<GradeFitQuiz />);
    // Answer all 5 questions by clicking the first option each time
    for (let i = 0; i < 5; i++) {
      const buttons = screen.getAllByRole("button");
      // first button could be Back; pick options under "Question" container
      // The choices have classes; first text choice
      const choice = buttons.find((b) => /5–6|letters|counting|kinder|asap/i.test(b.textContent || ""));
      if (choice) await user.click(choice);
      // small wait — the component has a 200ms transition between Qs
      await new Promise((r) => setTimeout(r, 250));
    }
    // result appears
    expect(await screen.findByText(/likely best fit/i)).toBeInTheDocument();
  });

  it("Back goes to the previous question", async () => {
    const user = userEvent.setup({ delay: null });
    render(<GradeFitQuiz />);
    const firstOption = screen.getAllByRole("button").find((b) => /5–6/i.test(b.textContent || ""));
    if (firstOption) await user.click(firstOption);
    await new Promise((r) => setTimeout(r, 250));
    expect(screen.getByText(/question 2 of 5/i)).toBeInTheDocument();
    await user.click(screen.getByText(/^back$/i));
    expect(screen.getByText(/question 1 of 5/i)).toBeInTheDocument();
  });
});
