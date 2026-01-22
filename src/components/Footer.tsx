import Link from "next/link";
import FooterSocialLinks from "./FooterSocialLinks";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        {/* Top Section */}
        {/* Top Section - 3 Column Layout for Desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12 lg:gap-8 items-start justify-between py-12">

          {/* LEFT: Contact (Moved from center) */}
          <div className="flex flex-col items-center lg:items-start w-full order-3 lg:order-1">
            <h3 className="site-footer__heading mb-6">Contact</h3>
            <div className="flex flex-col gap-4 items-center lg:items-start text-[15px]">
              <a href="tel:+306932757142" className="site-footer__contact-link flex items-center gap-3 hover:text-[#8B9A7D] transition-colors">
                <Phone size={18} strokeWidth={1.5} className="text-[#8B9A7D]" />
                <span>+30 693 275 7142</span>
              </a>
              <a href="mailto:info@villalithos.com" className="site-footer__contact-link flex items-center gap-3 hover:text-[#8B9A7D] transition-colors">
                <Mail size={18} strokeWidth={1.5} className="text-[#8B9A7D]" />
                <span>info@villalithos.com</span>
              </a>
              <span className="site-footer__address flex items-center gap-3 text-[#6B7280]">
                <MapPin size={18} strokeWidth={1.5} className="text-[#8B9A7D]" />
                <span>Porto Rafti, Attica, Greece</span>
              </span>
            </div>
          </div>

          {/* CENTER: Brand (With Socials) */}
          <div className="site-footer__brand flex flex-col items-center text-center w-full order-1 lg:order-2">
            <span className="site-footer__brand-name text-3xl mb-4 block">Villa Lithos</span>
            <p className="site-footer__tagline max-w-xs mx-auto mb-6 text-[#6B7280]">
              A private villa in Porto Rafti, Greece. Quiet stays, thoughtful comfort.
            </p>
            <FooterSocialLinks />
          </div>

          {/* RIGHT: Explore (Links) */}
          <div className="flex flex-col items-center lg:items-end w-full order-2 lg:order-3">
            <h3 className="site-footer__heading mb-6">Explore</h3>
            <nav className="flex flex-col gap-3 items-center lg:items-end text-[15px]">
              <Link href="/#about" className="hover:text-[#8B9A7D] transition-colors">The Villa</Link>
              <Link href="/#services" className="hover:text-[#8B9A7D] transition-colors">Concierge</Link>
              <Link href="/#gallery" className="hover:text-[#8B9A7D] transition-colors">Gallery</Link>
              <Link href="/#location" className="hover:text-[#8B9A7D] transition-colors">Location</Link>
            </nav>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="site-footer__bottom">
          <span className="site-footer__copyright">
            &copy; {new Date().getFullYear()} Villa Lithos
          </span>
          <a
            href="https://goldenberg-luxe.guestybookings.com/en"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__managed"
          >
            Managed by Goldenberg
          </a>
        </div>
      </div>
    </footer>
  );
}
