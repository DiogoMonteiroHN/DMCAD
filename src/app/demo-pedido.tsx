"use client";

// A aula 1 ao vivo: escolhe-se o pedido (sem ou com as 4 partes) e vê-se o pedido a
// escrever-se e a resposta a seguir. As respostas são exemplos escritos a 23/11/2026,
// os mesmos do material do curso; não vêm de nenhum cliente.

import { useEffect, useRef, useState } from "react";
import { useVivo } from "./vivo";

const EXEMPLOS = {
  sem: {
    pedido: "Escreve um post sobre unhas de gel.",
    resposta:
      "✨ Unhas de gel: beleza e durabilidade! Descobre o brilho que dura semanas. Marca já a tua sessão e mima-te! 💅 #unhas #gel #beleza",
    nota: "Certo, mas podia ser de qualquer salão do país.",
  },
  com: {
    pedido:
      "QUEM SOU: tenho um salão de unhas em Glória do Ribatejo; os meus clientes têm entre 25 e 50 anos e muitos trabalham por turnos.\nO QUE QUERO: um post para o Instagram a avisar que agora há horários ao sábado de manhã.\nCOMO QUERO: curto, a tratar por tu, com uma pergunta no fim. Não inventes preços nem promoções.",
    resposta:
      "Trabalhas por turnos e o sábado de manhã é o teu tempo livre? Agora há horários ao sábado de manhã no salão, em Glória do Ribatejo. Preferes logo às 9h ou mais perto do almoço?",
    nota: "Fala de um salão, de uma terra e de pessoas concretas.",
  },
};

type Qual = keyof typeof EXEMPLOS;

export function DemoPedido() {
  const vivo = useVivo();
  const [qual, setQual] = useState<Qual>("com");
  const [escrito, setEscrito] = useState(EXEMPLOS.com.pedido.length);
  const [mostraResposta, setMostraResposta] = useState(true);
  const caixa = useRef<HTMLDivElement>(null);
  const jaViu = useRef(false);

  const correr = (q: Qual) => {
    setQual(q);
    if (!vivo) {
      setEscrito(EXEMPLOS[q].pedido.length);
      setMostraResposta(true);
      return;
    }
    setEscrito(0);
    setMostraResposta(false);
  };

  // No computador, começa a escrever quando a caixa aparece no ecrã.
  useEffect(() => {
    if (!vivo || !caixa.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !jaViu.current) {
        jaViu.current = true;
        correr("sem");
      }
    }, { threshold: 0.5 });
    o.observe(caixa.current);
    return () => o.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vivo]);

  useEffect(() => {
    const total = EXEMPLOS[qual].pedido.length;
    if (escrito >= total) {
      const t = setTimeout(() => setMostraResposta(true), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setEscrito((n) => Math.min(total, n + (qual === "com" ? 3 : 1))), 18);
    return () => clearTimeout(t);
  }, [escrito, qual]);

  const ex = EXEMPLOS[qual];
  return (
    <div className="demo" ref={caixa}>
      <div className="demo__escolha" role="group" aria-label="Escolhe o pedido">
        <button type="button" aria-pressed={qual === "sem"} onClick={() => correr("sem")}>
          Pedido sem as 4 partes
        </button>
        <button type="button" aria-pressed={qual === "com"} onClick={() => correr("com")}>
          Pedido com as 4 partes
        </button>
      </div>
      <div className="demo__conversa" aria-live="polite">
        <div className="demo__bolha demo__bolha--pedido">
          <span className="demo__quem">Tu</span>
          <p>
            {ex.pedido.slice(0, escrito)}
            {escrito < ex.pedido.length && <span className="demo__cursor" aria-hidden="true" />}
          </p>
        </div>
        <div className={mostraResposta ? "demo__bolha demo__bolha--resposta demo__bolha--visivel" : "demo__bolha demo__bolha--resposta"}>
          <span className="demo__quem">Exemplo de resposta</span>
          <p>{ex.resposta}</p>
        </div>
        <p className={mostraResposta ? "demo__nota demo__nota--visivel" : "demo__nota"}>{ex.nota}</p>
      </div>
    </div>
  );
}
