import { useEffect, useMemo, useRef, useState } from "react";
import "./Home.scss";
import Loading from "../../components/loading/loading.jsx";
import Landing from "../../components/landing/landing.jsx";
import OrbHero from "../../components/orbHero/orbHero.jsx";
import HomeActionButton from "../../components/ui/HomeActionButton.jsx";
import ScrollIndicator from "../../components/scroll-indicator/ScrollIndicator.jsx";
import Footer from "../../components/footer/footer.jsx";
import "../../components/stage-content/StageContent.scss";
import { NavLink } from "react-router-dom";
import CircleFull from "../../assets/images/Circle-full.svg";

import stickerImg from "../../assets/images/sticker-op.png";
import postersCluster from "../../assets/images/posters-cluster.png";
import galleryBubble from "../../assets/PNGS+SVGs/photo-pubble.svg";
import illustrationsBox from "../../assets/PNGS+SVGs/tab1.svg";
import featuredBox from "../../assets/PNGS+SVGs/tab2.svg";
import identitiesBox from "../../assets/PNGS+SVGs/tab3.svg";
import click1 from "../../assets/PNGS+SVGs/click1.svg";
import click2 from "../../assets/PNGS+SVGs/click2.svg";
import click3 from "../../assets/PNGS+SVGs/click3.svg";
import goToGalleryText from "../../assets/PNGS+SVGs/go-to-gallery-txt.svg";
import galleryYellow from "../../assets/PNGS+SVGs/gallery-yellow.png";
import galleryRed from "../../assets/PNGS+SVGs/gallery-red.png";
import galleryGreen from "../../assets/PNGS+SVGs/gallery-green.png";
import whiteLine from "../../assets/PNGS+SVGs/Circle-white-line.svg";
import yellowLine from "../../assets/PNGS+SVGs/yellow-line.svg";
import redLine from "../../assets/PNGS+SVGs/red-line.svg";
import tealLine from "../../assets/PNGS+SVGs/teal-line.svg";

import illustration1 from "../../assets/PNGS+SVGs/Illustrations/y1.png";
import illustration2 from "../../assets/PNGS+SVGs/Illustrations/y2.png";
import illustration3 from "../../assets/PNGS+SVGs/Illustrations/y3.png";
import illustration4 from "../../assets/PNGS+SVGs/Illustrations/y4.png";

import featured1 from "../../assets/PNGS+SVGs/Featured/r1.png";
import featured2 from "../../assets/PNGS+SVGs/Featured/r2.png";
import featured3 from "../../assets/PNGS+SVGs/Featured/r3.png";
import featured4 from "../../assets/PNGS+SVGs/Featured/r4.png";

import identities1 from "../../assets/PNGS+SVGs/Identities/g1.png";
import identities2 from "../../assets/PNGS+SVGs/Identities/g2.png";
import identities3 from "../../assets/PNGS+SVGs/Identities/g3.png";
import identities4 from "../../assets/PNGS+SVGs/Identities/g4.png";

import aboutCard1 from "../../assets/PNGS+SVGs/About/p1.png";
import aboutCard2 from "../../assets/PNGS+SVGs/About/p2.png";
import aboutCard3 from "../../assets/PNGS+SVGs/About/p3.png";
import aboutCard4 from "../../assets/PNGS+SVGs/About/p4.png";

import personalImg from "../../assets/PNGS+SVGs/About/p0.png";

import aboutBox from "../../assets/PNGS+SVGs/About/about-box.svg";

import featuredClientsBox from "../../assets/PNGS+SVGs/Featured-Clients/Featured-Clients-box.svg";
import FeaturedClientsLogos from "../../components/featured-clients/FeaturedClientsLogos.jsx";

import galleryborder from "../../assets/PNGS+SVGs/gallery-border-1.svg";
import scrollBar from "../../assets/PNGS+SVGs/scroll-bar.svg";
import scrollTic from "../../assets/PNGS+SVGs/scroll-tic.svg";

import theMask from "../../assets/PNGS+SVGs/Quotations/devis.png";
import Letterhead from "../../assets/PNGS+SVGs/Quotations/Letterhead-Mockup.png";

