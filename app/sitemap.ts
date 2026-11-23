import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about", "/services", "/work", "/pricing", "/faq", "/contact"].map((path, index) => ({
    url: "https://techsbridge.in" + path,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "weekly" as const : "monthly" as const,
    priority: index === 0 ? 1 : 0.7,
  }));
}