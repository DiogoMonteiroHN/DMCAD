"use client";

// Botões para percorrer a cronologia com o rato (no telemóvel desliza-se com o dedo).
export function Setas({ alvo }: { alvo: string }) {
  const andar = (sentido: 1 | -1) => {
    const el = document.getElementById(alvo);
    if (!el) return;
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: sentido * Math.min(el.clientWidth * 0.8, 620), behavior: quieto ? "auto" : "smooth" });
  };
  return (
    <div className="r-setas">
      <button type="button" onClick={() => andar(-1)} aria-controls={alvo}>
        Anterior
      </button>
      <button type="button" onClick={() => andar(1)} aria-controls={alvo}>
        Seguinte
      </button>
    </div>
  );
}
