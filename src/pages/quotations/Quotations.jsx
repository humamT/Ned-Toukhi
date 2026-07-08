import { useEffect, useMemo, useState } from "react";
import "./Quotations.scss";
import ScrollIndicator from "../../components/scroll-indicator/ScrollIndicator.jsx";
import CircleFull from "../../assets/images/Circle-full.svg";
import theMask from "../../assets/PNGS+SVGs/Quotations/devis.png";
import Letterhead from "../../assets/PNGS+SVGs/Quotations/Letterhead-Mockup.png";
import {
  QUESTIONNAIRE,
  buildQuotationSummary,
  getQuotationResult,
} from "./quotationLogic.js";

const lazyImgProps = {
  loading: "lazy",
  decoding: "async",
  fetchPriority: "low",
};

const WEB3FORMS_ACCESS_KEY = "605a40af-f0d4-4fce-b1d5-c179cfa63898";

const EXPLANATION =
  "To get a price range that fits your project, please fill out this short form based on a few key questions. It only takes about 5 minutes. Please keep in mind that this range is approximate, and the final quote may vary.";

const CONTACT_PROMPT = "Would you like to send this quotation by email?";

const VIEWS = {
  QUESTION: "question",
  RESULT: "result",
  CONTACT_PROMPT: "contact-prompt",
  CONTACT_FORM: "contact-form",
  DONE: "done",
};

const TRANSITION_MS = 240;

