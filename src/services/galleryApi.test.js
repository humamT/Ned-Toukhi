import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

describe("gallery API client", () => {
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
    vi.resetModules();
  });

  test("uses the same-origin API route by default", async () => {
    const { getGalleryProjects } = await import("./galleryApi");

    await getGalleryProjects();

    expect(fetch).toHaveBeenCalledWith("/api/v1/gallery", expect.any(Object));
  });

  test("allows deployments to override the API base URL", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.example.test/v1");
    const { getGalleryProjects } = await import("./galleryApi");

    await getGalleryProjects();

    expect(fetch).toHaveBeenCalledWith("https://api.example.test/v1/gallery", expect.any(Object));
  });
});
