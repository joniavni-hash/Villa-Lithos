import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroCinematic from "@/components/home/HeroCinematic";
import StatsStrip from "@/components/home/StatsStrip";
import Signature from "@/components/home/Signature";
import BentoGallery from "@/components/home/BentoGallery";
import Floors from "@/components/home/Floors";
import Story from "@/components/home/Story";
import EstateSection from "@/components/EstateSection";
import ConciergeGrid from "@/components/home/ConciergeGrid";
import Testimonials from "@/components/Testimonials";
import JournalTeaser from "@/components/home/JournalTeaser";
import FinalCta from "@/components/home/FinalCta";
import StickyActions from "@/components/home/StickyActions";
import Reveal from "@/components/home/Reveal";
import { getPageData } from "@/app/lib/tina";
import { defaultOpenGraph, defaultTwitter } from "@/app/lib/seo";
import { FAQJsonLd } from "@/app/lib/jsonld";

const HOME_TITLE = "Villa Lithos Greece | Luxury 9-Bed Estate Near Athens";
const HOME_DESC = "Experience Villa Lithos in Greece: an exclusive 9-bedroom luxury estate in Porto Rafti for 22 guests with heated pool, padel court, gym, and sea views.";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESC,
  openGraph: { ...defaultOpenGraph, type: "website", title: HOME_TITLE, description: HOME_DESC },
  twitter: { ...defaultTwitter, title: HOME_TITLE, description: HOME_DESC },
};

const VillaMapSection = dynamic(() => import("@/components/VillaMapSection"), { ssr: true });
const FaqSection = dynamic(() => import("@/components/FaqSection"), { ssr: true });
const ContactForm = dynamic(() => import("@/components/ContactForm"), { ssr: true });

export default async function HomePage() {
  const page = await getPageData();
  const bodyParagraphs = (page?.villaIntro?.bodyParagraphs?.filter(Boolean) as string[] | undefined) || undefined;
  const spaceParagraphs = (page?.villaIntro?.spaceParagraphs?.filter(Boolean) as string[] | undefined) || undefined;
  const storyParagraphs = bodyParagraphs && bodyParagraphs.length
    ? [...bodyParagraphs, ...(spaceParagraphs || [])]
    : undefined;

  return (
    <main>
      <FAQJsonLd />
      <Reveal />

      {/* 1. Cinematic hero: video over poster, one headline, one primary action */}
      <HeroCinematic
        label="Porto Rafti, Attica · 20 min from Athens Airport"
        title={page?.hero?.title && page.hero.title !== "Villa Lithos Greece" ? page.hero.title : "A private estate above the Aegean"}
      />

      {/* 2. Numbers, no icons */}
      <StatsStrip />

      {/* 3. The three differentiators */}
      <Signature />

      {/* 4. Gallery moved up: bento grid + lightbox, /#gallery anchor kept */}
      <BentoGallery />

      {/* 5. Interactive floors, /#floors */}
      <Floors />

      {/* 6. Condensed description with expand, /#about anchor kept (SEO copy stays in DOM) */}
      <Story paragraphs={storyParagraphs} />

      {/* 7. The Estate, dark full-bleed, /#estate */}
      <EstateSection />

      {/* 8. Concierge as image tiles, /#services */}
      <ConciergeGrid />

      {/* 9. Reviews, /#reviews */}
      <Testimonials />

      {/* 10. Location, /#location */}
      <div id="location">
        <VillaMapSection data={page?.map || undefined} />
      </div>

      {/* 11. FAQ, /#faq */}
      <FaqSection />

      {/* 12. Journal teaser (3 posts with images; the rest lives on /articles) */}
      <JournalTeaser />

      {/* 13. Final full-bleed CTA */}
      <FinalCta />

      {/* 14. Inquiry form, /#inquiry and /#contact anchors kept */}
      <div id="contact">
        <div id="inquiry">
          <ContactForm cmsData={page?.contact || undefined} />
        </div>
      </div>

      <StickyActions />
    </main>
  );
}
