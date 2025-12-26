import HeroBanner from "@/components/HeroBanner";
import MarqueeLine from "@/components/MarqueeLine";
import ServicesGrid from "@/components/ServicesGrid";
import ContactForm from "@/components/ContactForm";
import Gallery from "@/components/Gallery";

export default function HomePage() {
  return (
    <main>
      <HeroBanner
        kicker="WELCOME TO"
        title="Villa Lithos"
        subtitle="A private retreat in Greece — designed for serene stays, curated comfort, and effortless luxury."
        imageUrl="/img/hero.jpg"
        bookingUrl="https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72?minOccupancy=1"
        contactHref="/#inquiry"
      />

      <MarqueeLine />

      <section id="services" className="section">
        <ServicesGrid />
      </section>

      <section id="gallery" className="section">
      <Gallery 
  title="Villa Lithos Gallery"
  subtitle="Exterior, interiors, pool & views — a taste of the experience."
/>
      </section>

      <section id="inquiry" className="section">
        <ContactForm />
      </section>
    </main>
  );
}
