// IMPORTANT:
// Your API currently does not allow cross-origin browser requests (no CORS headers).
// So in production, the frontend must call an API that is reachable on the SAME origin
// (e.g. `https://beta.nedtoukhi.com/api/v1/...` via a reverse-proxy to `dev.nedtoukhi.com`).
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

function normalizeJsonBody(value) {
  // Some endpoints may return `{ success, data }`; others return raw arrays.
  if (value && typeof value === "object" && "data" in value) return value.data;
  return value;
}

async function fetchJson(url) {
  const res = await fetch(url, {
    method: "GET",
    credentials: "include", // send HttpOnly cookie
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

// Fetch all images, then filter client-side for `gallery_id != null`.
export async function getGalleryCoverImages() {
  const json = await fetchJson(`${API_BASE_URL}/images?limit=500`);
  return normalizeJsonBody(json);
}

