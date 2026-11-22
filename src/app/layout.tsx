import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

// As letras do brandbook (cap. 06): Space Grotesk nos títulos, Inter no texto.
// O next/font descarrega-as no build e serve-as do próprio site: quem visita
// não faz nenhum pedido à Google.
const titulos = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--letra-titulos",
  display: "swap",
});

const texto = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--letra-texto",
  display: "swap",
});

const descricao =
  "IA prática para salões de beleza, centros de estética e cabeleireiros em Portugal. Ferramentas certas, explicadas de forma simples, sem conteúdo com cara de IA.";

export const metadata: Metadata = {
  metadataBase: new URL("https://dmcad.pt"),
  title: "DMCAD · IA prática para negócios de beleza",
  description: descricao,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://dmcad.pt",
    siteName: "DMCAD",
    title: "DMCAD · IA prática para negócios de beleza",
    description: descricao,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#F7F4EF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${titulos.variable} ${texto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
