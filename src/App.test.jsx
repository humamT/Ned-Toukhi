import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the header navigation", () => {
  render(<App />);
  expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
});

