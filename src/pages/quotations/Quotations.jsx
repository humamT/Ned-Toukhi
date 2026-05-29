import './Quotations.scss';
import ComingSoon from "../../assets/PNGS+SVGs/coming-soon.png";

export default function QuotationsPage() {
  return (
    <div className="quotations-page">
      <img src={ComingSoon} alt="Coming Soon" className="coming-soon-image" />
    </div>
  );
}
