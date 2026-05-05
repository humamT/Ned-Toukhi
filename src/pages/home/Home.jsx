import { useEffect, useMemo, useRef, useState } from "react";
import "./Home.scss";
import Loading from "../../components/loading/loading.jsx";
import Landing from "../../components/landing/landing.jsx";
import OrbHero from "../../components/orbHero/orbHero.jsx";
import ScrollIndicator from "../../components/scroll-indicator/ScrollIndicator.jsx";
import Footer from "../../components/footer/footer.jsx";
import "../../components/stage-content/StageContent.scss";
import { NavLink } from "react-router-dom";

import stickerImg from "../../assets/images/sticker-op.png";
import postersCluster from "../../assets/images/posters-cluster.png";
import galleryBubble from "../../assets/PNGS+SVGs/photo-pubble.svg";
import illustrationsBox from "../../assets/PNGS+SVGs/tab1.svg";
import featuredBox from "../../assets/PNGS+SVGs/tab2.svg";
import identitiesBox from "../../assets/PNGS+SVGs/tab3.svg";
import click1 from "../../assets/PNGS+SVGs/click1.svg";
import click2 from "../../assets/PNGS+SVGs/click2.svg";
import click3 from "../../assets/PNGS+SVGs/click3.svg";
import whiteLine from "../../assets/PNGS+SVGs/Circle-white-line.svg";
import yellowLine from "../../assets/PNGS+SVGs/yellow-line.svg";
import redLine from "../../assets/PNGS+SVGs/red-line.svg";
import tealLine from "../../assets/PNGS+SVGs/teal-line.svg";

import emptyOrb from "../../assets/images/Circle-empty.svg";

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
import featuredLogos from "../../assets/PNGS+SVGs/Featured-Clients/Featured-Clients-logos.svg";

import galleryborder from "../../assets/PNGS+SVGs/gallery-border-1.svg";
import scrollBar from "../../assets/PNGS+SVGs/scroll-bar.svg";
import scrollTic from "../../assets/PNGS+SVGs/scroll-tic.svg";

import theMask from "../../assets/PNGS+SVGs/Quotations/devis.png";
import Letterhead from "../../assets/PNGS+SVGs/Quotations/Letterhead-Mockup.png";

import contactEnvelope from "../../assets/PNGS+SVGs/Contact/contact.png";
import contactBox from "../../assets/PNGS+SVGs/Contact/contact-box.svg";

/* Timings (must match orbHero.scss) */
const LOADER_SHOW_MS = 2500;   // loader stays visible
const LOADER_EXIT_MS = 2000;   // loader exit animation

