"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

// O computador com rato e ecrã largo recebe as interações; o telemóvel fica simples.
export const CONSULTA_RATO = "(hover: hover) and (pointer: fine) and (min-width: 1000px)";

export function useComRato() {
  const [comRato, setComRato] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(CONSULTA_RATO);
    const atualizar = () => setComRato(mq.matches);
    atualizar();
    mq.addEventListener("change", atualizar);
    return () => mq.removeEventListener("change", atualizar);
  }, []);
  return comRato;
}

export function usePoucoMovimento() {
  const [pouco, setPouco] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const atualizar = () => setPouco(mq.matches);
    atualizar();
    mq.addEventListener("change", atualizar);
    return () => mq.removeEventListener("change", atualizar);
  }, []);
  return pouco;
}

// Inclina um elemento na direção do rato (só no computador, e nunca com «menos movimento»).
// Escreve --rx e --ry no elemento; o CSS decide o que fazer com elas.
export function useInclinar(ref: RefObject<HTMLElement | null>, graus = 6) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia(CONSULTA_RATO).matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let pedido = 0;
    let alvoX = 0;
    let alvoY = 0;
    let x = 0;
    let y = 0;
    const passo = () => {
      x += (alvoX - x) * 0.12;
      y += (alvoY - y) * 0.12;
      el.style.setProperty("--rx", `${(-y * graus).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(x * graus).toFixed(2)}deg`);
      pedido = Math.abs(alvoX - x) + Math.abs(alvoY - y) > 0.001 ? requestAnimationFrame(passo) : 0;
    };
    const mover = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      alvoX = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      alvoY = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      if (!pedido) pedido = requestAnimationFrame(passo);
    };
    const sair = () => {
      alvoX = 0;
      alvoY = 0;
      if (!pedido) pedido = requestAnimationFrame(passo);
    };
    const zona = el.parentElement ?? el;
    zona.addEventListener("pointermove", mover);
    zona.addEventListener("pointerleave", sair);
    return () => {
      cancelAnimationFrame(pedido);
      zona.removeEventListener("pointermove", mover);
      zona.removeEventListener("pointerleave", sair);
    };
  }, [ref, graus]);
}

// Dispara uma vez quando o elemento entra no ecrã. Chama sempre a versão mais recente de
// aoVer (que pode depender de preferências lidas depois do primeiro desenho).
export function useQuandoVisivel(ref: RefObject<HTMLElement | null>, aoVer: () => void, limiar = 0.4) {
  const ultimo = useRef(aoVer);
  useEffect(() => {
    ultimo.current = aoVer;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const vista = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          vista.disconnect();
          ultimo.current();
        }
      },
      { threshold: limiar },
    );
    vista.observe(el);
    return () => vista.disconnect();
  }, [ref, limiar]);
}
