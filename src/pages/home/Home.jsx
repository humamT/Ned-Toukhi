import { useEffect, useState } from "react";
import Loading from "../../components/loading/loading.jsx";
import Landing from "../../components/landing/landing.jsx";
import OrbHero from "../../components/orbHero/orbHero.jsx";
import ScrollIndicator from "../../components/scroll-indicator/ScrollIndicator.jsx";

const LOADING_DURATION = 2500;
const EXIT_DURATION = 2000;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [orbState, setOrbState] = useState("idle");

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), LOADING_DURATION);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setOrbState("exploding");

      const t1 = setTimeout(() => setOrbState("returning"), EXIT_DURATION);
      const t2 = setTimeout(() => setShowLoader(false), EXIT_DURATION);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isLoading]);

  return (
    <>
      <OrbHero orbState={orbState} />
      {showLoader && <Loading isLoading={isLoading} />}
      <Landing />
      <ScrollIndicator visible={!showLoader} />
    </>
  );
}
