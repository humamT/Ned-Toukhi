import { afterEach, describe, expect, it, vi } from "vitest";
import { getGalleryProjects } from "./galleryApi";

describe("galleryApi", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("uses the same-origin gallery endpoint by default", async () => {
    const rows = [{ id: 1, title: "Project" }];
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: rows }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(getGalleryProjects()).resolves.toEqual(rows);

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/v1/gallery",
      expect.objectContaining({
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
      })
    );
  });
});
