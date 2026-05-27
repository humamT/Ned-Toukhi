import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the header navigation", () => {
  render(<App />);
  expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
});

test("home contact call to action links to the contact page", () => {
  window.history.pushState({}, "", "/");

  const { container } = render(<App />);
  const contactLink = container.querySelector(
    '.stage-content__stage-7 .contact-btn a[href="/contact"]'
  );

  expect(contactLink).toBeInTheDocument();
  expect(contactLink).toHaveTextContent("Contact");
});

test("about contact call to action links to the contact page", () => {
  window.history.pushState({}, "", "/about");

  const { container } = render(<App />);
  const contactLink = container.querySelector(
    '.contact-form-about-page .contact-btn a[href="/contact"]'
  );

  expect(contactLink).toBeInTheDocument();
  expect(contactLink).toHaveTextContent("Contact");
});

