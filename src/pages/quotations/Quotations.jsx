import { useEffect, useMemo, useRef, useState } from "react";
import "./Quotations.scss";
import ScrollIndicator from "../../components/scroll-indicator/ScrollIndicator.jsx";
import CircleFull from "../../assets/images/Circle-full.svg";
import theMask from "../../assets/PNGS+SVGs/Quotations/devis.png";
import Letterhead from "../../assets/PNGS+SVGs/Quotations/Letterhead-Mockup.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import {
  QUESTIONNAIRE,
  TIMELINE_QUESTION,
  buildQuotationSummary,
  getQuestionStep,
  getQuotationResult,
  isTimelineValidForService,
} from "./quotationLogic.js";

const lazyImgProps = {
  loading: "lazy",
  decoding: "async",
  fetchPriority: "low",
};

const WEB3FORMS_ACCESS_KEY = "605a40af-f0d4-4fce-b1d5-c179cfa63898";

const EXPLANATION =
  "Complete this 5 minute form to get an estimated price range for your project. The final quote may differ based on your requirements.";

const RESULT_SHARE_PROMPT =
  "Would you like to share the information you provided, along with a message describing your organization and the project you have in mind?";

const VIEWS = {
  QUESTION: "question",
  RESULT: "result",
  CONTACT_FORM: "contact-form",
  DONE: "done",
};

const TRANSITION_MS = 240;

function formatPriceForDisplay(price) {
  if (!price) return "";
  return price.replace(/\s*-\s*/, " and ");
}

function NavArrows() {
  return (
    <span className="arrows-left" aria-hidden="true">
      <FontAwesomeIcon icon={faCaretLeft} />
      <FontAwesomeIcon icon={faCaretLeft} />
    </span>
  );
}

function OptionCheckbox() {
  return (
    <span className="quotations-option__checkbox" aria-hidden="true">
      <span className="quotations-option__checkbox-wrapper">
        <span className="quotations-option__checkmark" />
        <span className="quotations-option__nebula" />
        <span className="quotations-option__sparkle" />
      </span>
    </span>
  );
}

