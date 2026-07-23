import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import App from "./App";

const originalIntersectionObserver = globalThis.IntersectionObserver;

beforeEach(() => {
  Reflect.deleteProperty(globalThis, "IntersectionObserver");
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  if (originalIntersectionObserver) {
    globalThis.IntersectionObserver = originalIntersectionObserver;
  } else {
    Reflect.deleteProperty(globalThis, "IntersectionObserver");
  }
});

test("renders the header navigation", () => {
  render(<App />);
  expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
});

