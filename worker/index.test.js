import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import worker from "./index";

describe("worker API proxy", () => {
  const env = {
    API_UPSTREAM_ORIGIN: "https://dev.nedtoukhi.com",
    ASSETS: {
      fetch: vi.fn().mockResolvedValue(new Response("asset")),
    },
  };

  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ data: [] }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": "session=upstream",
          },
        }),
      ),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("proxies API requests to the upstream host", async () => {
    await worker.fetch(
      new Request("https://portfolio.example/api/v1/gallery?limit=10", {
        headers: {
          Accept: "application/json",
          Cookie: "portfolio_session=secret",
        },
      }),
      env,
    );

    const upstreamRequest = fetch.mock.calls[0][0];

    expect(upstreamRequest.url).toBe("https://dev.nedtoukhi.com/api/v1/gallery?limit=10");
    expect(upstreamRequest.headers.get("accept")).toBe("application/json");
    expect(upstreamRequest.headers.has("cookie")).toBe(false);
  });

  it("does not forward upstream cookies onto the portfolio domain", async () => {
    const response = await worker.fetch(new Request("https://portfolio.example/api/v1/gallery"), env);

    expect(response.headers.get("set-cookie")).toBeNull();
  });

  it("serves non-API requests from static assets", async () => {
    await worker.fetch(new Request("https://portfolio.example/gallery"), env);

    expect(env.ASSETS.fetch).toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });
});
