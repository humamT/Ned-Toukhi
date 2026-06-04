import featuredLogosHorizontal from "../../assets/PNGS+SVGs/Featured-Clients/Featured-Clients-logos.svg";
import featuredLogosVertical from "../../assets/PNGS+SVGs/Featured-Clients/Featured-Clients-logos-vertical.svg";
import "./FeaturedClientsLogos.scss";

const MOBILE_LOGOS_MEDIA = "(max-width: 768px)";

export default function FeaturedClientsLogos({ className = "", alt = "featured logos", imgProps = {} }) {
  return (
    <picture className="featured-clients-logos-picture">
      <source media={MOBILE_LOGOS_MEDIA} srcSet={featuredLogosVertical} />
      <img {...imgProps} className={className} src={featuredLogosHorizontal} alt={alt} />
    </picture>
  );
}
