import Image from "next/image";
import Link from "next/link";
import { PESSOA, whatsapp, WHATSAPP_VISIVEL } from "./marca";

// O topo e o rodapé, iguais na página inicial, no curso e na privacidade.
export function Topo() {
  return (
    <header className="topo">
      <div className="envolvente topo__grelha">
        <Link href="/" className="topo__marca" aria-label={`${PESSOA.nome}, página inicial`}>
          <Image src="/hn-hit-nails-logo.png" alt="" width={1920} height={582} sizes="84px" priority />
          <span>{PESSOA.nome}</span>
        </Link>
        <nav aria-label="Principal" className="topo__nav">
          <Link href="/#curso">Curso</Link>
          <Link href="/#servicos">Serviços</Link>
          <Link href="/#trabalhos">Trabalhos</Link>
          <Link href="/#hn">HN</Link>
          <Link href="/#contacto" className="topo__contacto">
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Rodape() {
  return (
    <>
    <a
      className="whatsapp-fixo"
      href={whatsapp("Olá Diogo, vi o teu site e queria falar contigo.")}
      target="_blank"
      rel="noopener"
      aria-label={`Falar comigo no WhatsApp, ${WHATSAPP_VISIVEL} (abre noutro separador)`}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M12 3C7 3 3 6.6 3 11c0 2.4 1.2 4.6 3.1 6.1L5.5 21l4-2.1c.8.2 1.6.3 2.5.3 5 0 9-3.6 9-8.1S17 3 12 3Zm-4 9.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z" />
      </svg>
      <span>WhatsApp</span>
    </a>
    <footer className="rodape">
      <div className="envolvente rodape__grelha">
        <div>
          <Image src="/hn-hit-nails-logo.png" alt="HN Hit Nails" width={1920} height={582} sizes="140px" className="rodape__logo" />
          <p>
            {PESSOA.nome} · {PESSOA.papel}
          </p>
        </div>
        <nav aria-label="Rodapé" className="rodape__nav">
          <Link href="/cursos">O curso</Link>
          <Link href="/raret">A história da RARET</Link>
          <Link href="/privacidade">Privacidade</Link>
        </nav>
        <p className="rodape__miudo">
          © 2026 {PESSOA.nome}. Este site não usa cookies nem estatísticas. O formulário só envia o que escreves, por
          email, para eu te responder.
        </p>
      </div>
    </footer>
    </>
  );
}
