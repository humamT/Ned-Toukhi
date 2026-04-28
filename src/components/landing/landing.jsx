import "./landing.scss";
import GradientBackground from "../background/background.jsx";

export default function Landing({ children }) {
  return (
    <section id="landing" className="landing">
      <GradientBackground />
      {children}
    </section>
  );
}
