import "./landing.scss";
import GradientBackground from "../background/background.jsx";

export default function Landing({ visible }) {
  return (
    <section className={`landing ${visible ? "is-visible" : "is-hidden"}`}>
      <GradientBackground />
    </section>
  );
}
