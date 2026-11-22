import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { DESCRICAO, PESSOA } from "./marca";

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

const descricao = DESCRICAO;

export const metadata: Metadata = {
  metadataBase: new URL("https://dmcad.pt"),
  title: "DMCAD · IA prática para salões de beleza em Portugal",
  description: descricao,
  alternates: { canonical: "/" },
  authors: [{ name: PESSOA.nome, url: "https://dmcad.pt" }],
  creator: PESSOA.nome,
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://dmcad.pt",
    siteName: "DMCAD",
    title: "DMCAD · IA prática para salões de beleza em Portugal",
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
