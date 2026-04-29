import { useEffect, useMemo, useState } from "react";
import "./Gallery.scss";

import galleryBubble from "../../assets/PNGS+SVGs/photo-pubble.svg";

import { getGalleryProjects } from "../../services/galleryApi";
import BehanceModal from "../../components/gallery/BehanceModal";
import ProjectCard from "../../components/gallery/ProjectCard";

const CATEGORIES = ["Illustrations", "Featured", "Identities"];

export default function GalleryPage() {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [behanceOpen, setBehanceOpen] = useState(false);
  const [behanceEmbedUrl, setBehanceEmbedUrl] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const rows = await getGalleryProjects();

        const enrichedProjects = (Array.isArray(rows) ? rows : []).map((p) => ({
          ...p,
          imageUrl: p?.images?.[0]?.publicUrl ?? "",
          imageCount: Array.isArray(p?.images) ? p.images.length : 0,
        }));

        if (!cancelled) setProjects(enrichedProjects);
      } catch (e) {
        if (!cancelled) setError(String(e?.message ?? e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => p?.category === category);
  }, [projects, category]);

  return (
    <div className="gallery-page">
      <section className="gallery-head">
        <div className="gallery-head-title">
          <h1>Gallery</h1>
          <h2>المعرض</h2>
          <h3>Galerie</h3>
        </div>

        <div className="gallery-head-subtitle">
          <p>
            Discover 3 categories of %100 human-made art, from illustrations and logo designs to standout featured
            projects.
          </p>
        </div>

        <div className="gallery-head-bubbles" aria-hidden="true">
          <img src={galleryBubble} alt="" />
          <img src={galleryBubble} alt="" />
          <img src={galleryBubble} alt="" />
          <img src={galleryBubble} alt="" />
          <img src={galleryBubble} alt="" />
          <img src={galleryBubble} alt="" />
        </div>
      </section>

      <section className="gallery-content">
        <ul className="gallery-filters" aria-label="Project filters">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <button
                type="button"
                className={`gallery-filter ${c === category ? "is-active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>

        {error ? <div className="gallery-error">{error}</div> : null}
        {loading ? <div className="gallery-loading">Loading...</div> : null}

        <div className="gallery-projects">
          {filteredProjects.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onOpenBehance={(url) => {
                setBehanceEmbedUrl(url);
                setBehanceOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      <BehanceModal
        open={behanceOpen}
        embedUrl={behanceEmbedUrl}
        onClose={() => setBehanceOpen(false)}
      />
    </div>
  );
}
