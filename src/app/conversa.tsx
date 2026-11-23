"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useComRato, usePoucoMovimento, useQuandoVisivel } from "./rato";

// Uma conversa de mensagens: um pedido de marcação e a resposta-modelo preparada com o salão.
// Aparece mensagem a mensagem quando a secção entra no ecrã. Sem números de tempo poupado:
// mostra-se o processo, não se promete o resultado.

type Mensagem = { de: "cliente" | "salao"; texto: string; modelo?: boolean };

const MENSAGENS: Mensagem[] = [
  { de: "cliente", texto: "Olá! Têm vaga no sábado de manhã para verniz gel?" },
  {
    de: "salao",
    texto:
      "Olá! No sábado temos às 10h00 e às 11h30. O verniz gel demora 45 minutos. Para marcar, escolhe a hora na ligação da bio.",
    modelo: true,
  },
  { de: "cliente", texto: "Às 10h00, por favor 🙂" },
  { de: "salao", texto: "Está marcado. Até sábado!" },
];

export function Conversa() {
  const caixa = useRef<HTMLDivElement>(null);
  const comRato = useComRato();
  const pouco = usePoucoMovimento();
  const [mostradas, setMostradas] = useState(0);
  const [aEscrever, setAEscrever] = useState(false);
  const [explicar, setExplicar] = useState(false);
  const relogios = useRef<number[]>([]);

  const limpar = () => {
    relogios.current.forEach((r) => window.clearTimeout(r));
    relogios.current = [];
  };

  const tocar = useCallback(() => {
    limpar();
    if (pouco) {
      setMostradas(MENSAGENS.length);
      return;
    }
    setMostradas(0);
    let t = 400;
    MENSAGENS.forEach((m, i) => {
      const escrever = m.de === "salao" ? 1100 : 700;
      relogios.current.push(window.setTimeout(() => setAEscrever(true), t));
      t += escrever;
      relogios.current.push(
        window.setTimeout(() => {
          setAEscrever(false);
          setMostradas(i + 1);
        }, t),
      );
      t += 700;
    });
  }, [pouco]);

  useQuandoVisivel(caixa, tocar, 0.5);
  useEffect(() => {
    if (pouco) {
      limpar();
      setAEscrever(false);
      setMostradas(MENSAGENS.length);
    }
  }, [pouco]);
  useEffect(() => limpar, []);

  const proxima = MENSAGENS[mostradas];

  return (
    <div className="conversa">
      <div ref={caixa} className="conversa__telefone">
        <div className="conversa__cabeca" aria-hidden="true">
          <span className="conversa__avatar" />
          <span>
            <strong>O teu salão</strong>
            <small>Mensagens</small>
          </span>
        </div>
        <ol className="conversa__fio" aria-live="polite">
          {MENSAGENS.slice(0, mostradas).map((m, i) => (
            <li
              key={i}
              className={`bolha bolha--${m.de}`}
              data-modelo={m.modelo || undefined}
              onPointerEnter={comRato && m.modelo ? () => setExplicar(true) : undefined}
              onPointerLeave={comRato && m.modelo ? () => setExplicar(false) : undefined}
            >
              <span className="visualmente-escondido">{m.de === "cliente" ? "Cliente: " : "Salão: "}</span>
              {m.texto}
              {m.modelo && <span className="bolha__marca">Resposta-modelo</span>}
              {m.modelo && comRato && (
                <span className="bolha__explica" data-visivel={explicar || undefined} aria-hidden="true">
                  Escrita uma vez contigo. A cada pedido, só se trocam o dia e as horas.
                </span>
              )}
            </li>
          ))}
          {aEscrever && proxima && (
            <li className={`bolha bolha--${proxima.de} bolha--a-escrever`} aria-hidden="true">
              <span />
              <span />
              <span />
            </li>
          )}
        </ol>
      </div>
      <p className="conversa__nota">
        {!comRato && "A resposta-modelo é escrita uma vez contigo; a cada pedido só se trocam o dia e as horas. "}
        Conversa inventada, para exemplo.{" "}
        {mostradas === MENSAGENS.length && !pouco && (
          <button type="button" className="reescrita__outra" onClick={tocar}>
            Ver outra vez
          </button>
        )}
      </p>
    </div>
  );
}
