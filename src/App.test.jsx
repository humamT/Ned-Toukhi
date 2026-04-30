import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the header navigation on non-home pages", async () => {
  window.history.pushState({}, "", "/about");

  render(<App />);

  expect(await screen.findByRole("navigation", { name: /primary/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
});

