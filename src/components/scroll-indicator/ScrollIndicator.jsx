import "./ScrollIndicator.scss";
import mouseIcon from "../../assets/PNGS+SVGs/mouse.svg";
import mouseTextIcon from "../../assets/PNGS+SVGs/mouse-text.svg";
import { memo } from "react";

function ScrollIndicator({ visible = false }) {
  return (
    <div
      className={`scroll-indicator ${visible ? "is-visible" : ""}`}
      role="img"
      aria-label="Scroll down"
    >
      {/* <div className="scroll-indicator__mouse"> */}
        <img className="scroll-indicator__mouse" src={mouseIcon} alt="" aria-hidden="true" />
      {/* </div> */}

      <img
        className="scroll-indicator__text"
        src={mouseTextIcon}
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}

export default memo(ScrollIndicator);
