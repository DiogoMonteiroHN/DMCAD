import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://dmcad.pt", lastModified: new Date("2026-11-22"), changeFrequency: "monthly", priority: 1 },
    { url: "https://dmcad.pt/raret", lastModified: new Date("2026-11-22"), changeFrequency: "yearly", priority: 0.7 },
    { url: "https://dmcad.pt/llms.txt", lastModified: new Date("2026-11-22"), changeFrequency: "monthly", priority: 0.3 },
  ];
}
