import { afterEach, expect, test, vi } from "vitest";
import worker from "./index";

afterEach(() => {
  vi.restoreAllMocks();
});

test("proxies public gallery reads to the upstream API without client credentials", async () => {
  const assetsFetch = vi.fn();
  const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify([{ id: 1 }]), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "set-cookie": "session=upstream",
      },
    }),
  );

  const response = await worker.fetch(
    new Request("https://site.example/api/v1/gallery?limit=20", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer client-token",
        Cookie: "session=client",
      },
    }),
    {
      ASSETS: {
        fetch: assetsFetch,
      },
      API_UPSTREAM_ORIGIN: "https://dev.nedtoukhi.com",
    },
  );

  const upstreamRequest = fetchMock.mock.calls[0][0];

  expect(upstreamRequest.url).toBe("https://dev.nedtoukhi.com/api/v1/gallery?limit=20");
  expect(upstreamRequest.method).toBe("GET");
  expect(upstreamRequest.headers.get("accept")).toBe("application/json");
  expect(upstreamRequest.headers.has("authorization")).toBe(false);
  expect(upstreamRequest.headers.has("cookie")).toBe(false);
  expect(response.status).toBe(200);
  expect(response.headers.has("set-cookie")).toBe(false);
  expect(await response.json()).toEqual([{ id: 1 }]);
  expect(assetsFetch).not.toHaveBeenCalled();
});

test("rejects non-read gallery API requests", async () => {
  const fetchMock = vi.spyOn(globalThis, "fetch");

  const response = await worker.fetch(
    new Request("https://site.example/api/v1/gallery", {
      method: "POST",
    }),
    {
      ASSETS: {
        fetch: vi.fn(),
      },
    },
  );

  expect(response.status).toBe(405);
  expect(response.headers.get("allow")).toBe("GET, HEAD");
  expect(fetchMock).not.toHaveBeenCalled();
});

test("serves static assets for non-API requests", async () => {
  const assetResponse = new Response("<!doctype html>", {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
  const assetsFetch = vi.fn().mockResolvedValue(assetResponse);

  const request = new Request("https://site.example/about");
  const response = await worker.fetch(request, {
    ASSETS: {
      fetch: assetsFetch,
    },
  });

  expect(response).toBe(assetResponse);
  expect(assetsFetch).toHaveBeenCalledWith(request);
});
