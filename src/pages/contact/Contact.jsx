import { useState } from "react";
import OrbHero from "../../components/orbHero/orbHero.jsx";
import ScrollIndicator from "../../components/scroll-indicator/ScrollIndicator.jsx";
import contactImage from "../../assets/PNGS+SVGs/Contact/contact.png";
import CircleFull from "../../assets/images/Circle-full.svg";
// import contactBox from "../../assets/PNGS+SVGs/Contact/contact-box.svg";
import "./Contact.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    organization: "",
    subject: "",
    email: "",
    message: "",
  });
  const WEB3FORMS_ACCESS_KEY = "605a40af-f0d4-4fce-b1d5-c179cfa63898";

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

  const description =
    "Send a quick note, ask a question, or start the first sketch of your next project. I’m here to turn ideas into visual stories.";

  const canSubmit =
    formValues.name.trim() &&
    formValues.subject.trim() &&
    formValues.email.trim() &&
    formValues.message.trim();

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    setStatus("Sending...");
    try {
      const formData = new FormData(event.target);
      formData.set("access_key", WEB3FORMS_ACCESS_KEY);
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { Accept: "application/json" }, body: formData });
      const data = await response.json();
      if (response.ok && data.success) {
        setStatus("Message sent successfully.");
        event.target.reset();
        setFormValues({
          name: "",
          organization: "",
          subject: "",
          email: "",
          message: "",
        });
        return;
      }
      setStatus(data.message || "Something went wrong. Please try again.");
    } catch {
      setStatus("Network error. Please try again.");
    }
  };

  return (
    <main className="contact-page">

      <section className="contact-stage contact-stage--0">
        <div className="contact-stage0-orb-img-container">
          <img src={CircleFull} alt="Circle Full" className="contact-stage0-orb-img" aria-hidden="true" />
        </div>
        <div className="contact-stage__inner">
          <div className="contact-stage0__scene">

            <div className="contact-stage0__copy-container">
              <div className="contact-stage0__content">
                <div className="contact-stage0__orb-panel" aria-hidden="true">
                  <img className="contact-stage0__envelope" src={contactImage} alt="" />
                </div>

                <div className="contact-stage0__copy">
                  <div className="contact-stage__titles">
                    <div className="contact-stage__title-en">Contact</div>
                    <div className="contact-stage__title-ar">تواصل</div>
                    <div className="contact-stage__title-fr">Écris-moi</div>
                  </div>

                </div>
              </div>
              <p className="contact-stage__description">{description}</p>
              <div className="contact-stage__scroll-hint" aria-hidden="true">
                <ScrollIndicator visible={true} />
              </div>
            </div>
          </div>
        </div>

        {/* <img className="contact-stage__accent" src={contactBox} alt="Accent" /> */}
      </section>

      <section className="contact-form-section">
        <div className="contact-form-card">
          <div className="contact-form-banner">
            <img className="contact-stage0__envelope__banner-1" src={contactImage} alt="" />
            <img className="contact-stage0__envelope__banner-2" src={contactImage} alt="" />

            <div className="contact-form-banner__text">
              <p>
                Please note that you also have the option to complete
                a form to receive an estimate for your project.
              </p>
              <a href="/quotations" className="contact-form-banner__link contact-form-banner__cta">
                Yes please
                <div className="arrows-right">
                  <FontAwesomeIcon icon={faCaretRight} aria-hidden="true" />
                  <FontAwesomeIcon icon={faCaretRight} aria-hidden="true" />
                </div>
              </a>
            </div>
          </div>

          <form className="contact-web3-form" onSubmit={onSubmit}>
            <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
            <input type="text" name="name" placeholder="Name*" value={formValues.name} onChange={onInputChange} required />
            <input type="text" name="organization" placeholder="Organization (if available)" value={formValues.organization} onChange={onInputChange} />
            <input type="text" name="subject" placeholder="Subject*" value={formValues.subject} onChange={onInputChange} required />
            <input type="email" name="email" placeholder="Email*" value={formValues.email} onChange={onInputChange} required />
            <textarea name="message" placeholder="Message...*" value={formValues.message} onChange={onInputChange} required />
            <div className="contact-web3-form__footer">
              <span className="contact-web3-form__status" role="status" aria-live="polite">{status}</span>
              <button type="submit" disabled={!canSubmit}>Send</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
