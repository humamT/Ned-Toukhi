import "../stage-content/StageContent.scss";
import "./footer.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faInstagram, faBehance } from "@fortawesome/free-brands-svg-icons";
import GradientBackground from "../background/background.jsx";

import footerLogo from "../../assets/PNGS+SVGs/Footer/muhanad-logo.svg";
import footerLogoLine from "../../assets/PNGS+SVGs/Footer/logo-line-footer.svg";
import noAiBadge from "../../assets/PNGS+SVGs/Footer/no-ai.svg";
import alienHand from "../../assets/PNGS+SVGs/Footer/Alien-hand.png";
import Alien from "../../assets/PNGS+SVGs/Footer/Alien.png";

export default function Footer() {
  return (
    <footer className="site-footer">
      <GradientBackground hideInteractive={true} hideG6={true} />

      <div className="stage-10__footer-content">
        <div className="footer-main">
          <div className="footer-left">
            <img src={footerLogo} alt="Muhamad Aldoukhi" className="footer-logo" />
            <img src={footerLogoLine} alt="" className="footer-logo-line" />
          </div>

          <div className="footer-middle">
            <hr className="hr" />
            <div className="footer-column">
              <h3 className="footer-column-title">Store</h3>
              <ul className="footer-store-links">
                <li><a href="/store">Stickers</a></li>
                <li><a href="/store">Post cards</a></li>
                <li><a href="/store">Posters</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-column-title">Gallery</h3>
              <ul className="footer-gallery-links">
                <li><NavLink to="/gallery/illustrations">Illustrations</NavLink></li>
                <li><NavLink to="/gallery/identities">Visual Identities</NavLink></li>
                <li><NavLink to="/gallery/featured">Featured Projects</NavLink></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Infos</h3>
              <ul className="footer-info-links">
                <li><a href="/quotations">Quotations</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/about">About</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-right">
            <div className="lang-social">
              <div className="site-header__langs" aria-label="Languages">
                <button className="pill is-active" type="button">EN</button>
                <button className="pill" type="button">FR</button>
                <button className="pill" type="button">عربي</button>
              </div>
              <div className="footer-social">
                <a
                  className="icon"
                  href="https://www.facebook.com/nedtoukhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faSquareFacebook} />
                </a>

                <a
                  className="icon"
                  href="https://www.instagram.com/nedtoukhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>

                <a
                  className="icon"
                  href="https://www.behance.net/nedtoukhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Behance"
                >
                  <FontAwesomeIcon icon={faBehance} />
                </a>
              </div>
            </div>

            <div className="footer-ai-badge">
              NO AI GENERATIONAL TOOLS WERE USED
              IN ANY ART CREATED IN THIS WEBSITE
              <img src={noAiBadge} alt="No AI Tools Used" />
            </div>

            <div className="footer-copyright">
              Muhanad ALTOUKHI 2026 - All Rights Reserved ©
            </div>
          </div>
        </div>
      </div>

      <div className="footer-alien">
        <img src={Alien} alt="" className="footer-alien-body" />
        <img src={alienHand} alt="" className="footer-alien-hand" />
      </div>
    </footer>
  );
}
