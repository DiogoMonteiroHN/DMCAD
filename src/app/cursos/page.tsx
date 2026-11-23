import type { Metadata } from "next";
import Link from "next/link";
import { CURSO, INSTAGRAM, MODELO_4_PARTES } from "../marca";
import { Rodape, Topo } from "../moldura";
import { AULAS } from "./aulas";
import "../casa.css";

export const metadata: Metadata = {
  title: `${CURSO.titulo} · curso gratuito · Diogo Monteiro`,
  description: CURSO.resumo,
  alternates: { canonical: "/cursos" },
};

export default function Cursos() {
  return (
    <>
      <a className="saltar" href="#conteudo">
        Saltar para o conteúdo
      </a>
      <Topo />
      <main id="conteudo" className="envolvente pagina-texto">
        <p className="sobretitulo">Curso gratuito</p>
        <h1>{CURSO.titulo}</h1>
        <p>
          {CURSO.resumo} Cada aula tem o passo a passo e exemplos de pedidos e respostas, para fazeres no teu negócio. As
          aulas em vídeo saem no{" "}
          <a href={INSTAGRAM} target="_blank" rel="noopener">
            meu Instagram
            <span className="visualmente-escondido"> (abre noutro separador)</span>
          </a>
          .
        </p>

        <ol className="curso__aulas curso__aulas--ligacoes">
          {AULAS.map((a) => (
            <li key={a.n}>
              <Link href={`/cursos/${a.slug}`} className="aula">
                <span className="aula__n">Aula {a.n}</span>
                <h2>{a.titulo}</h2>
                <p>{a.resumo}</p>
                <span className="aula__abrir" aria-hidden="true">
                  Abrir a aula →
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <section className="aula-pagina__exemplo" aria-labelledby="titulo-modelo">
          <h2 id="titulo-modelo">Para começar já: o modelo das 4 partes</h2>
          <pre className="modelo__quadro" tabIndex={0}>
            {MODELO_4_PARTES}
          </pre>
        </section>

        <p style={{ marginTop: 40 }}>
          Preferes que te ajude a fazer? <a href="/#contacto">Pede mentoria ou um serviço</a>.
        </p>
      </main>
      <Rodape />
    </>
  );
}
