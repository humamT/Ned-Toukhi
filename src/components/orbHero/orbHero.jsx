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
}) {
  return (
    <div
      className={[
        "orb-hero",
        orbState,
        mode === "staged" ? "is-staged" : "is-landing",
        mode === "staged" ? `orb-hero--${position}` : "",
        mode === "staged" ? `orb-hero--scale-${scale}` : "",
        transitioning ? "is-transitioning" : "",
      ].join(" ")}
    >
      <Orb />

      {logoVisible && (
        <img src={logo} alt="Logo" className="orb-hero-logo" />
      )}
    </div>
  );
}
