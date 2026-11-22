"use client";

import { useId, useState } from "react";
import { LEGENDA_ANTES } from "./marca";
import { emPedacos, lerSinais, type Resultado } from "./sinais";

// O teste da legenda. Corre só aqui, no browser: o texto não é enviado nem guardado.
export function TesteDaLegenda() {
  const id = useId();
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [lido, setLido] = useState("");

  const ler = (t: string) => {
    setLido(t);
    setResultado(t.trim() ? lerSinais(t) : null);
  };

  const sinais = resultado?.notas.length ?? 0;

  return (
    <div className="teste">
      <form
        className="teste__form"
        onSubmit={(e) => {
          e.preventDefault();
          ler(texto);
        }}
      >
        <label htmlFor={`${id}-legenda`} className="teste__rotulo">
          A tua legenda
        </label>
        <textarea
          id={`${id}-legenda`}
          value={texto}
          rows={6}
          placeholder="Cola aqui o texto da tua última publicação."
          onChange={(e) => {
            setTexto(e.target.value);
            if (resultado) ler(e.target.value);
          }}
          aria-describedby={`${id}-privado`}
        />
        <p id={`${id}-privado`} className="teste__privado">
          O texto fica no teu telemóvel ou computador. Não é enviado nem guardado.
        </p>
        <div className="teste__accoes">
          <button type="submit" className="botao botao--preto" disabled={!texto.trim()}>
            Ver os sinais
          </button>
          <button
            type="button"
            className="ligacao-forte"
            onClick={() => {
              setTexto(LEGENDA_ANTES);
              ler(LEGENDA_ANTES);
            }}
          >
            Experimentar com um exemplo
          </button>
        </div>
      </form>

      <div className="teste__resultado" aria-live="polite">
        {resultado === null ? (
          <p className="teste__vazio">
            Procuro lugares-comuns, palavras do português do Brasil, promessas exageradas, emojis a mais, gritos, e se a
            legenda diz algo concreto e o que fazer a seguir.
          </p>
        ) : (
          <>
            <p className="teste__contagem">
              {sinais === 0
                ? "Nenhum dos sinais que procuro."
                : sinais === 1
                  ? "1 coisa a mudar nesta legenda."
                  : `${sinais} coisas a mudar nesta legenda.`}
            </p>
            <p className="teste__texto">
              {emPedacos(lido, resultado.marcas).map((p, i) =>
                p.tipo ? (
                  <mark key={i} className="sinal sinal--parado">
                    {p.texto}
                  </mark>
                ) : (
                  <span key={i}>{p.texto}</span>
                ),
              )}
            </p>
            {sinais === 0 ? (
              <p className="teste__nota-final">
                Isso não quer dizer que esteja perfeita. Lê-a em voz alta e pergunta: servia para outro salão? Se sim,
                falta-lhe um pormenor teu.
              </p>
            ) : (
              <ul className="teste__notas">
                {resultado.notas.map((n) => (
                  <li key={n.tipo}>{n.texto}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