import contactEnvelope from "../../assets/PNGS+SVGs/Contact/contact.png";
import contactBox from "../../assets/PNGS+SVGs/Contact/contact-box.svg";

/* Timings (exit must match orbHero.scss) */
const LOADER_MIN_SHOW_MS = 450;  // avoid flash on fast loads
const LOADER_MAX_SHOW_MS = 12000; // safety: never block forever
const LOADER_EXIT_MS = 2000;     // loader exit animation

/** Full stage snap (disabled) — was toggled on `<html>` to snap every `.stage-section`. */
// const HOME_STAGE_SNAP_CLASS = "home-stage-snap";

/** Landing-only snap — seam → `#stage-content` boundary (see StageContent.scss). */
const HOME_LANDING_SNAP_CLASS = "home-landing-snap";
/** Pixels from viewport top: show header once stage / landing spacer has passed this band */
const STAGE_HEADER_REVEAL_PX = 96;

const GALLERY_ORB_IMAGES = {
  3: galleryYellow,
  4: galleryRed,
  5: galleryGreen,
};

const GALLERY_TAB_LINKS = {
  3: { slug: "illustrations" },
  4: { slug: "featured" },
  5: { slug: "identities" },
};

function GalleryTabClickBracket({ activeId, tabId, clickImg, clickImgClass }) {
  const { slug } = GALLERY_TAB_LINKS[tabId];
  const isActive = activeId === tabId;

  const clickText = (
    <img
      className="click-txt__ring"
      src={goToGalleryText}
      alt=""
      aria-hidden="true"
    />
  );

  return (
    <div
      className={`click-bracket ${!isActive ? "not-stage-txt" : ""}`}
      aria-hidden={!isActive}
    >
      <img className={clickImgClass} src={clickImg} alt="" aria-hidden="true" />
      {isActive ? (
        <NavLink
          to={`/gallery/${slug}`}
          className="click-txt"
          aria-label="Go to gallery"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {clickText}
        </NavLink>
      ) : (
        <div className="click-txt">{clickText}</div>
      )}
    </div>
  );
}

function GalleryTabs({ activeId, onStepClick }) {
  return (
    <div className="tabs-rectangles">
      <div
        className={`tab-rectangle1 ${activeId !== 3 ? "not-stage" : ""}`}
        onClick={() => onStepClick(3)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onStepClick(3);
        }}
      >
        <img className="illustrationsBox" src={illustrationsBox} alt="illustrations Box" />
        <div className="illustrations-txt">
          <div className="illustrations-en">Illustrations</div>
          <div className="illustrations-ar">رسومات</div>
          <div className="illustrations-fr">Dessins</div>
        </div>
        <GalleryTabClickBracket activeId={activeId} tabId={3} clickImg={click1} clickImgClass="click1" />
      </div>

      <div
        className={`tab-rectangle2 ${activeId !== 4 ? "not-stage" : ""}`}
        onClick={() => onStepClick(4)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onStepClick(4);
        }}
      >
        <img className="featuredBox" src={featuredBox} alt="featured Box" />
        <div className="featured-txt">
          <div className="featured-en">Featured</div>
          <div className="featured-ar">أعمال خاصة</div>
          <div className="featured-fr">Sélectionnés</div>
        </div>
        <GalleryTabClickBracket activeId={activeId} tabId={4} clickImg={click2} clickImgClass="click2" />
      </div>

      <div
        className={`tab-rectangle3 ${activeId !== 5 ? "not-stage" : ""}`}
        onClick={() => onStepClick(5)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onStepClick(5);
        }}
      >
        <img className="identitiesBox" src={identitiesBox} alt="identities Box" />
        <div className="identities-txt">
          <div className="identities-en">Identities</div>
          <div className="identities-ar">هويات بصرية</div>
          <div className="identities-fr">Charts graphiques</div>
        </div>
        <GalleryTabClickBracket activeId={activeId} tabId={5} clickImg={click3} clickImgClass="click3" />
      </div>
    </div>
  );
}



