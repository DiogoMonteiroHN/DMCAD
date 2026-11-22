import Image from "next/image";
import { Antena } from "./antena";
import { Antena3D } from "./antena-3d";

const INSTAGRAM = "https://www.instagram.com/diogomm1992/";
const EMAIL = "ola@dmcad.pt";

const PARA_QUEM = [
  {
    pergunta: "O que queres resolver",
    resposta: "Material publicitário, publicações, textos, fotos de serviços e produtos, o site.",
  },
  {
    pergunta: "O que te trava",
    resposta: "A correria do dia-a-dia. Não sobra tempo para aprender ferramentas novas.",
  },
  {
    pergunta: "O que já tentaste",
    resposta: "Gerar imagens e textos com IA. Ficaram genéricos, iguais aos de toda a gente.",
  },
  {
    pergunta: "O que levas daqui",
    resposta: "As ferramentas certas, explicadas de forma simples, para poupares tempo e te destacares.",
  },
];

const DEFENDO = [
  "Qualquer negócio se pode destacar com IA, se a souber usar bem.",
  "A IA não substitui a equipa. Ajuda cada pessoa a render mais.",
  "A IA veio para ficar. Aprender a usá-la é uma vantagem prática.",
];

const REJEITO = [
  "«A IA vai tirar o emprego a toda a gente.»",
  "Promessas de ganhar dinheiro sem trabalho.",
  "Imagens e textos genéricos, iguais aos de todos.",
  "Resultados garantidos e entusiasmo sem prova.",
];

const METODO = [
  {
    titulo: "Ferramenta certa",
    texto:
      "Um problema concreto do teu negócio e uma ferramenta para o resolver: a foto de um serviço, uma promoção, a resposta a um pedido de marcação.",
  },
  {
    titulo: "Explicação simples",
    texto:
      "Um passo de cada vez, sem siglas. Os nomes das ferramentas ficam no original; tudo o resto em português de Portugal.",
  },
  {
    titulo: "Aplicação real",
    texto:
      "Fazes com o teu material, no teu negócio. O resultado tem de parecer teu, não de uma máquina.",
  },
];

const OFERTA = [
  {
    titulo: "Formação",
    texto:
      "Aprendes a usar a IA no teu negócio: fotos de serviços e produtos, publicações, textos e promoções. Com exemplos de salões, estética e cabeleireiro em Portugal.",
  },
  {
    titulo: "Serviços",
    texto:
      "Se não tens tempo para aprender, faço contigo: material publicitário, publicações ou o site, com IA e com a cara do teu negócio.",
  },
  {
    titulo: "Mentoria",
    texto:
      "Acompanhamento caso a caso: trazes um problema do teu negócio e resolvemos juntos, com as ferramentas que fazem sentido para ti.",
  },
];

const RARET_DMCAD: [string, string][] = [
  ["Glória do Ribatejo", "Raiz e ponto de partida"],
  ["Antena de rádio", "Inteligência artificial"],
  ["Emissão para longe", "Conteúdo e ferramentas que ampliam o alcance"],
  ["Infra-estrutura técnica", "Método simples e aplicado"],
  ["Uma aldeia ligada ao mundo", "Negócios locais capazes de competir melhor"],
];

