"use client";

import { useEffect, useRef } from "react";

// O campo de antenas da RARET em 3D, em linhas, num <canvas> 2D (sem bibliotecas).
// Base: relatório técnico de 1952 (Myer): «two rows of guyed steel towers, each row
// 2409.6 feet between end towers», com antenas de cortina entre as torres; uma brochura
// de 1953 mostrava «dezasseis torres» (Herdeiro). Duas filas de 8 torres, 73,4 unidades
// (734 m) entre as pontas. A altura (190 m) vem de uma só fonte (Observador); a distância
// entre filas e o desenho das torres são ilustrativos.

type P = [number, number, number];
type Linha = [P, P, number]; // ponta, ponta, peso (0–1)

const ESCALA = 10; // 1 unidade = 10 m
const COMPRIMENTO = 734 / ESCALA;
const ALTURA = 190 / ESCALA;
const TORRES_POR_FILA = 8;
const ENTRE_FILAS = 30;
const FILAS = [-ENTRE_FILAS / 2, ENTRE_FILAS / 2];

function construir() {
  const l: Linha[] = [];
  const passo = COMPRIMENTO / (TORRES_POR_FILA - 1);
  for (const z of FILAS) {
    for (let i = 0; i < TORRES_POR_FILA; i++) {
      const x = -COMPRIMENTO / 2 + i * passo;
      // torre de treliça, de secção quadrada, a afunilar pouco
      const b = 0.9;
      const t = 0.5;
      const niveis = 7;
      const canto = (y: number, k: number): P => {
        const w = b + (t - b) * (y / ALTURA);
        const s = [
          [1, 1],
          [1, -1],
          [-1, -1],
          [-1, 1],
        ][k];
        return [x + s[0] * w, y, z + s[1] * w];
      };
      for (let k = 0; k < 4; k++) l.push([canto(0, k), canto(ALTURA, k), 1]);
      for (let n = 0; n <= niveis; n++) {
        const y = (ALTURA / niveis) * n;
        for (let k = 0; k < 4; k++) l.push([canto(y, k), canto(y, (k + 1) % 4), 0.6]);
        if (n < niveis) {
          const y2 = (ALTURA / niveis) * (n + 1);
          for (let k = 0; k < 4; k++) l.push([canto(y, k), canto(y2, (k + 1) % 4), 0.4]);
        }
      }
      // espias (cabos de amarração) para os dois lados
      l.push([[x, ALTURA * 0.92, z], [x, 0, z - 9], 0.3]);
      l.push([[x, ALTURA * 0.92, z], [x, 0, z + 9], 0.3]);
    }
    // a cortina entre cada par de torres: fios horizontais e dipolos verticais
    for (let i = 0; i < TORRES_POR_FILA - 1; i++) {
      const x0 = -COMPRIMENTO / 2 + i * passo + 0.9;
      const x1 = x0 + passo - 1.8;
      for (let h = 0; h < 5; h++) {
        const y = ALTURA * (0.34 + h * 0.14);
        l.push([[x0, y, z], [x1, y, z], 0.45]);
      }
      for (let v = 0; v <= 5; v++) {
        const x = x0 + ((x1 - x0) / 5) * v;
        l.push([[x, ALTURA * 0.34, z], [x, ALTURA * 0.9, z], 0.35]);
      }
    }
  }
  return l;
}

const LINHAS = construir();

