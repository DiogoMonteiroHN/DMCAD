"use client";

import { useEffect, useRef, useState } from "react";

// Mostra primeiro a antena em imagem (vem já no HTML) e, quando o browser está
// livre, troca-a pela torre em 3D. Fica na imagem quem pediu menos movimento,
// quem está a poupar dados ou um browser sem WebGL.
export function Antena3D({ children }: { children: React.ReactNode }) {
  const anfitriao = useRef<HTMLDivElement>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const el = anfitriao.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ligacao = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (ligacao?.saveData) return;
    const teste = document.createElement("canvas");
    if (!(teste.getContext("webgl2") || teste.getContext("webgl"))) return;

    let parar: (() => void) | undefined;
    let cancelado = false;
    const arrancar = () => {
      import("./cena-antena").then(({ iniciar }) => {
        if (cancelado) return;
        parar = iniciar(el, () => setPronto(true));
      });
    };
    const ocioso = window.requestIdleCallback
      ? window.requestIdleCallback(arrancar, { timeout: 1500 })
      : window.setTimeout(arrancar, 300);

    return () => {
      cancelado = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(ocioso);
      else window.clearTimeout(ocioso);
      parar?.();
    };
  }, []);

  return (
    <div className="antena3d" data-pronto={pronto || undefined}>
      <div className="antena3d__imagem">{children}</div>
      <div ref={anfitriao} className="antena3d__palco" />
      {pronto && <p className="antena3d__dica">A antena da RARET, Glória do Ribatejo, 1951–1996. Arrasta para a rodar.</p>}
    </div>
  );
}
