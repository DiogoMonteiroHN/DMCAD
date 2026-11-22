"use client";

import { useEffect, useRef } from "react";

// A torre da RARET em 3D, desenhada como uma vista de CAD: só linhas, projetadas
// à mão num <canvas> 2D. Sem bibliotecas (poucos KB em vez dos ~140 KB de um
// motor 3D). Roda devagar, roda com o dedo ou o rato, e para quando sai do ecrã.

type P = [number, number, number];

const TOPO = 8;
const BASE = 2.3;
const CIMO = 0.38;
const larg = (y: number) => BASE + (CIMO - BASE) * (y / TOPO);
const cantos = (y: number): P[] => {
  const w = larg(y);
  return [
    [w, y, w],
    [w, y, -w],
    [-w, y, -w],
    [-w, y, w],
  ];
};

function construir() {
  const s: [P, P, number][] = []; // segmento e espessura relativa
  const seg = (a: P, b: P, e = 1) => s.push([a, b, e]);

  cantos(0).forEach((c, i) => seg(c, cantos(TOPO)[i], 1.8));
  const niveis = [0, 1.7, 3.3, 4.7, 5.9, 7.0, TOPO];
  niveis.forEach((y, k) => {
    const c = cantos(y);
    if (k > 0) for (let i = 0; i < 4; i++) seg(c[i], c[(i + 1) % 4], 1.2);
    if (k < niveis.length - 1) {
      const d = cantos(niveis[k + 1]);
      for (let i = 0; i < 4; i++) {
        const j = (i + 1) % 4;
        seg(c[i], d[j]);
        seg(c[j], d[i]);
      }
    }
  });
  // varandas: piso, corrimão e postes
  for (const [y, r] of [
    [4.7, larg(4.7) * 1.75],
    [7.0, larg(7.0) * 2.1],
  ] as const) {
    const n = 28;
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2;
      const a1 = ((i + 1) / n) * Math.PI * 2;
      const p0: P = [Math.cos(a0) * r, y, Math.sin(a0) * r];
      const p1: P = [Math.cos(a1) * r, y, Math.sin(a1) * r];
      seg(p0, p1, 1.1);
      seg([p0[0], y + 0.42, p0[2]], [p1[0], y + 0.42, p1[2]], 0.9);
      if (i % 2 === 0) seg(p0, [p0[0], y + 0.42, p0[2]], 0.7);
    }
  }
  // cabos, escada e mastro
  cantos(3.3).forEach(([x, y, z]) => seg([x, y, z], [x * 2.05, 0, z * 2.05], 0.6));
  seg([0.18, 0, 0], [0.18, TOPO, 0], 0.6);
  seg([-0.18, 0, 0], [-0.18, TOPO, 0], 0.6);
  for (let y = 0.4; y < TOPO; y += 0.4) seg([-0.18, y, 0], [0.18, y, 0], 0.5);
  seg([0, TOPO, 0], [0, TOPO + 1.05, 0], 2);
  seg([0, TOPO + 1.7, 0], [0, TOPO + 2.4, 0], 1.2);
  return s;
}

const SEGMENTOS = construir();
const ESFERA: P = [0, TOPO + 1.35, 0];

