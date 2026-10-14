import HeroCarousel from "@/app/components/HeroCarousel";
import ServicesSection from "./components/ServicesSection";
import WhyChooseUs from "./components/WhyChooseUs";
import LocationSection from "./components/LocationSection";
import ContactCTA from "./components/ContactCTA";

export default function Home() {
  return (
    <main className="font-montserrat">
      <section id="hero-carousel">
        <HeroCarousel />
      </section>
      <section id="services">
        <ServicesSection />
      </section>
      <section id="choose-us">
        <WhyChooseUs />
      </section>
      <section id="location">
        <LocationSection />
      </section>
      <section id="contact-cta">
        <ContactCTA />
      </section>
    </main>
  );
}