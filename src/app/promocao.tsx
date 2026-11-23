"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LEGENDA_DEPOIS } from "./marca";
import { useComRato, useInclinar } from "./rato";

// Uma promoção montada passo a passo, sempre sobre a MESMA fotografia: cada passo é uma
// transformação real dela (enquadrar, corrigir a luz, pôr o texto), não outra imagem.
// Computador: o telemóvel fica preso ao lado e muda com o scroll. Telemóvel: toca-se nos passos.

const PASSOS = [
  { titulo: "A fotografia, tirada no salão", texto: "Com o telemóvel, entre dois clientes. Escura, torta, com coisas a mais: é assim que costuma sair." },
  { titulo: "O enquadramento", texto: "Endireita-se e corta-se ao formato da publicação. Ficam a mesa e os vernizes; o resto sai." },
  { titulo: "A luz", texto: "Mais luz e as cores no sítio, sem filtros que mudem o verniz: o cliente tem de reconhecer a cor." },
  { titulo: "O texto, posto à mão", texto: "O serviço, a duração e quando há vaga. Escrito por ti, por cima da imagem; nunca pedido à IA." },
  { titulo: "Publicada", texto: "Com a legenda revista e o próximo passo: marcar pela ligação na bio." },
];

export function Promocao() {
  const [passo, setPasso] = useState(0);
  const comRato = useComRato();
  const lista = useRef<HTMLOListElement>(null);
  const telefone = useRef<HTMLDivElement>(null);
  useInclinar(telefone, 7);

  // No computador, o passo ativo é o que está a meio do ecrã.
  useEffect(() => {
    if (!comRato || !lista.current) return;
    const itens = [...lista.current.querySelectorAll<HTMLLIElement>("li")];
    const vista = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) setPasso(Number((e.target as HTMLElement).dataset.passo));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    itens.forEach((i) => vista.observe(i));
    return () => vista.disconnect();
  }, [comRato]);

  return (
    <div className="promocao" data-passo={passo}>
      <ol ref={lista} className="promocao__passos">
        {PASSOS.map((p, i) => (
          <li key={p.titulo} data-passo={i} data-ativo={i === passo || undefined}>
            <button
              type="button"
              className="promocao__botao"
              aria-pressed={i === passo}
              onClick={() => setPasso(i)}
              tabIndex={comRato ? -1 : 0}
            >
              <span className="promocao__numero">{i + 1}</span>
              <span className="promocao__titulo">{p.titulo}</span>
            </button>
            <p className="promocao__texto">{p.texto}</p>
          </li>
        ))}
      </ol>

      <div className="promocao__palco">
        <div ref={telefone} className="telefone" aria-live="polite">
          <div className="telefone__ecra">
            <div className="telefone__topo" aria-hidden="true">
              <span className="telefone__avatar" />
              <span>O teu salão</span>
            </div>
            <div className="promocao__quadro">
              <Image
                src="/mostra/cru.webp"
                alt="Mesa de manicure de um pequeno salão: vernizes, uma lâmpada UV, uma toalha, uma lima e uma planta. Imagem gerada por IA."
                width={960}
                height={960}
                sizes="(min-width: 1000px) 320px, 80vw"
                className="promocao__foto"
              />
              <span className="promocao__corte" aria-hidden="true" />
              <p className="promocao__etiqueta" aria-hidden={passo < 3}>
                Verniz gel, 45 minutos.
                <span>Vagas na terça e na quinta à tarde.</span>
              </p>
            </div>
            <div className="telefone__legenda" aria-hidden={passo < 4}>
              <p>
                <strong>O teu salão</strong> {LEGENDA_DEPOIS}
              </p>
            </div>
          </div>
        </div>
        <p className="promocao__estado">
          Passo {passo + 1} de {PASSOS.length}: {PASSOS[passo].titulo.toLowerCase()}
        </p>
        <p className="promocao__nota">Fotografia gerada por IA para este exemplo. No teu salão, é a tua.</p>
      </div>
    </div>
  );
}
