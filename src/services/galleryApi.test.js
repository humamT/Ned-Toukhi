import { afterEach, expect, test, vi } from "vitest";
import { getGalleryProjects } from "./galleryApi";

afterEach(() => {
  vi.restoreAllMocks();
});

test("loads gallery projects through the same-origin API proxy by default", async () => {
  const projects = [{ id: 1, title: "Identity" }];
  const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify({ data: projects }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }),
  );

  await expect(getGalleryProjects()).resolves.toEqual(projects);

  expect(fetchMock).toHaveBeenCalledWith("/api/v1/gallery", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
});
