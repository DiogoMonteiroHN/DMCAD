"use client";

// O topo de cinema: no computador, o scroll conduz um filme de 14 s (três planos
// gerados com IA na muapi a 23/11/2026) e pára em três capítulos. No telemóvel
// fica a primeira imagem parada, sem descarregar o vídeo.

import { useEffect, useRef, useState } from "react";
import { limitar, useVivo } from "./vivo";

const CAPITULOS = [
  { de: 0.36, ate: 0.68, titulo: "A IA ao serviço de quem tem pouco tempo entre clientes.", texto: "A ferramenta certa, explicada de forma simples, aplicada no teu negócio." },
  { de: 0.72, ate: 1.01, titulo: "Da Glória do Ribatejo para o mundo.", texto: "Com a família HN Hit Nails por trás de cada passo." },
];

export function Cinema({ children }: { children: React.ReactNode }) {
  const vivo = useVivo();
  const seccao = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (!vivo) return;
    const s = seccao.current;
    const v = video.current;
    if (!s || !v) return;
    let alvo = 0;
    let atual = 0;
    let quadro = 0;
    const medir = () => {
      const r = s.getBoundingClientRect();
      alvo = limitar(-r.top / (r.height - window.innerHeight));
    };
    const passo = () => {
      atual += (alvo - atual) * 0.12;
      if (Math.abs(alvo - atual) < 0.0005) atual = alvo;
      setP(atual);
      if (v.duration && Math.abs(v.currentTime - atual * v.duration) > 1 / 48) {
        v.currentTime = atual * (v.duration - 0.05);
      }
      quadro = requestAnimationFrame(passo);
    };
    const rato = (e: PointerEvent) => {
      s.style.setProperty("--rx", `${(e.clientX / window.innerWidth - 0.5).toFixed(3)}`);
      s.style.setProperty("--ry", `${(e.clientY / window.innerHeight - 0.5).toFixed(3)}`);
    };
    medir();
    quadro = requestAnimationFrame(passo);
    window.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    window.addEventListener("pointermove", rato, { passive: true });
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
      window.removeEventListener("pointermove", rato);
    };
  }, [vivo]);

  const saida = vivo ? limitar(1 - (p - 0.18) / 0.16) : 1;

  return (
    <section ref={seccao} className={vivo ? "cinema cinema--vivo" : "cinema"} aria-labelledby="titulo-heroi">
      <div className="cinema__palco">
        <div className="cinema__imagem" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/video/topo-1.webp" alt="" className="cinema__poster" fetchPriority="high" />
          {vivo && <video ref={video} className="cinema__video" src="/video/topo.mp4" muted playsInline preload="auto" />}
        </div>
        <div className="cinema__veu" aria-hidden="true" />
        <div
          className="cinema__conteudo"
          style={vivo ? { opacity: saida, transform: `translateY(${(1 - saida) * -40}px)`, pointerEvents: saida < 0.2 ? "none" : undefined } : undefined}
        >
          {children}
        </div>
        {vivo &&
          CAPITULOS.map((c) => {
            const o = limitar(Math.min((p - c.de) / 0.08, (c.ate - p) / 0.08));
            return (
              <div key={c.titulo} className="cinema__capitulo envolvente" style={{ opacity: o, transform: `translateY(${(1 - o) * 30}px)` }} aria-hidden="true">
                <p className="cinema__capitulo-titulo">{c.titulo}</p>
                <p className="cinema__capitulo-texto">{c.texto}</p>
              </div>
            );
          })}
        {vivo && (
          <div className="cinema__progresso" aria-hidden="true">
            <span style={{ transform: `scaleX(${p})` }} />
            <em style={{ opacity: limitar(1 - p * 8) }}>Desce para ver</em>
          </div>
        )}
      </div>
    </section>
  );
}
