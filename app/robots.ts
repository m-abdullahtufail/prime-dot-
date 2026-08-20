import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getContent().seo.siteUrl;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}