export default function Home({ setHeaderVisible }) {
  // Loader state
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  // Orb FX state
  const [orbState, setOrbState] = useState("idle");

  const [logoVisible, setLogoVisible] = useState(true);
  const [orbTransitioning, setOrbTransitioning] = useState(false);

  const [activeGalleryId, setActiveGalleryId] = useState(3);
  const activeGalleryIdRef = useRef(activeGalleryId);
  const galleryDebounceRef = useRef(null);
  const lastGallerySetAtRef = useRef(0);
  const galleryAnimatingRef = useRef(false);
  const galleryAnimTimeoutRef = useRef(null);
  const galleryRafRef = useRef(0);
  const galleryRatiosRef = useRef(new Map());
  const galleryScrollYRef = useRef(0);
  const galleryScrollDirRef = useRef(0);
  // No "swap-in-place" animation state needed when cards scroll as real sections.

  useEffect(() => {
    activeGalleryIdRef.current = activeGalleryId;
  }, [activeGalleryId]);

  const scrollToGalleryStep = (id) => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isMobileWebKit = /AppleWebKit/i.test(ua) && /iPhone|iPad|iPod|Mobile/i.test(ua);
    const isSmallViewport = document.documentElement.clientWidth <= 768;
    const scrollBehavior = isMobileWebKit || isSmallViewport ? "auto" : "smooth";

    // Treat clicks like a controlled transition too.
    galleryAnimatingRef.current = true;
    if (galleryAnimTimeoutRef.current) window.clearTimeout(galleryAnimTimeoutRef.current);
    galleryAnimTimeoutRef.current = window.setTimeout(() => {
      galleryAnimatingRef.current = false;
    }, 480);

    setActiveGalleryId(id);
    document.getElementById(`gallery-step-${id}`)?.scrollIntoView({ behavior: scrollBehavior });
  };

  const galleryTabs = useMemo(
    () => [
      { id: 3, key: "illustrations", labelEn: "Illustrations", labelAr: "رسومات", labelFr: "Dessins" },
      { id: 4, key: "featured", labelEn: "Featured", labelAr: "أعمال خاصة", labelFr: "Sélectionnés" },
      { id: 5, key: "identities", labelEn: "Identities", labelAr: "هويات بصرية", labelFr: "Charts graphiques" },
    ],
    []
  );

  const GalleryCards = ({ id }) => (
    <div className="gallery-content">
      <div className="gallery-cards">
        <div className="gallery-stack">
          {id === 3 && (
            <div className="gallery-illustrations">
              <div className="spotlight-yellow"></div>
              <div className="illustration1">
                {/* <img className="illustration-border" src={galleryborder} alt="" /> */}
                <img className="illustration-img" src={illustration1} alt="" />
              </div>
              <div className="illustration2">
                {/* <img className="illustration-border" src={galleryborder} alt="" /> */}
                <img className="illustration-img" src={illustration2} alt="" />
              </div>
              <div className="illustration3">
                {/* <img className="illustration-border" src={galleryborder} alt="" /> */}
                <img className="illustration-img" src={illustration3} alt="" />
              </div>
              <div className="illustration4">
                {/* <img className="illustration-border" src={galleryborder} alt="" /> */}
                <img className="illustration-img" src={illustration4} alt="" />
              </div>
            </div>
          )}

          {id === 4 && (
            <div className="gallery-featured">
              <div className="spotlight-red"></div>
              <div className="featured1">
                {/* <img className="featured-border" src={galleryborder} alt="" /> */}
                <img className="featured-img" src={featured1} alt="" />
              </div>
              <div className="featured2">
                {/* <img className="featured-border" src={galleryborder} alt="" /> */}
                <img className="featured-img" src={featured2} alt="" />
              </div>
              <div className="featured3">
                {/* <img className="featured-border" src={galleryborder} alt="" /> */}
                <img className="featured-img" src={featured3} alt="" />
              </div>
              <div className="featured4">
                {/* <img className="featured-border" src={galleryborder} alt="" /> */}
                <img className="featured-img" src={featured4} alt="" />
              </div>
            </div>
          )}

          {id === 5 && (
            <div className="gallery-identities">
              <div className="spotlight-teal"></div>
              <div className="identities1">
                {/* <img className="identities-border" src={galleryborder} alt="" /> */}
                <img className="identities-img" src={identities1} alt="" />
              </div>
              <div className="identities2">
                {/* <img className="identities-border" src={galleryborder} alt="" /> */}
                <img className="identities-img" src={identities2} alt="" />
              </div>
              <div className="identities3">
                {/* <img className="identities-border" src={galleryborder} alt="" /> */}
                <img className="identities-img" src={identities3} alt="" />
              </div>
              <div className="identities4">
                {/* <img className="identities-border" src={galleryborder} alt="" /> */}
                <img className="identities-img" src={identities4} alt="" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const eagerImgProps = {
    loading: "eager",
    decoding: "sync",
    fetchPriority: "high",
  };

  const lazyImgProps = {
    loading: "lazy",
    decoding: "async",
    fetchPriority: "low",
  };

  // Stage 3: switch active tab while scrolling (IO ratios + adjacent-step guard).
  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;
    if (document.documentElement.clientWidth <= 768) return;

    const ids = [3, 4, 5];
    const ratios = galleryRatiosRef.current;

    const els = ids
      .map((id) => document.getElementById(`gallery-step-${id}`))
      .filter(Boolean);
    if (!els.length) return;

    const pickFromGeometry = () => {
      const focusY = window.innerHeight * 0.35;
      let bestId = ids[0];
      let bestDistance = Infinity;

      for (const id of ids) {
        const el = document.getElementById(`gallery-step-${id}`);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - focusY);

        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      }

      return bestId;
    };

    const applyActiveStep = () => {
      if (galleryAnimatingRef.current) return;

      const current = activeGalleryIdRef.current;
      const dir = galleryScrollDirRef.current;
      let bestId = null;
      let bestRatio = 0;

      for (const id of ids) {
        const ratio = ratios.get(id) ?? 0;
        if (ratio <= 0) continue;
        if (Math.abs(id - current) > 1) continue;
        if (dir > 0 && id < current) continue;
        if (dir < 0 && id > current) continue;

        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      if (!bestId || bestRatio < 0.12) {
        bestId = pickFromGeometry();
      }

      const nextId =
        bestId === current
          ? current
          : bestId > current + 1
            ? current + 1
            : bestId < current - 1
              ? current - 1
              : bestId;

      if (nextId === current) return;

      const now = Date.now();
      if (now - lastGallerySetAtRef.current < 180) return;

      lastGallerySetAtRef.current = now;
      setActiveGalleryId(nextId);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.id.replace("gallery-step-", ""));
          if (!ids.includes(id)) return;
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        applyActiveStep();
      },
      { threshold: [0, 0.12, 0.25, 0.5, 0.75, 1], rootMargin: "-10% 0px -40% 0px" }
    );

    els.forEach((el) => obs.observe(el));

    const onScroll = () => {
      const y = window.scrollY;
      if (y > galleryScrollYRef.current) galleryScrollDirRef.current = 1;
      else if (y < galleryScrollYRef.current) galleryScrollDirRef.current = -1;
      galleryScrollYRef.current = y;

      if (galleryRafRef.current) return;
      galleryRafRef.current = window.requestAnimationFrame(() => {
        galleryRafRef.current = 0;
        applyActiveStep();
      });
    };

    const scrollOpts = { passive: true, capture: true };
    document.addEventListener("scroll", onScroll, scrollOpts);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("scrollend", applyActiveStep);
    window.addEventListener("scrollend", applyActiveStep);

    galleryScrollYRef.current = window.scrollY;
    applyActiveStep();

    return () => {
      obs.disconnect();
      ratios.clear();
      document.removeEventListener("scroll", onScroll, scrollOpts);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("scrollend", applyActiveStep);
      window.removeEventListener("scrollend", applyActiveStep);
      if (galleryRafRef.current) window.cancelAnimationFrame(galleryRafRef.current);
      if (galleryDebounceRef.current) window.clearTimeout(galleryDebounceRef.current);
      if (galleryAnimTimeoutRef.current) window.clearTimeout(galleryAnimTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;

    const sections = Array.from(document.querySelectorAll("#stage-content > .stage-section"));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-onscreen", entry.isIntersecting);
        });
      },
      { threshold: 0.08, rootMargin: "20% 0px 20% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Loader */
  useEffect(() => {
    let finished = false;
    const start = typeof performance !== "undefined" ? performance.now() : Date.now();

    const finish = () => {
      if (finished) return;
      finished = true;

      const now = typeof performance !== "undefined" ? performance.now() : Date.now();
      const elapsed = now - start;
      const remaining = Math.max(0, LOADER_MIN_SHOW_MS - elapsed);
      window.setTimeout(() => setIsLoading(false), remaining);
    };

    // If everything is already loaded (e.g. bfcache), finish immediately.
    if (document.readyState === "complete") {
      finish();
      return;
    }

    // Finish when the window load event fires (images/styles/fonts complete).
    window.addEventListener("load", finish, { once: true });

    // Safety timeout in case something prevents the load event.
    const maxT = window.setTimeout(finish, LOADER_MAX_SHOW_MS);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(maxT);
    };
  }, []);

  /* Lock page scrolling while loader is visible, then restore automatically. */
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    const prevRootOverflow = root.style.overflow;
    const prevOverflow = document.body.style.overflow;
    const prevRootTouchAction = root.style.touchAction;
    const prevBodyTouchAction = body.style.touchAction;

    if (showLoader) {
      root.style.overflow = "hidden";
      body.style.overflow = "hidden";
      root.style.touchAction = "none";
      body.style.touchAction = "none";
    } else {
      root.style.overflow = "";
      body.style.overflow = "auto";
      root.style.touchAction = "";
      body.style.touchAction = "";
    }

    return () => {
      root.style.overflow = prevRootOverflow;
      document.body.style.overflow = prevOverflow;
      root.style.touchAction = prevRootTouchAction;
      body.style.touchAction = prevBodyTouchAction;
    };
  }, [showLoader]);

  // Landing-only scroll-snap at `.home-scroll__landing-stage-seam` → `#stage-content`.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add(HOME_LANDING_SNAP_CLASS);
    return () => root.classList.remove(HOME_LANDING_SNAP_CLASS);
  }, []);

  // Full stage scroll-snap (disabled — snapped every `.stage-section` / `.gallery-step`).
  // useEffect(() => {
  //   const root = document.documentElement;
  //   root.classList.add(HOME_STAGE_SNAP_CLASS);
  //   return () => root.classList.remove(HOME_STAGE_SNAP_CLASS);
  // }, []);

  useEffect(() => {
    if (!isLoading) {
      setOrbState("exploding");

      const t1 = setTimeout(() => setOrbState("returning"), LOADER_EXIT_MS);
      const t2 = setTimeout(() => setShowLoader(false), LOADER_EXIT_MS);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isLoading]);

  /* Header + orb logo: past landing — use spacer + stage geometry; listen on document (capture)
     and scrollend so we still run after scroll-snap settles (window scroll alone can miss). */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stage = () => document.getElementById("stage-content");
    const spacer = () => document.querySelector(".home-scroll__spacer");

    let ticking = false;
    const update = () => {
      ticking = false;
      const el = stage();
      if (!el) return;
      const stageTop = el.getBoundingClientRect().top;
      const sp = spacer();
      const spacerBottom = sp instanceof HTMLElement ? sp.getBoundingClientRect().bottom : Number.POSITIVE_INFINITY;
      const pastByStage = stageTop <= STAGE_HEADER_REVEAL_PX;
      const pastBySpacer = spacerBottom <= STAGE_HEADER_REVEAL_PX;
      const inStageContent = pastByStage || pastBySpacer;
      setHeaderVisible(inStageContent);
      setLogoVisible(!inStageContent);
    };

    const schedule = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();

    const scrollOpts = { passive: true, capture: true };
    document.addEventListener("scroll", schedule, scrollOpts);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    const rootEl = document.documentElement;
    rootEl.addEventListener("scrollend", schedule);
    window.addEventListener("scrollend", schedule);

    return () => {
      document.removeEventListener("scroll", schedule, scrollOpts);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      rootEl.removeEventListener("scrollend", schedule);
      window.removeEventListener("scrollend", schedule);
    };
  }, [setHeaderVisible, setLogoVisible]);



  return (
    <div>
      <Landing />

      <div className="home-scroll">
        <div className="home-scroll__spacer" aria-hidden="true" />
        <div className="home-scroll__landing-stage-seam" aria-hidden="true" />
        <div id="stage-content" className="stage-content">
          {/* Store */}
          <section className="stage-section">
            <div className="stage-content__stage stage-content__stage-1">
              <div className="stage-1__orb-content">
                {/* <div className="stage-orb stage-orb--s1" aria-hidden="true" /> */}
                <img src={CircleFull} alt="Circle Full" className="stage-orb--s1" aria-hidden="true" />
                <div className="stage-1__main-text">
                  <div className="stage-1__title">
                    <div className="stage-1__title-en">Store</div>
                    <div className="stage-1__title-ar">المتجر</div>
                    <div className="stage-1__title-fr">Boutique</div>
                  </div>
                  <img {...eagerImgProps} src={stickerImg} alt="Sticker" className="stage-1__sticker" />
                </div>

                <div className="stage-1__subtitle">
                  Postcards, stickers, posters, BUY THEM ALL!, choose between a wide selection of original art
                  projects and get them delivered.
                </div>
                <HomeActionButton className="shop-now" to="/store">Shop NOW!</HomeActionButton>
              </div>

              <div className="stage-1__posters-section">
                <img {...eagerImgProps} src={postersCluster} alt="Posters cluster" className="stage-1__posters" />
              </div>
            </div>
          </section>

          {/* Gallery intro */}
          <section className="stage-section">
            <div className="stage-content__stage stage-content__stage-2">
              <img src={CircleFull} alt="Circle Full" className="stage-orb--s2" aria-hidden="true" />
              <div className="stage-2__orb-content">
                <div className="stage-2__main-text">
                  <div className="stage-2__title">
                    <div className="stage-2__title-en">Gallery</div>
                    <div className="stage-2__title-ar">المعرض</div>
                    <div className="stage-2__title-fr">Galerie</div>
                  </div>
                </div>

                <div className="stage-2__subtitle">
                  Discover 3 categories of 100% human-made art, from illustrations and logo designs to standout
                  featured projects.
                </div>

                <div>
                  <img {...eagerImgProps} className="gallery1 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
                  <img {...eagerImgProps} className="gallery2 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
                  <img {...eagerImgProps} className="gallery3 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
                  <img {...eagerImgProps} className="gallery4 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
                </div>

                <HomeActionButton className="explore-now" to="/gallery">Explore NOW!</HomeActionButton>
              </div>
            </div>
          </section>

          {/* Gallery (stage 3): sticky in place, scroll switches right-side content, then releases */}
          <section className="stage-section stage-section--gallery">
            <div className="gallery-layout">
              <div className="gallery-sidebar">
                <div className="gallery-orb-stack" aria-hidden="true">
                  <img src={CircleFull} alt="" className="stage-orb--s3" />
                  {galleryTabs.map((tab) => (
                    <img
                      key={tab.id}
                      className={`gallery-orb-overlay${activeGalleryId === tab.id ? " is-active" : ""}`}
                      src={GALLERY_ORB_IMAGES[tab.id]}
                      alt=""
                    />
                  ))}
                </div>
                <div className="stage-3__orb-content">
                  <GalleryTabs activeId={activeGalleryId} onStepClick={scrollToGalleryStep} />
                </div>
              </div>

              <div className="gallery-right">
                {galleryTabs.map((tab) => (
                  <section key={tab.id} id={`gallery-step-${tab.id}`} className="gallery-step">
                    <GalleryCards id={tab.id} />
                  </section>
                ))}
              </div>
            </div>
          </section>

          {/* Quotations */}
          <section className="stage-section">
            <div className="stage-content__stage stage-content__stage-6">
              <div className="stage-6__orb-content">
                <img src={CircleFull} alt="Circle Full" className="stage-orb--s4" aria-hidden="true" />
                <div className="stage-6__main-text">
                  <div className="stage-6__title">
                    <div className="stage-6__title-en">Quotations</div>
                    <div className="stage-6__title-ar">تقييم التكلفة</div>
                    <div className="stage-6__title-fr">Devis</div>
                  </div>
                  <div className="stage-6__subtitle">
                    Get your estimated, personalized quotation
                    for your project depending on your location
                    and business in just a few clicks...
                  </div>
                  <HomeActionButton className="first-click" to="/quotations">First click ;)</HomeActionButton>
                </div>

                <div className="stage-6__Devis-imgs">
                  <img {...lazyImgProps} src={Letterhead} alt="Letterhead Mockup" className="letterhead-mockup" />
                  <img {...lazyImgProps} src={theMask} alt="The Mask illustration" className="the-mask" />
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="stage-section">
            <div className="stage-content__stage stage-content__stage-7">
              <img src={CircleFull} alt="Circle Full" className="stage-orb--s5" aria-hidden="true" />
              <div className="stage-7__orb-content">

                <img {...lazyImgProps} className="Envelope" src={contactEnvelope} alt="Envelope illustration" />

                <div className="stage-7__main-text">
                  <div className="stage-7__title">
                    <div className="stage-7__title-en">Contact</div>
                    <div className="stage-7__title-ar">تواصل</div>
                    <div className="stage-7__title-fr">Écris-moi</div>
                  </div>
                  <div className="stage-7__subtitle">
                    If you have a question, need an estimate, or
                    simply want to say hello, feel free to email
                    me and I’ll get back to you as soon as possible!
                  </div>
                  <HomeActionButton className="contact-btn" to="/contact">Contact</HomeActionButton>
                </div>
              </div>
            </div>
          </section>

          {/* About */}
          <section className="stage-section">
            <div className="stage-content__stage stage-content__stage-8">
              <div className="stage-8__orb-content">
                <img src={CircleFull} alt="Circle Full" className="stage-orb--s6" aria-hidden="true" />
                <div className="stage-8__orb-content-top">
                  <div className="personal-img-bubble">
                    <img {...lazyImgProps} className="personalImg" src={personalImg} alt="profile img" />
                    <img className="personalBubble" src={galleryBubble} alt="the orb around the profile img" />
                  </div>

                  <div className="stage-8__subtitle">
                    <p>Muhanad ALTOUKHI, Syrian graphic designer and illustrator.</p>
                    <p>Originally from Douma, near Damascus,
                      I began learning graphic design in 2014 during the siege of Eastern Ghouta.
                      After completing my DNMADE in Graphic Design in Paris in 2024,
                      I developed a creative vision shaped by living between these two worlds,
                      leading to hybrid, multicultural projects enriched by a unique perspective.</p>
                    {/* <p>Living between these two worlds has shaped my creative vision,
                      allowing me to develop hybrid, multicultural projects enriched by a
                      unique perspective one that I’m excited to share and work with you.</p> */}
                  </div>
                </div>

                {/* <img {...lazyImgProps} className="aboutBox" src={aboutBox} alt="about box" /> */}

                <div className="about-cards">
                  <img {...lazyImgProps} className="about-card higher-card-about-page" src={aboutCard1} alt="" />
                  <img {...lazyImgProps} className="about-card" src={aboutCard2} alt="" />
                  <img {...lazyImgProps} className="about-card higher-card-about-page" src={aboutCard3} alt="" />
                  <img {...lazyImgProps} className="about-card" src={aboutCard4} alt="" />
                </div>
              </div>
            </div>
          </section>

          {/* Featured clients */}
          <section className="stage-section">
            <img src={CircleFull} alt="Circle Full" className="stage-orb--s7" aria-hidden="true" />
            <div className="stage-content__stage stage-content__stage-9">
              <div className="stage-9__orb-content">
                <div className="stage-9__main-text">Featured Clients</div>
                {/* <img {...lazyImgProps} className="featuredClientsBox" src={featuredClientsBox} alt="featured Box" /> */}
                <FeaturedClientsLogos className="featuredLogos" alt="featured Logos" imgProps={lazyImgProps} />
              </div>
            </div>
          </section>
        </div>
      </div>

      {showLoader && <Loading isLoading={isLoading} />}

      {/* Own stacking layer so orb/logo sit above `.loader` (z-index 99); gradient stays in `.landing` (0) */}
      <div className={`home-landing-orb${logoVisible ? "" : " is-offscreen"}`}>
        <OrbHero
          orbState={orbState}
          mode="landing"
          position="center"
          scale="normal"
          logoVisible={logoVisible}
          animationPaused={!logoVisible}
          transitioning={orbTransitioning}
          isLoading={isLoading}
          introVisible={!showLoader}
        />
      </div>

      <ScrollIndicator visible={!isLoading} />
    </div>
  );
}
