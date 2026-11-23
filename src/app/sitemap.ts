import type { MetadataRoute } from "next";
import { AULAS } from "./cursos/aulas";

export default function sitemap(): MetadataRoute.Sitemap {
  const dia = new Date("2026-11-23");
  return [
    { url: "https://dmcad.pt", lastModified: dia, changeFrequency: "monthly", priority: 1 },
    { url: "https://dmcad.pt/cursos", lastModified: dia, changeFrequency: "monthly", priority: 0.8 },
    ...AULAS.map((a) => ({ url: `https://dmcad.pt/cursos/${a.slug}`, lastModified: dia, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: "https://dmcad.pt/raret", lastModified: new Date("2026-11-22"), changeFrequency: "yearly", priority: 0.6 },
    { url: "https://dmcad.pt/privacidade", lastModified: dia, changeFrequency: "yearly", priority: 0.2 },
    { url: "https://dmcad.pt/llms.txt", lastModified: dia, changeFrequency: "monthly", priority: 0.3 },
  ];
}
