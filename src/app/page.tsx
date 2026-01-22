import dynamic from "next/dynamic";
import HeroBanner from "@/components/HeroBanner";
import MarqueeLine from "@/components/MarqueeLine";
import RenderOnView from "@/components/RenderOnView";
import UltraLuxuryGallery from "@/components/UltraLuxuryGallery";

// Dynamic imports for below-fold heavy components
// These reduce initial JS bundle and main thread work
const VillaIntroSection = dynamic(
  () => import("@/components/VillaIntroSection"),
  { ssr: true }
);

const ConciergeSection = dynamic(
  () => import("@/components/ConciergeSection"),
  { ssr: true }
);

const VillaMapSection = dynamic(
  () => import("@/components/VillaMapSection"),
  { ssr: true }
);

const ContactForm = dynamic(() => import("@/components/ContactForm"), {
  ssr: true,
});

export default function HomePage() {
  return (
    <main>
      {/* Above-fold: HeroBanner loaded eagerly with priority image */}
      <HeroBanner
        kicker="WELCOME TO"
        title="Villa Lithos"
        subtitle="A private villa in Greece. Quiet stays, thoughtful comfort."
        videoSrcMobile="/videos/hero.mp4"
        videoSrcDesktop="/videos/heroPC.mp4"
        poster="/img/hero.webp"
        imageUrl="/img/hero.webp"
        contactHref="/#inquiry"
        galleryHref="/#gallery"
      />

      {/* MarqueeLine is lightweight, keep above fold */}
      <MarqueeLine />

      {/* Below-fold sections wrapped with RenderOnView for lazy mounting */}
      {/* Under-fold sections - static render for anchor fix */}
      <VillaIntroSection />

      <ConciergeSection />

      {/* Gallery section - preserve id for anchor */}
      <div id="gallery">
        <UltraLuxuryGallery
          title="Gallery"
          subtitle="A Visual Journey"
        />
      </div>

      {/* Map section - preserve id for anchor */}
      {/* Map section - preserve id for anchor */}
      <div id="location">
        <VillaMapSection />
      </div>

      {/* Contact/Inquiry section - preserve ids for anchor */}
      {/* Contact/Inquiry section - preserve ids for anchor */}
      <div id="contact" className="section">
        <div id="inquiry">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
