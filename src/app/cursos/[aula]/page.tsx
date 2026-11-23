import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CURSO, PESSOA, SITE } from "../../marca";
import { Rodape, Topo } from "../../moldura";
import { AULAS, aulaPorSlug } from "../aulas";
import "../../casa.css";

const NOVA_JANELA = <span className="visualmente-escondido"> (abre noutro separador)</span>;

export function generateStaticParams() {
  return AULAS.map((a) => ({ aula: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ aula: string }> }): Promise<Metadata> {
  const a = aulaPorSlug((await params).aula);
  if (!a) return {};
  return {
    title: `Aula ${a.n}: ${a.titulo} · ${CURSO.titulo}`,
    description: `${a.resumo} Aula gratuita de ${PESSOA.nome}, HN Hit Nails.`,
    alternates: { canonical: `/cursos/${a.slug}` },
  };
}

export default async function PaginaDaAula({ params }: { params: Promise<{ aula: string }> }) {
  const a = aulaPorSlug((await params).aula);
  if (!a) notFound();
  const anterior = AULAS.find((x) => x.n === a.n - 1);
  const seguinte = AULAS.find((x) => x.n === a.n + 1);

  const json = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `Aula ${a.n}: ${a.titulo}`,
    description: a.resumo,
    url: `${SITE}/cursos/${a.slug}`,
    inLanguage: "pt-PT",
    isAccessibleForFree: true,
    learningResourceType: "Aula",
    teaches: a.sabes,
    position: a.n,
    isPartOf: { "@type": "Course", "@id": `${SITE}/cursos#curso`, name: CURSO.titulo },
    author: { "@id": `${SITE}/#diogo-monteiro`, "@type": "Person", name: PESSOA.nome },
    ...(a.video
      ? {
          video: {
            "@type": "VideoObject",
            name: `Aula ${a.n}: ${a.titulo}`,
            description: a.resumo,
            contentUrl: `${SITE}${a.video.src}`,
            thumbnailUrl: `${SITE}${a.video.capa}`,
            duration: a.video.duracao,
            uploadDate: "2026-11-23",
            inLanguage: "pt-PT",
          },
        }
      : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }} />
      <a className="saltar" href="#conteudo">
        Saltar para o conteúdo
      </a>
      <Topo />
      <main id="conteudo" className="envolvente pagina-texto aula-pagina">
        <nav aria-label="Onde estás" className="migalhas">
          <Link href="/cursos">{CURSO.titulo}</Link> <span aria-hidden="true">›</span> Aula {a.n} de {AULAS.length}
        </nav>
        <span className="aula__n">Aula {a.n}</span>
        <h1>{a.titulo}</h1>
        <p className="aula-pagina__resumo">{a.resumo}</p>

        <div className="aula-pagina__sabes">
          <strong>No fim desta aula, sabes:</strong> {a.sabes}
        </div>

        {a.video && (
          <video className="aula-pagina__video" src={a.video.src} poster={a.video.capa} controls preload="none" playsInline>
            O teu browser não mostra este vídeo.{" "}
            <a href={a.video.src}>Descarregar o vídeo da aula</a>.
          </video>
        )}

        <div className="aula-pagina__grelha">
          <div>
            <h2>Passo a passo</h2>
            <ol className="aula-pagina__passos">
              {a.passos.map((p) => (
                <li key={p.texto}>
                  {p.forte && <strong>{p.forte} </strong>}
                  {p.texto}
                </li>
              ))}
            </ol>
            {a.regra && <p className="aula-pagina__regra">{a.regra}</p>}
          </div>
          {a.imagem && (
            <figure className="aula-pagina__figura">
              <Image src={a.imagem.src} alt={a.imagem.alt} width={a.imagem.largura} height={a.imagem.altura} sizes="(min-width: 960px) 30vw, 100vw" />
              <figcaption>
                {a.imagem.legenda}{" "}
                {a.imagem.href && (
                  <a href={a.imagem.href} target="_blank" rel="noopener">
                    Ver{NOVA_JANELA}
                  </a>
                )}
              </figcaption>
            </figure>
          )}
        </div>

        {a.conversa?.map((c) => (
          <section key={c.titulo} className="aula-pagina__exemplo" aria-label={`Exemplo: ${c.titulo}`}>
            <h2>Exemplo: {c.titulo}</h2>
            <div className="demo demo--estatica">
              <div className="demo__conversa">
                {c.falas.map((f, i) => (
                  <div key={i} className={f.quem === "tu" ? "demo__bolha demo__bolha--pedido" : "demo__bolha demo__bolha--resposta demo__bolha--visivel"}>
                    <span className="demo__quem">{f.quem === "tu" ? "Tu" : "Exemplo de resposta"}</span>
                    <p>{f.texto}</p>
                  </div>
                ))}
                {c.nota && <p className="demo__nota demo__nota--visivel">{c.nota}</p>}
              </div>
            </div>
          </section>
        ))}

        {a.quadro && (
          <section className="aula-pagina__exemplo" aria-labelledby={`quadro-${a.n}`}>
            <h2 id={`quadro-${a.n}`}>{a.quadro.titulo}</h2>
            <pre className="modelo__quadro" tabIndex={0}>
              {a.quadro.texto}
            </pre>
            {a.quadro.nota && <p className="aula-pagina__nota">{a.quadro.nota}</p>}
          </section>
        )}

        <aside className="aula-pagina__convite">
          {a.convite === "loja" ? (
            <>
              <p>Os produtos desta aula estão na loja da HN Hit Nails.</p>
              <a className="botao botao--rosa" href="https://www.hnhitnails.com" target="_blank" rel="noopener">
                Ir à loja HN{NOVA_JANELA}
              </a>
            </>
          ) : (
            <>
              <p>Queres ir mais longe na tua profissão? As formações da HN Hit Nails estão na Academy.</p>
              <a className="botao botao--rosa" href="https://academy.hnhitnails.com" target="_blank" rel="noopener">
                Ver as formações da Academy{NOVA_JANELA}
              </a>
            </>
          )}
          <a className="botao botao--contorno-escuro" href="/?assunto=Mentoria#contacto">
            Preferes que te ajude a fazer?
          </a>
        </aside>

        <nav aria-label="Outras aulas" className="aula-pagina__navegar">
          {anterior ? (
            <Link href={`/cursos/${anterior.slug}`} className="aula-pagina__seta">
              <span>← Aula {anterior.n}</span>
              {anterior.titulo}
            </Link>
          ) : (
            <span />
          )}
          {seguinte ? (
            <Link href={`/cursos/${seguinte.slug}`} className="aula-pagina__seta aula-pagina__seta--seguinte">
              <span>Aula {seguinte.n} →</span>
              {seguinte.titulo}
            </Link>
          ) : (
            <Link href="/cursos" className="aula-pagina__seta aula-pagina__seta--seguinte">
              <span>Acabaste o curso →</span>
              Ver todas as aulas
            </Link>
          )}
        </nav>
      </main>
      <Rodape />
    </>
  );
}
