import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import QuotationsPage from "./Quotations.jsx";

describe("quotation navigation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test("ignores repeated next clicks during a panel transition", () => {
    render(<QuotationsPage />);

    fireEvent.click(screen.getByRole("option", { name: "Europe" }));

    const nextButton = screen.getByRole("button", { name: "Next question" });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(nextButton).toBeDisabled();

    act(() => {
      vi.advanceTimersByTime(240);
    });

    expect(
      screen.getByRole("heading", { name: "How big is your company?" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        name: "What is the service that you're looking for?",
      })
    ).not.toBeInTheDocument();
  });
});
