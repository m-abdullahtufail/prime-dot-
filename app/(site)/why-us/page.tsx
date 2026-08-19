import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Signature from "@/components/Signature";
import { getContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const p = getContent().pages.why;
  return {
    title: p.metaTitle,
    description: p.metaDescription,
  };
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
