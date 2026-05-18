import { afterEach, describe, expect, test, vi } from "vitest";

async function loadApi() {
  vi.resetModules();
  return import("./galleryApi");
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("gallery API client", () => {
  test("uses the same-origin API proxy by default", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { getGalleryProjects } = await loadApi();
    await getGalleryProjects();

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/v1/gallery",
      expect.objectContaining({ method: "GET" }),
    );
  });

  test("uses VITE_API_BASE_URL when configured", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.example.test/custom");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { getGalleryProjects } = await loadApi();
    await getGalleryProjects();

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.test/custom/gallery",
      expect.objectContaining({ method: "GET" }),
    );
  });

  test("normalizes trailing slashes in VITE_API_BASE_URL", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.example.test/custom///");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { getGalleryProjects } = await loadApi();
    await getGalleryProjects();

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.test/custom/gallery",
      expect.objectContaining({ method: "GET" }),
    );
  });
});
