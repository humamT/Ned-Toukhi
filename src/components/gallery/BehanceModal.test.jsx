import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import BehanceModal, { getSafeBehanceEmbedUrl } from "./BehanceModal";

describe("getSafeBehanceEmbedUrl", () => {
  test("allows Behance project embed URLs", () => {
    const url = "https://www.behance.net/embed/project/81800407?iframe=1";

    expect(getSafeBehanceEmbedUrl(url)).toBe(url);
  });

  test("rejects non-Behance or non-embed URLs", () => {
    expect(getSafeBehanceEmbedUrl("https://evil.example/embed/project/81800407")).toBe("");
    expect(getSafeBehanceEmbedUrl("https://www.behance.net/gallery/81800407/project")).toBe("");
    expect(getSafeBehanceEmbedUrl("javascript:alert(document.domain)")).toBe("");
  });
});

describe("BehanceModal", () => {
  test("does not frame an unsafe embed URL", () => {
    render(<BehanceModal open embedUrl="https://evil.example/phish" onClose={() => {}} />);

    expect(screen.queryByTitle("Behance project")).not.toBeInTheDocument();
  });
});
