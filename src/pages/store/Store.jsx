import './Store.scss';
import ComingSoon from "../../assets/PNGS+SVGs/coming-soon.png";

export default function StorePage() {
  return (
    <div className="store-page">
      <img src={ComingSoon} alt="Coming Soon" className="coming-soon-image" />
    </div>
  );
}
