import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://dmcad.pt", lastModified: new Date("2026-11-22"), changeFrequency: "monthly", priority: 1 }];
}