/** Toggled on `<html>` for scroll-snap rules in `StageContent.scss` */
const HOME_STAGE_SNAP_CLASS = "home-stage-snap";
/** Pixels from viewport top: show header once stage / landing spacer has passed this band */
const STAGE_HEADER_REVEAL_PX = 96;



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
  // No "swap-in-place" animation state needed when cards scroll as real sections.

  useEffect(() => {
    activeGalleryIdRef.current = activeGalleryId;
  }, [activeGalleryId]);

  const scrollToGalleryStep = (id) => {
    // Treat clicks like a controlled transition too.
    galleryAnimatingRef.current = true;
    if (galleryAnimTimeoutRef.current) window.clearTimeout(galleryAnimTimeoutRef.current);
    galleryAnimTimeoutRef.current = window.setTimeout(() => {
      galleryAnimatingRef.current = false;
    }, 480);

    setActiveGalleryId(id);
    document.getElementById(`gallery-step-${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  const galleryTabs = useMemo(
    () => [
      { id: 3, key: "illustrations", labelEn: "Illustrations", labelAr: "رسومات", labelFr: "Dessins" },
      { id: 4, key: "featured", labelEn: "Featured", labelAr: "أعمال خاصة", labelFr: "Sélectionnés" },
      { id: 5, key: "identities", labelEn: "Identities", labelAr: "هويات بصرية", labelFr: "Charts graphiques" },
    ],
    []
  );

  const GalleryTabs = ({ activeId }) => (
    <div className="tabs-rectangles">
      <div
        className={`tab-rectangle1 ${activeId !== 3 ? "not-stage" : ""}`}
        onClick={() => scrollToGalleryStep(3)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") scrollToGalleryStep(3);
        }}
      >
        <img className="illustrationsBox" src={illustrationsBox} alt="illustrations Box" />
        <div className="illustrations-txt">
          <div className="illustrations-en">Illustrations</div>
          <div className="illustrations-ar">رسومات</div>
          <div className="illustrations-fr">Dessins</div>
        </div>
        <svg className={`click-txt ${activeId !== 3 ? "not-stage-txt" : ""}`} viewBox="0 0 200 200" aria-hidden="true" role="img">
          <defs>
            <path id="scroll-circle-path-illustrations" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
          </defs>
          <text textAnchor="middle" dominantBaseline="middle">
            <textPath xlinkHref="#scroll-circle-path-illustrations" startOffset="50%">
              - Go to gallery - Voir la gallerie - إذهب إلى المعرض
            </textPath>
          </text>
        </svg>
        <img className={`click1 ${activeId !== 3 ? "not-stage-txt" : ""}`} src={click1} alt="illustrations Box clickable circle" />
      </div>

      <div
        className={`tab-rectangle2 ${activeId !== 4 ? "not-stage" : ""}`}
        onClick={() => scrollToGalleryStep(4)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") scrollToGalleryStep(4);
        }}
      >
        <img className="featuredBox" src={featuredBox} alt="featured Box" />
        <div className="featured-txt">
          <div className="featured-en">Featured</div>
          <div className="featured-ar">أعمال خاصة</div>
          <div className="featured-fr">Sélectionnés</div>
        </div>
        <svg className={`click-txt ${activeId !== 4 ? "not-stage-txt" : ""}`} viewBox="0 0 200 200" aria-hidden="true" role="img">
          <defs>
            <path id="scroll-circle-path-featured" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
          </defs>
          <text textAnchor="middle" dominantBaseline="middle">
            <textPath xlinkHref="#scroll-circle-path-featured" startOffset="50%">
              - Go to gallery - Voir la gallerie - إذهب إلى المعرض
            </textPath>
          </text>
        </svg>
        <img className={`click2 ${activeId !== 4 ? "not-stage-txt" : ""}`} src={click2} alt="featured Box clickable circle" />
      </div>

      <div
        className={`tab-rectangle3 ${activeId !== 5 ? "not-stage" : ""}`}
        onClick={() => scrollToGalleryStep(5)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") scrollToGalleryStep(5);
        }}
      >
        <img className="identitiesBox" src={identitiesBox} alt="identities Box" />
        <div className="identities-txt">
          <div className="identities-en">Identities</div>
          <div className="identities-ar">هويات بصرية</div>
          <div className="identities-fr">Charts graphiques</div>
        </div>
        <svg className={`click-txt ${activeId !== 5 ? "not-stage-txt" : ""}`} viewBox="0 0 200 200" aria-hidden="true" role="img">
          <defs>
            <path id="scroll-circle-path-identities" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
          </defs>
          <text textAnchor="middle" dominantBaseline="middle">
            <textPath xlinkHref="#scroll-circle-path-identities" startOffset="50%">
              - Go to gallery - Voir la gallerie - إذهب إلى المعرض
            </textPath>
          </text>
        </svg>
        <img className={`click3 ${activeId !== 5 ? "not-stage-txt" : ""}`} src={click3} alt="identities Box clickable circle" />
      </div>
    </div>
  );

  const GalleryCards = ({ id }) => (
    <div className="gallery-content">
      <div className="gallery-cards">
        <div className="gallery-stack">
          {id === 3 && (
            <div className="gallery-illustrations">
              <div className="spotlight-yellow"></div>
              <div className="illustration1">
                <img className="illustration-border" src={galleryborder} alt="" />
                <img className="illustration-img" src={illustration1} alt="" />
              </div>
              <div className="illustration2">
                <img className="illustration-border" src={galleryborder} alt="" />
                <img className="illustration-img" src={illustration2} alt="" />
              </div>
              <div className="illustration3">
                <img className="illustration-border" src={galleryborder} alt="" />
                <img className="illustration-img" src={illustration3} alt="" />
              </div>
              <div className="illustration4">
                <img className="illustration-border" src={galleryborder} alt="" />
                <img className="illustration-img" src={illustration4} alt="" />
              </div>
            </div>
          )}

          {id === 4 && (
            <div className="gallery-featured">
              <div className="spotlight-red"></div>
              <div className="featured1">
                <img className="featured-border" src={galleryborder} alt="" />
                <img className="featured-img" src={featured1} alt="" />
              </div>
              <div className="featured2">
                <img className="featured-border" src={galleryborder} alt="" />
                <img className="featured-img" src={featured2} alt="" />
              </div>
              <div className="featured3">
                <img className="featured-border" src={galleryborder} alt="" />
                <img className="featured-img" src={featured3} alt="" />
              </div>
              <div className="featured4">
                <img className="featured-border" src={galleryborder} alt="" />
                <img className="featured-img" src={featured4} alt="" />
              </div>
            </div>
          )}

          {id === 5 && (
            <div className="gallery-identities">
              <div className="spotlight-teal"></div>
              <div className="identities1">
                <img className="identities-border" src={galleryborder} alt="" />
                <img className="identities-img" src={identities1} alt="" />
              </div>
              <div className="identities2">
                <img className="identities-border" src={galleryborder} alt="" />
                <img className="identities-img" src={identities2} alt="" />
              </div>
              <div className="identities3">
                <img className="identities-border" src={galleryborder} alt="" />
                <img className="identities-img" src={identities3} alt="" />
              </div>
              <div className="identities4">
                <img className="identities-border" src={galleryborder} alt="" />
                <img className="identities-img" src={identities4} alt="" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const lazyImgProps = {
    loading: "lazy",
    decoding: "async",
    fetchPriority: "low",
  };

  // Stage 3: observe internal steps to switch right gallery content.
  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;

    const ids = [3, 4, 5];
    const els = ids
      .map((id) => document.getElementById(`gallery-step-${id}`))
      .filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (galleryAnimatingRef.current) return;

        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!best?.target?.id) return;
        const id = Number(best.target.id.replace("gallery-step-", ""));
        if (!ids.includes(id)) return;
        if (id === activeGalleryIdRef.current) return;

        // Hysteresis: avoid flip/flop while slowly scrolling near boundaries.
        const now = Date.now();
        if (now - lastGallerySetAtRef.current < 260) return;

        if (galleryDebounceRef.current) window.clearTimeout(galleryDebounceRef.current);
        galleryDebounceRef.current = window.setTimeout(() => {
          lastGallerySetAtRef.current = Date.now();
          setActiveGalleryId(id);
        }, 110);
      },
      { threshold: 0.25, rootMargin: "-10% 0px -40% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => {
      obs.disconnect();
      if (galleryDebounceRef.current) window.clearTimeout(galleryDebounceRef.current);
      if (galleryAnimTimeoutRef.current) window.clearTimeout(galleryAnimTimeoutRef.current);
    };
  }, []);

  /* Loader */
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), LOADER_SHOW_MS);
    return () => clearTimeout(t);
  }, []);

  /* Ensure native page scrolling is enabled on Home */
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add(HOME_STAGE_SNAP_CLASS);
    return () => root.classList.remove(HOME_STAGE_SNAP_CLASS);
  }, []);

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
        <div id="stage-content" className="stage-content">
          {/* Store */}
          <section className="stage-section">
            <div className="stage-content__stage stage-content__stage-1">
              <div className="stage-1__orb-content">
                <div className="stage-orb stage-orb--s1" aria-hidden="true" />
                <div className="stage-1__main-text">
                  <div className="stage-1__title">
                    <div className="stage-1__title-en">Store</div>
                    <div className="stage-1__title-ar">المتجر</div>
                    <div className="stage-1__title-fr">Boutique</div>
                  </div>
                  <img src={stickerImg} alt="Sticker" className="stage-1__sticker" />
                </div>

                <div className="stage-1__subtitle">
                  Postcards, stickers, posters, BUY THEM ALL!, chose between a wide selection of original art
                  projects and get them delevered.
                </div>
                <NavLink to="/store" className="shop-now">Shop NOW!</NavLink>
              </div>

              <div className="stage-1__posters-section">
                <img {...lazyImgProps} src={postersCluster} alt="Posters cluster" className="stage-1__posters" />
              </div>
            </div>
          </section>

          {/* Gallery intro */}
          <section className="stage-section">
            <div className="stage-content__stage stage-content__stage-2">
              <div className="stage-orb stage-orb--s2" aria-hidden="true" />
              <div className="stage-2__orb-content">
                <div className="stage-2__main-text">
                  <div className="stage-2__title">
                    <div className="stage-2__title-en">Gallery</div>
                    <div className="stage-2__title-ar">المعرض</div>
                    <div className="stage-2__title-fr">Galerie</div>
                  </div>
                </div>

                <div className="stage-2__subtitle">
                  Discover 3 categories of %100 human-made art, from illustrations and logo designs to standout
                  featured projects.
                </div>

                <div>
                  <img className="gallery1 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
                  <img className="gallery2 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
                  <img className="gallery3 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
                  <img className="gallery4 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
                </div>

                <NavLink to="/gallery" className="explore-now">Explore NOW!</NavLink>
              </div>
            </div>
          </section>

          {/* Gallery (stage 3): sticky in place, scroll switches right-side content, then releases */}
          <section className="stage-section stage-section--gallery">
            <div className="gallery-layout">
              <div className="gallery-sidebar">
                <div className="stage-orb stage-orb--s3" aria-hidden="true" />
                <div className="stage-3__orb-content">
                  <div className="stage-3__orb-content-top">
                    <div className="stage-3__main-text">
                      <div className="stage-3__title">
                        <div className="stage-3__title-en">Gallery</div>
                        <div className="stage-3__title-ar">المعرض</div>
                        <div className="stage-3__title-fr">Galerie</div>
                      </div>
                    </div>
                    <NavLink to="/gallery/illustrations" className="explore-now-tabs">Explore NOW!</NavLink>
                  </div>

                  <div className="gallery-tabs-container">
                    <GalleryTabs activeId={activeGalleryId} />

                    <div className="tabs-all-lines">
                      <img className="white-line lines" src={whiteLine} alt="" />
                      <img className={`tab-yellow-line lines ${activeGalleryId !== 3 ? "not-stage-line" : ""}`} src={yellowLine} alt="" />
                      <img className={`tab-red-line lines ${activeGalleryId !== 4 ? "not-stage-line" : ""}`} src={redLine} alt="" />
                      <img className={`tab-teal-line lines ${activeGalleryId !== 5 ? "not-stage-line" : ""}`} src={tealLine} alt="" />
                    </div>
                  </div>
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
                <div className="stage-orb stage-orb--s4" aria-hidden="true" />
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
                  <NavLink to="/quotations" className="first-click">First click ;)</NavLink>
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
              <div className="stage-7__orb-content">
                {/* <div className="stage-7__envelope-wrap"> */}
                  <div className="stage-orb stage-orb--s5" aria-hidden="true" />
                  <img {...lazyImgProps} className="Envelope" src={contactEnvelope} alt="Envelope illustration" />
                {/* </div> */}
                <img className="Envelope-emptyOrb" src={emptyOrb} alt="" />

                <img {...lazyImgProps} className="contactBox" src={contactBox} alt="contact box" />

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
                  <NavLink to="/contact" className="contact-btn">Contact</NavLink>
                </div>
              </div>
            </div>
          </section>

          {/* About */}
          <section className="stage-section">
            <div className="stage-content__stage stage-content__stage-8">
              <div className="stage-8__orb-content">
                <div className="personal-img-bubble">
                  <div className="stage-orb stage-orb--s6" aria-hidden="true" />
                  <img {...lazyImgProps} className="personalImg" src={personalImg} alt="profile img" />
                  <img className="personalBubble" src={galleryBubble} alt="the orb around the profile img" />
                </div>

                <img {...lazyImgProps} className="aboutBox" src={aboutBox} alt="about box" />

                <div className="stage-8__subtitle">
                  <p>Muhanad ALTOUKHI, Syrian graphic designer and illustrator.</p>
                  <p>Originally from Douma, on the outskirts of Damascus, I began
                    learning graphic design in 2014 during the military siege of Eastern
                    Ghouta. In 2024, I completed my DNMADE in Graphic Design in Paris.</p>
                  <p>Living between these two worlds has shaped my creative vision,
                    allowing me to develop hybrid, multicultural projects enriched by a
                    unique perspective one that I’m excited to share and work with you.</p>
                </div>

                <div className="about-cards">
                  <div className="about-card">
                    <img className="about-border" src={galleryborder} alt="" />
                    <img {...lazyImgProps} className="about-img" src={aboutCard1} alt="" />
                  </div>
                  <div className="about-card higher-card">
                    <img className="about-border" src={galleryborder} alt="" />
                    <img {...lazyImgProps} className="about-img" src={aboutCard2} alt="" />
                  </div>
                  <div className="about-card">
                    <img className="about-border" src={galleryborder} alt="" />
                    <img {...lazyImgProps} className="about-img" src={aboutCard3} alt="" />
                  </div>
                  <div className="about-card higher-card">
                    <img className="about-border" src={galleryborder} alt="" />
                    <img {...lazyImgProps} className="about-img" src={aboutCard4} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured clients */}
          <section className="stage-section">
            <div className="stage-content__stage stage-content__stage-9">
              <div className="stage-9__orb-content">
                <div className="stage-orb stage-orb--s7" aria-hidden="true" />
                <div className="stage-9__main-text">Featured Clients</div>
                <img {...lazyImgProps} className="featuredClientsBox" src={featuredClientsBox} alt="featured Box" />
                <img {...lazyImgProps} className="featuredLogos" src={featuredLogos} alt="featured Logos" />
              </div>
            </div>
          </section>

          {/* Footer */}
          {/* <section className="stage-section stage-section--footer">
            <div className="stage-content__stage stage-content__stage-10">
              <Footer />
            </div>
          </section> */}
        </div>
      </div>

      {showLoader && <Loading isLoading={isLoading} />}

      {/* Own stacking layer so orb/logo sit above `.loader` (z-index 99); gradient stays in `.landing` (0) */}
      <div className="home-landing-orb">
        <OrbHero
          orbState={orbState}
          mode="landing"
          position="center"
          scale="normal"
          logoVisible={logoVisible}
          transitioning={orbTransitioning}
        />
      </div>

      <ScrollIndicator visible={!isLoading} />
    </div>
  );
}
