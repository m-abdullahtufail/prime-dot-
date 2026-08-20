import type { Metadata, Viewport } from "next";
import Background from "@/components/Background";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import { getContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const c = getContent();
  const siteUrl = c.seo.siteUrl;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: c.seo.siteTitle, template: "%s" },
    description: c.seo.siteDescription,
    keywords: c.seo.keywords,
    alternates: { canonical: "/" },
    openGraph: {
      title: c.seo.ogTitle,
      description: c.seo.ogDescription,
      type: "website",
      url: "/",
      siteName: c.brand.name,
      locale: "en_US",
      images: [
        { url: "/logo.png", width: 512, height: 512, alt: c.brand.name },
      ],
    },
    twitter: {
      card: "summary",
      title: c.seo.ogTitle,
      description: c.seo.ogDescription,
      images: ["/logo.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    authors: [{ name: c.brand.name, url: "/" }],
    creator: c.brand.name,
    publisher: c.brand.name,
    category: "technology",
  };
}

function JsonLd() {
  const c = getContent();
  const siteUrl = c.seo.siteUrl;
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: `${c.brand.name} ${c.brand.nameAccent}`,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    email: c.contactSection.email,
    description: c.seo.siteDescription,
    sameAs: c.footer.socials.map((s) => s.href),
    address: {
      "@type": "PostalAddress",
      streetAddress: c.location.address[0],
      addressRegion: c.location.address[1],
      addressCountry: "PK",
    },
    areaServed: ["Pakistan", "Worldwide"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
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
      <JsonLd />
      <Background />
      <CursorGlow />
      <ScrollProgress />
      <Header nav={c.nav} brand={c.brand} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
