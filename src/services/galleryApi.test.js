import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

async function importApiWithEnv(apiBaseUrl) {
  vi.resetModules();
  if (apiBaseUrl === undefined) {
    vi.unstubAllEnvs();
  } else {
    vi.stubEnv("VITE_API_BASE_URL", apiBaseUrl);
  }
  return import("./galleryApi.js");
}

describe("galleryApi", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ data: [] }),
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  test("uses the same-origin API path by default", async () => {
    const { getGalleryProjects } = await importApiWithEnv(undefined);

    await getGalleryProjects();

    expect(fetch).toHaveBeenCalledWith("/api/v1/gallery", expect.any(Object));
  });

  test("allows deployments to override the API base URL", async () => {
    const { getGalleryProjects } = await importApiWithEnv("https://api.example.com/v1");

    await getGalleryProjects();

    expect(fetch).toHaveBeenCalledWith("https://api.example.com/v1/gallery", expect.any(Object));
  });

  test("normalizes trailing slashes in the configured API base URL", async () => {
    const { getGalleryApiBaseUrl, getGalleryProjects } = await importApiWithEnv("https://api.example.com/v1///");

    expect(getGalleryApiBaseUrl()).toBe("https://api.example.com/v1");

    await getGalleryProjects();

    expect(fetch).toHaveBeenCalledWith("https://api.example.com/v1/gallery", expect.any(Object));
  });
});
