import './About.scss';
import OrbHero from "../../components/orbHero/orbHero.jsx";
import aboutLogo from "../../assets/PNGS+SVGs/About/muhanad-logo-animate.gif";
import aboutBox from "../../assets/PNGS+SVGs/About/about-page-box.svg";
import personalImg from "../../assets/PNGS+SVGs/About/p0.png";
import galleryBubble from "../../assets/PNGS+SVGs/photo-pubble.svg";
import CircleFull from "../../assets/images/Circle-full.svg";

import aboutCard1 from "../../assets/PNGS+SVGs/About/p1.png";
import aboutCard2 from "../../assets/PNGS+SVGs/About/p2.png";
import aboutCard3 from "../../assets/PNGS+SVGs/About/p3.png";
import aboutCard4 from "../../assets/PNGS+SVGs/About/p4.png";
import galleryborder from "../../assets/PNGS+SVGs/gallery-border-1.svg";
import aboutCard5 from "../../assets/PNGS+SVGs/About/1.png";
import aboutCard6 from "../../assets/PNGS+SVGs/About/2.png";
import aboutCard7 from "../../assets/PNGS+SVGs/About/3.png";
import aboutCard8 from "../../assets/PNGS+SVGs/About/4.png";

import featuredClientsBoxLogo from "../../assets/PNGS+SVGs/Footer/muhanad-logo.svg";
import FeaturedClientsLogos from "../../components/featured-clients/FeaturedClientsLogos.jsx";

import contactEnvelope from "../../assets/PNGS+SVGs/Contact/contact.png";
import contactBox from "../../assets/PNGS+SVGs/Contact/contact-box.svg";
import emptyOrb from "../../assets/images/Circle-empty.svg";
import HomeActionButton from "../../components/ui/HomeActionButton.jsx";

const ABOUT_NAME = "MUHANAD ALTOUKHI";
const ABOUT_NAME_LT_INDEX = ABOUT_NAME.indexOf("LT");
const ABOUT_TAGLINE = "Graphic Designer, Illustration Artist";
const ABOUT_LOCATION = "Based in Paris";
const DIVIDER_COLORS = ["c1", "c2", "c3", "c4", "c5"];
const EDUCATION_ITEMS = [
  {
    period: "2024 - 2025",
    title: "DArabic Calligraphy",
    school: "FSIP “Faculté des Sciences Islamiques de Paris”",
    // details: "Campus Fonderie de l'Image",
    extra: "Learned the basics of Arabic calligraphy focusing on ALNASKH typography.",
    place: "Paris, France",
  },
  {
    period: "2021 - 2024",
    title: "DN-MADE (Diplôme National des Métiers d'Art et du Design)",
    school: "DESIGN GRAPHIQUE",
    details: "Campus Fonderie de l'Image",
    extra: "Graduated with honorary degree, top of the class",
    place: "Paris, France",
  },
  {
    period: "2021",
    title: 'DELF B2 "French Language"',
    school: "Université de Caen",
    place: "Caen, France",
  },
  {
    period: "2019",
    title: 'DELF A2 "French Language"',
    school: "Université de Caen",
    details: "DELF A2 certification (after 5 months in France)",
    place: "Caen, France",
  },
  {
    period: "2016-2018",
    title: "English Literature",
    school: "Aleppo University “branch in Douma city”",
    details: "2 year program cut to one year due to forced displacement from the region",
    place: "Douma, Syria",
  },
  {
    period: "2014",
    title: "Scientific Baccalaureate Degree",
    school: "The Temporary Syrian Government",
    place: "Douma, Syria",
  },
  {
    period: "2013",
    title: "Graphic Design, Illustration",
    school: "Self-Taught",
    place: "Online",
  },
];

