import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Services from "@/components/Services";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const p = getContent().pages.services;
  return pageMetadata("/services", p.metaTitle, p.metaDescription);
}

export default function ServicesPage() {
  const p = getContent().pages.services;
  return (
    <>
      <PageHeader
        kicker={p.kicker}
        titlePrefix={p.titlePrefix}
        titleAccent={p.titleAccent}
        subtitle={p.subtitle}
      />
      <Services showHeader={false} />
    </>
  );
}
