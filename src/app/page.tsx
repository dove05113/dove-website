import HeroCarousel from "@/app/components/HeroCarousel";
import ServicesSection from "./components/ServicesSection";
import WhyChooseUs from "./components/WhyChooseUs";
import PricingSection from "./components/PricingSection";
import LocationSection from "./components/LocationSection";
import ContactCTA from "./components/ContactCTA";

export default function Home() {
  return (
    <main>

      <HeroCarousel />
      <ServicesSection />
      <WhyChooseUs />
      <PricingSection />
      <LocationSection />
      <ContactCTA />

      {/* More sections below */}

    </main>
  );
}