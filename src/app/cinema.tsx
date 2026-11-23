"use client";

// O topo de cinema: no computador, o scroll conduz um filme de 14 s (três planos
// gerados com IA na muapi a 23/11/2026) e pára em três capítulos.
//
// O filme não é um vídeo: são 111 imagens leves (8 por segundo, public/video/topo/),
// desenhadas num canvas. Carregam aos poucos e por camadas (primeiro 1 em cada 16,
// depois 1 em cada 8, …), por isso há sempre uma imagem perto da posição certa,
// mesmo antes de tudo estar descarregado. Por baixo ficam as três imagens paradas,
// que trocam com o scroll: se o canvas ainda não tiver nada, vê-se o plano certo.
// No telemóvel fica só a primeira imagem, sem descarregar a sequência.

import { useEffect, useRef, useState } from "react";
import { limitar, useVivo } from "./vivo";

const TOTAL = 111;
const caminho = (i: number) => `/video/topo/${String(i).padStart(3, "0")}.webp`;

const CAPITULOS = [
  { de: 0.36, ate: 0.68, titulo: "A IA ao serviço de quem tem pouco tempo entre clientes.", texto: "A ferramenta certa, explicada de forma simples, aplicada no teu negócio." },
  { de: 0.72, ate: 1.01, titulo: "Da Glória do Ribatejo para o mundo.", texto: "Com a família HN Hit Nails por trás de cada passo." },
];

// Ordem de carregamento: 0, 16, 32, … depois 8, 24, … depois 4, 12, … até todas.
function ordem() {
  const vistas = new Set<number>();
  const lista: number[] = [];
  for (let passo = 16; passo >= 1; passo /= 2) {
    for (let i = 0; i < TOTAL; i += passo) if (!vistas.has(i)) { vistas.add(i); lista.push(i); }
  }
  if (!vistas.has(TOTAL - 1)) lista.push(TOTAL - 1);
  return lista;
}

export function Cinema({ children }: { children: React.ReactNode }) {
  const vivo = useVivo();
  const seccao = useRef<HTMLElement>(null);
  const tela = useRef<HTMLCanvasElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (!vivo) return;
    const s = seccao.current;
    const c = tela.current;
    const ctx = c?.getContext("2d");
    if (!s || !c || !ctx) return;

    const imagens: (HTMLImageElement | null)[] = Array(TOTAL).fill(null);
    let cancelado = false;
    const fila = ordem();
    let proxima = 0;
    const carregar = () => {
      if (cancelado || proxima >= fila.length) return;
      const i = fila[proxima++];
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        imagens[i] = img;
        desenhado = -1; // pode haver agora uma imagem mais perto
        carregar();
      };
      img.onerror = carregar;
      img.src = caminho(i);
    };
    for (let k = 0; k < 6; k++) carregar(); // 6 pedidos ao mesmo tempo

    let alvo = 0;
    let atual = 0;
    let quadro = 0;
    let desenhado = -1;

    const ajustar = () => {
      const r = c.getBoundingClientRect();
      const d = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(r.width * d);
      c.height = Math.round(r.height * d);
      desenhado = -1;
    };
    const medir = () => {
      const r = s.getBoundingClientRect();
      alvo = limitar(-r.top / (r.height - window.innerHeight));
    };
    const maisPerto = (i: number) => {
      for (let d = 0; d < TOTAL; d++) {
        if (imagens[i - d]) return i - d;
        if (imagens[i + d]) return i + d;
      }
      return -1;
    };
    const passo = () => {
      atual += (alvo - atual) * 0.14;
      if (Math.abs(alvo - atual) < 0.0005) atual = alvo;
      setP(atual);
      const quer = Math.round(atual * (TOTAL - 1));
      const tem = maisPerto(quer);
      if (tem >= 0 && tem !== desenhado) {
        const img = imagens[tem]!;
        // «cover»: preenche o canvas sem deformar.
        const escala = Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight);
        const w = img.naturalWidth * escala;
        const h = img.naturalHeight * escala;
        ctx.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h);
        desenhado = tem;
        c.dataset.quadro = String(tem);
        c.style.opacity = "1";
      }
      quadro = requestAnimationFrame(passo);
    };
    const rato = (e: PointerEvent) => {
      s.style.setProperty("--rx", `${(e.clientX / window.innerWidth - 0.5).toFixed(3)}`);
      s.style.setProperty("--ry", `${(e.clientY / window.innerHeight - 0.5).toFixed(3)}`);
    };

    ajustar();
    medir();
    quadro = requestAnimationFrame(passo);
    window.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", ajustar);
    window.addEventListener("resize", medir);
    window.addEventListener("pointermove", rato, { passive: true });
    return () => {
      cancelado = true;
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", medir);
      window.removeEventListener("resize", ajustar);
      window.removeEventListener("resize", medir);
      window.removeEventListener("pointermove", rato);
    };
  }, [vivo]);

  const saida = vivo ? limitar(1 - (p - 0.18) / 0.16) : 1;
  // As três imagens paradas por baixo: 0 → plano 1, ~0,47 → plano 2, ~0,94 → plano 3.
  const plano2 = vivo ? limitar((p - 0.3) / 0.1) : 0;
  const plano3 = vivo ? limitar((p - 0.62) / 0.1) : 0;

  return (
    <section ref={seccao} className={vivo ? "cinema cinema--vivo" : "cinema"} aria-labelledby="titulo-heroi">
      <div className="cinema__palco">
        <div className="cinema__imagem" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/video/topo-1.webp" alt="" className="cinema__poster" fetchPriority="high" />
          {vivo && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/video/topo-2.webp" alt="" className="cinema__poster" style={{ opacity: plano2 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/video/topo-3.webp" alt="" className="cinema__poster" style={{ opacity: plano3 }} />
              <canvas ref={tela} className="cinema__video" style={{ opacity: 0 }} />
            </>
          )}
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
