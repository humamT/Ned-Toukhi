import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import AboutPage from "./pages/about/About";

test("renders the header navigation", () => {
  render(<App />);
  expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
});

test("about contact call-to-action links to the contact page", () => {
  render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>
  );

  const contactLink = screen.getByRole("link", { name: /^contact$/i });
  expect(contactLink).toHaveAttribute("href", "/contact");
});
