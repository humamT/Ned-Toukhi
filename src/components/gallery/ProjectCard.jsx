import ToolIcons from "./ToolIcons";

export default function ProjectCard({ project, onOpenBehance }) {
  const imageUrl = project?.imageUrl ?? "";
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
        aria-label={title ? `Open ${title} on Behance` : "Open project on Behance"}
      >
        {imageUrl ? <img src={imageUrl} alt={title} /> : <div className="gallery-project-card__media-placeholder" />}
      </button>

      <div className="gallery-project-card__body">
        <h3 className="gallery-project-card__title">{title}</h3>
        <div className="gallery-project-card__sub">
          {type ? <span>{type}</span> : null}
          {date ? <span>{date}</span> : null}
        </div>

        <ToolIcons tools={tools} />
      </div>
    </article>
  );
}

