import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Team from "@/components/Team";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const p = getContent().pages.team;
  return pageMetadata("/team", p.metaTitle, p.metaDescription);
}

export default function TeamPage() {
  const p = getContent().pages.team;
  return (
    <>
      <PageHeader
        kicker={p.kicker}
        titlePrefix={p.titlePrefix}
        titleAccent={p.titleAccent}
        subtitle={p.subtitle}
      />
      <Team showHeader={false} />
    </>
  );
}
