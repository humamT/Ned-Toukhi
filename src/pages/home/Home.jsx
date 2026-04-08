import { useEffect, useState, useRef } from "react";
import Loading from "../../components/loading/loading.jsx";
import Landing from "../../components/landing/landing.jsx";
import OrbHero from "../../components/orbHero/orbHero.jsx";
import ScrollStageController from "../../components/scroll-stage/ScrollStageController.jsx";
import ScrollIndicator from "../../components/scroll-indicator/ScrollIndicator.jsx";
import StageContent from "../../components/stage-content/StageContent.jsx";

/* Timings (must match orbHero.scss) */
const LOADER_SHOW_MS = 2500;   // loader stays visible
const LOADER_EXIT_MS = 2000;   // loader exit animation
const ORB_FADE_MS = 900;       // total fade-out/in when crossing 0 ⇄ 1
const ORB_FADE_MID_MS = 450;   // moment orb is fully hidden (mode switch)



const ORB_STAGE_MAP = {
  0: { position: "center", scale: "normal" },    // landing
  1: { position: "right", scale: "normal" },     // boutique intro
  2: { position: "center", scale: "normal" },    // gallery intro

  3: { position: "far-left", scale: "normal" }, // gallery tab 1
  4: { position: "far-left", scale: "normal" }, // gallery tab 2
  5: { position: "far-left", scale: "normal" }, // gallery tab 3

  6: { position: "center", scale: "normal" },    // quotations
  7: { position: "left", scale: "normal" },      // contact
  8: { position: "left-more", scale: "about" }, // about

  9: { position: "center", scale: "large" },     // featured clients (bigger orb)
  10: { position: "center", scale: "normal" },   // footer
};

export default function Home({ setHeaderVisible }) {
  // Loader state
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  // Orb FX state
  const [orbState, setOrbState] = useState("idle");

  // Orb “mode” and logo visibility are no longer derived directly from stageIndex.
  // They are controlled during transitions so 0⇄1 can fade correctly.
  const [orbMode, setOrbMode] = useState("landing"); // "landing" | "staged"
  const [logoVisible, setLogoVisible] = useState(true);
  const [orbTransitioning, setOrbTransitioning] = useState(false);

  // Stage state
  const [stageIndex, setStageIndex] = useState(0);
  const prevStageRef = useRef(0);

  // Orb choreography state
  const [orbPosition, setOrbPosition] = useState("center");
  const [orbScale, setOrbScale] = useState("normal");

  /* Loader */
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), LOADER_SHOW_MS);
    return () => clearTimeout(t);
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

  /* Stage reactions */
  useEffect(() => {
    setHeaderVisible(stageIndex > 0);

    // Helpers local to this effect for readability
    const prev = prevStageRef.current;
    const cfg = ORB_STAGE_MAP[stageIndex];
    const applyStageCfg = (c) => {
      if (!c) return;
      setOrbPosition(c.position); // WHERE orb sits (left % via class)
      setOrbScale(c.scale);        // HOW BIG the orb is
    };

    // Special transition 0 -> 1: fade out, swap mode, then move right
    if (prev === 0 && stageIndex === 1) {
      setOrbTransitioning(true); // triggers fade animation in CSS

      setOrbMode("landing");    // start from landing positioning
      setLogoVisible(true);       // logo visible while fading out
      setOrbPosition("center");
      setOrbScale(cfg?.scale ?? "normal");

      const mid = setTimeout(() => {
        setOrbMode("staged");   // swap to staged while hidden
        setLogoVisible(false);    // hide logo after fade-out
        setOrbPosition(cfg?.position ?? "right"); // jump to stage-1 position while hidden
      }, ORB_FADE_MID_MS);

      const end = setTimeout(() => {
        setOrbTransitioning(false); // fade complete
        applyStageCfg(cfg);          // now move to stage 1 position (right)
      }, ORB_FADE_MS);

      prevStageRef.current = stageIndex;
      return () => {
        clearTimeout(mid);
        clearTimeout(end);
      };
    }

    // Special transition 1 -> 0: fade out staged orb, return to landing
    if (prev === 1 && stageIndex === 0) {
      setOrbTransitioning(true); // triggers fade animation in CSS

      setOrbMode("staged");   // currently fixed position
      setLogoVisible(false);   // logo hidden while staged

      const mid = setTimeout(() => {
        setOrbMode("landing");    // swap back to landing while hidden
        setLogoVisible(true);       // show logo again
        setOrbPosition("center");
        setOrbScale("normal");
      }, ORB_FADE_MID_MS);

      const end = setTimeout(() => {
        setOrbTransitioning(false); // fade complete, landing visible
      }, ORB_FADE_MS);

      prevStageRef.current = stageIndex;
      return () => {
        clearTimeout(mid);
        clearTimeout(end);
      };
    }

    // Normal transitions (no fade): just move/scale per stage map
    setOrbTransitioning(false);
    setOrbMode(stageIndex === 0 ? "landing" : "staged"); // landing only on stage 0
    setLogoVisible(stageIndex === 0);                       // logo only on landing
    applyStageCfg(cfg);                                     // move/scale to new stage

    prevStageRef.current = stageIndex;
  }, [stageIndex, setHeaderVisible]);



  return (
    <div>
      <OrbHero
        orbState={orbState}
        mode={orbMode}
        position={orbPosition}
        scale={orbScale}
        logoVisible={logoVisible}
        transitioning={orbTransitioning}
      />



      {showLoader && <Loading isLoading={isLoading} />}

      <Landing visible={stageIndex === 0} />

      <StageContent stageIndex={stageIndex} />

      <ScrollIndicator visible={!isLoading && stageIndex !== 10} />

      <ScrollStageController
        enabled={!isLoading}
        onStageChange={(index) => setStageIndex(index)}
      />
    </div>
  );
}
