import bgWhite from "../../assets/background/bg-white.svg";
import "./loading.scss";

export default function Loading({ isLoading }) {
  return (
    <div className={`loader ${!isLoading ? "loader--exit" : ""}`}>
      <img src={bgWhite} alt="" className="bg-white" />
    </div>
  );
}

