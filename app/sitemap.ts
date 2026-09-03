import type { MetadataRoute } from "next";
import { company } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: company.domain,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
