"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useComRato, useInclinar, usePoucoMovimento, useQuandoVisivel } from "./rato";

// O topo da página: uma legenda genérica de salão a ser revista à frente de quem vê.
// Cada mudança deixa uma nota na margem, como uma revisão feita à mão.
// No computador, passar o rato numa nota mostra o que lá estava antes.

type Pedaco = { antes: string; depois: string; nota?: number; sinal?: boolean };

const PEDACOS: Pedaco[] = [
  { antes: "✨💅", depois: "", nota: 0, sinal: true },
  { antes: " " , depois: "" },
  { antes: "Realce a sua beleza com uma experiência única!", depois: "Manicure com verniz gel, 45 minutos.", nota: 1, sinal: true },
  { antes: " 💖✨", depois: "", nota: 0, sinal: true },
  { antes: " ", depois: " " },
  { antes: "Venha descobrir o nosso espaço e mime-se.", depois: "Esta semana ainda há vagas na terça e na quinta à tarde.", nota: 2, sinal: true },
  { antes: " ", depois: " " },
  { antes: "Marque já!!! 🔥", depois: "Marca pela ligação na bio 💅", nota: 3, sinal: true },
];

const NOTAS = [
  "Cinco emojis passam a um.",
  "O lugar-comum dá lugar ao serviço e à duração.",
  "Em vez de «venha descobrir», diz quando há vaga.",
  "O grito sai. Fica o próximo passo.",
];

type Estado = "antes" | "a-mudar" | "depois";

export function Reescrita() {
  const caixa = useRef<HTMLDivElement>(null);
  const cartao = useRef<HTMLDivElement>(null);
  const comRato = useComRato();
  const pouco = usePoucoMovimento();
  const [estados, setEstados] = useState<Estado[]>(NOTAS.map(() => "antes"));
  const [ativa, setAtiva] = useState<number | null>(null);
  const [acabou, setAcabou] = useState(false);
  const relogios = useRef<number[]>([]);

  useInclinar(cartao, 5);

  const limpar = () => {
    relogios.current.forEach((r) => window.clearTimeout(r));
    relogios.current = [];
  };

  const tocar = useCallback(() => {
    limpar();
    setAcabou(false);
    if (pouco) {
      setEstados(NOTAS.map(() => "depois"));
      setAcabou(true);
      return;
    }
    setEstados(NOTAS.map(() => "antes"));
    NOTAS.forEach((_, k) => {
      const t = 1100 + k * 1700;
      relogios.current.push(
        window.setTimeout(() => setEstados((e) => e.map((v, i) => (i === k ? "a-mudar" : v))), t),
        window.setTimeout(() => setEstados((e) => e.map((v, i) => (i === k ? "depois" : v))), t + 850),
      );
    });
    relogios.current.push(window.setTimeout(() => setAcabou(true), 1100 + NOTAS.length * 1700));
  }, [pouco]);

  useQuandoVisivel(caixa, tocar, 0.35);
  useEffect(() => {
    if (pouco) {
      limpar();
      setEstados(NOTAS.map(() => "depois"));
      setAcabou(true);
    }
  }, [pouco]);
  useEffect(() => limpar, []);

  const estadoDe = (p: Pedaco): Estado => (p.nota === undefined ? (estados.every((e) => e === "depois") ? "depois" : "antes") : estados[p.nota]);
  const feitas = estados.filter((e) => e === "depois").length;

  return (
    <figure ref={caixa} className="reescrita" aria-label="Exemplo: uma legenda de salão revista, antes e depois">
      <div className="reescrita__palco">
        <div ref={cartao} className="reescrita__cartao">
          <p className="reescrita__autor">
            <span className="reescrita__avatar" aria-hidden="true" />O teu salão
            <span className="reescrita__estado" aria-hidden="true">
              {feitas === 0 ? "Antes" : feitas < NOTAS.length ? "A rever…" : "Depois"}
            </span>
          </p>
          {/* para leitores de ecrã: as duas versões, inteiras */}
          <p className="visualmente-escondido">
            Antes: {PEDACOS.map((p) => p.antes).join("")} Depois: {PEDACOS.map((p) => p.depois).join("")}
          </p>
          <p className="reescrita__texto" aria-hidden="true">
            {PEDACOS.map((p, i) => {
              const e = estadoDe(p);
              const marcada = ativa !== null && p.nota === ativa;
              return (
                <span key={i} className="rp" data-estado={e} data-marcada={marcada || undefined}>
                  {p.antes && <del className={p.sinal ? "rp__antes rp__antes--sinal" : "rp__antes"}>{p.antes}</del>}
                  {p.depois && <ins className="rp__depois">{p.depois}</ins>}
                  {p.nota !== undefined && p.depois && e === "depois" && (
                    <sup className="rp__numero">{p.nota + 1}</sup>
                  )}
                </span>
              );
            })}
          </p>
        </div>
      </div>

      <ol className="reescrita__notas">
        {NOTAS.map((n, i) => (
          <li
            key={n}
            data-visivel={estados[i] === "depois" || undefined}
            onPointerEnter={comRato ? () => setAtiva(i) : undefined}
            onPointerLeave={comRato ? () => setAtiva(null) : undefined}
          >
            <span className="reescrita__n" aria-hidden="true">
              {i + 1}
            </span>
            {n}
          </li>
        ))}
      </ol>

      <figcaption className="reescrita__legenda">
        {comRato && acabou ? "Passa o rato numa nota para ver o que lá estava. " : ""}
        Exemplo inventado, não é de nenhum cliente.{" "}
        {acabou && !pouco && (
          <button type="button" className="reescrita__outra" onClick={tocar}>
            Ver outra vez
          </button>
        )}
      </figcaption>
    </figure>
  );
}
