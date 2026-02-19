import Link from "next/link";
import FooterSocialLinks from "./FooterSocialLinks";
import { Phone, Mail, MapPin } from "lucide-react";

type FooterData = {
  brandName?: string | null;
  tagline?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  copyright?: string | null;
  managedBy?: string | null;
  managedByUrl?: string | null;
};

type HeaderData = {
  navLinks?: { href: string; label: string }[] | null;
};

export default function Footer({ data, headerData }: { data?: FooterData; headerData?: HeaderData }) {
  const brandName = data?.brandName || "Villa Lithos";
  const tagline = data?.tagline || "A private villa in Porto Rafti, Greece. Quiet stays, thoughtful comfort.";
  const phone = data?.phone || "+30 693 275 7142";
  const email = data?.email || "info@villalithos.com";
  const address = data?.address || "Porto Rafti, Attica, Greece";
  const copyright = data?.copyright || "Villa Lithos";
  const managedBy = data?.managedBy || "Managed by Goldenberg Luxe";
  const managedByUrl = data?.managedByUrl || "https://goldenberg-luxe.guestybookings.com/en";
  const navLinks = headerData?.navLinks || [
    { href: "/#about", label: "The Villa" },
    { href: "/#services", label: "Concierge" },
    { href: "/#gallery", label: "Gallery" },
    { href: "/#location", label: "Location" },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        {/* Top Section - 3 Column Layout for Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start w-full py-8 lg:py-10">

          {/* LEFT: Contact */}
          <div className="flex flex-col items-center lg:items-start w-full order-last lg:order-first">
            <h3 className="site-footer__heading mb-6 mt-0">Contact</h3>
            <div className="flex flex-col gap-4 items-center lg:items-start text-[15px]">
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="site-footer__contact-link flex items-center gap-3 hover:text-[#8B9A7D] transition-colors">
                <Phone size={18} strokeWidth={1.5} className="text-[#8B9A7D]" />
                <span>{phone}</span>
              </a>
              <a href={`mailto:${email}`} className="site-footer__contact-link flex items-center gap-3 hover:text-[#8B9A7D] transition-colors">
                <Mail size={18} strokeWidth={1.5} className="text-[#8B9A7D]" />
                <span>{email}</span>
              </a>
              <span className="site-footer__address flex items-center gap-3 text-[#6B7280]">
                <MapPin size={18} strokeWidth={1.5} className="text-[#8B9A7D]" />
                <span>{address}</span>
              </span>
            </div>
          </div>

          {/* CENTER: Brand */}
          <div className="site-footer__brand flex flex-col items-center text-center w-full">
            <span className="site-footer__brand-name text-3xl mb-4 block mt-0">{brandName}</span>
            <p className="site-footer__tagline max-w-xs mx-auto mb-6 text-[#6B7280]">
              {tagline}
            </p>
            <FooterSocialLinks />
          </div>

          {/* RIGHT: Explore */}
          <div className="flex flex-col items-center lg:items-end w-full">
            <h3 className="site-footer__heading mb-6 mt-0">Explore</h3>
            <nav className="flex flex-col gap-3 items-center lg:items-end text-[15px]">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-[#8B9A7D] transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="site-footer__bottom">
          <span className="site-footer__copyright">
            &copy; {new Date().getFullYear()} {copyright}
          </span>
          <a
            href={managedByUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__managed"
          >
            {managedBy}
          </a>
        </div>
      </div>
    </footer>
  );
}
