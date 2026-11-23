import Image from "next/image";
import { Apresentacao } from "./apresentacao";
import { Comparador } from "./comparador";
import { DadosEstruturados } from "./dados-estruturados";
import { Conversa } from "./conversa";
import { Feed } from "./feed";
import { Promocao } from "./promocao";
import { Reescrita } from "./reescrita";
import "./mostra.css";
import { ASSINATURA, EMAIL, INSTAGRAM, MORADA, NIF, OFERTA, PERGUNTAS, PESSOA } from "./marca";
import { Pedido } from "./pedido";
import { TesteDaLegenda } from "./teste-da-legenda";
import { Torre } from "./torre";

const MANIFESTO = "A IA não substitui a tua equipa. Ajuda cada pessoa a render mais, e deixa-te tempo para os clientes.";

const METODO = [
  {
    titulo: "A ferramenta certa.",
    texto:
      "Um problema concreto do teu negócio e uma ferramenta para o resolver: a foto de um serviço, uma promoção, a resposta a um pedido de marcação. Não quinze aplicações; a que serve.",
  },
  {
    titulo: "Explicada de forma simples.",
    texto:
      "Um passo de cada vez, sem siglas. Os nomes das ferramentas ficam no original; tudo o resto em português de Portugal, a pensar em quem tem dez minutos entre dois clientes.",
  },
  {
    titulo: "Aplicada no teu salão.",
    texto:
      "Fazes com o teu material, no teu negócio. O resultado tem de parecer teu: a tua luz, os teus serviços, a tua forma de falar. Se parecer feito por uma máquina, ainda não está pronto.",
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
      <DadosEstruturados />
      <a className="saltar" href="#conteudo">
        Saltar para o conteúdo
      </a>

      <header className="topo envolvente">
        <a href="/" className="topo__marca" aria-label="DMCAD, página inicial">
          <Image src="/dmcad-logo.png" alt="DMCAD" width={1200} height={371} priority sizes="132px" />
        </a>
        <nav aria-label="Principal" className="topo__nav">
          <a href="#teste">O teste</a>
          <a href="#o-que-muda">O que muda</a>
          <a href="#imagens">Imagens</a>
          <a href="#como">Como trabalho</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <div className="emissao" aria-hidden="true">
        <span className="emissao__linha" />
        <span className="emissao__sinal">
          <span className="emissao__onda" />
          <span className="emissao__onda" />
        </span>
      </div>

      <main id="conteudo">
        {/* 1. Herói: o problema mostrado, não descrito */}
        <section className="heroi envolvente" aria-labelledby="titulo-heroi">
          <div className="heroi__texto">
            <p className="heroi__para">IA prática para salões, estética e cabeleireiros, em Portugal.</p>
            <h1 id="titulo-heroi">
              <span className="heroi__linha">Conteúdo melhor.</span>{" "}
              <span className="heroi__linha">Menos tempo perdido.</span>
            </h1>
            <p className="heroi__promessa">
              Mostro-te as ferramentas certas e como as usar, para que as tuas publicações, fotos e textos não pareçam
              feitos por uma máquina.
            </p>
            <div className="heroi__accoes">
              <a className="botao" href="#teste">
                Testar a minha legenda
              </a>
              <Apresentacao />
            </div>
          </div>
          <Reescrita />
        </section>

        {/* 2. O manifesto: uma frase, grande, que se acende ao descer */}
        <section className="manifesto" aria-label="O que defendo">
          <p className="manifesto__frase envolvente">
            {MANIFESTO.split(" ").map((palavra, i) => (
              <span key={i} className="manifesto__palavra">
                {palavra}{" "}
              </span>
            ))}
          </p>
        </section>

        {/* 3. A peça de assinatura: o teste da legenda */}
        <section className="seccao envolvente teste-seccao" id="teste" aria-labelledby="titulo-teste">
          <div className="teste-seccao__cabeca">
            <h2 id="titulo-teste">O teste da legenda</h2>
            <p>
              Cola o texto da tua última publicação e vê o que o faz soar a genérico. As marcas vêm a azul, que é a cor da
              IA nesta casa. É o primeiro passo do método: perceber o que falha antes de mudar de ferramenta.
            </p>
          </div>
          <TesteDaLegenda />
        </section>

        {/* 3a. O que muda ao trabalhar comigo: três demonstrações do que entrego */}
        <section className="mostra" id="o-que-muda" aria-labelledby="titulo-o-que-muda">
          <div className="envolvente mostra__cabeca">
            <h2 id="titulo-o-que-muda">O que muda quando trabalhamos juntos</h2>
            <p>Três coisas que um salão faz todas as semanas, antes e depois do método. Sem promessas: vê-se.</p>
          </div>

          <article className="envolvente mostra__capitulo" aria-labelledby="titulo-promocao">
            <div className="mostra__titulo">
              <h3 id="titulo-promocao">Uma promoção em 10 minutos</h3>
              <p>Da fotografia tirada no salão à publicação, sempre sobre a mesma imagem.</p>
            </div>
            <Promocao />
          </article>

          <article className="envolvente mostra__capitulo" aria-labelledby="titulo-feed">
            <div className="mostra__titulo">
              <h3 id="titulo-feed">Um feed com uma voz só</h3>
              <p>
                Quando cada publicação é feita à pressa, o feed parece de nove salões diferentes. Com a mesma luz, as
                mesmas cores e a mesma forma de falar, parece o teu.
              </p>
            </div>
            <Feed />
          </article>

          <article className="envolvente mostra__capitulo" aria-labelledby="titulo-conversa">
            <div className="mostra__titulo">
              <h3 id="titulo-conversa">Responder a uma marcação sem parar o serviço</h3>
              <p>
                Uma resposta-modelo preparada contigo: o serviço, a duração e onde marcar, sempre igual. Responde-se entre
                dois clientes, sem escrever tudo de novo.
              </p>
            </div>
            <Conversa />
          </article>
        </section>

        {/* 3b. Imagens com IA: exemplos práticos, gerados para esta página */}
        <section className="seccao envolvente imagens" id="imagens" aria-labelledby="titulo-imagens">
          <div className="imagens__cabeca">
            <h2 id="titulo-imagens">E as imagens? Três exemplos práticos.</h2>
            <p>
              A IA ajuda a fazer fundos e composições para as tuas publicações. Não serve para mostrar o que não existe.
              Gerei estas imagens para esta página, e deixo à vista o pedido que usei.
            </p>
          </div>

          <article className="imagens__exemplo imagens__exemplo--comparar">
            <Comparador />
            <div className="imagens__texto">
              <h3>Uma promoção de verniz gel</h3>
              <p>Arrasta para comparar. As duas foram geradas por IA: o que muda é o pedido.</p>
              <div className="imagens__colunas">
                <div>
                  <h4>A genérica</h4>
                  <ul className="imagens__lista imagens__lista--nao">
                    <li>Néon e brilhos que nenhum salão tem.</li>
                    <li>Frascos a flutuar: ninguém acredita que é o teu.</li>
                    <li>O texto foi a IA que o escreveu, e em inglês.</li>
                  </ul>
                </div>
                <div>
                  <h4>A natural</h4>
                  <ul className="imagens__lista imagens__lista--sim">
                    <li>Luz de janela e sombras verdadeiras.</li>
                    <li>Cores calmas, de um espaço a sério.</li>
                    <li>Espaço livre para o texto, que escreves tu, por cima.</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <article className="imagens__exemplo imagens__exemplo--nao">
            <figure className="imagens__falso">
              <Image
                src="/exemplos/salao-inventado.webp"
                alt="Interior de um salão de luxo gerado por IA: mármore branco, espelhos dourados, lustres de cristal e cadeiras de veludo cor-de-rosa, sem ninguém."
                width={960}
                height={960}
                sizes="(min-width: 1000px) 480px, 100vw"
              />
              <figcaption className="imagens__carimbo">Este salão não existe. Foi gerado por IA.</figcaption>
            </figure>
            <div className="imagens__texto">
              <h3>Como não usar: o teu espaço</h3>
              <p>
                Mármore, lustres, espelhos dourados e ninguém lá dentro. Parece um sonho, e é esse o problema: quem marca
                contigo vai chegar a um sítio diferente.
              </p>
              <p>
                Nunca geres o teu espaço, os teus trabalhos nem os teus clientes. Isso fotografa-se, com o telemóvel e a
                luz de uma janela.
              </p>
            </div>
          </article>

          <article className="imagens__exemplo imagens__exemplo--pedido">
            <div className="imagens__texto">
              <h3>O pedido que fiz para a imagem natural</h3>
              <p>Copia-o, troca os objetos pelos do teu salão e experimenta. Foi este o texto, tal e qual.</p>
              <dl className="imagens__partes">
                <div>
                  <dt>A luz</dt>
                  <dd>Luz suave da manhã e sombras reais.</dd>
                </div>
                <div>
                  <dt>Defeitos de propósito</dt>
                  <dd>Texturas reais e pequenas imperfeições.</dd>
                </div>
                <div>
                  <dt>Lugar para o teu texto</dt>
                  <dd>Muito espaço vazio de linho no terço de cima da imagem.</dd>
                </div>
                <div>
                  <dt>O que não queres</dt>
                  <dd>Sem texto, sem pessoas, sem mãos.</dd>
                </div>
              </dl>
            </div>
            <div>
              <Pedido />
              <p className="imagens__nota">
                Gerada com o modelo flux-2-pro, a 22 de Novembro de 2026. Cada imagem custou cerca de 3 cêntimos de dólar.
              </p>
            </div>
          </article>
        </section>

        {/* 4. O método: título preso à esquerda, os passos a correr à direita */}
        <section className="seccao envolvente como" id="como" aria-labelledby="titulo-como">
          <div className="como__fixo">
            <h2 id="titulo-como">Desenhar com rigor antes de construir.</h2>
            <p>
              O CAD do nome vem do desenho técnico: mede-se primeiro, constrói-se depois. Com a IA trabalho da mesma
              forma.
            </p>
          </div>
          <ol className="como__passos">
            {METODO.map((m) => (
              <li key={m.titulo}>
                <h3>{m.titulo}</h3>
                <p>{m.texto}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 5. A oferta como um índice */}
        <section className="seccao envolvente oferta" aria-labelledby="titulo-oferta">
          <h2 id="titulo-oferta" className="oferta__titulo">
            Três formas de trabalharmos juntos
          </h2>
          <ul className="oferta__lista">
            {OFERTA.map((o) => (
              <li key={o.titulo} className="oferta__linha">
                <h3>{o.titulo}</h3>
                <p>{o.texto}</p>
              </li>
            ))}
          </ul>
          <p className="oferta__nota">Os pormenores e o preço de cada uma combinam-se numa conversa.</p>
        </section>

        {/* 6. A prova */}
        <section className="prova" aria-labelledby="titulo-prova">
          <div className="envolvente prova__grelha">
            <div className="prova__texto">
              <h2 id="titulo-prova">Um caso real: o belessa.pt</h2>
              <p>
                Um programa para salões, estúdios e clínicas: agenda, marcações online, faturação e site, num só sítio. É
                o projecto em que trabalho com IA, e é dele que vêm muitos dos exemplos que mostro: o que funciona, o que
                não funciona e porquê.
              </p>
              <a className="ligacao-forte" href="https://www.belessa.pt" target="_blank" rel="noopener">
                Abrir o belessa.pt
                <span className="visualmente-escondido"> (abre noutro separador)</span>
              </a>
            </div>
            <figure className="prova__ecra">
              <div className="prova__moldura">
                <Image
                  src="/belessa-pt-2x.webp"
                  alt="Página inicial do belessa.pt: «Fecha a porta às oito e as contas já estão feitas», com a agenda num tablet e a marcação num telemóvel."
                  width={2880}
                  height={1460}
                  quality={90}
                  sizes="(min-width: 1000px) 66vw, 100vw"
                />
              </div>
              <figcaption>Página inicial do belessa.pt, a 23 de Novembro de 2026.</figcaption>
            </figure>
          </div>
        </section>

        {/* 7. A origem: a RARET, em 3D */}
        <section className="origem" id="sobre" aria-labelledby="titulo-origem">
          <div className="envolvente origem__grelha">
            <div className="origem__texto">
              <p className="origem__anos" aria-hidden="true">
                1951–1996
              </p>
              <h2 id="titulo-origem">Da Glória para o mundo</h2>
              <p>
                Sou o {PESSOA.nomeCurto}, programador e técnico de suporte de TI, da Glória do Ribatejo. Entre 1951 e
                1996, a RARET emitiu dali para o outro lado da Europa: uma aldeia pequena ficou ligada ao mundo por uma
                antena. É essa a antena do logótipo.
              </p>
              <p>
                Hoje, a IA pode fazer o mesmo por um pequeno negócio. E como quase todo o conteúdo sobre IA em português
                vem do Brasil, a DMCAD fala para Portugal, com as palavras de cá.
              </p>
              <p>
                <a className="origem__ligacao" href="/raret">
                  Ler a história da RARET, com as fontes
                </a>
              </p>
              <dl className="origem__paralelo">
                {RARET_DMCAD.map(([a, b]) => (
                  <div key={a}>
                    <dt>{a}</dt>
                    <dd>{b}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="origem__torre">
              <Torre etiqueta="Desenho em 3D da antena da RARET, que se pode rodar com o dedo, o rato ou as setas do teclado." />
              <p className="origem__dica">Arrasta para rodar a torre.</p>
            </div>
          </div>
        </section>

        {/* 8. Perguntas */}
        <section className="seccao envolvente perguntas" id="perguntas" aria-labelledby="titulo-perguntas">
          <h2 id="titulo-perguntas" className="perguntas__titulo">
            Perguntas frequentes
          </h2>
          <div className="perguntas__lista">
            {PERGUNTAS.map((p) => (
              <details key={p.pergunta} className="pergunta">
                <summary>
                  <h3>{p.pergunta}</h3>
                </summary>
                <p>{p.resposta}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 9. Contacto: o email é a peça */}
        <section className="contacto" id="contacto" aria-labelledby="titulo-contacto">
          <div className="envolvente">
            <h2 id="titulo-contacto">Conta-me o que te está a tomar tempo.</h2>
            <p className="contacto__texto">
              Que negócio tens, onde fica e o que queres resolver primeiro. A partir daí vemos se faz sentido uma
              formação, um serviço ou uma mentoria.
            </p>
            <a className="contacto__email" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <p className="contacto__instagram">
              Ou por mensagem no Instagram:{" "}
              <a href={INSTAGRAM} target="_blank" rel="noopener">
                @diogomm1992
                <span className="visualmente-escondido"> (abre noutro separador)</span>
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer className="rodape">
        <div className="envolvente rodape__grelha">
          <div>
            <p className="rodape__marca">DMCAD</p>
            <p>{ASSINATURA}</p>
            <p className="rodape__fecho">Pequeno na origem. Longe no alcance.</p>
          </div>
          <address className="rodape__identificacao">
            {PESSOA.nome}
            <br />
            NIF {NIF}
            <br />
            {MORADA.rua}
            <br />
            {MORADA.codigoPostal} {MORADA.localidade}
            <br />
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </address>
          <p className="rodape__miudo">
            © 2026 {PESSOA.nome}. Esta página não usa cookies nem guarda dados de quem a visita.
          </p>
        </div>
      </footer>
    </>
  );
}
