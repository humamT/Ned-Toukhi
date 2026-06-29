import ToolIcons from "./ToolIcons";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// rAF throttle per element (prevents pointermove from spamming layout/style work)
const rafByEl = new WeakMap();

function updateMediaGlowPosition(event) {
  if (prefersReducedMotion) return;
  // Only enable this premium effect on mouse/trackpad. (Touch can fire noisy moves.)
  if (event.pointerType && event.pointerType !== "mouse") return;

  const el = event.currentTarget;
  if (!el) return;

  if (rafByEl.get(el)) return;
  const rafId = requestAnimationFrame(() => {
    rafByEl.delete(el);

    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const x = ((event.clientX - r.left) / r.width) * 100;
    const y = ((event.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--glow-x", `${x}%`);
    el.style.setProperty("--glow-y", `${y}%`);
  });
  rafByEl.set(el, rafId);
}

export default function ProjectCard({ project, onOpenBehance }) {
  const imageUrl = project?.imageUrl ?? "";
  const imageCount = Number(project?.imageCount ?? 0);
  const extraImagesCount = Math.max(0, imageCount - 1);
  const title = project?.title ?? "";
  const type = project?.type ?? "";
  const date = project?.date ?? "";
  const category = project?.category ?? "";
  const tools = project?.tools ?? "";
  const embedLink = project?.embed_link ?? "";

  return (
    <article className="gallery-project-card" data-category={category}>
      <button
        type="button"
        className="gallery-project-card__media"
        onClick={() => onOpenBehance?.(embedLink)}
        onPointerMove={updateMediaGlowPosition}
        aria-label={title ? `Open ${title} on Behance` : "Open project on Behance"}
      >
        {imageUrl ? <img src={imageUrl} alt={title} loading="lazy" /> : <div className="gallery-project-card__media-placeholder">No image</div>}
        <span className="gallery-project-card__media-glow" aria-hidden />
        {extraImagesCount > 0 ? <span className="gallery-project-card__media-badge">+{extraImagesCount}</span> : null}
      </button>

      <div className="gallery-project-card__body">
        <h3 className="gallery-project-card__title">{title}</h3>
        {type || tools ? (
          <div className="gallery-project-card__meta-row">
            {type ? <span className="gallery-project-card__type">{type}</span> : null}

          </div>
        ) : null}
        {date ? <div className="gallery-project-card__date">{date}</div> : null}
        <ToolIcons tools={tools} />
      </div>
    </article>
  );
}

