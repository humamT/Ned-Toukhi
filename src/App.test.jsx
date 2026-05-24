import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the header navigation without IntersectionObserver", () => {
  const originalIntersectionObserver = window.IntersectionObserver;
  Reflect.deleteProperty(window, "IntersectionObserver");

  try {
    render(<App />);
    expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
  } finally {
    if (originalIntersectionObserver) {
      window.IntersectionObserver = originalIntersectionObserver;
    }
  }
});

