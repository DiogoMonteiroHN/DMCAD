import type { Metadata } from "next";
import { CURSO, INSTAGRAM, MODELO_4_PARTES } from "../marca";
import { Rodape, Topo } from "../moldura";
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
          {CURSO.resumo} Cada aula tem até 3 minutos e sai no{" "}
          <a href={INSTAGRAM} target="_blank" rel="noopener">
            meu Instagram
            <span className="visualmente-escondido"> (abre noutro separador)</span>
          </a>
          . Aqui fica o passo a passo de cada uma, para guardares.
        </p>

        {CURSO.aulas.map((a) => (
          <section key={a.n} className="aula-detalhe" aria-labelledby={`aula-${a.n}`}>
            <span className="aula__n">Aula {a.n}</span>
            <h2 id={`aula-${a.n}`}>{a.titulo}</h2>
            <p>
              <strong>No fim, sabes:</strong> {a.sabes}
            </p>
            <ol>
              {a.passos.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
            {a.n === 1 && (
              <pre className="modelo__quadro" tabIndex={0} aria-label="Modelo das 4 partes para copiar" style={{ marginTop: 20 }}>
                {MODELO_4_PARTES}
              </pre>
            )}
          </section>
        ))}

        <p style={{ marginTop: 40 }}>
          Preferes que te ajude a fazer? <a href="/#contacto">Pede mentoria ou um serviço</a>.
        </p>
      </main>
      <Rodape />
    </>
  );
}
