import Orb from "../../components/orb/orb.jsx";
import ScrollIndicator from "../../components/scroll-indicator/ScrollIndicator.jsx";
import contactImage from "../../assets/PNGS+SVGs/Contact/contact.png";
import contactBox from "../../assets/PNGS+SVGs/Contact/contact-box.svg";
import "./Contact.scss";

export default function ContactPage() {
  // Stage method removed (kept for reference)
  /*
  const stage = useMemo(
    () => ({
      title: ["Contact", "تواصل", "Écris-moi"],
      description:
        "Send a quick note, ask a question, or start the first sketch of your next project. I’m here to turn ideas into visual stories.",
    }),
    []
  );
  */

  const titles = ["Contact", "تواصل", "Écris-moi"];
  const description =
    "Send a quick note, ask a question, or start the first sketch of your next project. I’m here to turn ideas into visual stories.";

  return (
    <main className="contact-page">
      <section className="contact-stage contact-stage--0 is-active">
        <div className="contact-stage__inner">
          <div className="contact-stage0__scene">
            <div className="contact-stage0__orb-shell" aria-hidden="true">
              <Orb quality="auto" />
            </div>

            <div className="contact-stage0__content">
              <div className="contact-stage0__orb-panel" aria-hidden="true">
                <img className="contact-stage0__envelope" src={contactImage} alt="" />
              </div>

              <div className="contact-stage0__copy">
                <div className="contact-stage__titles">
                  {titles.map((line, index) => (
                    <h1 key={index}>{line}</h1>
                  ))}
                </div>

                <p className="contact-stage__description">{description}</p>

                <div className="contact-stage__scroll-hint" aria-hidden="true">
                  <ScrollIndicator visible={true} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <img className="contact-stage__accent" src={contactBox} alt="Accent" />
      </section>
    </main>
  );
}
