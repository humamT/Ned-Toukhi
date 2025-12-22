import "./header.scss";
import logo from "../../assets/images/Logo-icon-2.svg";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareFacebook,
    faInstagram,
    faBehance
} from "@fortawesome/free-brands-svg-icons";


export default function Header() {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                {/* LEFT: main nav */}
                <nav className="site-header__nav" aria-label="Primary">
                    <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}>
                        Home
                    </NavLink>

                    <NavLink to="/store" className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}>
                        Store
                    </NavLink>

                    {/* Gallery dropdown comes in Step 2 */}
                    <button className="nav-link nav-link--dropdown" type="button">
                        Gallery <span className="chev">▾</span>
                    </button>

                    <NavLink to="/quotations" className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}>
                        Quotations
                    </NavLink>

                    <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}>
                        Contact
                    </NavLink>

                    <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}>
                        About
                    </NavLink>
                </nav>

                {/* CENTER: logo with spotlight */}
                <div className="site-header__logo" aria-label="Logo">
                    <div className="logo-spotlight" />
                    <img src={logo} alt="Logo" />
                </div>

                {/* RIGHT: languages + socials (Step 3 will make these interactive) */}
                <div className="site-header__right">
                    <div className="site-header__langs" aria-label="Languages">
                        <button className="pill is-active" type="button">EN</button>
                        <button className="pill" type="button">FR</button>
                        <button className="pill" type="button">عربي</button>
                    </div>

                    <div className="site-header__social" aria-label="Social links">
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
            </div>

            <div className="site-header__divider">
                <span className="divider-main" />
                <span className="divider-accent">
                    <i className="c1" />
                    <i className="c2" />
                    <i className="c3" />
                    <i className="c4" />
                    <i className="c5" />
                </span>

            </div>

        </header>
    );
}
