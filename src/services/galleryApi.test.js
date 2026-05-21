import { afterEach, describe, expect, test, vi } from "vitest";
import { resolveApiBaseUrl } from "./galleryApi";

describe("resolveApiBaseUrl", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("uses the same-origin Worker proxy by default in production", () => {
    expect(resolveApiBaseUrl({ DEV: false })).toBe("/api/v1");
  });

  test("keeps local development pointed at the remote API", () => {
    expect(resolveApiBaseUrl({ DEV: true })).toBe("https://dev.nedtoukhi.com/api/v1");
  });

  test("allows explicit API base URL overrides", () => {
    expect(resolveApiBaseUrl({ DEV: false, VITE_API_BASE_URL: "https://api.example.test/v1/" })).toBe(
      "https://api.example.test/v1"
    );
  });
});
