import { act, fireEvent, render, screen } from "@testing-library/react";
import QuotationsPage from "./Quotations.jsx";

test("rapid next clicks do not skip quotation questions", () => {
  vi.useFakeTimers();

  try {
    render(<QuotationsPage />);

    fireEvent.click(screen.getByRole("option", { name: /Europe/i }));

    const nextButton = screen.getByRole("button", { name: /next question/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(
      screen.getByRole("heading", { name: /How big is your company\?/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /What is the service/i })
    ).not.toBeInTheDocument();
  } finally {
    vi.useRealTimers();
  }
});