export function Torre({ etiqueta }: { etiqueta: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const medir = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      pedir();
    };

    let angulo = 0.6;
    let arrasto = 0;
    let velocidade = 0;
    let ultimoX: number | null = null;
    let tempo = 0;
    let anterior = performance.now();
    let pedido = 0;
    let visivel = true;

    const projetar = ([x, y, z]: P, a: number, f: number, d: number) => {
      const c = Math.cos(a);
      const s = Math.sin(a);
      const xr = x * c + z * s;
      const zr = -x * s + z * c;
      // câmara ligeiramente acima, a olhar para o meio da torre
      const e = 0.16;
      const yc = y - 5.6;
      const yr = yc * Math.cos(e) - zr * Math.sin(e);
      const zz = yc * Math.sin(e) + zr * Math.cos(e);
      const k = f / (d - zz);
      return { x: w / 2 + xr * k, y: h * 0.56 - yr * k, z: zz, k };
    };

    const desenhar = (agora: number) => {
      pedido = 0;
      const dt = Math.min((agora - anterior) / 1000, 0.05);
      anterior = agora;
      tempo += dt;
      if (!quieto) angulo += dt * 0.25;
      if (ultimoX === null) {
        arrasto += velocidade;
        velocidade *= 0.93;
      }
      const a = angulo + arrasto;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const d = 30;
      const f = Math.min(h / 13.5, w / 8.4) * d * 0.98;

      // o chão: a grelha técnica
      ctx.lineWidth = 1;
      for (let i = -8; i <= 8; i++) {
        for (const [p, q] of [
          [[i, 0, -8], [i, 0, 8]],
          [[-8, 0, i], [8, 0, i]],
        ] as [P, P][]) {
          const A = projetar(p, a, f, d);
          const B = projetar(q, a, f, d);
          ctx.strokeStyle = `rgba(143,176,247,${i === 0 ? 0.22 : 0.09})`;
          ctx.beginPath();
          ctx.moveTo(A.x, A.y);
          ctx.lineTo(B.x, B.y);
          ctx.stroke();
        }
      }

      // a torre: linhas mais claras à frente, mais apagadas atrás
      for (const [p, q, e] of SEGMENTOS) {
        const A = projetar(p, a, f, d);
        const B = projetar(q, a, f, d);
        const zm = (A.z + B.z) / 2;
        const alfa = 0.3 + 0.65 * Math.min(Math.max((zm + 3) / 6, 0), 1);
        ctx.strokeStyle = `rgba(242,140,40,${alfa.toFixed(3)})`;
        ctx.lineWidth = Math.max(0.6, e * 0.9);
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      }

      // a esfera
      const E = projetar(ESFERA, a, f, d);
      ctx.fillStyle = "#f28c28";
      ctx.beginPath();
      ctx.arc(E.x, E.y, 0.34 * E.k, 0, Math.PI * 2);
      ctx.fill();

      // as ondas: um impulso a sair da esfera a cada 2,4 s
      const arco = Math.PI * 0.62;
      const ini = -Math.PI / 2 - arco / 2;
      const fase = quieto ? 0.4 : (tempo % 2.4) / 2.4;
      [1.25, 2.05, 2.9, 3.8].forEach((r, i, todos) => {
        const onde = i / (todos.length - 1);
        const brilho = quieto ? 0.6 : Math.exp(-Math.pow((fase * 1.35 - onde) * 4.2, 2));
        ctx.strokeStyle = `rgba(47,111,237,${(0.25 + 0.75 * brilho - i * 0.04).toFixed(3)})`;
        ctx.lineWidth = Math.max(2, (0.16 - i * 0.015) * E.k);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.arc(E.x, E.y, r * E.k, ini, ini + arco);
        ctx.stroke();
      });

      if (visivel && !document.hidden && (!quieto || Math.abs(velocidade) > 0.0005 || ultimoX !== null)) pedir();
    };

    function pedir() {
      if (!pedido) pedido = requestAnimationFrame(desenhar);
    }

    const aoCarregar = (e: PointerEvent) => {
      ultimoX = e.clientX;
      pedir();
    };
    const aoMover = (e: PointerEvent) => {
      if (ultimoX === null) return;
      velocidade = (e.clientX - ultimoX) * 0.008;
      arrasto += velocidade;
      ultimoX = e.clientX;
      pedir();
    };
    const aoLargar = () => {
      ultimoX = null;
      pedir();
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        velocidade = e.key === "ArrowLeft" ? -0.06 : 0.06;
        pedir();
      }
    };

    canvas.addEventListener("pointerdown", aoCarregar);
    window.addEventListener("pointermove", aoMover, { passive: true });
    window.addEventListener("pointerup", aoLargar);
    window.addEventListener("pointercancel", aoLargar);
    canvas.addEventListener("keydown", aoTeclar);

    const tamanho = new ResizeObserver(medir);
    tamanho.observe(canvas);
    const vista = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      if (visivel) pedir();
    });
    vista.observe(canvas);
    const separador = () => !document.hidden && pedir();
    document.addEventListener("visibilitychange", separador);
    medir();

    return () => {
      cancelAnimationFrame(pedido);
      tamanho.disconnect();
      vista.disconnect();
      canvas.removeEventListener("pointerdown", aoCarregar);
      window.removeEventListener("pointermove", aoMover);
      window.removeEventListener("pointerup", aoLargar);
      window.removeEventListener("pointercancel", aoLargar);
      canvas.removeEventListener("keydown", aoTeclar);
      document.removeEventListener("visibilitychange", separador);
    };
  }, []);

  return <canvas ref={ref} className="torre" role="img" aria-label={etiqueta} tabIndex={0} />;
}
