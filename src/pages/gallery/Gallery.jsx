import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Gallery.scss";

// import emptyOrb from "../../assets/images/Circle-empty.svg";
import CircleFull from "../../assets/images/Circle-full.svg";

import galleryBubble from "../../assets/PNGS+SVGs/photo-pubble.svg";

import { getGalleryProjects } from "../../services/galleryApi";
import BehanceModal from "../../components/gallery/BehanceModal";
import ProjectCard from "../../components/gallery/ProjectCard";
import OrbHero from "../../components/orbHero/orbHero.jsx";

import ScrollIndicator from "../../components/scroll-indicator/ScrollIndicator.jsx";

import YellowLeft from "../../assets/PNGS+SVGs/Gallery/Y/space-1-left.png";
import YellowRight from "../../assets/PNGS+SVGs/Gallery/Y/space-2-right.png";
import RedLeft from "../../assets/PNGS+SVGs/Gallery/R/v-1-left.png";
import RedRight from "../../assets/PNGS+SVGs/Gallery/R/v-2-right.png";
import GreenLeft from "../../assets/PNGS+SVGs/Gallery/G/Green-banner-1-left.svg";
import GreenRight from "../../assets/PNGS+SVGs/Gallery/G/Green-banner-2-right.svg";
import GreenCenter from "../../assets/PNGS+SVGs/Gallery/G/Green-banner-3-center.svg";

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

/** Per-filter banner config — swap `imageLeft` / `imageRight` when assets are ready */
const GALLERY_BANNER_BY_CATEGORY = {
  Illustrations: {
    slug: "illustrations",
    text: "View the illustrations I've been working on, from concepts to finished pieces.",
    imageLeft: YellowLeft,
    imageRight: YellowRight,
  },
  Featured: {
    slug: "featured",
    text: "Browse a selection of featured projects highlighting my recent work.",
    imageLeft: RedRight,
    imageRight: RedLeft,
  },
  Identities: {
    slug: "identities",
    text: "Take a closer look at the logos and visual identities I've developed.",
    imageLeft: GreenLeft,
    imageCenter: GreenCenter,
    imageRight: GreenRight,
  },
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
    return projects
      .filter((p) => p?.category === category)
      .sort((a, b) => {
        const aOrder = Number(a?.sort_order);
        const bOrder = Number(b?.sort_order);
        const aSafe = Number.isFinite(aOrder) ? aOrder : Number.POSITIVE_INFINITY;
        const bSafe = Number.isFinite(bOrder) ? bOrder : Number.POSITIVE_INFINITY;
        if (aSafe !== bSafe) return aSafe - bSafe;
        return Number(a?.id ?? 0) - Number(b?.id ?? 0);
      });
  }, [projects, category]);

  const activeBanner = GALLERY_BANNER_BY_CATEGORY[category] ?? GALLERY_BANNER_BY_CATEGORY[CATEGORIES[0]];

  return (
    <div className="gallery-page">
      <section className="gallery-head">

        <div className="gallery-head-orb-img-container">
          <img src={CircleFull} alt="Circle Full" className="gallery-head-orb-img" aria-hidden="true" />
        </div>

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
          <div
            className={`gallery-projects-banner gallery-projects-banner--${activeBanner.slug}`}
            key={activeBanner.slug}
          >
            <img
              className="gallery-projects-banner__img gallery-projects-banner__img--left"
              src={activeBanner.imageLeft}
              alt=""
              aria-hidden="true"
            />
            <img
              className="gallery-projects-banner__img gallery-projects-banner__img--right"
              src={activeBanner.imageRight}
              alt=""
              aria-hidden="true"
            />
            {activeBanner.imageCenter ? (
              <img
                className="gallery-projects-banner__img gallery-projects-banner__img--center"
                src={activeBanner.imageCenter}
                alt=""
                aria-hidden="true"
              />
            ) : null}

            <p className="gallery-projects-banner__text">{activeBanner.text}</p>
          </div>

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