const EXPERIENCE_ITEMS = [
  {
    period: "Sep 2022-Present",
    company: "Groupe SPMI",
    role: "Graphic Designer",
    place: "Paris",
  },
  {
    period: "Sep 2021-Feb 2022",
    company: "Agence Inedit",
    role: "Graphic Designer",
    place: "Paris",
  },
  {
    period: "2021-Present",
    company: "Gulf Digital Marketing",
    role: "Graphic Designer",
    place: "Online",
  },
  {
    period: "2018-2020",
    company: "KACST King Abdulaziz City for Science and Technology",
    role: "Graphic Designer",
    place: "Online",
  },
  {
    period: "2018",
    company: "Safaraq Travel Agency",
    role: "Graphic Designer & Video Editor",
    place: "Istanbul, Turkey",
  },
  {
    period: "2017-2019",
    company: "Team Deviser",
    role: "Founder, Manager & Senior Graphic Designer",
    details:
      "Collaboration and personal design servicing companies and high-profile clients including The Free Syrian Embassy in Qatar",
    place: "Online",
  },
  {
    period: "2016-2019",
    company: "Ufuk International for Relief & Development",
    role: "Senior Graphic Designer & Design department official",
    place: "Douma, Syria & Istanbul, Turkey",
  },
  {
    period: "2016-Present",
    company: "Freelance Graphic Designer",
    details:
      "Serviced international companies, corporations, and individual clients, including from Syria, Saudi Arabia, Qatar, Egypt, Turkey, and France",
    place: "Online",
  },
  {
    period: "2014-2018",
    company: "Douma Charity Health Society",
    role: "Senior Graphic Designer",
    details: "Instructor: Beginning Adobe Photoshop in 2017",
    place: "Douma, Syria",
  },
];

