import "./ScrollIndicator.scss";
import mouseIcon from "../../assets/images/mouse.svg";

export default function ScrollIndicator({ visible = false }) {
  return (
    <div className={`scroll-indicator ${visible ? "is-visible" : ""}`}>
      <div className="scroll-indicator__mouse">
        <img src={mouseIcon} alt="Scroll indicator" />
      </div>

      <svg
        className="scroll-indicator__text"
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
            Scroll down · Faire défiler · اسحب إلى الأسفل ·
          </textPath>
        </text>
      </svg>
    </div>
  );
}
