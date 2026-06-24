const DEFAULT_API_UPSTREAM_ORIGIN = "https://dev.nedtoukhi.com";
const PUBLIC_API_PATHS = new Set(["/api/v1/gallery"]);

export function getApiUpstreamOrigin(env) {
  const origin = env?.API_UPSTREAM_ORIGIN || DEFAULT_API_UPSTREAM_ORIGIN;
  const url = new URL(origin);

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("API_UPSTREAM_ORIGIN must be an HTTP(S) origin");
  }

  return url.origin;
}

export function createApiProxyRequest(request, upstreamOrigin) {
  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(`${incomingUrl.pathname}${incomingUrl.search}`, upstreamOrigin);
  const headers = new Headers();

  headers.set("Accept", request.headers.get("Accept") || "application/json");

  return new Request(upstreamUrl.toString(), {
    method: request.method,
    headers,
    redirect: "manual",
  });
}

function isPublicApiRead(request, url) {
  return (request.method === "GET" || request.method === "HEAD") && PUBLIC_API_PATHS.has(url.pathname);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      if (!isPublicApiRead(request, url)) {
        return new Response("Not found", { status: 404 });
      }

      return fetch(createApiProxyRequest(request, getApiUpstreamOrigin(env)));
    }

    return env.ASSETS.fetch(request);
  },
};
