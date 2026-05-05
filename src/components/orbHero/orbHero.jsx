import "./orbHero.scss";
import Orb from "../orb/orb.jsx";
import logo from "../../assets/images/Logo-icon-2.svg";

export default function OrbHero({
  orbState,
  mode = "landing",          // "landing" | "staged"
  position = "center",
  scale = "normal",
  logoVisible = true,
  transitioning = false,
  isLoading = false,
  introVisible = false,
}) {
  return (
    <div
      className={[
        "orb-hero",
        orbState,
        isLoading ? "is-loading" : "is-loaded",
        introVisible ? "is-intro-visible" : "",
        mode === "staged" ? "is-staged" : "is-landing",
        mode === "staged" ? `orb-hero--${position}` : "",
        mode === "staged" ? `orb-hero--scale-${scale}` : "",
        transitioning ? "is-transitioning" : "",
      ].join(" ")}
    >
      <Orb />

      <div className="orb-hero-spotlight" aria-hidden="true" />

      {logoVisible && (
        <img src={logo} alt="Logo" className="orb-hero-logo" />
      )}

      <div className="orb-hero-intro" aria-hidden={!introVisible}>
        <h1 className="orb-hero-intro__name">MUHANAD ALTOUKHI</h1>
        <h2 className="orb-hero-intro__tagline">Graphic Designer, Illustration Artist</h2>
        <h3 className="orb-hero-intro__location">Based in Paris</h3>


          <span className="divider-accent orb-hero-intro__divider">
            <i className="c1" />
            <i className="c2" />
            <i className="c3" />
            <i className="c4" />
            <i className="c5" />
          </span>

      </div>
    </div>
  );
}
