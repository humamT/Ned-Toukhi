import './About.scss';
import Orb from '../../components/orb/orb.jsx';
import aboutLogo from "../../assets/PNGS+SVGs/About/muhanad-logo-animate.gif";
import aboutBox from "../../assets/PNGS+SVGs/About/about-page-box.svg";
import personalImg from "../../assets/PNGS+SVGs/About/p0.png";
import galleryBubble from "../../assets/PNGS+SVGs/photo-pubble.svg";

const ABOUT_NAME = "MUHANAD ALTOUKHI";
const ABOUT_TAGLINE = "Graphic Designer, Illustration Artist";
const ABOUT_LOCATION = "Based in Paris";
const DIVIDER_COLORS = ["c1", "c2", "c3", "c4", "c5"];

export default function AboutPage() {

  const lazyImgProps = {
    loading: "lazy",
    decoding: "async",
    fetchPriority: "low",
  };

  return (
    <main className="about-page">
      <section className="about-stage">
        <div className="about-stage0__orb-shell" aria-hidden="true">
          <Orb quality="auto" />
        </div>

        <div className="about-intro">
          <img className="about-logo" src={aboutLogo} alt="Muhanad Altoukhi logo" />
          <h1 className="about__name">{ABOUT_NAME}</h1>
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
        <img {...lazyImgProps} className="aboutBox" src={aboutBox} alt="about box" />
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
      </section>

    </main>
  );
}
