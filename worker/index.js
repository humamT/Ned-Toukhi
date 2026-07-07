const DEFAULT_API_UPSTREAM_ORIGIN = "https://dev.nedtoukhi.com";
const PUBLIC_API_ROUTES = new Set(["/api/v1/gallery"]);

function getUpstreamOrigin(env) {
  const configuredOrigin = env.API_UPSTREAM_ORIGIN || DEFAULT_API_UPSTREAM_ORIGIN;
  return new URL(configuredOrigin).origin;
}

async function proxyPublicApi(request, url, env) {
  if (!PUBLIC_API_ROUTES.has(url.pathname)) {
    return new Response("Not found", { status: 404 });
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", {
      status: 405,
      headers: { Allow: "GET, HEAD" },
    });
  }

  const upstreamUrl = new URL(`${url.pathname}${url.search}`, getUpstreamOrigin(env));
  const upstreamHeaders = new Headers();
  const accept = request.headers.get("Accept");
  if (accept) upstreamHeaders.set("Accept", accept);

  return fetch(
    new Request(upstreamUrl, {
      method: request.method,
      headers: upstreamHeaders,
      redirect: "manual",
    })
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      return proxyPublicApi(request, url, env);
    }

    return env.ASSETS.fetch(request);
  },
};
