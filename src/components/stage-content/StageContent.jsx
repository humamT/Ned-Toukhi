import { useMemo } from "react";
import "./StageContent.scss";
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

/**
 * StageContent
 * Displays stage-specific elements that fade in/out based on stageIndex
 */
export default function StageContent({ stageIndex }) {
    const isStage1 = stageIndex === 1;
    const isStage2 = stageIndex === 2;
    const isStage3 = stageIndex === 3;
    const isStage4 = stageIndex === 4;
    const isStage5 = stageIndex === 5;
    const isStage6 = stageIndex === 6;
    const isStage7 = stageIndex === 7;

    return (
        <div className="stage-content">

            {/* STAGE 1: Boutique intro */}
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

                    <div className="stage-1__subtitle">Postcards, stickers, posters, BUY THEM ALL!,
                        chose between a wide selection of original
                        art projects and get them delevered.</div>
                    <a className="shop-now">Shop NOW!</a>
                </div>

                {/* Posters cluster next to the orb (left side) with hover animation */}
                <div className="stage-1__posters-section">
                    <img src={postersCluster} alt="Posters cluster" className="stage-1__posters" />
                </div>
            </div>

            {/* STAGE 2: Gallery intro */}

            <div className={`stage-content__stage stage-content__stage-2 ${isStage2 ? "is-visible" : ""}`}>
                <div className="stage-2__orb-content">
                    <div className="stage-2__main-text">
                        <div className="stage-2__title">
                            <div className="stage-2__title-en">Gallery</div>
                            <div className="stage-2__title-ar">المعرض</div>
                            <div className="stage-2__title-fr">Galerie</div>
                        </div>
                    </div>
                    <div className="stage-2__subtitle">Discover 3 categories of %100 human-made
                        art, from illustrations and logo designs to
                        standout featured projects.</div>
                    <div>
                        <img className="gallery1 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
                        <img className="gallery2 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
                        <img className="gallery3 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
                        <img className="gallery4 gallery-orbs" src={galleryBubble} alt="Bubble with a photo inside" />
                    </div>
                    <a className="explore-now">Explore NOW!</a>
                </div>
            </div>

            {/* STAGE 3-4-5: Gallery Tab 1 */}

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

                    <div className="tabs-rectangles">
                        {/* 1st row of tabs */}
                        <div className={`tab-rectangle1 ${ isStage4 || isStage5 ? "not-stage" : ""}`}>
                            <img className="illustrationsBox" src={illustrationsBox} alt="illustrations Box" />
                            <div className="illustrations-txt">
                                <div className="illustrations-en">Illustrations</div>
                                <div className="illustrations-ar">رسومات</div>
                                <div className="illustrations-fr">Dessins</div>
                            </div>
                            <svg
                                className={`click-txt ${ isStage4 || isStage5 ? "not-stage-txt" : ""}`}
                                viewBox="0 0 200 200"
                                aria-hidden="true"
                                role="img"
                            >
                                <defs>
                                    <path
                                        id="scroll-circle-path"
                                        d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                                    />
                                </defs>
                                <text textAnchor="middle" dominantBaseline="middle">
                                    <textPath xlinkHref="#scroll-circle-path" startOffset="50%">
                                        - Go to gallery - Voir la gallerie - إذهب إلى المعرض
                                    </textPath>
                                </text>
                            </svg>
                            <img className={`click1 ${ isStage4 || isStage5 ? "not-stage-txt" : ""}`} src={click1} alt="illustrations Box clickable circle" />
                        </div>
                        {/* 2nd row of tabs */}
                        <div className={`tab-rectangle2 ${ isStage3 || isStage5 ? "not-stage" : ""}`}>
                            <img className="featuredBox" src={featuredBox} alt="featured Box" />
                            <div className="featured-txt">
                                <div className="featured-en">Featured</div>
                                <div className="featured-ar">أعمال خاصة</div>
                                <div className="featured-fr">Sélectionnés</div>
                            </div>

                            <svg
                                className={`click-txt ${ isStage3 || isStage5 ? "not-stage-txt" : ""}`}
                                viewBox="0 0 200 200"
                                aria-hidden="true"
                                role="img"
                            >
                                <defs>
                                    <path
                                        id="scroll-circle-path"
                                        d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                                    />
                                </defs>
                                <text textAnchor="middle" dominantBaseline="middle">
                                    <textPath xlinkHref="#scroll-circle-path" startOffset="50%">
                                        - Go to gallery - Voir la gallerie - إذهب إلى المعرض
                                    </textPath>
                                </text>
                            </svg>

                            <img className={`click2 ${ isStage3 || isStage5 ? "not-stage-txt" : ""}`} src={click2} alt="featured Box clickable circle" />
                        </div>
                        {/* 3rd row of tabs  */}
                        <div className={`tab-rectangle3 ${ isStage3 || isStage4 ? "not-stage" : ""}`}>
                            <img className="identitiesBox" src={identitiesBox} alt="identities Box" />
                            <div className="identities-txt">
                                <div className="identities-en">Identities</div>
                                <div className="identities-ar">هويات بصرية </div>
                                <div className="identities-fr">Charts graphiques</div>
                            </div>
                            <svg
                                className={`click-txt ${ isStage3 || isStage4 ? "not-stage-txt" : ""}`}
                                viewBox="0 0 200 200"
                                aria-hidden="true"
                                role="img"
                            >
                                <defs>
                                    <path
                                        id="scroll-circle-path"
                                        d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                                    />
                                </defs>
                                <text textAnchor="middle" dominantBaseline="middle">
                                    <textPath xlinkHref="#scroll-circle-path" startOffset="50%">
                                        - Go to gallery - Voir la gallerie - إذهب إلى المعرض
                                    </textPath>
                                </text>
                            </svg>
                            <img className={`click3 ${ isStage3 || isStage4 ? "not-stage-txt" : ""}`} src={click3} alt="identities Box clickable circle" />
                        </div>
                    </div>

                    <div className="tabs-all-lines">
                        <img className="white-line lines" src={whiteLine} alt="" />

                        <img className={`tab-yellow-line lines ${ isStage4 || isStage5 ? "not-stage-line" : ""}`} src={yellowLine} alt="" />
                        <img className={`tab-red-line lines ${ isStage3 || isStage5 ? "not-stage-line" : ""}`} src={redLine} alt="" />
                        <img className={`tab-teal-line lines ${ isStage3 || isStage4 ? "not-stage-line" : ""}`} src={tealLine} alt="" />

                    </div>
                </div>
            </div>


        </div>
    );
}
