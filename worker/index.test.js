import { afterEach, describe, expect, it, vi } from "vitest";
import worker from "./index";

function createEnv(overrides = {}) {
  return {
    ASSETS: {
      fetch: vi.fn(async () => new Response("asset")),
    },
    ...overrides,
  };
}

describe("worker API proxy", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("proxies the public gallery route through the configured upstream without client cookies", async () => {
    let upstreamRequest;
    const fetchMock = vi.fn(async (request) => {
      upstreamRequest = request;
      return new Response("[]", { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);

    const response = await worker.fetch(
      new Request("https://site.test/api/v1/gallery?limit=10", {
        headers: {
          Accept: "application/json",
          Cookie: "session=secret",
        },
      }),
      createEnv({ API_UPSTREAM_ORIGIN: "https://api.example/base" })
    );

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(upstreamRequest.url).toBe("https://api.example/api/v1/gallery?limit=10");
    expect(upstreamRequest.method).toBe("GET");
    expect(upstreamRequest.headers.get("Accept")).toBe("application/json");
    expect(upstreamRequest.headers.get("Cookie")).toBeNull();
    expect(upstreamRequest.headers.get("Host")).toBeNull();
  });

  it("rejects unsupported API routes instead of acting as an open proxy", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await worker.fetch(
      new Request("https://site.test/api/v1/users"),
      createEnv()
    );

    expect(response.status).toBe(404);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("serves static assets for non-API routes", async () => {
    const assetResponse = new Response("asset", { status: 200 });
    const assetsFetch = vi.fn(async () => assetResponse);
    const env = createEnv({ ASSETS: { fetch: assetsFetch } });
    const request = new Request("https://site.test/gallery");

    const response = await worker.fetch(request, env);

    expect(response).toBe(assetResponse);
    expect(assetsFetch).toHaveBeenCalledWith(request);
  });
});
