import Orb from "../orb/orb.jsx";
import logo from "../../assets/images/Logo-icon-2.svg";
import "./orbHero.scss";

export default function OrbHero({ orbState }) {
  return (
    <div className={`orb-hero ${orbState}`}>
      <Orb />
      <img src={logo} alt="Logo" className="orb-hero-logo" />
    </div>
  );
}
