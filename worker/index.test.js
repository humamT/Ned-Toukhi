import { afterEach, describe, expect, test, vi } from "vitest";
import worker from "./index";

describe("worker", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("proxies public gallery API reads to the configured upstream origin", async () => {
    const upstreamFetch = vi.fn(
      async () => new Response(JSON.stringify([{ id: 1 }]), {
        headers: { "content-type": "application/json" },
      })
    );
    vi.stubGlobal("fetch", upstreamFetch);

    const assetsFetch = vi.fn();
    const response = await worker.fetch(
      new Request("https://portfolio.example/api/v1/gallery?category=featured", {
        headers: {
          accept: "application/json",
          cookie: "session=private",
          host: "portfolio.example",
        },
      }),
      {
        API_UPSTREAM_ORIGIN: "https://api.example.test",
        ASSETS: { fetch: assetsFetch },
      }
    );

    expect(response.ok).toBe(true);
    expect(assetsFetch).not.toHaveBeenCalled();
    expect(upstreamFetch).toHaveBeenCalledTimes(1);

    const proxiedRequest = upstreamFetch.mock.calls[0][0];
    expect(proxiedRequest.url).toBe("https://api.example.test/api/v1/gallery?category=featured");
    expect(proxiedRequest.headers.get("accept")).toBe("application/json");
    expect(proxiedRequest.headers.get("cookie")).toBeNull();
    expect(proxiedRequest.headers.get("host")).toBeNull();
  });

  test("does not proxy non-public API paths", async () => {
    const upstreamFetch = vi.fn();
    vi.stubGlobal("fetch", upstreamFetch);

    const assetsFetch = vi.fn();
    const response = await worker.fetch(new Request("https://portfolio.example/api/v1/admin"), {
      ASSETS: { fetch: assetsFetch },
    });

    expect(response.status).toBe(404);
    expect(assetsFetch).not.toHaveBeenCalled();
    expect(upstreamFetch).not.toHaveBeenCalled();
  });

  test("serves non-API routes from static assets", async () => {
    const upstreamFetch = vi.fn();
    vi.stubGlobal("fetch", upstreamFetch);

    const assetResponse = new Response("<!doctype html>", {
      headers: { "content-type": "text/html" },
    });
    const assetsFetch = vi.fn(async () => assetResponse);

    const response = await worker.fetch(new Request("https://portfolio.example/gallery"), {
      ASSETS: { fetch: assetsFetch },
    });

    expect(response).toBe(assetResponse);
    expect(assetsFetch).toHaveBeenCalledTimes(1);
    expect(upstreamFetch).not.toHaveBeenCalled();
  });
});
