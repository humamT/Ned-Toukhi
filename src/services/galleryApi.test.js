import { afterEach, expect, test, vi } from "vitest";
import { getGalleryProjects } from "./galleryApi";

afterEach(() => {
  vi.unstubAllGlobals();
});

test("fetches gallery projects from the same-origin API proxy by default", async () => {
  const fetchMock = vi.fn(async () => ({
    ok: true,
    json: async () => ({ data: [] }),
  }));
  vi.stubGlobal("fetch", fetchMock);

  await getGalleryProjects();

  expect(fetchMock).toHaveBeenCalledWith(
    "/api/v1/gallery",
    expect.objectContaining({
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
  );
});
