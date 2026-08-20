import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const p = getContent().pages.contact;
  return pageMetadata("/contact", p.metaTitle, p.metaDescription);
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
