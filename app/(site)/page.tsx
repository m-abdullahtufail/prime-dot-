import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ServicesPreview from "@/components/ServicesPreview";
import WhyTeaser from "@/components/WhyTeaser";
import TeamPreview from "@/components/TeamPreview";
import Contact from "@/components/Contact";
import Location from "@/components/Location";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const c = getContent();
  return pageMetadata("/", c.seo.siteTitle, c.seo.siteDescription);
}

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
