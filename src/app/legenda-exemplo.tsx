"use client";

import { useEffect, useMemo, useState } from "react";
import { LEGENDA_ANTES, LEGENDA_DEPOIS } from "./marca";
import { emPedacos, lerSinais, type Nota } from "./sinais";

const CURTO: Record<Nota["tipo"], (n: number) => string> = {
  "lugar-comum": (n) => (n === 1 ? "um lugar-comum" : `${n} lugares-comuns`),
  emojis: (n) => `${n} emojis`,
  grito: () => "um grito",
  brasil: () => "português do Brasil",
  exagero: () => "uma promessa exagerada",
  concreto: () => "nada concreto",
  chamada: () => "nenhum próximo passo",
};

function enumerar(partes: string[]) {
  return partes.length < 2 ? partes.join("") : `${partes.slice(0, -1).join(", ")} e ${partes[partes.length - 1]}`;
}

// O topo da página: uma legenda de salão, antes e depois. Os sinais do «antes»
// vêm do mesmo teste que a pessoa usa mais abaixo.
export function LegendaExemplo() {
  const [lado, setLado] = useState<"antes" | "depois">("antes");
  const [tocou, setTocou] = useState(false);
  const antes = useMemo(() => lerSinais(LEGENDA_ANTES), []);
  const pedacos = useMemo(() => emPedacos(LEGENDA_ANTES, antes.marcas), [antes]);
  const sinais = antes.notas.length;

  // vira sozinha uma vez, ao fim de uns segundos, se a pessoa ainda não mexeu
  useEffect(() => {
    if (tocou || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setLado("depois"), 5200);
    return () => window.clearTimeout(t);
  }, [tocou]);

  const escolher = (l: "antes" | "depois") => {
    setTocou(true);
    setLado(l);
  };

  return (
    <figure className="exemplo" aria-label="Exemplo: uma legenda de salão antes e depois de revista">
      <div className="exemplo__comutador" role="group" aria-label="Ver a legenda">
        <button type="button" aria-pressed={lado === "antes"} onClick={() => escolher("antes")}>
          Antes
        </button>
        <button type="button" aria-pressed={lado === "depois"} onClick={() => escolher("depois")}>
          Depois
        </button>
      </div>

      <div className="exemplo__palco">
        <div className="exemplo__cartao" data-lado={lado}>
          <div className="exemplo__face exemplo__face--antes" aria-hidden={lado !== "antes"}>
            <p className="exemplo__autor">
              <span className="exemplo__avatar" aria-hidden="true" />O teu salão
            </p>
            <p className="exemplo__texto">
              {pedacos.map((p, i) =>
                p.tipo ? (
                  <mark key={i} className="sinal" style={{ ["--i" as string]: i }}>
                    {p.texto}
                  </mark>
                ) : (
                  <span key={i}>{p.texto}</span>
                ),
              )}
            </p>
            <p className="exemplo__notas">
              {enumerar(antes.notas.map((n) => CURTO[n.tipo](n.vezes ?? 1)))
                .replace(/^./, (c) => c.toUpperCase())}
              .
            </p>
          </div>
          <div className="exemplo__face exemplo__face--depois" aria-hidden={lado !== "depois"}>
            <p className="exemplo__autor">
              <span className="exemplo__avatar" aria-hidden="true" />O teu salão
            </p>
            <p className="exemplo__texto exemplo__texto--depois">{LEGENDA_DEPOIS}</p>
            <p className="exemplo__resumo">
              Diz o serviço, quanto tempo demora, quando há vaga e como marcar. Um emoji. Nenhuma frase que sirva a outro
              salão.
            </p>
          </div>
        </div>
      </div>
      <figcaption className="exemplo__legenda">
        {lado === "antes"
          ? `${sinais} coisas a mudar; o texto genérico vai marcado a azul.`
          : "A mesma publicação, reescrita com o que o salão tem de seu."}{" "}
        Exemplo inventado, não é de nenhum cliente.
      </figcaption>
    </figure>
  );
}
