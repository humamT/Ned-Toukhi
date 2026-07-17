import { act, fireEvent, render, screen } from "@testing-library/react";
import QuotationsPage from "./Quotations.jsx";

describe("QuotationsPage", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test("ignores repeated next clicks during the panel transition", () => {
    vi.useFakeTimers();
    render(<QuotationsPage />);

    fireEvent.click(screen.getByRole("option", { name: "Europe" }));

    const nextButton = screen.getByRole("button", { name: /next question/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(
      screen.getByRole("heading", { name: /how big is your company/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        name: /what is the service that you're looking for/i,
      })
    ).not.toBeInTheDocument();
  });
});
