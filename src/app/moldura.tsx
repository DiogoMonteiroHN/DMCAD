import Image from "next/image";
import Link from "next/link";
import { PESSOA } from "./marca";

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
  );
}
