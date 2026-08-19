import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Team from "@/components/Team";
import { getContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const p = getContent().pages.team;
  return {
    title: p.metaTitle,
    description: p.metaDescription,
  };
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
