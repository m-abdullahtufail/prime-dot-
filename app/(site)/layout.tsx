import type { Metadata, Viewport } from "next";
import Background from "@/components/Background";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import { getContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const c = getContent();
  return {
    title: c.seo.siteTitle,
    description: c.seo.siteDescription,
    keywords: c.seo.keywords,
    openGraph: {
      title: c.seo.ogTitle,
      description: c.seo.ogDescription,
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#060505",
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const c = getContent();
  return (
    <>
      <Background />
      <CursorGlow />
      <ScrollProgress />
      <Header nav={c.nav} brand={c.brand} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
