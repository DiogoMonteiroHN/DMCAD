"use client";

// O formulário de pedidos: manda para /api/pedido, que envia um email ao Diogo.
// Se o envio falhar (ou ainda não estiver ligado), não finge que enviou: mostra o
// WhatsApp com a mensagem já escrita, para o pedido não se perder.

import { useEffect, useState } from "react";
import { ASSUNTOS, type Assunto, whatsapp, WHATSAPP_VISIVEL } from "./marca";

type Estado = "por-enviar" | "a-enviar" | "enviado" | "falhou";

export function Formulario() {
  const [assunto, setAssunto] = useState<Assunto>("Mentoria");
  const [estado, setEstado] = useState<Estado>("por-enviar");
  const [textoWhatsapp, setTextoWhatsapp] = useState("");
  const [aberto, setAberto] = useState(0);
  const [origem, setOrigem] = useState("");

  // Os botões dos serviços levam a «?assunto=…#contacto»: o assunto já vem escolhido.
  useEffect(() => {
    setAberto(Date.now());
    // De onde veio a pessoa: o «?origem=» do link (por exemplo o da bio do Instagram)
    // ou, sem ele, o site de onde chegou. Só segue no email do pedido; nada se guarda.
    const doLink = new URLSearchParams(window.location.search).get("origem");
    let deOnde = "";
    try {
      const r = document.referrer ? new URL(document.referrer).hostname : "";
      if (r && r !== window.location.hostname) deOnde = r;
    } catch {}
    setOrigem(doLink ? `${doLink} (link)` : deOnde);
    const escolhido = new URLSearchParams(window.location.search).get("assunto");
    if (escolhido && (ASSUNTOS as string[]).includes(escolhido)) setAssunto(escolhido as Assunto);
  }, []);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setTextoWhatsapp(
      `Olá Diogo, sou ${dados.nome || "…"}${dados.negocio ? `, de ${dados.negocio}` : ""}. Assunto: ${assunto}. ${dados.mensagem || ""}`.trim(),
    );
    setEstado("a-enviar");
    try {
      const r = await fetch("/api/pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dados, assunto, aberto, origem }),
      });
      setEstado(r.ok ? "enviado" : "falhou");
    } catch {
      setEstado("falhou");
    }
  }

  if (estado === "enviado") {
    return (
      <div className="formulario__feito" role="status">
        <p className="formulario__feito-titulo">Recebi o teu pedido.</p>
        <p>Respondo pelo contacto que deixaste. Se for urgente, manda-me também uma mensagem no WhatsApp.</p>
      </div>
    );
  }

  return (
    <form className="formulario" onSubmit={enviar} noValidate={false}>
      <div className="formulario__campo">
        <label htmlFor="f-assunto">O que precisas?</label>
        <select id="f-assunto" name="assunto-visivel" value={assunto} onChange={(e) => setAssunto(e.target.value as Assunto)}>
          {ASSUNTOS.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>
      <div className="formulario__par">
        <div className="formulario__campo">
          <label htmlFor="f-nome">O teu nome</label>
          <input id="f-nome" name="nome" required maxLength={80} autoComplete="name" />
        </div>
        <div className="formulario__campo">
          <label htmlFor="f-contacto">Email ou telemóvel</label>
          <input id="f-contacto" name="contacto" required maxLength={120} autoComplete="email" />
          <p className="formulario__ajuda">É por aqui que te respondo.</p>
        </div>
      </div>
      <div className="formulario__campo">
        <label htmlFor="f-negocio">
          O teu negócio e a terra <span className="formulario__opcional">(opcional)</span>
        </label>
        <input id="f-negocio" name="negocio" maxLength={120} placeholder="Por exemplo: salão de unhas em Santarém" />
      </div>
      <div className="formulario__campo">
        <label htmlFor="f-mensagem">O que queres resolver?</label>
        <textarea id="f-mensagem" name="mensagem" required maxLength={2000} rows={5} />
        <p className="formulario__ajuda">Não ponhas dados de clientes teus (nomes, telefones, fotos).</p>
      </div>
      {/* Armadilha para robôs: invisível para pessoas. */}
      <div className="visualmente-escondido" aria-hidden="true">
        <label htmlFor="f-site">Não preencher</label>
        <input id="f-site" name="site" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="formulario__consentimento">
        <input id="f-ok" name="consentimento" type="checkbox" required value="sim" />
        <label htmlFor="f-ok">
          Aceito que o Diogo Monteiro use estes dados só para responder a este pedido (
          <a href="/privacidade">como são tratados</a>).
        </label>
      </div>
      <button className="botao botao--rosa" type="submit" disabled={estado === "a-enviar"}>
        {estado === "a-enviar" ? "A enviar…" : "Enviar o pedido"}
      </button>
      {estado === "falhou" && (
        <div className="formulario__falhou" role="alert">
          <p>
            Não foi possível enviar o pedido. Não ficou guardado. Manda-me antes a mesma mensagem pelo WhatsApp ({WHATSAPP_VISIVEL}):
          </p>
          <a className="botao botao--whatsapp" href={whatsapp(textoWhatsapp)} target="_blank" rel="noopener">
            Enviar pelo WhatsApp<span className="visualmente-escondido"> (abre noutro separador)</span>
          </a>
        </div>
      )}
    </form>
  );
}
