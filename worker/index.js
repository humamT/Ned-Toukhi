const API_PREFIX = "/api/v1";
const DEFAULT_API_UPSTREAM_ORIGIN = "https://dev.nedtoukhi.com";
const PROXY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
const FORWARDED_REQUEST_HEADERS = [
  "accept",
  "accept-language",
  "content-type",
  "if-modified-since",
  "if-none-match",
];

function isApiRequest(pathname) {
  return pathname === API_PREFIX || pathname.startsWith(`${API_PREFIX}/`);
}

function getUpstreamOrigin(env) {
  return String(env?.API_UPSTREAM_ORIGIN || DEFAULT_API_UPSTREAM_ORIGIN).replace(/\/+$/, "");
}

function buildUpstreamHeaders(request) {
  const headers = new Headers();

  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  return headers;
}

async function proxyApiRequest(request, env) {
  if (!PROXY_METHODS.has(request.method)) {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: Array.from(PROXY_METHODS).join(", ") },
    });
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(incomingUrl.pathname + incomingUrl.search, getUpstreamOrigin(env));

  try {
    const upstreamResponse = await fetch(
      new Request(upstreamUrl, {
        method: request.method,
        headers: buildUpstreamHeaders(request),
        redirect: "manual",
      }),
    );

    const responseHeaders = new Headers(upstreamResponse.headers);
    responseHeaders.delete("set-cookie");
    responseHeaders.delete("set-cookie2");

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders,
    });
  } catch {
    return Response.json(
      { error: "Gallery API unavailable" },
      {
        status: 502,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (isApiRequest(url.pathname)) {
      return proxyApiRequest(request, env);
    }

    if (url.pathname.startsWith("/api/")) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },
};
