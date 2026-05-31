const DEFAULT_API_UPSTREAM_ORIGIN = "https://dev.nedtoukhi.com";
const PUBLIC_GALLERY_PATH = "/api/v1/gallery";

const HOP_BY_HOP_HEADERS = [
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
];

function stripRequestHeaders(headers) {
  const nextHeaders = new Headers(headers);

  nextHeaders.delete("host");
  nextHeaders.delete("cookie");
  nextHeaders.delete("authorization");

  for (const header of HOP_BY_HOP_HEADERS) {
    nextHeaders.delete(header);
  }

  return nextHeaders;
}

function stripResponseHeaders(headers) {
  const nextHeaders = new Headers(headers);

  nextHeaders.delete("set-cookie");
  nextHeaders.delete("set-cookie2");

  for (const header of HOP_BY_HOP_HEADERS) {
    nextHeaders.delete(header);
  }

  return nextHeaders;
}

function getApiUpstreamOrigin(env) {
  return env.API_UPSTREAM_ORIGIN || DEFAULT_API_UPSTREAM_ORIGIN;
}

async function proxyGalleryRequest(request, env) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        Allow: "GET, HEAD",
      },
    });
  }

  const requestUrl = new URL(request.url);
  const upstreamUrl = new URL(requestUrl.pathname + requestUrl.search, getApiUpstreamOrigin(env));

  const upstreamResponse = await fetch(
    new Request(upstreamUrl, {
      method: request.method,
      headers: stripRequestHeaders(request.headers),
      redirect: "follow",
    }),
  );

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: stripResponseHeaders(upstreamResponse.headers),
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === PUBLIC_GALLERY_PATH) {
      return proxyGalleryRequest(request, env);
    }

    if (url.pathname.startsWith("/api/")) {
      return new Response("Not Found", { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },
};