export default function QuotationsPage() {
  const [view, setView] = useState(VIEWS.QUESTION);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [panelVisible, setPanelVisible] = useState(true);
  const [contactChoice, setContactChoice] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const currentQuestion = QUESTIONNAIRE[questionIndex];
  const result = useMemo(() => getQuotationResult(answers), [answers]);
  const quotationSummary = useMemo(
    () => buildQuotationSummary(answers, result),
    [answers, result]
  );

  const progress =
    view === VIEWS.QUESTION
      ? ((questionIndex + 1) / QUESTIONNAIRE.length) * 100
      : 100;

  const canGoNext =
    view === VIEWS.QUESTION
      ? Boolean(selectedOption)
      : view === VIEWS.CONTACT_PROMPT
        ? Boolean(contactChoice)
        : false;

  const canGoPrevious =
    view === VIEWS.QUESTION
      ? questionIndex > 0
      : view === VIEWS.RESULT ||
      view === VIEWS.CONTACT_PROMPT ||
      view === VIEWS.CONTACT_FORM;

  useEffect(() => {
    if (view !== VIEWS.QUESTION) return;
    const existing = answers.find((entry) => entry.question === currentQuestion.question);
    setSelectedOption(existing?.answer ?? "");
  }, [view, questionIndex, currentQuestion.question, answers]);

  const transitionTo = (nextView, updater) => {
    setPanelVisible(false);
    window.setTimeout(() => {
      if (updater) updater();
      setView(nextView);
      setPanelVisible(true);
    }, TRANSITION_MS);
  };

  const saveCurrentAnswer = (option = selectedOption) => {
    if (!option) return answers;
    const next = answers.filter((entry) => entry.question !== currentQuestion.question);
    next.push({ question: currentQuestion.question, answer: option });
    setAnswers(next);
    return next;
  };

  const handleNext = () => {
    if (view === VIEWS.QUESTION) {
      if (!selectedOption) return;

      if (questionIndex < QUESTIONNAIRE.length - 1) {
        saveCurrentAnswer();
        transitionTo(VIEWS.QUESTION, () => setQuestionIndex((index) => index + 1));
        return;
      }

      saveCurrentAnswer();
      transitionTo(VIEWS.RESULT);
      return;
    }

    if (view === VIEWS.CONTACT_PROMPT) {
      if (contactChoice === "yes") {
        transitionTo(VIEWS.CONTACT_FORM);
        return;
      }
      if (contactChoice === "no") {
        transitionTo(VIEWS.DONE);
      }
    }
  };

  const handlePrevious = () => {
    if (view === VIEWS.CONTACT_FORM) {
      transitionTo(VIEWS.CONTACT_PROMPT);
      return;
    }

    if (view === VIEWS.CONTACT_PROMPT) {
      transitionTo(VIEWS.RESULT);
      return;
    }

    if (view === VIEWS.RESULT) {
      transitionTo(VIEWS.QUESTION, () => setQuestionIndex(QUESTIONNAIRE.length - 1));
      return;
    }

    if (view === VIEWS.QUESTION && questionIndex > 0) {
      transitionTo(VIEWS.QUESTION, () => setQuestionIndex((index) => index - 1));
    }
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const canSubmitForm =
    formValues.name.trim() && formValues.email.trim() && formValues.message.trim();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmitForm) return;

    setSubmitStatus("Sending...");
    try {
      const formData = new FormData(event.target);
      formData.set("access_key", WEB3FORMS_ACCESS_KEY);
      formData.set("quotation_summary", quotationSummary);
      formData.set("quotation_result", result.price ?? result.message ?? "");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("Quotation sent successfully.");
        transitionTo(VIEWS.DONE);
        return;
      }

      setSubmitStatus(data.message || "Something went wrong. Please try again.");
    } catch {
      setSubmitStatus("Network error. Please try again.");
    }
  };

  const panelKey =
    view === VIEWS.QUESTION ? `question-${questionIndex}` : view;

  const renderQuestionPanel = () => (
    <>
      <h2 className="quotations-card__question">{currentQuestion.question}</h2>
      <ul className="quotations-options" role="listbox" aria-label={currentQuestion.question}>
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOption === option;
          return (
            <li key={option}>
              <button
                type="button"
                className={`quotations-option ${isSelected ? "is-selected" : ""}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => setSelectedOption(option)}
              >
                <span className="quotations-option__indicator" aria-hidden="true" />
                <span className="quotations-option__label">{option}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );

  const renderResultPanel = () => (
    <div className="quotations-result">
      <h2 className="quotations-card__question">Your estimated quotation</h2>
      {result.price ? (
        <p className="quotations-result__price">{result.price}</p>
      ) : (
        <p className="quotations-result__message">{result.message}</p>
      )}
      <p className="quotations-result__note">
        This range is approximate. The final quote may vary after reviewing your project details.
      </p>
      <button
        type="button"
        className="quotations-result__continue"
        onClick={() => transitionTo(VIEWS.CONTACT_PROMPT)}
      >
        Continue
      </button>
    </div>
  );

  const renderContactPrompt = () => (
    <>
      <h2 className="quotations-card__question">{CONTACT_PROMPT}</h2>
      <ul className="quotations-options" role="listbox" aria-label={CONTACT_PROMPT}>
        {[
          { id: "yes", label: "Yes, send by email" },
          { id: "no", label: "No, thank you" },
        ].map((option) => {
          const isSelected = contactChoice === option.id;
          return (
            <li key={option.id}>
              <button
                type="button"
                className={`quotations-option ${isSelected ? "is-selected" : ""}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => setContactChoice(option.id)}
              >
                <span className="quotations-option__indicator" aria-hidden="true" />
                <span className="quotations-option__label">{option.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );

  const renderContactForm = () => (
    <form className="quotations-form" onSubmit={onSubmit}>
      <h2 className="quotations-card__question">Send your quotation</h2>
      <p className="quotations-form__intro">
        Share your details and I will get back to you with a tailored follow-up.
      </p>

      <label className="quotations-form__field">
        <span>Name</span>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={onInputChange}
          required
        />
      </label>

      <label className="quotations-form__field">
        <span>Email</span>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={onInputChange}
          required
        />
      </label>

      <label className="quotations-form__field">
        <span>Organization</span>
        <input
          type="text"
          name="organization"
          value={formValues.organization}
          onChange={onInputChange}
        />
      </label>

      <label className="quotations-form__field">
        <span>Message</span>
        <textarea
          name="message"
          rows={4}
          value={formValues.message}
          onChange={onInputChange}
          required
        />
      </label>

      <input type="hidden" name="quotation_summary" value={quotationSummary} readOnly />
      <input
        type="hidden"
        name="quotation_result"
        value={result.price ?? result.message ?? ""}
        readOnly
      />

      {submitStatus ? <p className="quotations-form__status">{submitStatus}</p> : null}

      <button type="submit" className="quotations-form__submit" disabled={!canSubmitForm}>
        Send quotation
      </button>
    </form>
  );

  const renderDonePanel = () => (
    <div className="quotations-result">
      <h2 className="quotations-card__question">Thank you</h2>
      <p className="quotations-result__message">
        {submitStatus || "Your responses have been recorded. Feel free to reach out anytime."}
      </p>
      <button
        type="button"
        className="quotations-result__continue"
        onClick={() => {
          setAnswers([]);
          setQuestionIndex(0);
          setSelectedOption("");
          setContactChoice("");
          setSubmitStatus("");
          setFormValues({ name: "", email: "", organization: "", message: "" });
          setView(VIEWS.QUESTION);
          setPanelVisible(true);
        }}
      >
        Start over
      </button>
    </div>
  );

  const renderPanelContent = () => {
    if (view === VIEWS.QUESTION) return renderQuestionPanel();
    if (view === VIEWS.RESULT) return renderResultPanel();
    if (view === VIEWS.CONTACT_PROMPT) return renderContactPrompt();
    if (view === VIEWS.CONTACT_FORM) return renderContactForm();
    return renderDonePanel();
  };

  const showNav = view === VIEWS.QUESTION || view === VIEWS.CONTACT_PROMPT;

  const nextLabel =
    view === VIEWS.QUESTION && questionIndex === QUESTIONNAIRE.length - 1
      ? "See result"
      : "Next question";

  return (
    <div className="quotations-page">
      <section className="gallery-head">

        <div className="gallery-head-orb-img-container">
          <img src={CircleFull} alt="Circle Full" className="gallery-head-orb-img" aria-hidden="true" />
        </div>

        <div className="gallery-head-text">
          <h1 className="stage-2__title-en gallery-head-title">Quotations</h1>
          <h2 className="stage-2__title-ar gallery-head-title quotations-head-title">تقييم التكلفة</h2>
          <h3 className="stage-2__title-fr gallery-head-title">Devis</h3>
          <p className="stage-2__subtitle gallery-head-subtitle">
            Get your estimated, personalized quotation
            for your project depending on your location
            and business in just a few clicks...
          </p>
          <div className="stage-6__Devis-imgs">
            <img {...lazyImgProps} src={Letterhead} alt="Letterhead Mockup" className="letterhead-mockup-q-page" />
            <img {...lazyImgProps} src={theMask} alt="The Mask illustration" className="the-mask-q-page" />
          </div>
          <div className="gallery-head-scroll-indicator">
            <ScrollIndicator visible={true} />
          </div>
        </div>

      </section>


      <section className="quotations-card">
        <div className="quotations-card__intro">
          <p>{EXPLANATION}</p>
        </div>

        <div className="quotations-progress" aria-hidden="true">
          <div className="quotations-progress__bar" style={{ width: `${progress}%` }} />
        </div>

        <div
          key={panelKey}
          className={`quotations-panel ${panelVisible ? "is-visible" : "is-hidden"}`}
        >
          {renderPanelContent()}
        </div>

        {showNav ? (
          <div className="quotations-nav">
            <button
              type="button"
              className="quotations-nav__btn quotations-nav__btn--prev"
              onClick={handlePrevious}
              disabled={!canGoPrevious}
            >
              Previous question
            </button>
            <button
              type="button"
              className="quotations-nav__btn quotations-nav__btn--next"
              onClick={handleNext}
              disabled={!canGoNext}
            >
              {nextLabel}
            </button>
          </div>
        ) : view === VIEWS.CONTACT_FORM ? (
          <div className="quotations-nav quotations-nav--single">
            <button
              type="button"
              className="quotations-nav__btn quotations-nav__btn--prev"
              onClick={handlePrevious}
            >
              Previous question
            </button>
          </div>
        ) : view === VIEWS.RESULT || view === VIEWS.DONE ? (
          <div className="quotations-nav quotations-nav--single">
            {view === VIEWS.RESULT ? (
              <button
                type="button"
                className="quotations-nav__btn quotations-nav__btn--prev"
                onClick={handlePrevious}
              >
                Previous question
              </button>
            ) : null}
          </div>
        ) : null}
      </section>
    </div>
  );
}
