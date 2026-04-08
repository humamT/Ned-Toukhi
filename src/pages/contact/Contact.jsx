import { useEffect, useRef, useState } from "react";
import Orb from "../../components/orb/orb.jsx";
import ScrollIndicator from "../../components/scroll-indicator/ScrollIndicator.jsx";
import contactImage from "../../assets/PNGS+SVGs/Contact/contact.png";
import contactBox from "../../assets/PNGS+SVGs/Contact/contact-box.svg";
import "./Contact.scss";

const stageItems = [
  {
    id: 0,
    title: ["Contact", "تواصل", "Écris-moi"],
    description:
      "Send a quick note, ask a question, or start the first sketch of your next project. I’m here to turn ideas into visual stories.",
    image: contactImage,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
];

export default function ContactPage() {
  const [stageIndex, setStageIndex] = useState(0);
  const stageRef = useRef(0);
  const lockRef = useRef(false);
  const lockTimerRef = useRef(null);
  const touchStartYRef = useRef(null);

  const goToStage = (nextIndex) => {
    const next = Math.max(0, Math.min(stageItems.length - 1, nextIndex));
    stageRef.current = next;
    setStageIndex(next);
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow || "auto";
      window.clearTimeout(lockTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const COOLDOWN = 550;

    const handleWheel = (event) => {
      event.preventDefault();
      if (lockRef.current) return;
      const delta = event.deltaY;
      if (Math.abs(delta) < 12) return;

      lockRef.current = true;
      lockTimerRef.current = window.setTimeout(() => {
        lockRef.current = false;
      }, COOLDOWN);

      if (delta > 0) {
        goToStage(stageRef.current + 1);
      } else {
        goToStage(stageRef.current - 1);
      }
    };

    const handleTouchStart = (event) => {
      touchStartYRef.current = event.touches?.[0]?.clientY ?? null;
    };

    const handleTouchMove = (event) => {
      event.preventDefault();
      if (lockRef.current) return;
      if (touchStartYRef.current == null) return;
      const currentY = event.touches?.[0]?.clientY ?? null;
      if (currentY == null) return;

      const delta = touchStartYRef.current - currentY;
      if (Math.abs(delta) < 24) return;

      lockRef.current = true;
      lockTimerRef.current = window.setTimeout(() => {
        lockRef.current = false;
      }, COOLDOWN);

      if (delta > 0) {
        goToStage(stageRef.current + 1);
      } else {
        goToStage(stageRef.current - 1);
      }
      touchStartYRef.current = currentY;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <main className="contact-page">
      <div className="contact-page__stages">
        {stageItems.map((stage) => (
          <section
            key={stage.id}
            className={`contact-stage contact-stage--${stage.id} ${stageIndex === stage.id ? "is-active" : ""}`}
          >
            <div className="contact-stage__inner">
              {stage.id === 0 ? (
                <>
                  <div className="contact-stage0__scene">
                    <div className="contact-stage0__orb-shell" aria-hidden="true">
                      <Orb />
                    </div>

                    <div className="contact-stage0__content">
                      <div className="contact-stage0__orb-panel" aria-hidden="true">
                        <img
                          className="contact-stage0__envelope"
                          src={contactImage}
                          alt=""
                        />
                      </div>

                      <div className="contact-stage0__copy">
                        {stage.title?.length > 0 && (
                          <div className="contact-stage__titles">
                            {stage.title.map((line, index) => (
                              <h1 key={index}>{line}</h1>
                            ))}
                          </div>
                        )}

                        {stage.description && (
                          <p className="contact-stage__description">{stage.description}</p>
                        )}

                        <div className="contact-stage__scroll-hint" aria-hidden="true">
                          <ScrollIndicator visible={true} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {stage.image && (
                    <div className="contact-stage__visual">
                      <img src={stage.image} alt="Contact illustration" />
                    </div>
                  )}

                  <div className="contact-stage__copy">
                    {stage.title?.length > 0 && (
                      <div className="contact-stage__titles">
                        {stage.title.map((line, index) => (
                          <h1 key={index}>{line}</h1>
                        ))}
                      </div>
                    )}

                    {stage.description && (
                      <p className="contact-stage__description">{stage.description}</p>
                    )}

                    {stage.details && (
                      <div className="contact-stage__details">
                        {stage.details.map((item) => (
                          <div key={item.label} className="contact-stage__detail-item">
                            <span>{item.label}</span>
                            <strong>{item.value}</strong>
                          </div>
                        ))}
                      </div>
                    )}

                    {stage.cta && (
                      <div className="contact-stage__cta">
                        <a href="mailto:hello@nedtoukhi.com">{stage.cta}</a>
                      </div>
                    )}
                  </div>
                </>
              )}

            </div>

            {stage.image && stage.id !== 0 && (
              <img className="contact-stage__accent" src={contactBox} alt="Accent" />
            )}
          </section>
        ))}
      </div>

      <div className="contact-page__pagination">
        {stageItems.map((stage) => (
          <button
            key={stage.id}
            type="button"
            className={`contact-dot ${stageIndex === stage.id ? "is-active" : ""}`}
            onClick={() => goToStage(stage.id)}
            aria-label={`Go to stage ${stage.id + 1}`}
          />
        ))}
      </div>
    </main>
  );
}
