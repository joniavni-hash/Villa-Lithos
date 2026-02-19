import dynamic from "next/dynamic";
import HeroBanner from "@/components/HeroBanner";
import MarqueeLine from "@/components/MarqueeLine";
import UltraLuxuryGallery from "@/components/UltraLuxuryGallery";
import { getPageData, getGlobalData } from "@/app/lib/tina";

// Dynamic imports for below-fold heavy components
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

export default async function HomePage() {
  const [page, global] = await Promise.all([getPageData(), getGlobalData()]);

  return (
    <main>
      {/* Above-fold: HeroBanner loaded eagerly with priority image */}
      <HeroBanner
        kicker={page?.hero?.kicker || "WELCOME TO"}
        title={page?.hero?.title || "Villa Lithos"}
        subtitle={page?.hero?.subtitle || "A private villa in Greece. Quiet stays, thoughtful comfort."}
        videoSrcMobile="/videos/hero.mp4"
        videoSrcDesktop="/videos/heroPC.mp4"
        poster="/img/hero.webp"
        imageUrl="/img/hero.webp"
        contactHref="/#inquiry"
        galleryHref="/#gallery"
      />

      {/* MarqueeLine is lightweight, keep above fold */}
      <MarqueeLine text={page?.marquee?.text || undefined} />

      {/* Under-fold sections */}
      <VillaIntroSection
        data={page?.villaIntro || undefined}
        amenitiesData={page?.amenities || undefined}
        bookingUrl={global?.header?.bookingUrl || undefined}
      />

      <ConciergeSection data={page?.concierge || undefined} />

      {/* Gallery section - preserve id for anchor */}
      <div id="gallery">
        <UltraLuxuryGallery
          title={page?.gallery?.title || "Gallery"}
          subtitle={page?.gallery?.subtitle || "A Visual Journey"}
          description={page?.gallery?.description || undefined}
        />
      </div>

      {/* Map section - preserve id for anchor */}
      <div id="location">
        <VillaMapSection data={page?.map || undefined} />
      </div>

      {/* Contact/Inquiry section - preserve ids for anchor */}
      <div id="contact" className="">
        <div id="inquiry">
          <ContactForm cmsData={page?.contact || undefined} />
        </div>
      </div>
    </main>
  );
}
