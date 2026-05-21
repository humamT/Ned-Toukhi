const DEV_API_BASE_URL = "https://dev.nedtoukhi.com/api/v1";
const PROD_API_BASE_URL = "/api/v1";

function trimTrailingSlash(value) {
  return value.replace(/\/+$/, "");
}

export function resolveApiBaseUrl(env = import.meta.env) {
  const configuredBaseUrl = env?.VITE_API_BASE_URL?.trim();
  if (configuredBaseUrl) return trimTrailingSlash(configuredBaseUrl);

  // Production uses the Worker same-origin proxy because the API does not
  // send browser CORS headers for direct cross-origin requests.
  return env?.DEV ? DEV_API_BASE_URL : PROD_API_BASE_URL;
}

const API_BASE_URL = resolveApiBaseUrl();

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
  const json = await fetchJson(`${API_BASE_URL}/gallery`);
  return normalizeJsonBody(json);
}

