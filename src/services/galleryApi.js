const DEFAULT_API_BASE_URL = "https://dev.nedtoukhi.com/api/v1";

export function getGalleryApiBaseUrl() {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  return (configuredBaseUrl || DEFAULT_API_BASE_URL).replace(/\/+$/, "");
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
  const json = await fetchJson(`${getGalleryApiBaseUrl()}/gallery`);
  return normalizeJsonBody(json);
}

