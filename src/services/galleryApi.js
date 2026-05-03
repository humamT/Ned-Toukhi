// IMPORTANT:
// Your API currently does not allow cross-origin browser requests (no CORS headers).
// So in production, the frontend must call an API that is reachable on the SAME origin
// (e.g. `https://beta.nedtoukhi.com/api/v1/...` via a reverse-proxy to `dev.nedtoukhi.com`).
const DEFAULT_API_BASE_URL = "/api/v1";

export function getApiBaseUrl(env = import.meta.env) {
  const configuredBaseUrl = env?.VITE_API_BASE_URL;
  if (!configuredBaseUrl) return DEFAULT_API_BASE_URL;

  return String(configuredBaseUrl).replace(/\/+$/, "");
}

function normalizeJsonBody(value) {
  // Some endpoints may return `{ success, data }`; others return raw arrays.
  if (value && typeof value === "object" && "data" in value) return value.data;
  return value;
}

async function fetchJson(url) {
  const res = await fetch(url, {
    method: "GET",
    // Keep cookies enabled; harmless for public endpoints and needed if any
    // endpoint remains protected in some environments.
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed (${res.status}): ${text || res.statusText}`);
  }

  return res.json();
}

export async function getGalleryProjects() {
  const json = await fetchJson(`${getApiBaseUrl()}/gallery`);
  return normalizeJsonBody(json);
}

