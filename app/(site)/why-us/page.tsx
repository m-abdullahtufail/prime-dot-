import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Signature from "@/components/Signature";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const p = getContent().pages.why;
  return pageMetadata("/why-us", p.metaTitle, p.metaDescription);
}

export default function WhyUsPage() {
  const p = getContent().pages.why;
  return (
    <>
      <PageHeader
        kicker={p.kicker}
        titlePrefix={p.titlePrefix}
        titleAccent={p.titleAccent}
        subtitle={p.subtitle}
      />
      <Signature showHeader={false} />
    </>
  );
}
