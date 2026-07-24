// Call the API on the SAME origin to avoid browser CORS blocks.
// Local/dev: Vite proxies `/api` → https://dev.nedtoukhi.com (see vite.config.js).
// Production: reverse-proxy `/api` to the API host the same way.
// Override with VITE_API_BASE_URL only if you intentionally want a different base.
const API_BASE_URL = "https://dev.nedtoukhi.com/api/v1";

function normalizeJsonBody(value) {
  // Some endpoints may return `{ success, data }`; others return raw arrays.
  if (value && typeof value === "object" && "data" in value) return value.data;
  return value;
}

function sortBySortOrder(items) {
  if (!Array.isArray(items)) return [];
  return [...items].sort((a, b) => {
    const aOrder = Number(a?.sort_order);
    const bOrder = Number(b?.sort_order);
    const aSafe = Number.isFinite(aOrder) ? aOrder : Number.POSITIVE_INFINITY;
    const bSafe = Number.isFinite(bOrder) ? bOrder : Number.POSITIVE_INFINITY;
    if (aSafe !== bSafe) return aSafe - bSafe;
    return Number(a?.id ?? 0) - Number(b?.id ?? 0);
  });
}

async function fetchJson(url) {
  const res = await fetch(url, {
    method: "GET",
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
  return sortBySortOrder(normalizeJsonBody(json));
}

export async function getStoreItems() {
  const json = await fetchJson(`${API_BASE_URL}/store`);
  return sortBySortOrder(normalizeJsonBody(json));
}
