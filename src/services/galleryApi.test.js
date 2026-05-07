import { afterEach, describe, expect, test, vi } from "vitest";
import { getGalleryApiBaseUrl } from "./galleryApi";

describe("getGalleryApiBaseUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test("uses the configured base URL without trailing slashes", () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://www.nedtoukhi.com/api/v1///");

    expect(getGalleryApiBaseUrl()).toBe("https://www.nedtoukhi.com/api/v1");
  });

  test("falls back to the dev API when no override is configured", () => {
    vi.stubEnv("VITE_API_BASE_URL", "");

    expect(getGalleryApiBaseUrl()).toBe("https://dev.nedtoukhi.com/api/v1");
  });
});
