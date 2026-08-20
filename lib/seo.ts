import type { Metadata } from "next";
import { getContent } from "@/lib/content";

export function pageMetadata(
  path: string,
  title: string,
  description: string
): Metadata {
  const { brand } = getContent();
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: "website",
      url: path,
      siteName: brand.name,
      locale: "en_US",
      images: [{ url: "/logo.png", width: 512, height: 512, alt: title }],
    },
    twitter: {
      card: "summary",
      title,
      description,
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
  };
}