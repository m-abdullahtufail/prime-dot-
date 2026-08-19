import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ServicesPreview from "@/components/ServicesPreview";
import WhyTeaser from "@/components/WhyTeaser";
import TeamPreview from "@/components/TeamPreview";
import Contact from "@/components/Contact";
import Location from "@/components/Location";
import { getContent } from "@/lib/content";

export default function Home() {
  const { contactSection } = getContent();
  return (
    <>
      <Hero />
      <Marquee />
      <ServicesPreview />
      <WhyTeaser />
      <TeamPreview />
      <Contact
        backHref={contactSection.backHref}
        backLabel={contactSection.backLabel}
      />
      <Location />
    </>
  );
}
