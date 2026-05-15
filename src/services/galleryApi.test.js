import { afterEach, describe, expect, test, vi } from "vitest";
import { getGalleryApiBaseUrl } from "./galleryApi";

describe("getGalleryApiBaseUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test("defaults to the same-origin API path", () => {
    vi.stubEnv("VITE_API_BASE_URL", "");

    expect(getGalleryApiBaseUrl()).toBe("/api/v1");
  });

  test("uses the configured base URL without trailing slashes", () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://www.nedtoukhi.com/api/v1///");

    expect(getGalleryApiBaseUrl()).toBe("https://www.nedtoukhi.com/api/v1");
  });
});