export default function Pagina() {
  return (
    <>
      <a className="saltar" href="#conteudo">
        Saltar para o conteúdo
      </a>

      <header className="cabecalho envolvente">
        <a href="/" className="cabecalho__marca" aria-label="DMCAD, página inicial">
          <Image src="/dmcad-logo.png" alt="DMCAD" width={1200} height={371} priority sizes="132px" />
        </a>
        <a href="#contacto" className="ligacao-forte">
          Falar comigo
        </a>
      </header>

      <main id="conteudo">
        {/* Herói: problema, promessa e o botão principal (brandbook, cap. 07) */}
        <section className="heroi envolvente" aria-labelledby="titulo-heroi">
          <div className="heroi__texto">
            <p className="heroi__problema">As tuas imagens ainda parecem feitas por IA?</p>
            <h1 id="titulo-heroi">Conteúdo melhor. Menos tempo perdido.</h1>
            <p className="heroi__promessa">
              IA prática para salões de beleza, centros de estética e cabeleireiros em Portugal. As ferramentas certas,
              explicadas de forma simples, para fazeres publicações, fotos e textos que não parecem feitos por uma
              máquina.
            </p>
            <a className="botao" href="#metodo">
              Conhecer o método
            </a>
          </div>
          <Antena3D>
            <Antena />
          </Antena3D>
        </section>

        <section className="seccao envolvente" id="para-quem" aria-labelledby="titulo-para-quem">
          <div className="seccao__cabeca">
            <h2 id="titulo-para-quem">Para quem faz o marketing sozinho, entre clientes</h2>
            <p>
              Geres um salão, um centro de estética ou um cabeleireiro e és tu que fazes as publicações, as fotos dos
              serviços, os textos e o site, no intervalo entre marcações.
            </p>
          </div>
          <dl className="ficha">
            {PARA_QUEM.map((linha) => (
              <div key={linha.pergunta} className="ficha__linha">
                <dt>{linha.pergunta}</dt>
                <dd>{linha.resposta}</dd>
              </div>
            ))}
          </dl>
          <p className="regra">
            Se quem gere um salão em Santarém não percebe isto entre dois clientes e não o aplica no mesmo dia, ainda
            não está bem explicado.
          </p>
        </section>

        <section className="ponto-de-vista" aria-labelledby="titulo-ponto-de-vista">
          <div className="envolvente">
            <h2 id="titulo-ponto-de-vista" className="ponto-de-vista__titulo">
              Bom conteúdo com IA não parece feito com IA.
            </h2>
            <div className="ponto-de-vista__colunas">
              <div>
                <h3>Defendo</h3>
                <ul className="lista lista--defendo">
                  {DEFENDO.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Rejeito</h3>
                <ul className="lista lista--rejeito">
                  {REJEITO.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="seccao envolvente" id="metodo" aria-labelledby="titulo-metodo">
          <div className="seccao__cabeca">
            <h2 id="titulo-metodo">Desenhar com rigor antes de construir</h2>
            <p>
              O CAD do nome vem do desenho técnico: mede-se primeiro, constrói-se depois. Com a IA trabalho da mesma
              forma, com método e precisão, sem improvisos.
            </p>
          </div>
          <ol className="metodo">
            {METODO.map((passo, i) => (
              <li key={passo.titulo} className="metodo__passo">
                <span className="metodo__numero" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{passo.titulo}</h3>
                <p>{passo.texto}</p>
              </li>
            ))}
          </ol>
          <p className="nota">
            Exemplos do que se faz: refazer uma promoção, fotografar um serviço sem que pareça IA, responder mais
            depressa a pedidos de marcação.
          </p>
        </section>

        <section className="seccao envolvente prova" id="prova" aria-labelledby="titulo-prova">
          <div className="prova__texto">
            <h2 id="titulo-prova">Um caso real: o belessa.pt</h2>
            <p>
              O Belessa é um programa para salões, estúdios e clínicas: agenda, marcações online, faturação e site, num
              só sítio. É o projecto em que trabalho com IA, e é dele que vêm muitos dos exemplos que mostro: o que
              funciona, o que não funciona e porquê.
            </p>
            <p>
              <a className="ligacao-forte" href="https://www.belessa.pt" target="_blank" rel="noopener">
                Abrir o belessa.pt
                <span className="visualmente-escondido"> (abre noutro separador)</span>
              </a>
            </p>
          </div>
          <figure className="prova__ecra">
            <div className="moldura">
              <span className="moldura__barra" aria-hidden="true">
                <span />
                <span />
                <span />
                <span className="moldura__endereco">belessa.pt</span>
              </span>
              <Image
                src="/belessa-pt.webp"
                alt="Página inicial do belessa.pt: «Fecha a porta às oito e as contas já estão feitas», com a agenda num tablet e a marcação num telemóvel."
                width={1600}
                height={900}
                sizes="(min-width: 960px) 640px, 100vw"
              />
            </div>
            <figcaption>Página inicial do belessa.pt, a 22 de Novembro de 2026.</figcaption>
          </figure>
        </section>

        <section className="seccao envolvente" id="oferta" aria-labelledby="titulo-oferta">
          <div className="seccao__cabeca">
            <h2 id="titulo-oferta">Três formas de trabalharmos juntos</h2>
            <p>Escolhe a que encaixa no tempo que tens. Os pormenores de cada uma combinam-se numa conversa.</p>
          </div>
          <div className="oferta">
            {OFERTA.map((o) => (
              <article key={o.titulo} className="oferta__item">
                <h3>{o.titulo}</h3>
                <p>{o.texto}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="seccao envolvente sobre" id="sobre" aria-labelledby="titulo-sobre">
          <div className="sobre__texto">
            <h2 id="titulo-sobre">Da Glória para o mundo</h2>
            <p>Sou o Diogo Monteiro, programador e técnico de suporte de TI, da Glória do Ribatejo.</p>
            <p>
              Entre 1951 e 1996, a RARET emitiu da Glória para o outro lado da Europa. Uma aldeia pequena ficou ligada
              ao mundo por uma antena, e é essa a antena do logótipo. Hoje, a IA pode fazer o mesmo por um pequeno
              negócio.
            </p>
            <p>
              Quase todo o conteúdo sobre IA em português vem do Brasil. A DMCAD fala para Portugal, com as palavras de
              cá: publicação, telemóvel, ecrã, marcação.
            </p>
          </div>
          <table className="paralelo">
            <caption className="visualmente-escondido">O que a RARET foi para a Glória e o que a DMCAD quer ser</caption>
            <thead>
              <tr>
                <th scope="col">RARET</th>
                <th scope="col">DMCAD</th>
              </tr>
            </thead>
            <tbody>
              {RARET_DMCAD.map(([a, b]) => (
                <tr key={a}>
                  <th scope="row">{a}</th>
                  <td>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="contacto" id="contacto" aria-labelledby="titulo-contacto">
          <div className="envolvente contacto__grelha">
            <div>
              <h2 id="titulo-contacto">Conta-me o que te está a tomar tempo</h2>
              <p>
                Manda-me uma mensagem no Instagram: que negócio tens, onde fica e o que queres resolver primeiro. A
                partir daí vemos se faz sentido uma formação, um serviço ou uma mentoria.
              </p>
              <a className="botao botao--grande" href={INSTAGRAM} target="_blank" rel="noopener">
                Abrir o Instagram @diogomm1992
                <span className="visualmente-escondido"> (abre noutro separador)</span>
              </a>
              <p className="contacto__alternativa">
                Preferes email? Escreve para{" "}
                <a className="ligacao-forte" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </p>
            </div>
            <p className="contacto__assinatura">Pequeno na origem. Longe no alcance.</p>
          </div>
        </section>
      </main>

      <footer className="rodape">
        <div className="envolvente rodape__grelha">
          <p className="rodape__marca">DMCAD</p>
          <p>Tecnologia para avançar. Humanidade para continuar.</p>
          <address className="rodape__miudo rodape__identificacao">
            Diogo Madelino Monteiro
            <br />
            NIF 232407690
            <br />
            Rua Luís de Camões, 55, 2125-066 Glória do Ribatejo
            <br />
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </address>
          <p className="rodape__miudo">
            © 2026 Diogo Madelino Monteiro. Esta página não usa cookies nem guarda dados de quem a visita.
          </p>
        </div>
      </footer>
    </>
  );
}
