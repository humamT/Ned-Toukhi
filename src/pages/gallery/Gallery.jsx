import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Gallery.scss";

// import emptyOrb from "../../assets/images/Circle-empty.svg";

import galleryBubble from "../../assets/PNGS+SVGs/photo-pubble.svg";

import { getGalleryProjects } from "../../services/galleryApi";
import BehanceModal from "../../components/gallery/BehanceModal";
import ProjectCard from "../../components/gallery/ProjectCard";
import OrbHero from "../../components/orbHero/orbHero.jsx";

import ScrollIndicator from "../../components/scroll-indicator/ScrollIndicator.jsx";

const CATEGORIES = ["Illustrations", "Featured", "Identities"];

const SLUG_TO_CATEGORY = {
  illustrations: "Illustrations",
  featured: "Featured",
  identities: "Identities",
};

const CATEGORY_TO_SLUG = {
  Illustrations: "illustrations",
  Featured: "featured",
  Identities: "identities",
};

export default function GalleryPage() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!categorySlug) {
      setCategory(CATEGORIES[0]);
      return;
    }
    const key = String(categorySlug).toLowerCase();
    const next = SLUG_TO_CATEGORY[key];
    if (next) {
      setCategory(next);
    } else {
      navigate("/gallery", { replace: true });
    }
  }, [categorySlug, navigate]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => p?.category === category);
  }, [projects, category]);

  return (
    <div className="gallery-page">
      <section className="gallery-head">

        <div className="gallery-head-orb" aria-hidden="true">
          <OrbHero orbState="idle" mode="landing" position="center" scale="normal" logoVisible={false} />
        </div>
        {/* <img className="Envelope-emptyOrb" src={emptyOrb} alt="" /> */}

        <div className="gallery-head-text">
          <h1 className="stage-2__title-en gallery-head-title">Gallery</h1>
          <h2 className="stage-2__title-ar gallery-head-title">المعرض</h2>
          <h3 className="stage-2__title-fr gallery-head-title">Galerie</h3>
          <p className="stage-2__subtitle gallery-head-subtitle">
            Discover 3 categories of %100 human-made art, from illustrations and logo designs to standout featured
            projects.
          </p>
          <div className="gallery-head-scroll-indicator">
            <ScrollIndicator visible={true} />
          </div>
        </div>

        <div className="gallery-head-bubbles" aria-hidden="true">
          <img className="gallery1 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
          <img className="gallery2 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
          <img className="gallery3 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
          <img className="gallery4 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
          <img className="gallery5 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
          <img className="gallery6 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
        </div>
      </section>

      <section className="gallery-content">
        <ul className="gallery-filters" aria-label="Project filters">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <button
                type="button"
                className={`gallery-filter gallery-filter--${CATEGORY_TO_SLUG[c]} ${c === category ? "is-active" : ""}`}
                onClick={() => navigate(`/gallery/${CATEGORY_TO_SLUG[c]}`)}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>

        {error ? <div className="gallery-error">{error}</div> : null}
        {loading ? <div className="gallery-loading">Loading...</div> : null}

        <div
          className="gallery-projects"
          data-active-filter={CATEGORY_TO_SLUG[category]}
        >
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
