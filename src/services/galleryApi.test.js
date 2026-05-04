import { afterEach, describe, expect, it, vi } from "vitest";
import { getGalleryApiBaseUrl, getGalleryProjects } from "./galleryApi";

describe("galleryApi", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("uses the configured API base URL without trailing slashes", () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://www.nedtoukhi.com/api/v1///");

    expect(getGalleryApiBaseUrl()).toBe("https://www.nedtoukhi.com/api/v1");
  });

  it("fetches gallery projects from the configured API origin", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://www.nedtoukhi.com/api/v1");
    const fetchMock = vi.fn(async () => ({
      ok: true,
      json: async () => ({ data: [{ id: 1, title: "Project" }] }),
    }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(getGalleryProjects()).resolves.toEqual([{ id: 1, title: "Project" }]);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://www.nedtoukhi.com/api/v1/gallery",
      expect.objectContaining({
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
      }),
    );
  });
});
