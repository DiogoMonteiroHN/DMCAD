"use client";

import { useEffect, useRef, useState } from "react";

// Um número que conta até ao valor quando aparece no ecrã (uma vez).
// Sem movimento pedido, ou sem JavaScript, mostra logo o valor final.
export function Contador({ valor, formato = "pt-PT" }: { valor: number; formato?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [mostrado, setMostrado] = useState(valor);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMostrado(0);
    let pedido = 0;
    const vista = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        vista.disconnect();
        const inicio = performance.now();
        const passo = (agora: number) => {
          const k = Math.min((agora - inicio) / 1400, 1);
          setMostrado(Math.round(valor * (1 - Math.pow(1 - k, 3))));
          if (k < 1) pedido = requestAnimationFrame(passo);
        };
        pedido = requestAnimationFrame(passo);
      },
      { threshold: 0.6 },
    );
    vista.observe(el);
    return () => {
      vista.disconnect();
      cancelAnimationFrame(pedido);
    };
  }, [valor]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">{mostrado.toLocaleString(formato)}</span>
      <span className="visualmente-escondido">{valor.toLocaleString(formato)}</span>
    </span>
  );
}
