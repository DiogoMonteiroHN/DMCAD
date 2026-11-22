"use client";

import { useRef } from "react";
import { TRANSCRICAO, VIDEO } from "./marca";

// A apresentação em vídeo: um botão no topo abre-a numa janela. O vídeo só se
// descarrega quando alguém carrega no botão, e diz sempre que é um avatar de IA.
export function Apresentacao() {
  const dialogo = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const abrir = () => {
    dialogo.current?.showModal();
    video.current?.play().catch(() => {});
  };
  const fechar = () => dialogo.current?.close();

  return (
    <>
      <button type="button" className="apresentacao-botao" onClick={abrir} aria-haspopup="dialog">
        <span className="apresentacao-botao__rosto" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/dmcad-apresentacao-rosto.webp" alt="" width={56} height={56} />
          <span className="apresentacao-botao__play" />
        </span>
        <span className="apresentacao-botao__textos">
          <span className="apresentacao-botao__titulo">Ver a apresentação</span>
          <span className="apresentacao-botao__nota">38 segundos, com o meu avatar feito com IA</span>
        </span>
      </button>

      <dialog
        ref={dialogo}
        className="apresentacao"
        aria-labelledby="apresentacao-titulo"
        onClose={() => video.current?.pause()}
        onClick={(e) => {
          if (e.target === dialogo.current) fechar();
        }}
      >
        <div className="apresentacao__caixa">
          <div className="apresentacao__topo">
            <h2 id="apresentacao-titulo" className="apresentacao__titulo">
              {VIDEO.titulo}
            </h2>
            <button type="button" className="apresentacao__fechar" onClick={fechar}>
              Fechar
            </button>
          </div>
          <div className="apresentacao__video">
            <video
              ref={video}
              src={VIDEO.ficheiro}
              poster={VIDEO.poster}
              controls
              playsInline
              preload="none"
              width={720}
              height={1280}
              aria-describedby="apresentacao-transcricao"
            />
            <p className="apresentacao__etiqueta">Avatar criado com IA</p>
          </div>
          <details className="apresentacao__transcricao">
            <summary>Ler o que é dito</summary>
            <div id="apresentacao-transcricao">
              {TRANSCRICAO.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </details>
        </div>
      </dialog>
    </>
  );
}
