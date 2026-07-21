import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import QuotationsPage from "./Quotations.jsx";

function finishTransition() {
  act(() => {
    vi.advanceTimersByTime(240);
    vi.advanceTimersByTime(16);
  });
}

function answerAndContinue(answer) {
  fireEvent.click(screen.getByRole("option", { name: answer }));
  fireEvent.click(screen.getByRole("button", { name: /next question|see result/i }));
  finishTransition();
}

describe("quotation navigation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("requestAnimationFrame", (callback) =>
      window.setTimeout(() => callback(performance.now()), 16)
    );
    vi.stubGlobal("cancelAnimationFrame", (id) => window.clearTimeout(id));
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  test("ignores repeated next clicks during a panel transition", () => {
    render(<QuotationsPage />);

    fireEvent.click(screen.getByRole("option", { name: "Europe" }));
    const nextButton = screen.getByRole("button", { name: "Next question" });

    act(() => {
      nextButton.click();
      nextButton.click();
    });
    finishTransition();

    expect(
      screen.getByRole("heading", { name: "How big is your company?" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        name: "What is the service that you're looking for?",
      })
    ).not.toBeInTheDocument();
  });

  test("cancels a pending result transition when restarting", () => {
    render(<QuotationsPage />);

    answerAndContinue("Europe");
    answerAndContinue("Above 50 employees");
    answerAndContinue("Full visual identity service");
    answerAndContinue("About 40 working days");

    fireEvent.click(
      screen.getByRole("button", {
        name: "Yes, I would like to write a message",
      })
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Start from the beginning" })
    );
    finishTransition();

    expect(
      screen.getByRole("heading", { name: "What is your location?" })
    ).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Name*")).not.toBeInTheDocument();
  });
});
