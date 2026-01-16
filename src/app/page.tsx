import dynamic from "next/dynamic";
import HeroBanner from "@/components/HeroBanner";
import MarqueeLine from "@/components/MarqueeLine";
import RenderOnView from "@/components/RenderOnView";

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

const GalleryCarousel = dynamic(() => import("@/components/GalleryCarousel"), {
  ssr: true,
});

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
        subtitle="A private villa in Greece. Quiet stays, thoughtful comfort, easy luxury."
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
      <RenderOnView fallbackHeight="800px" rootMargin="400px">
        <VillaIntroSection />
      </RenderOnView>

      <RenderOnView fallbackHeight="600px" rootMargin="400px">
        <ConciergeSection />
      </RenderOnView>

      {/* Gallery section - preserve id for anchor */}
      <RenderOnView
        id="gallery"
        className="section"
        fallbackHeight="500px"
        rootMargin="400px"
      >
        <GalleryCarousel
          title="Gallery"
          subtitle="Exterior, interiors, pool, and views."
        />
      </RenderOnView>

      {/* Map section - preserve id for anchor */}
      <RenderOnView
        id="location"
        fallbackHeight="500px"
        rootMargin="400px"
      >
        <VillaMapSection />
      </RenderOnView>

      {/* Contact/Inquiry section - preserve ids for anchor */}
      <RenderOnView
        id="contact"
        className="section"
        fallbackHeight="700px"
        rootMargin="400px"
      >
        <div id="inquiry">
          <ContactForm />
        </div>
      </RenderOnView>
    </main>
  );
}
