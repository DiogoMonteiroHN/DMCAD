"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useComRato, usePoucoMovimento, useQuandoVisivel } from "./rato";

// Nove publicações de um salão inventado: primeiro feitas à pressa, cada uma à sua maneira;
// depois com a mesma luz, as mesmas cores e a mesma forma de falar.
// Viram uma a uma quando a secção aparece. No computador, o rato numa publicação mostra a outra versão.

type Face = { img: string; alt: string } | { texto: string; extra?: string };

const ANTES: Face[] = [
  { img: "/exemplos/promocao-generica.webp", alt: "Vernizes a flutuar sobre néon cor-de-rosa, com «Nail Studio, Book Now»." },
  { img: "/mostra/mau-unha3d.webp", alt: "Unhas cor-de-rosa em 3D a flutuar sobre fundo roxo néon." },
  { texto: "PROMO!!! 🔥🔥", extra: "SÓ HOJE 💖✨" },
  { img: "/mostra/mau-led.webp", alt: "Salão com luzes LED roxas e chão espelhado." },
  { img: "/mostra/mau-luxo.webp", alt: "Pétalas de rosa, diamantes e velas sobre fundo dourado." },
  { texto: "Agende já o seu momento ✨💖", extra: "Você merece 💅" },
  { img: "/mostra/mau-icones.webp", alt: "Lábios, corações e um verniz cromados sobre cor-de-rosa." },
  { img: "/mostra/mau-praia.webp", alt: "Pôr do sol cor-de-rosa numa praia com purpurinas." },
  { texto: "Sexta-feira de beleza 💅✨🌸", extra: "Realce a sua beleza!!!" },
];

const DEPOIS: Face[] = [
  { img: "/exemplos/linho-natural.webp", alt: "Vernizes em tons terra, uma lima e um pires de cerâmica sobre linho." },
  { img: "/mostra/bom-vernizes.webp", alt: "Quatro vernizes em tons terra alinhados numa mesa de madeira, à luz da janela." },
  { texto: "Vagas desta semana", extra: "Terça e quinta à tarde." },
  { img: "/mostra/bom-cadeira.webp", alt: "Canto de um salão: cadeira de madeira, mesa simples e uma planta, à luz da manhã." },
  { img: "/mostra/bom-toalhas.webp", alt: "Toalhas brancas dobradas numa prateleira de madeira, junto à janela." },
  { texto: "Verniz gel", extra: "45 minutos." },
  { img: "/mostra/bom-ceramica.webp", alt: "Caneca de cerâmica com limas e pincéis, à luz natural." },
  { img: "/mostra/bom-porta.webp", alt: "Porta de madeira de um pequeno salão, com um vaso à entrada e calçada portuguesa." },
  { texto: "Três cuidados", extra: "para o gel durar mais." },
];

// a ordem em que viram: salteada, como quem arruma um feed
const ORDEM = [4, 0, 8, 2, 6, 1, 7, 3, 5];

function Cara({ f, tipo }: { f: Face; tipo: "antes" | "depois" }) {
  if ("img" in f) {
    return <Image src={f.img} alt={f.alt} width={640} height={640} sizes="(min-width: 1000px) 200px, 31vw" />;
  }
  return (
    <span className={`feed__texto feed__texto--${tipo}`}>
      <span>{f.texto}</span>
      {f.extra && <small>{f.extra}</small>}
    </span>
  );
}

export function Feed() {
  const grelha = useRef<HTMLDivElement>(null);
  const comRato = useComRato();
  const pouco = usePoucoMovimento();
  const [virados, setVirados] = useState<boolean[]>(ANTES.map(() => false));
  const [espreita, setEspreita] = useState<number | null>(null);

  const virarTodos = useCallback(
    (para: boolean) => {
      if (pouco) {
        setVirados(ANTES.map(() => para));
        return;
      }
      ORDEM.forEach((i, k) => {
        window.setTimeout(() => setVirados((v) => v.map((x, j) => (j === i ? para : x))), 300 + k * 140);
      });
    },
    [pouco],
  );

  useQuandoVisivel(grelha, () => virarTodos(true), 0.45);
  useEffect(() => {
    if (pouco) setVirados(ANTES.map(() => true));
  }, [pouco]);
  const todos = virados.every(Boolean);
  const nenhum = virados.every((v) => !v);

  return (
    <div className="feed">
      <div className="feed__comutador" role="group" aria-label="Ver o feed">
        <button type="button" aria-pressed={nenhum} onClick={() => virarTodos(false)}>
          Feito à pressa
        </button>
        <button type="button" aria-pressed={todos} onClick={() => virarTodos(true)}>
          Com uma voz só
        </button>
      </div>

      <div ref={grelha} className="feed__telemovel">
        <div className="feed__cabeca" aria-hidden="true">
          <span className="feed__avatar" />
          <span>
            <strong>O teu salão</strong>
            <small>9 publicações</small>
          </span>
        </div>
        <ul className="feed__grelha">
          {ANTES.map((a, i) => {
            const virado = espreita === i ? !virados[i] : virados[i];
            return (
              <li
                key={i}
                className="feed__peca"
                data-virado={virado || undefined}
                onPointerEnter={comRato ? () => setEspreita(i) : undefined}
                onPointerLeave={comRato ? () => setEspreita(null) : undefined}
              >
                <span className="feed__face feed__face--antes" aria-hidden={virado}>
                  <Cara f={a} tipo="antes" />
                </span>
                <span className="feed__face feed__face--depois" aria-hidden={!virado}>
                  <Cara f={DEPOIS[i]} tipo="depois" />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="feed__nota">
        {comRato ? "Passa o rato numa publicação para ver a outra versão. " : ""}
        Salão inventado; imagens geradas por IA para este exemplo.
      </p>
    </div>
  );
}
