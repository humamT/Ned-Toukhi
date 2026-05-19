import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const jsonResponse = (body) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

describe("galleryApi", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ data: [] })));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("uses the same-origin API path for production builds", async () => {
    vi.stubEnv("DEV", false);

    const { getGalleryProjects } = await import("./galleryApi");

    await getGalleryProjects();

    expect(fetch).toHaveBeenCalledWith(
      "/api/v1/gallery",
      expect.objectContaining({
        method: "GET",
        credentials: "include",
      }),
    );
  });

  it("uses the configured API base URL and normalizes trailing slashes", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.example.test/api/v1/");

    const { getGalleryProjects } = await import("./galleryApi");

    await getGalleryProjects();

    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.test/api/v1/gallery",
      expect.any(Object),
    );
  });

  it("unwraps API responses that are returned in a data envelope", async () => {
    fetch.mockResolvedValueOnce(jsonResponse({ data: [{ id: 1, title: "Project" }] }));

    const { getGalleryProjects } = await import("./galleryApi");

    await expect(getGalleryProjects()).resolves.toEqual([{ id: 1, title: "Project" }]);
  });
});