export default function AboutPage() {

  const lazyImgProps = {
    loading: "lazy",
    decoding: "async",
    fetchPriority: "low",
  };

  return (
    <main className="about-page">
      <section className="about-stage">
        {/* <img src={CircleFull} alt="Circle Full" className="about-stage0-orb-img" aria-hidden="true" /> */}
        <div className="about-stage0-orb-img-container">
          <img src={CircleFull} alt="Circle Full" className="contact-stage0-orb-img" aria-hidden="true" />
        </div>

        <div className="about-intro">
          <img className="about-logo" src={aboutLogo} alt="Muhanad Altoukhi logo" />
          <h1 className="about__name">
            {ABOUT_NAME_LT_INDEX >= 0 ? (
              <>
                {ABOUT_NAME.slice(0, ABOUT_NAME_LT_INDEX + 1)}
                <span className="about__name-lt-kern">{ABOUT_NAME[ABOUT_NAME_LT_INDEX + 1]}</span>
                {ABOUT_NAME.slice(ABOUT_NAME_LT_INDEX + 2)}
              </>
            ) : (
              ABOUT_NAME
            )}
          </h1>
          <h2 className="about__tagline">{ABOUT_TAGLINE}</h2>
          <h3 className="about__location">{ABOUT_LOCATION}</h3>
          <span className="about__divider">
            {DIVIDER_COLORS.map((color) => (
              <i key={color} className={color} />
            ))}
          </span>
        </div>
      </section>

      <section className="about-stage about-stage--1">
        {/* <img {...lazyImgProps} className="aboutBox" src={aboutBox} alt="about box" /> */}
        <div className='about-text'>
          <p>Muhanad ALTOUKHI, Syrian graphic designer and illustrator.</p>
          <p>
            Originally from Douma, on the outskirts of Damascus, I began learning graphic design in 2014 during the military
            siege of Eastern Ghouta. In 2024, I completed my DNMADE in Graphic Design in Paris.
          </p>
          <p>
            Living between these two worlds has shaped my creative vision, allowing me to develop hybrid, multicultural
            projects enriched by a unique perspective one that I’m excited to share and work with you.
            My professional journey has included roles as a Senior Graphic Designer at two companies in my hometown Douma,
            Syria, followed by establishing my own freelance practice through my website in 2016.
          </p>
          <p>
            Over the years, I’ve had the privilege of collaborating with clients from around the globe, including Europe, the
            United States, Turkey, the Middle East, and the Gulf region.</p>
          <p>
            Fluent in English, French, and Arabic, I communicate directly with clients in their preferred language, enabling me to
            grasp the nuances of their ideas and deliver tailored solutions.
          </p>
          <p>
            Originally from Syria, I am now based in Paris, France, where I specialize in custom graphic design and illustration,
            corporate branding, logo creation, and web design.
            I am available to bring your creative vision to life with professional, customized design solutions.
          </p>
        </div>
        <div className='personalImg-bubble-container'>
          <img {...lazyImgProps} className="personalImg-photo" src={personalImg} alt="profile img" />
          <img className="personalImg-bubble" src={galleryBubble} alt="the orb around the profile img" />
        </div>

        <div className="about-cards-about-page">
          <img {...lazyImgProps} className="about-img-about-page higher-card-about-page" src={aboutCard1} alt="" />
          <img {...lazyImgProps} className="about-img-about-page" src={aboutCard2} alt="" />
          <img {...lazyImgProps} className="about-img-about-page higher-card-about-page" src={aboutCard3} alt="" />
          <img {...lazyImgProps} className="about-img-about-page" src={aboutCard4} alt="" />
        </div>

      </section>

      <section className="about-stage education-and-experiences">
        <div className="ee-column education">
          <div className="ee-title-pill">
            {/* Education */}
            <p>Education</p>
            <div className="ee-title-underline" aria-hidden="true" />
          </div>
          {/* <div className="ee-title-underline" aria-hidden="true" /> */}
          <div className="ee-card">
            {EDUCATION_ITEMS.map((item) => (
              <article key={`${item.period}-${item.title}`} className="ee-item">
                <p className="ee-period">{item.period}</p>
                <h4 className="ee-primary">{item.title}</h4>
                <p className="ee-secondary">{item.school}</p>
                {item.details && <p className="ee-details">{item.details}</p>}
                {item.extra && <p className="ee-details">{item.extra}</p>}
                <p className="ee-place">{item.place}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="ee-column experiences">
          <div className="ee-title-pill">
            {/* Experiences */}
            <p>Experiences</p>
            <div className="ee-title-underline" aria-hidden="true" />
          </div>
          {/* <div className="ee-title-underline" aria-hidden="true" /> */}
          <div className="ee-card">
            {EXPERIENCE_ITEMS.map((item) => (
              <article key={`${item.period}-${item.company}`} className="ee-item">
                <p className="ee-period">{item.period}</p>
                <h4 className="ee-primary">{item.company}</h4>
                {item.role && <p className="ee-secondary">{item.role}</p>}
                {item.details && <p className="ee-details">{item.details}</p>}
                <p className="ee-place">{item.place}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-stage featured-clients-about-page">
        <div className="featured-clients-about-page-content">
          <div className="featured-clients-about-page-MT-logo">
            <img src={featuredClientsBoxLogo} className="featured-clients-about-page-MT-logo-img" alt="featured clients box logo" />
            <div className="featured-clients-about-page-MT-logo-img-spotlight" aria-hidden="true"></div>
          </div>
          {/* <h1>Featured Clients</h1> */}
          <div className="fc-title-pill">Featured Clients</div>
          <FeaturedClientsLogos className="featured-clients-about-page-content-logos" alt="featured logos" />
          <div className="featured-clients-about-page-content-text">
           <p> Over the past few years in France, I have participated in several art exhibitions in Paris and Lyon, where I presented my recent work, including OLIVA, a project exploring hybrid typography, alongside a selection of illustrations. I also offered a range of merchandise, which visitors enthusiastically purchased as souvenirs of the exhibitions.</p>
           <p>The exhibition in Paris focused exclusively on typography, where OLIVA stood out among the featured projects. In contrast, the exhibition in Lyon celebrated multicultural work, and visitors showed great interest in the diverse range of projects I presented. I am always looking forward to participating in new exhibitions and sharing my work with wider audiences and I would be very happy to meet you all!</p>
          </div>
        </div>
        <div className="about-cards-about-page">
          <img {...lazyImgProps} className="about-img-about-page higher-card-about-page" src={aboutCard5} alt="" />
          <img {...lazyImgProps} className="about-img-about-page" src={aboutCard6} alt="" />
          <img {...lazyImgProps} className="about-img-about-page higher-card-about-page" src={aboutCard7} alt="" />
          <img {...lazyImgProps} className="about-img-about-page" src={aboutCard8} alt="" />
        </div>
      </section>

      <section className="about-stage contact-form-about-page">
        <img src={CircleFull} alt="Circle Full" className="contact-form-about-page-orb" aria-hidden="true" />
        <div className="stage-7__orb-content">
          {/* <div className="stage-7__envelope-wrap"> */}
          {/* <div className="stage-orb stage-orb--s5" aria-hidden="true" /> */}

          <img {...lazyImgProps} className="Envelope" src={contactEnvelope} alt="Envelope illustration" />
          {/* </div> */}
          {/* <img className="Envelope-emptyOrb" src={emptyOrb} alt="" /> */}

          {/* <img {...lazyImgProps} className="contactBox" src={contactBox} alt="contact box" /> */}

          <div className="stage-7__main-text">
            <div className="stage-7__title">
              <div className="stage-7__title-en">Contact</div>
              <div className="stage-7__title-ar">تواصل</div>
              <div className="stage-7__title-fr">Écris-moi</div>
            </div>
            <div className="stage-7__subtitle">
              If you have a question, need an estimate, or
              simply want to say hello, feel free to email
              me and I’ll get back to you as soon as possible!
            </div>
            <HomeActionButton className="contact-btn" to="/contact">Contact</HomeActionButton>
          </div>
        </div>
      </section>


    </main>
  );
}
