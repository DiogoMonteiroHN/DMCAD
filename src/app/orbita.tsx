"use client";

// O ecossistema HN: no computador, as marcas giram devagar à volta do logótipo da HN,
// param quando o rato ou o teclado estão numa delas e inclinam-se para o rato.
// No telemóvel (e com «menos movimento»), é uma grelha simples com as mesmas ligações.

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ECOSSISTEMA } from "./marca";
import { useVivo } from "./vivo";

export function Orbita() {
  const vivo = useVivo();
  const palco = useRef<HTMLDivElement>(null);
  const itens = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!vivo || !palco.current) return;
    const p = palco.current;
    let angulo = 0;
    let parado = false;
    let quadro = 0;
    let rx = 0;
    let ry = 0;
    const n = ECOSSISTEMA.length;
    const passo = () => {
      if (!parado) angulo += 0.0016;
      const w = p.clientWidth / 2 - 130;
      const h = p.clientHeight / 2 - 60;
      itens.current.forEach((el, i) => {
        if (!el) return;
        const a = angulo + (i / n) * Math.PI * 2;
        const x = Math.cos(a) * w;
        const y = Math.sin(a) * h;
        const prof = (Math.sin(a) + 1) / 2; // 0 atrás, 1 à frente
        el.style.transform = `translate(-50%, -50%) translate(${x + rx * 18 * prof}px, ${y + ry * 18 * prof}px) scale(${0.82 + prof * 0.22})`;
        el.style.zIndex = String(Math.round(prof * 10) + 1);
        el.style.opacity = String(0.8 + prof * 0.2);
      });
      quadro = requestAnimationFrame(passo);
    };
    const parar = () => (parado = true);
    const seguir = () => (parado = false);
    const rato = (e: PointerEvent) => {
      const r = p.getBoundingClientRect();
      rx = (e.clientX - r.left) / r.width - 0.5;
      ry = (e.clientY - r.top) / r.height - 0.5;
      p.style.setProperty("--rx", rx.toFixed(3));
      p.style.setProperty("--ry", ry.toFixed(3));
    };
    p.addEventListener("pointerenter", parar);
    p.addEventListener("pointerleave", seguir);
    p.addEventListener("focusin", parar);
    p.addEventListener("focusout", seguir);
    p.addEventListener("pointermove", rato);
    quadro = requestAnimationFrame(passo);
    return () => {
      cancelAnimationFrame(quadro);
      p.removeEventListener("pointerenter", parar);
      p.removeEventListener("pointerleave", seguir);
      p.removeEventListener("focusin", parar);
      p.removeEventListener("focusout", seguir);
      p.removeEventListener("pointermove", rato);
      itens.current.forEach((el) => el && (el.style.cssText = ""));
    };
  }, [vivo]);

  return (
    <div ref={palco} className={vivo ? "orbita orbita--viva" : "orbita"}>
      {vivo && (
        <div className="orbita__centro" aria-hidden="true">
          <Image src="/hn-hit-nails-logo.png" alt="" width={1920} height={582} sizes="260px" />
        </div>
      )}
      <ul className="hn__lista">
        {ECOSSISTEMA.map((m, i) => (
          <li key={m.nome} ref={(el) => { itens.current[i] = el; }}>
            <a href={m.href} target="_blank" rel="noopener" className="hn__cartao">
              <span className="hn__nome">{m.nome}</span>
              {m.texto && <span className="hn__texto">{m.texto}</span>}
              <span className="hn__endereco" aria-hidden="true">
                {m.href.replace(/^https:\/\/(www\.)?/, "")} ↗
              </span>
              <span className="visualmente-escondido"> (abre noutro separador)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
