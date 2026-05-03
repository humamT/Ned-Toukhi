import { render, screen } from "@testing-library/react";
import BehanceModal, { getSafeBehanceEmbedUrl } from "./BehanceModal";

describe("getSafeBehanceEmbedUrl", () => {
  it("allows Behance project embed URLs", () => {
    expect(getSafeBehanceEmbedUrl("https://www.behance.net/embed/project/81800407?ilo0=1")).toBe(
      "https://www.behance.net/embed/project/81800407?ilo0=1"
    );
  });

  it("rejects non-Behance URLs", () => {
    expect(getSafeBehanceEmbedUrl("https://evil.example/embed/project/81800407")).toBe("");
  });

  it("rejects non-embed Behance URLs", () => {
    expect(getSafeBehanceEmbedUrl("https://www.behance.net/nedtoukhi")).toBe("");
  });
});

describe("BehanceModal", () => {
  it("does not render an iframe for unsafe embed URLs", () => {
    render(<BehanceModal open embedUrl="https://evil.example/embed/project/81800407" onClose={() => {}} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.queryByTitle("Behance project")).not.toBeInTheDocument();
  });
});
