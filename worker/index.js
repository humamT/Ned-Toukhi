const DEFAULT_API_UPSTREAM_ORIGIN = "https://dev.nedtoukhi.com";

function getApiUpstreamOrigin(env) {
  const origin = env?.API_UPSTREAM_ORIGIN || DEFAULT_API_UPSTREAM_ORIGIN;
  const url = new URL(origin);

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("API_UPSTREAM_ORIGIN must be an HTTP(S) origin");
  }

  return url.origin;
}

function createApiProxyRequest(request, upstreamOrigin) {
  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(`${incomingUrl.pathname}${incomingUrl.search}`, upstreamOrigin);
  const headers = new Headers(request.headers);
  headers.delete("host");

  const init = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body;
  }

  return new Request(upstreamUrl.toString(), init);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      const upstreamOrigin = getApiUpstreamOrigin(env);
      return fetch(createApiProxyRequest(request, upstreamOrigin));
    }

    return env.ASSETS.fetch(request);
  },
};
