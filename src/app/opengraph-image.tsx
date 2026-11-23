import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// A imagem que aparece quando se partilha o site (WhatsApp, Instagram, LinkedIn).
export const alt = "Diogo Monteiro, colaborador da HN Hit Nails: IA para salões, estúdios, clínicas e pequenos negócios.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Imagem() {
  const logo = await readFile(join(process.cwd(), "public/hn-hit-nails-logo.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#13141B", padding: 72, color: "#fff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={330} height={100} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>Diogo Monteiro</div>
          <div style={{ fontSize: 40, color: "#FDB5CD", marginTop: 16 }}>IA para salões, estúdios, clínicas e pequenos negócios</div>
        </div>
      </div>
    ),
    size,
  );
}