export function CampoDeAntenas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let pedido = 0;
    let visivel = true;
    let tempo = 0;
    let anterior = performance.now();

    const medir = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      pedir();
    };

    const desenhar = (agora: number) => {
      pedido = 0;
      const dt = Math.min((agora - anterior) / 1000, 0.05);
      anterior = agora;
      if (!quieto) tempo += dt;

      // o scroll aproxima a câmara e roda o campo
      const caixa = canvas.getBoundingClientRect();
      const p = Math.min(Math.max(-caixa.top / Math.max(caixa.height, 1), 0), 1);
      const yaw = -0.62 + p * 0.55 + (quieto ? 0 : Math.sin(tempo * 0.12) * 0.06);
      const pitch = 0.2 - p * 0.06;
      const dist = (w < 700 ? 112 : 98) - p * 30;
      const cy = 9;
      const f = w < 700 ? w * 1.7 : Math.max(w, h) * 0.9;

      const cs = Math.cos(yaw);
      const sn = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const proj = ([x, y, z]: P) => {
        const xr = x * cs - z * sn;
        const zr = x * sn + z * cs;
        const yc = y - cy;
        const yr = yc * cp - zr * sp;
        const zz = yc * sp + zr * cp;
        const d = dist + zz;
        if (d < 1) return null;
        return { x: w * 0.5 + (xr * f) / d, y: h * 0.52 - (yr * f) / d, d };
      };

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // chão: grelha técnica
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(253,181,205,0.07)";
      ctx.beginPath();
      for (let i = -60; i <= 60; i += 6) {
        for (const [a, b] of [
          [[i, 0, -60], [i, 0, 60]],
          [[-60, 0, i], [60, 0, i]],
        ] as [P, P][]) {
          const A = proj(a);
          const B = proj(b);
          if (A && B) {
            ctx.moveTo(A.x, A.y);
            ctx.lineTo(B.x, B.y);
          }
        }
      }
      ctx.stroke();

      // a estrutura, em seis grupos de transparência (perto = mais forte)
      const grupos: Path2D[] = Array.from({ length: 6 }, () => new Path2D());
      for (const [a, b, peso] of LINHAS) {
        const A = proj(a);
        const B = proj(b);
        if (!A || !B) continue;
        const prox = 1 - Math.min(Math.max(((A.d + B.d) / 2 - (dist - 40)) / 80, 0), 1);
        const g = Math.min(5, Math.floor((prox * 0.7 + peso * 0.3) * 6));
        grupos[g].moveTo(A.x, A.y);
        grupos[g].lineTo(B.x, B.y);
      }
      grupos.forEach((g, i) => {
        ctx.strokeStyle = `rgba(253,181,205,${(0.16 + i * 0.13).toFixed(2)})`;
        ctx.lineWidth = 0.7 + i * 0.12;
        ctx.stroke(g);
      });

      // as frentes de onda a sair de cada cortina (para leste, longe da câmara)
      const passo = COMPRIMENTO / (TORRES_POR_FILA - 1);
      for (const z of FILAS) {
        for (let i = 0; i < TORRES_POR_FILA - 1; i++) {
          const x0 = -COMPRIMENTO / 2 + i * passo + 1;
          const x1 = x0 + passo - 2;
          for (let k = 0; k < 3; k++) {
            const fase = quieto ? (k + 0.5) / 3 : ((tempo * 0.35 + k / 3 + i * 0.07) % 1);
            const dz = -2 - fase * 34;
            const y = ALTURA * 0.62;
            const A = proj([x0, y, z + dz]);
            const B = proj([x1, y, z + dz]);
            if (!A || !B) continue;
            ctx.strokeStyle = `rgba(248,145,179,${(0.75 * (1 - fase)).toFixed(3)})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(A.x, A.y);
            ctx.lineTo(B.x, B.y);
            ctx.stroke();
          }
        }
      }

      if (visivel && !document.hidden && !quieto) pedir();
    };

    function pedir() {
      if (!pedido) pedido = requestAnimationFrame(desenhar);
    }

    const aoScroll = () => quieto && pedir();
    const tamanho = new ResizeObserver(medir);
    tamanho.observe(canvas);
    const vista = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      if (visivel) pedir();
    });
    vista.observe(canvas);
    const separador = () => !document.hidden && pedir();
    document.addEventListener("visibilitychange", separador);
    window.addEventListener("scroll", aoScroll, { passive: true });
    medir();

    return () => {
      cancelAnimationFrame(pedido);
      tamanho.disconnect();
      vista.disconnect();
      document.removeEventListener("visibilitychange", separador);
      window.removeEventListener("scroll", aoScroll);
    };
  }, []);

  return <canvas ref={ref} className="r-campo" aria-hidden="true" />;
}
