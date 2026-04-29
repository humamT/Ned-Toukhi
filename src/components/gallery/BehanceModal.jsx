import { useEffect } from "react";

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

  return (
    <div className="behance-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="behance-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="behance-modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {embedUrl ? (
          <iframe
            src={embedUrl}
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

