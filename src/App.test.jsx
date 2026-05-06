import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the header navigation", () => {
  render(<App />);
  expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
});

test("home calls to action navigate to their target routes", () => {
  render(<App />);

  expect(screen.getByRole("link", { name: /shop now/i })).toHaveAttribute("href", "/store");
  expect(screen.getAllByRole("link", { name: /explore now/i }).map((link) => link.getAttribute("href"))).toEqual([
    "/gallery",
    "/gallery/illustrations",
  ]);
  expect(screen.getByRole("link", { name: /first click/i })).toHaveAttribute("href", "/quotations");
  expect(screen.getAllByRole("link", { name: /contact/i }).some((link) => link.getAttribute("href") === "/contact")).toBe(true);
});

