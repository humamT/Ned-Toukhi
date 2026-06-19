import { useEffect } from "react";

export function getSafeBehanceEmbedUrl(embedUrl) {
  if (!embedUrl) return "";

  try {
    const url = new URL(embedUrl);
    const isBehanceHost = url.hostname === "www.behance.net" || url.hostname === "behance.net";
    const isEmbedProject = url.pathname.startsWith("/embed/project/");

    if (url.protocol !== "https:" || !isBehanceHost || !isEmbedProject) {
      return "";
    }

    return url.toString();
  } catch {
    return "";
  }
}

export default function BehanceModal({ open, embedUrl, onClose }) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const safeEmbedUrl = getSafeBehanceEmbedUrl(embedUrl);

  return (
    <div className="behance-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="behance-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="behance-modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {safeEmbedUrl ? (
          <iframe
            src={safeEmbedUrl}
            height="316"
            width="404"
            allowFullScreen
            loading="lazy"
            frameBorder="0"
            allow="clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Behance project"
          />
        ) : null}
      </div>
    </div>
  );
}

