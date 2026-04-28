import { useEffect, useRef, useState } from "react";
import "./StageContent.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareFacebook,
    faInstagram,
    faBehance
} from "@fortawesome/free-brands-svg-icons";
import GradientBackground from "../background/background.jsx";

import stickerImg from "../../assets/images/sticker-op.png";
import postersCluster from "../../assets/images/posters-cluster.png";
import galleryBubble from "../../assets/PNGS+SVGs/photo-pubble.svg";
import illustrationsBox from "../../assets/PNGS+SVGs/tab1.svg";
import featuredBox from "../../assets/PNGS+SVGs/tab2.svg";
import identitiesBox from "../../assets/PNGS+SVGs/tab3.svg";
import click1 from "../../assets/PNGS+SVGs/click1.svg";
import click2 from "../../assets/PNGS+SVGs/click2.svg";
import click3 from "../../assets/PNGS+SVGs/click3.svg";
import whiteLine from "../../assets/PNGS+SVGs/Circle-white-line.svg";
import yellowLine from "../../assets/PNGS+SVGs/yellow-line.svg";
import redLine from "../../assets/PNGS+SVGs/red-line.svg";
import tealLine from "../../assets/PNGS+SVGs/teal-line.svg";

import emptyOrb from "../../assets/images/Circle-empty.svg";

import illustration1 from "../../assets/PNGS+SVGs/Illustrations/y1.png";
import illustration2 from "../../assets/PNGS+SVGs/Illustrations/y2.png";
import illustration3 from "../../assets/PNGS+SVGs/Illustrations/y3.png";
import illustration4 from "../../assets/PNGS+SVGs/Illustrations/y4.png";

import featured1 from "../../assets/PNGS+SVGs/Featured/r1.png";
import featured2 from "../../assets/PNGS+SVGs/Featured/r2.png";
import featured3 from "../../assets/PNGS+SVGs/Featured/r3.png";
import featured4 from "../../assets/PNGS+SVGs/Featured/r4.png";

import identities1 from "../../assets/PNGS+SVGs/Identities/g1.png";
import identities2 from "../../assets/PNGS+SVGs/Identities/g2.png";
import identities3 from "../../assets/PNGS+SVGs/Identities/g3.png";
import identities4 from "../../assets/PNGS+SVGs/Identities/g4.png";

import aboutCard1 from "../../assets/PNGS+SVGs/About/p1.png";
import aboutCard2 from "../../assets/PNGS+SVGs/About/p2.png";
import aboutCard3 from "../../assets/PNGS+SVGs/About/p3.png";
import aboutCard4 from "../../assets/PNGS+SVGs/About/p4.png";

import personalImg from "../../assets/PNGS+SVGs/About/p0.png";

import aboutBox from "../../assets/PNGS+SVGs/About/about-box.svg";

import featuredClientsBox from "../../assets/PNGS+SVGs/Featured-Clients/Featured-Clients-box.svg";
import featuredLogos from "../../assets/PNGS+SVGs/Featured-Clients/Featured-Clients-logos.svg";

import footerLogo from "../../assets/PNGS+SVGs/Footer/muhanad-logo.svg";
import footerLogoLine from "../../assets/PNGS+SVGs/Footer/logo-line-footer.svg";
import noAiBadge from "../../assets/PNGS+SVGs/Footer/no-ai.svg";
import alienHand from "../../assets/PNGS+SVGs/Footer/Alien-hand.png";
import Alien from "../../assets/PNGS+SVGs/Footer/Alien.png";

import galleryborder from "../../assets/PNGS+SVGs/gallery-border-1.svg";
import scrollBar from "../../assets/PNGS+SVGs/scroll-bar.svg";
import scrollTic from "../../assets/PNGS+SVGs/scroll-tic.svg";

import theMask from "../../assets/PNGS+SVGs/Quotations/devis.png";
import Letterhead from "../../assets/PNGS+SVGs/Quotations/Letterhead-Mockup.png";

import contactEnvelope from "../../assets/PNGS+SVGs/Contact/contact.png";
import contactBox from "../../assets/PNGS+SVGs/Contact/contact-box.svg";

