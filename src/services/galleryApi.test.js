import { afterEach, expect, test, vi } from "vitest";
import { getGalleryProjects } from "./galleryApi";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

function mockSuccessfulFetch() {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue({ data: [] }),
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

test("uses the configured gallery API base URL", async () => {
  vi.stubEnv("VITE_API_BASE_URL", "https://api.example.test/api/v1");
  const fetchMock = mockSuccessfulFetch();

  await getGalleryProjects();

  expect(fetchMock).toHaveBeenCalledWith(
    "https://api.example.test/api/v1/gallery",
    expect.objectContaining({
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    })
  );
});

test("falls back to the dev API when no base URL is configured", async () => {
  vi.stubEnv("VITE_API_BASE_URL", "");
  const fetchMock = mockSuccessfulFetch();

  await getGalleryProjects();

  expect(fetchMock).toHaveBeenCalledWith(
    "https://dev.nedtoukhi.com/api/v1/gallery",
    expect.any(Object)
  );
});
