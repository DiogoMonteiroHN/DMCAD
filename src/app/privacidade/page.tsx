import type { Metadata } from "next";
import { INSTAGRAM_NOME, PESSOA, WHATSAPP_VISIVEL } from "../marca";
import { Rodape, Topo } from "../moldura";
import "../casa.css";

export const metadata: Metadata = {
  title: "Privacidade · Diogo Monteiro",
  description: "Que dados o formulário de dmcad.pt envia, para quê e por quanto tempo.",
  alternates: { canonical: "/privacidade" },
};

// Texto por validar por um jurista (dito ao Diogo a 23/11/2026).
export default function Privacidade() {
  return (
    <>
      <a className="saltar" href="#conteudo">
        Saltar para o conteúdo
      </a>
      <Topo />
      <main id="conteudo" className="envolvente pagina-texto">
        <h1>Privacidade</h1>
        <p>Atualizado a 23 de novembro de 2026.</p>

        <h2>Quem trata os dados</h2>
        <p>
          {PESSOA.nome}. Para qualquer pedido sobre os teus dados: WhatsApp {WHATSAPP_VISIVEL} ou Instagram {INSTAGRAM_NOME}.
        </p>

        <h2>O que este site guarda de quem o visita</h2>
        <p>Nada. Não usa cookies, estatísticas nem publicidade.</p>

        <h2>O formulário de contacto</h2>
        <ul>
          <li>
            <strong>O que envia:</strong> o teu nome, o email ou telemóvel, o negócio (se o escreveres), o assunto e a
            mensagem.
          </li>
          <li>
            <strong>Para quê:</strong> só para te responder sobre o que pediste. Não entra em listas nem em campanhas.
          </li>
          <li>
            <strong>Como:</strong> o site não guarda o pedido. Envia-o por email ao {PESSOA.nome}, através do Resend, o
            serviço de envio de emails.
          </li>
          <li>
            <strong>Contra abusos:</strong> o endereço IP de quem envia fica na memória do servidor durante uma hora,
            só para travar envios em massa. Não é gravado nem segue no email.
          </li>
          <li>
            <strong>Por quanto tempo:</strong> o email fica enquanto a conversa durar, e apaga-se ao fim de 12 meses sem
            contacto.
          </li>
        </ul>

        <h2>Os teus direitos</h2>
        <p>
          Podes pedir para ver, corrigir ou apagar os teus dados, ou opor-te ao seu uso, pelos contactos acima. Se achares
          que os teus dados não foram bem tratados, podes queixar-te à CNPD, a Comissão Nacional de Proteção de Dados.
        </p>

        <h2>Ligações para outros sites</h2>
        <p>
          As ligações para a loja HN, a Academy, o Belessa, o WhatsApp, o Instagram e os outros sites abrem páginas que
          têm as suas próprias regras de privacidade.
        </p>
      </main>
      <Rodape />
    </>
  );
}
