import { useMemo } from "react";
import "./StageContent.scss";
import stickerImg from "../../assets/images/sticker-op.png";
import postersCluster from "../../assets/images/posters-cluster.png";

/**
 * StageContent
 * Displays stage-specific elements that fade in/out based on stageIndex
 */
export default function StageContent({ stageIndex }) {
    const isStage1 = stageIndex === 1;

    return (
        <div className="stage-content">
            {/* STAGE 1: Boutique intro */}
            <div className={`stage-content__stage stage-content__stage-1 ${isStage1 ? "is-visible" : ""}`}>
                <div className="stage-1__orb-content">
                    {/* <div className="stage-1__text-section"> */}

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
                        <button className="shop-now">Shop NOW!</button>

                    {/* </div> */}
                </div>

                {/* Posters cluster next to the orb (left side) with hover animation */}
                <div className="stage-1__posters-section">
                    <img src={postersCluster} alt="Posters cluster" className="stage-1__posters" />
                </div>
            </div>

            {/* STAGE 2: Gallery intro */}
        </div>
    );
}
