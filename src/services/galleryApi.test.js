import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

async function loadGalleryApi() {
  vi.resetModules();
  return import("./galleryApi.js");
}

describe("gallery API client", () => {
  beforeEach(() => {
    global.fetch = vi.fn(async () => ({
      ok: true,
      json: async () => ({ data: [] }),
    }));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    delete global.fetch;
  });

  test("uses the same-origin API proxy by default", async () => {
    const { getGalleryProjects } = await loadGalleryApi();

    await getGalleryProjects();

    expect(global.fetch).toHaveBeenCalledWith("/api/v1/gallery", expect.objectContaining({
      credentials: "same-origin",
    }));
  });

  test("uses a configured API base URL", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://dev.nedtoukhi.com/api/v1");
    const { getGalleryProjects } = await loadGalleryApi();

    await getGalleryProjects();

    expect(global.fetch).toHaveBeenCalledWith("https://dev.nedtoukhi.com/api/v1/gallery", expect.any(Object));
  });

  test("normalizes trailing slashes from the configured API base URL", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://dev.nedtoukhi.com/api/v1/");
    const { getGalleryProjects } = await loadGalleryApi();

    await getGalleryProjects();

    expect(global.fetch).toHaveBeenCalledWith("https://dev.nedtoukhi.com/api/v1/gallery", expect.any(Object));
  });
});
