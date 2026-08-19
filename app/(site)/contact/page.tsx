import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";
import { getContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const p = getContent().pages.contact;
  return {
    title: p.metaTitle,
    description: p.metaDescription,
  };
}

export default function ContactPage() {
  const p = getContent().pages.contact;
  return (
    <>
      <PageHeader
        kicker={p.kicker}
        titlePrefix={p.titlePrefix}
        titleAccent={p.titleAccent}
        subtitle={p.subtitle}
      />
      <Contact />
    </>
  );
}
