"use client";

import { useEffect, useState } from "react";

// «Modo vivo»: só no computador com rato, ecrã largo, sem «menos movimento» e sem
// poupança de dados. No telemóvel o site fica simples: imagens paradas, sem vídeos.
const CONSULTA = "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export function useVivo() {
  const [vivo, setVivo] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(CONSULTA);
    const poupa = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    const ver = () => setVivo(m.matches && !poupa);
    ver();
    m.addEventListener("change", ver);
    return () => m.removeEventListener("change", ver);
  }, []);
  return vivo;
}

export const limitar = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