export default function QuotationsPage() {
  const [view, setView] = useState(VIEWS.QUESTION);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [panelVisible, setPanelVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const transitionInProgressRef = useRef(false);
  const transitionTimeoutRef = useRef(null);

  const currentQuestion = useMemo(
    () => getQuestionStep(questionIndex, answers),
    [questionIndex, answers]
  );
  const result = useMemo(() => getQuotationResult(answers), [answers]);
  const quotationSummary = useMemo(
    () => buildQuotationSummary(answers, result),
    [answers, result]
  );

  const progress =
    view === VIEWS.QUESTION
      ? ((questionIndex + 1) / QUESTIONNAIRE.length) * 100
      : 100;

  const canGoNext = view === VIEWS.QUESTION ? Boolean(selectedOption) : false;

  const canGoPrevious = view === VIEWS.QUESTION && questionIndex > 0;

  useEffect(() => {
    if (view !== VIEWS.QUESTION || !currentQuestion) return;
    const existing = answers.find((entry) => entry.question === currentQuestion.question);
    setSelectedOption(existing?.answer ?? "");
  }, [view, questionIndex, currentQuestion, answers]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const transitionTo = (nextView, updater) => {
    if (transitionInProgressRef.current) return;

    transitionInProgressRef.current = true;
    setIsTransitioning(true);
    setPanelVisible(false);
    transitionTimeoutRef.current = window.setTimeout(() => {
      if (updater) updater();
      setView(nextView);
      setPanelVisible(true);
      transitionInProgressRef.current = false;
      transitionTimeoutRef.current = null;
      setIsTransitioning(false);
    }, TRANSITION_MS);
  };

  const saveCurrentAnswer = (option = selectedOption) => {
    if (!option || !currentQuestion) return answers;

    let next = answers.filter((entry) => entry.question !== currentQuestion.question);
    next.push({ question: currentQuestion.question, answer: option });

    if (currentQuestion.id === "service") {
      const timelineAnswer = next.find((entry) => entry.question === TIMELINE_QUESTION)?.answer;
      if (timelineAnswer && !isTimelineValidForService(option, timelineAnswer)) {
        next = next.filter((entry) => entry.question !== TIMELINE_QUESTION);
      }
    }

    setAnswers(next);
    return next;
  };

  const resetQuotation = () => {
    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
    transitionInProgressRef.current = false;
    setIsTransitioning(false);
    setAnswers([]);
    setQuestionIndex(0);
    setSelectedOption("");
    setSubmitStatus("");
    setFormValues({ name: "", email: "", organization: "", message: "" });
    setView(VIEWS.QUESTION);
    setPanelVisible(true);
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
    }
  };

  const handlePrevious = () => {
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

  const renderQuestionPanel = () => {
    if (!currentQuestion) return null;

    return (
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
                  <OptionCheckbox />
                  <span className="quotations-option__label">{option}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  const renderEstimateCard = () => (
    <div className="quotations-result-estimate">
      <div className="quotations-result-estimate__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <circle cx="12" cy="12" r="11" fill="#fff" />
          <path
            d="M7 12.5l3 3 7-7"
            fill="none"
            stroke="#45b29d"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {result.price ? (
        <>
          <p className="quotations-result-estimate__label">Your estimated range is between</p>
          <p className="quotations-result-estimate__price">{formatPriceForDisplay(result.price)}</p>
        </>
      ) : (
        <p className="quotations-result-estimate__message">{result.message}</p>
      )}
    </div>
  );

  const renderResultPanel = () => (
    <div className="quotations-result">
      {renderEstimateCard()}

      <p className="quotations-result__prompt">{RESULT_SHARE_PROMPT}</p>

      <div className="quotations-result__actions">
        <button
          type="button"
          className="quotations-result__yes"
          disabled={isTransitioning}
          onClick={() => transitionTo(VIEWS.CONTACT_FORM)}
        >
          Yes, I would like to write a message
        </button>

        <button type="button" className="quotations-result__restart" onClick={resetQuotation}>
          <NavArrows />
          Start from the beginning
        </button>
      </div>
    </div>
  );

  const renderContactForm = () => (
    <div className="quotations-result quotations-result--form">
      {renderEstimateCard()}

      <form id="quotations-contact-form" className="quotations-form" onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          value={formValues.name}
          onChange={onInputChange}
          required
        />
        <input
          type="text"
          name="organization"
          placeholder="Organization (if available)"
          value={formValues.organization}
          onChange={onInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formValues.email}
          onChange={onInputChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message...*"
          value={formValues.message}
          onChange={onInputChange}
          required
        />

        <input type="hidden" name="quotation_summary" value={quotationSummary} readOnly />
        <input
          type="hidden"
          name="quotation_result"
          value={result.price ?? result.message ?? ""}
          readOnly
        />

        {submitStatus ? (
          <p className="quotations-form__status" role="status" aria-live="polite">
            {submitStatus}
          </p>
        ) : null}
      </form>
    </div>
  );

  const renderDonePanel = () => (
    <div className="quotations-result">
      <div className="quotations-result-estimate">
        <div className="quotations-result-estimate__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <circle cx="12" cy="12" r="11" fill="#fff" />
            <path
              d="M7 12.5l3 3 7-7"
              fill="none"
              stroke="#45b29d"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="quotations-result-estimate__message">
          {submitStatus || "Your quotation has been sent successfully."}
        </p>
      </div>

      <button type="button" className="quotations-result__restart" onClick={resetQuotation}>
        <NavArrows />
        Start from the beginning
      </button>
    </div>
  );

  const renderPanelContent = () => {
    if (view === VIEWS.QUESTION) return renderQuestionPanel();
    if (view === VIEWS.RESULT) return renderResultPanel();
    if (view === VIEWS.CONTACT_FORM) return renderContactForm();
    return renderDonePanel();
  };

  const showNav = view === VIEWS.QUESTION;
  const showQuestionChrome = view === VIEWS.QUESTION;

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


      <section className={`quotations-card ${!showQuestionChrome ? "quotations-card--outcome" : ""}`}>
        {showQuestionChrome ? (
          <>
            <div className="quotations-card__intro">
              <p>{EXPLANATION}</p>
            </div>

            <div className="quotations-progress" aria-hidden="true">
              <div className="quotations-progress__bar" style={{ width: `${progress}%` }} />
            </div>
          </>
        ) : null}

        <div
          key={panelKey}
          className={`quotations-panel ${panelVisible ? "is-visible" : "is-hidden"} ${!showQuestionChrome ? "quotations-panel--outcome" : ""}`}
        >
          {renderPanelContent()}
        </div>

        {showNav ? (
          <div className="quotations-nav">
            <button
              type="button"
              className="quotations-nav__btn quotations-nav__btn--prev"
              onClick={handlePrevious}
              disabled={!canGoPrevious || isTransitioning}
            >
              <NavArrows />
              Previous question
            </button>
            <button
              type="button"
              className="quotations-nav__btn quotations-nav__btn--next"
              onClick={handleNext}
              disabled={!canGoNext || isTransitioning}
            >
              {nextLabel}
            </button>
          </div>
        ) : view === VIEWS.CONTACT_FORM ? (
          <div className="quotations-nav">
            <button
              type="button"
              className="quotations-nav__btn quotations-nav__btn--prev"
              onClick={resetQuotation}
            >
              <NavArrows />
              Start from the beginning
            </button>
            <button
              type="submit"
              form="quotations-contact-form"
              className="quotations-form__submit"
              disabled={!canSubmitForm || isTransitioning}
            >
              Send
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
