import { describe, expect, it } from "vitest";
import { getApiBaseUrl } from "./galleryApi";

describe("getApiBaseUrl", () => {
  it("uses the same-origin API route by default", () => {
    expect(getApiBaseUrl({})).toBe("/api/v1");
  });

  it("allows an explicit API override without duplicating slashes", () => {
    expect(getApiBaseUrl({ VITE_API_BASE_URL: "https://example.com/api/v1///" })).toBe(
      "https://example.com/api/v1"
    );
  });
});
