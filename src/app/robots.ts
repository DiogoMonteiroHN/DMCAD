import type { MetadataRoute } from "next";

// Aberto a motores de pesquisa e a assistentes de IA: para a DMCAD aparecer nas
// respostas do ChatGPT, Claude, Perplexity e Gemini (GEO), estes têm de poder ler.
const ASSISTENTES = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ASSISTENTES, allow: "/" },
    ],
    sitemap: "https://dmcad.pt/sitemap.xml",
  };
}