export default function StageContent({ stageIndex }) {
    const isStage1 = stageIndex === 1;
    const isStage2 = stageIndex === 2;
    const isStage3 = stageIndex === 3;
    const isStage4 = stageIndex === 4;
    const isStage5 = stageIndex === 5;
    const isStage6 = stageIndex === 6;
    const isStage7 = stageIndex === 7;
    const isStage8 = stageIndex === 8;
    const isStage9 = stageIndex === 9;
    const isStage10 = stageIndex === 10;

    // Keep the three gallery card groups mounted long enough for their
    // directional enter/exit animations to overlap.
    const GALLERY_ANIM_MS = 700;

    const [activeGalleryStage, setActiveGalleryStage] = useState(() =>
        stageIndex >= 3 && stageIndex <= 5 ? stageIndex : 3
    );
    const [leavingGalleryStage, setLeavingGalleryStage] = useState(null);
    const [direction, setDirection] = useState("forward");

    const prevStageRef = useRef(stageIndex);
    const activeRef = useRef(activeGalleryStage);
    const timeoutRef = useRef(null);

    useEffect(() => {
        activeRef.current = activeGalleryStage;
    }, [activeGalleryStage]);

    useEffect(() => {
        const prev = prevStageRef.current;
        const next = stageIndex;
        prevStageRef.current = next;

        const wasGallery = prev >= 3 && prev <= 5;
        const isGallery = next >= 3 && next <= 5;

        if (!wasGallery && isGallery) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            setDirection(next > prev ? "forward" : "backward");
            setActiveGalleryStage(next);
            setLeavingGalleryStage("outside-gallery");

            timeoutRef.current = setTimeout(() => {
                setLeavingGalleryStage(null);
                timeoutRef.current = null;
            }, GALLERY_ANIM_MS);

            return () => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            };
        }

        if (!isGallery) {
            setLeavingGalleryStage(null);
            return;
        }

        if (next === activeRef.current) return;

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        const dir = next > prev ? "forward" : "backward";
        setDirection(dir);

        const currentActive = activeRef.current;

        // Activate the new gallery immediately while the previous set animates out.
        setActiveGalleryStage(next);

        // old one will animate out
        setLeavingGalleryStage(currentActive);

        timeoutRef.current = setTimeout(() => {
            setLeavingGalleryStage(null);
            timeoutRef.current = null;
        }, GALLERY_ANIM_MS);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [stageIndex]);



    const getGalleryClasses = (galleryStage) => {
        const isActive = activeGalleryStage === galleryStage;
        const isLeaving = leavingGalleryStage === galleryStage;

        const hidden = !isActive && !isLeaving ? "not-stage-gallery" : "";

        const leaveAnim = isLeaving
            ? direction === "forward"
                ? "slide-up-fade-out"
                : "slide-down-fade-out"
            : "";

        const enterAnim =
            isActive && leavingGalleryStage
                ? direction === "forward"
                    ? "slide-down-fade-in"
                    : "slide-up-fade-in"
                : "";

        return `${hidden} ${leaveAnim} ${enterAnim}`.trim();
    };

    return (
        <div className="stage-content">
            {/* STAGE 1 */}
            <div className={`stage-content__stage stage-content__stage-1 ${isStage1 ? "is-visible" : ""}`}>
                <div className="stage-1__orb-content">
                    <div className="stage-1__main-text">
                        <div className="stage-1__title">
                            <div className="stage-1__title-en">Store</div>
                            <div className="stage-1__title-ar">المتجر</div>
                            <div className="stage-1__title-fr">Boutique</div>
                        </div>
                        <img src={stickerImg} alt="Sticker" className="stage-1__sticker" />
                    </div>

                    <div className="stage-1__subtitle">
                        Postcards, stickers, posters, BUY THEM ALL!, chose between a wide selection of original art
                        projects and get them delevered.
                    </div>
                    <a className="shop-now">Shop NOW!</a>
                </div>

                <div className="stage-1__posters-section">
                    <img src={postersCluster} alt="Posters cluster" className="stage-1__posters" />
                </div>
            </div>

            {/* STAGE 2 */}
            <div className={`stage-content__stage stage-content__stage-2 ${isStage2 ? "is-visible" : ""}`}>
                <div className="stage-2__orb-content">
                    <div className="stage-2__main-text">
                        <div className="stage-2__title">
                            <div className="stage-2__title-en">Gallery</div>
                            <div className="stage-2__title-ar">المعرض</div>
                            <div className="stage-2__title-fr">Galerie</div>
                        </div>
                    </div>

                    <div className="stage-2__subtitle">
                        Discover 3 categories of %100 human-made art, from illustrations and logo designs to standout
                        featured projects.
                    </div>

                    <div>
                        <img className="gallery1 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
                        <img className="gallery2 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
                        <img className="gallery3 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
                        <img className="gallery4 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
                    </div>

                    <a className="explore-now">Explore NOW!</a>
                </div>
            </div>

            {/* STAGE 3/4/5 wrapper */}
            <div className={`stage-content__stage stage-content__stage-3 ${isStage3 || isStage4 || isStage5 ? "is-visible" : ""}`}>
                <div className="stage-3__orb-content">
                    <div className="stage-3__main-text">
                        <div className="stage-3__title">
                            <div className="stage-3__title-en">Gallery</div>
                            <div className="stage-3__title-ar">المعرض</div>
                            <div className="stage-3__title-fr">Galerie</div>
                        </div>
                    </div>
                    <a className="explore-now-tabs">Explore NOW!</a>

                    {/* tabs */}
                    <div className="tabs-rectangles">
                        <div className={`tab-rectangle1 ${isStage4 || isStage5 ? "not-stage" : ""}`}>
                            <img className="illustrationsBox" src={illustrationsBox} alt="illustrations Box" />
                            <div className="illustrations-txt">
                                <div className="illustrations-en">Illustrations</div>
                                <div className="illustrations-ar">رسومات</div>
                                <div className="illustrations-fr">Dessins</div>
                            </div>
                            <svg className={`click-txt ${isStage4 || isStage5 ? "not-stage-txt" : ""}`} viewBox="0 0 200 200" aria-hidden="true" role="img">
                                <defs>
                                    <path id="scroll-circle-path" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
                                </defs>
                                <text textAnchor="middle" dominantBaseline="middle">
                                    <textPath xlinkHref="#scroll-circle-path" startOffset="50%">
                                        - Go to gallery - Voir la gallerie - إذهب إلى المعرض
                                    </textPath>
                                </text>
                            </svg>
                            <img className={`click1 ${isStage4 || isStage5 ? "not-stage-txt" : ""}`} src={click1} alt="illustrations Box clickable circle" />
                        </div>

                        <div className={`tab-rectangle2 ${isStage3 || isStage5 ? "not-stage" : ""}`}>
                            <img className="featuredBox" src={featuredBox} alt="featured Box" />
                            <div className="featured-txt">
                                <div className="featured-en">Featured</div>
                                <div className="featured-ar">أعمال خاصة</div>
                                <div className="featured-fr">Sélectionnés</div>
                            </div>
                            <svg className={`click-txt ${isStage3 || isStage5 ? "not-stage-txt" : ""}`} viewBox="0 0 200 200" aria-hidden="true" role="img">
                                <defs>
                                    <path id="scroll-circle-path" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
                                </defs>
                                <text textAnchor="middle" dominantBaseline="middle">
                                    <textPath xlinkHref="#scroll-circle-path" startOffset="50%">
                                        - Go to gallery - Voir la gallerie - إذهب إلى المعرض
                                    </textPath>
                                </text>
                            </svg>
                            <img className={`click2 ${isStage3 || isStage5 ? "not-stage-txt" : ""}`} src={click2} alt="featured Box clickable circle" />
                        </div>

                        <div className={`tab-rectangle3 ${isStage3 || isStage4 ? "not-stage" : ""}`}>
                            <img className="identitiesBox" src={identitiesBox} alt="identities Box" />
                            <div className="identities-txt">
                                <div className="identities-en">Identities</div>
                                <div className="identities-ar">هويات بصرية</div>
                                <div className="identities-fr">Charts graphiques</div>
                            </div>
                            <svg className={`click-txt ${isStage3 || isStage4 ? "not-stage-txt" : ""}`} viewBox="0 0 200 200" aria-hidden="true" role="img">
                                <defs>
                                    <path id="scroll-circle-path" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
                                </defs>
                                <text textAnchor="middle" dominantBaseline="middle">
                                    <textPath xlinkHref="#scroll-circle-path" startOffset="50%">
                                        - Go to gallery - Voir la gallerie - إذهب إلى المعرض
                                    </textPath>
                                </text>
                            </svg>
                            <img className={`click3 ${isStage3 || isStage4 ? "not-stage-txt" : ""}`} src={click3} alt="identities Box clickable circle" />
                        </div>
                    </div>

                    <div className="tabs-all-lines">
                        <img className="white-line lines" src={whiteLine} alt="" />
                        <img className={`tab-yellow-line lines ${isStage4 || isStage5 ? "not-stage-line" : ""}`} src={yellowLine} alt="" />
                        <img className={`tab-red-line lines ${isStage3 || isStage5 ? "not-stage-line" : ""}`} src={redLine} alt="" />
                        <img className={`tab-teal-line lines ${isStage3 || isStage4 ? "not-stage-line" : ""}`} src={tealLine} alt="" />
                    </div>
                </div>

                {/* Right-side galleries */}
                <div className="gallery-content">
                    <div className="gallery-cards">
                        <div className="scroll">
                            <img className="scroll-line" src={scrollBar} alt="scroll Bar" />
                            <img
                                className="scroll-tic"
                                src={scrollTic}
                                alt="scroll Tic"
                                style={{
                                    top: activeGalleryStage === 3 ? '10%' : activeGalleryStage === 4 ? '39%' : '75%',
                                    transition: 'top 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            />
                        </div>
                        <div className="gallery-stack">
                            {/* Illustrations = stage 3 */}
                            <div className={`gallery-illustrations ${getGalleryClasses(3)}`}>
                                <div className="spotlight-yellow"></div>

                                <div className="illustration1">
                                    <img className="illustration-border" src={galleryborder} alt="" />
                                    <img className="illustration-img" src={illustration1} alt="" />
                                </div>
                                <div className="illustration2">
                                    <img className="illustration-border" src={galleryborder} alt="" />
                                    <img className="illustration-img" src={illustration2} alt="" />
                                </div>
                                <div className="illustration3">
                                    <img className="illustration-border" src={galleryborder} alt="" />
                                    <img className="illustration-img" src={illustration3} alt="" />
                                </div>
                                <div className="illustration4">
                                    <img className="illustration-border" src={galleryborder} alt="" />
                                    <img className="illustration-img" src={illustration4} alt="" />
                                </div>
                            </div>

                            {/* Featured = stage 4 */}
                            <div className={`gallery-featured ${getGalleryClasses(4)}`}>
                                <div className="spotlight-red"></div>
                                <div className="featured1">
                                    <img className="featured-border" src={galleryborder} alt="" />
                                    <img className="featured-img" src={featured1} alt="" />
                                </div>
                                <div className="featured2">
                                    <img className="featured-border" src={galleryborder} alt="" />
                                    <img className="featured-img" src={featured2} alt="" />
                                </div>
                                <div className="featured3">
                                    <img className="featured-border" src={galleryborder} alt="" />
                                    <img className="featured-img" src={featured3} alt="" />
                                </div>
                                <div className="featured4">
                                    <img className="featured-border" src={galleryborder} alt="" />
                                    <img className="featured-img" src={featured4} alt="" />
                                </div>
                            </div>

                            {/* Identities = stage 5 */}
                            <div className={`gallery-identities ${getGalleryClasses(5)}`}>
                                <div className="spotlight-teal"></div>
                                <div className="identities1">
                                    <img className="identities-border" src={galleryborder} alt="" />
                                    <img className="identities-img" src={identities1} alt="" />
                                </div>
                                <div className="identities2">
                                    <img className="identities-border" src={galleryborder} alt="" />
                                    <img className="identities-img" src={identities2} alt="" />
                                </div>
                                <div className="identities3">
                                    <img className="identities-border" src={galleryborder} alt="" />
                                    <img className="identities-img" src={identities3} alt="" />
                                </div>
                                <div className="identities4">
                                    <img className="identities-border" src={galleryborder} alt="" />
                                    <img className="identities-img" src={identities4} alt="" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* STAGE 6 */}

            <div className={`stage-content__stage stage-content__stage-6 ${isStage6 ? "is-visible" : ""}`}>
                <div className="stage-6__orb-content">
                    <div className="stage-6__main-text">
                        <div className="stage-6__title">
                            <div className="stage-6__title-en">Quotations</div>
                            <div className="stage-6__title-ar">تقييم التكلفة</div>
                            <div className="stage-6__title-fr">Devis</div>
                        </div>
                        <div className="stage-6__subtitle">
                            Get your estimated, personalized quotation
                            for your project depending on your location
                            and business in just a few clicks...
                        </div>
                        <a className="first-click">First click ;)</a>
                    </div>

                    <div className="stage-6__Devis-imgs">
                        <img src={Letterhead} alt="Letterhead Mockup" className="letterhead-mockup" />
                        <img src={theMask} alt="The Mask illustration" className="the-mask" />
                    </div>

                </div>
            </div>

            {/* STAGE 7 */}

            <div className={`stage-content__stage stage-content__stage-7 ${isStage7 ? "is-visible" : ""}`}>
                <div className="stage-7__orb-content">
                    <img className="Envelope" src={contactEnvelope} alt="Envelope illustration" />
                    <img className="Envelope-emptyOrb" src={emptyOrb} alt="" />

                    <img className="contactBox" src={contactBox} alt="contact box" />

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
                        <a className="contact-btn">Contact</a>
                    </div>

                </div>
            </div>

            {/* STAGE 8 */}

            <div className={`stage-content__stage stage-content__stage-8 ${isStage8 ? "is-visible" : ""}`}>
                <div className="stage-8__orb-content">
                    <div className="personal-img-bubble">
                        <img className="personalImg" src={personalImg} alt="profile img" />
                        <img className="personalBubble" src={galleryBubble} alt="the orb around the profile img" />
                    </div>

                    <img className="aboutBox" src={aboutBox} alt="about box" />


                    <div className="stage-8__subtitle">
                        <p>Muhanad ALTOUKHI, Syrian graphic designer and illustrator.</p>
                        <p>Originally from Douma, on the outskirts of Damascus, I began
                            learning graphic design in 2014 during the military siege of Eastern
                            Ghouta. In 2024, I completed my DNMADE in Graphic Design in Paris.</p>
                        <p>Living between these two worlds has shaped my creative vision,
                            allowing me to develop hybrid, multicultural projects enriched by a
                            unique perspective one that I’m excited to share and work with you.</p>
                    </div>

                    <div className="about-cards">
                        <div className="about-card">
                            <img className="about-border" src={galleryborder} alt="" />
                            <img className="about-img" src={aboutCard1} alt="" />
                        </div>
                        <div className="about-card higher-card">
                            <img className="about-border" src={galleryborder} alt="" />
                            <img className="about-img" src={aboutCard2} alt="" />
                        </div>
                        <div className="about-card">
                            <img className="about-border" src={galleryborder} alt="" />
                            <img className="about-img" src={aboutCard3} alt="" />
                        </div>
                        <div className="about-card higher-card">
                            <img className="about-border" src={galleryborder} alt="" />
                            <img className="about-img" src={aboutCard4} alt="" />
                        </div>
                    </div>

                </div>
            </div>

            {/* STAGE 9 */}

            <div className={`stage-content__stage stage-content__stage-9 ${isStage9 ? "is-visible" : ""}`}>
                <div className="stage-9__orb-content">
                    <div className="stage-9__main-text">Featured Clients</div>
                    <img className="featuredClientsBox" src={featuredClientsBox} alt="featured Box" />
                    <img className="featuredLogos" src={featuredLogos} alt="featured Logos" />
                </div>
            </div>

            {/* STAGE 10 - Footer */}

            <div className={`stage-content__stage stage-content__stage-10 ${isStage10 ? "is-visible" : ""}`}>
                <GradientBackground hideInteractive={true} hideG6={true} />
                <div className="stage-10__footer-content">

                    <div className="footer-main">
                        {/* Left Section - Logo */}
                        <div className="footer-left">
                            <img src={footerLogo} alt="Muhamad Aldoukhi" className="footer-logo" />
                            <img src={footerLogoLine} alt="" className="footer-logo-line" />
                        </div>

                        {/* Middle Section - Navigation Links */}
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
                                    <li><a href="/gallery">Illustrations</a></li>
                                    <li><a href="/gallery">Visual Identities</a></li>
                                    <li><a href="/gallery">Featured Projects</a></li>
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

                        {/* Right Section - Social & Badge */}
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
                                Muhamad ALDOUKHI 2026 - All Rights Reserved ©
                            </div>
                        </div>
                    </div>

                </div>

                <div className="footer-alien">
                    <img src={Alien} alt="" className="footer-alien-body" />
                    <img src={alienHand} alt="" className="footer-alien-hand" />
                </div>

            </div>
        </div>

        // </div >
    );
}
