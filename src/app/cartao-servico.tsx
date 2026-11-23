"use client";

// Cartão de serviço: no computador, o vídeo (gerado com IA na muapi) passa quando o
// rato está por cima e o cartão inclina-se para o rato. No telemóvel, só a imagem.

import { useRef } from "react";
import { useVivo } from "./vivo";

export function CartaoServico({ id, video, children }: { id: string; video: string; children: React.ReactNode }) {
  const vivo = useVivo();
  const cartao = useRef<HTMLLIElement>(null);
  const filme = useRef<HTMLVideoElement>(null);

  const entrar = () => {
    if (!vivo) return;
    filme.current?.play().catch(() => {});
  };
  const sair = () => {
    const c = cartao.current;
    if (c) c.style.transform = "";
    filme.current?.pause();
  };
  const mexer = (e: React.PointerEvent<HTMLLIElement>) => {
    if (!vivo) return;
    const c = cartao.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    c.style.setProperty("--brilho-x", `${(x + 0.5) * 100}%`);
    c.style.setProperty("--brilho-y", `${(y + 0.5) * 100}%`);
  };

  return (
    <li ref={cartao} className="servico" id={id} onPointerEnter={entrar} onPointerLeave={sair} onPointerMove={mexer}>
      <div className="servico__media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/video/servico-${video}.webp`} alt="" loading="lazy" width={640} height={480} />
        {vivo && <video ref={filme} src={`/video/servico-${video}.mp4`} muted loop playsInline preload="none" />}
      </div>
      {children}
    </li>
  );
}
