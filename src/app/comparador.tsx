"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

// Antes e depois de arrastar: a imagem genérica por baixo, a natural por cima,
// recortada pela posição do cursor. Funciona com o dedo, o rato e as setas.
export function Comparador() {
  const id = useId();
  const [pos, setPos] = useState(50);
  const caixa = useRef<HTMLDivElement>(null);
  const aArrastar = useRef(false);

  const irPara = (clientX: number) => {
    const r = caixa.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.round(Math.min(Math.max(((clientX - r.left) / r.width) * 100, 0), 100)));
  };

  return (
    <div className="comparador" style={{ ["--pos" as string]: `${pos}%` }}>
      <div
        ref={caixa}
        className="comparador__imagens"
        onPointerDown={(e) => {
          aArrastar.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          irPara(e.clientX);
        }}
        onPointerMove={(e) => aArrastar.current && irPara(e.clientX)}
        onPointerUp={() => (aArrastar.current = false)}
        onPointerCancel={() => (aArrastar.current = false)}
        onDragStart={(e) => e.preventDefault()}
      >
        <Image
          src="/exemplos/promocao-generica.webp"
          alt="Imagem genérica gerada por IA: frascos de verniz a flutuar sobre néon cor-de-rosa e brilhos, com o texto «Nail Studio, Book Now» em inglês."
          width={960}
          height={960}
          sizes="(min-width: 1000px) 560px, 100vw"
          className="comparador__img"
          draggable={false}
        />
        <div className="comparador__por-cima">
          <Image
            src="/exemplos/promocao-natural.webp"
            alt="Imagem natural gerada por IA: três vernizes em tons terra, uma lima e um pires de cerâmica sobre linho, à luz da janela."
            width={960}
            height={960}
            sizes="(min-width: 1000px) 560px, 100vw"
            className="comparador__img"
          draggable={false}
          />
          {/* o texto põe-se à mão, por cima: nunca se pede à IA que o escreva */}
          <p className="comparador__texto" aria-hidden="true">
            Verniz gel, 45 minutos.
            <span>Vagas na terça e na quinta à tarde.</span>
          </p>
        </div>
        <span className="comparador__rotulo comparador__rotulo--sim" aria-hidden="true">
          Natural
        </span>
        <span className="comparador__rotulo comparador__rotulo--nao" aria-hidden="true">
          Genérica
        </span>
        <span className="comparador__ia">Geradas por IA</span>
        <span className="comparador__pega" aria-hidden="true" />
      </div>
      <label htmlFor={id} className="visualmente-escondido">
        Comparar as duas imagens: à esquerda a natural, à direita a genérica
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="comparador__cursor visualmente-escondido"
      />
    </div>
  );
}
