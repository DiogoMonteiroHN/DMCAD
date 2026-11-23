import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { DESCRICAO, PESSOA, SITE } from "./marca";

// As letras da HN Hit Nails (loja, tailwind.config.ts): Manrope nos títulos, Inter no texto.
// O next/font descarrega-as no build e serve-as do próprio site: quem visita
// não faz nenhum pedido à Google.
const titulos = Manrope({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--letra-titulos",
  display: "swap",
});

const texto = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--letra-texto",
  display: "swap",
});

const descricao = DESCRICAO;

const titulo = "Diogo Monteiro · HN Hit Nails · IA para negócios de beleza";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: titulo,
  description: DESCRICAO,
  alternates: { canonical: "/" },
  authors: [{ name: PESSOA.nome, url: SITE }],
  creator: PESSOA.nome,
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: SITE,
    siteName: PESSOA.nome,
    title: titulo,
    description: DESCRICAO,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#13141B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${titulos.variable} ${texto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
