import Image from "next/image";
import { DadosEstruturados } from "./dados-estruturados";
import { CartaoServico } from "./cartao-servico";
import { Cinema } from "./cinema";
import { AULAS } from "./cursos/aulas";
import { DemoPedido } from "./demo-pedido";
import { Formulario } from "./formulario";
import { Orbita } from "./orbita";
import {
  CURSO,
  INSTAGRAM,
  INSTAGRAM_NOME,
  MODELO_4_PARTES,
  PERGUNTAS,
  PESSOA,
  SERVICOS,
  whatsapp,
  WHATSAPP_VISIVEL,
} from "./marca";
import { Topo, Rodape } from "./moldura";
import "./casa.css";

const NOVA_JANELA = <span className="visualmente-escondido"> (abre noutro separador)</span>;

export default function Pagina() {
  return (
    <>
      <DadosEstruturados />
      <a className="saltar" href="#conteudo">
        Saltar para o conteúdo
      </a>
      <Topo />

      <main id="conteudo">
        {/* 1. Quem sou e o que faço */}
        <Cinema>
          <div className="envolvente heroi__grelha">
            <div className="heroi__texto">
              <p className="heroi__selo">
                <Image src="/hn-hit-nails-logo.png" alt="" width={1920} height={582} sizes="96px" priority />
                <span>{PESSOA.papel}</span>
              </p>
              <h1 id="titulo-heroi">{PESSOA.nome}</h1>
              <p className="heroi__frase">
                Ajudo salões, estúdios, clínicas e pequenos negócios a usar bem a inteligência artificial: nas redes
                sociais, nas fotos, no site e no dia a dia.
              </p>
              <div className="heroi__botoes">
                <a className="botao botao--rosa" href="#curso">
                  Ver o curso gratuito
                </a>
                <a className="botao botao--contorno" href="#servicos">
                  Mentoria e serviços
                </a>
              </div>
              <p className="heroi__whatsapp">
                Ou fala comigo já:{" "}
                <a href={whatsapp("Olá Diogo, vi o teu site e queria falar contigo.")} target="_blank" rel="noopener">
                  WhatsApp {WHATSAPP_VISIVEL}
                  {NOVA_JANELA}
                </a>
              </p>
            </div>
            <ul className="heroi__indice" aria-label="O que encontras aqui">
              <li>
                <a href="#curso">
                  <span>01</span>Curso gratuito de IA na beleza
                </a>
              </li>
              <li>
                <a href="#servicos">
                  <span>02</span>Mentoria, sites e conteúdo
                </a>
              </li>
              <li>
                <a href="#trabalhos">
                  <span>03</span>Trabalhos feitos
                </a>
              </li>
              <li>
                <a href="#hn">
                  <span>04</span>O ecossistema HN Hit Nails
                </a>
              </li>
            </ul>
          </div>
        </Cinema>

        {/* 2. O curso gratuito */}
        <section className="seccao curso" id="curso" aria-labelledby="titulo-curso">
          <div className="envolvente">
            <p className="sobretitulo">Curso gratuito</p>
            <h2 id="titulo-curso">{CURSO.titulo}</h2>
            <p className="seccao__lead">{CURSO.resumo} As aulas saem no meu Instagram, uma de cada vez.</p>
            <ol className="curso__aulas curso__aulas--ligacoes">
              {AULAS.map((a) => (
                <li key={a.n}>
                  <a href={`/cursos/${a.slug}`} className="aula">
                    <span className="aula__n">Aula {a.n}</span>
                    <h3>{a.titulo}</h3>
                    <p>{a.resumo}</p>
                  </a>
                </li>
              ))}
            </ol>
            <div className="curso__botoes">
              <a className="botao botao--escuro" href="/cursos">
                Ver todas as aulas
              </a>
              <a className="botao botao--contorno-escuro" href={INSTAGRAM} target="_blank" rel="noopener">
                Seguir as aulas no Instagram{NOVA_JANELA}
              </a>
            </div>

            <div className="curso__demo">
              <div className="curso__demo-texto">
                <h3>Experimenta a diferença</h3>
                <p>O mesmo pedido, sem e com as 4 partes. Carrega nos botões e vê a resposta mudar.</p>
              </div>
              <DemoPedido />
            </div>

            <div className="modelo">
              <div className="modelo__texto">
                <h3>Para usares já: o modelo das 4 partes</h3>
                <p>
                  É a aula 1 num quadro. Copia, preenche o que está entre parênteses retos e cola no ChatGPT ou noutra
                  IA. O texto deixa de parecer de qualquer salão.
                </p>
              </div>
              <pre className="modelo__quadro" tabIndex={0} aria-label="Modelo das 4 partes para copiar">
                {MODELO_4_PARTES}
              </pre>
            </div>
          </div>
        </section>

        {/* 3. Serviços */}
        <section className="seccao servicos" id="servicos" aria-labelledby="titulo-servicos">
          <div className="envolvente">
            <p className="sobretitulo">Trabalhar comigo</p>
            <h2 id="titulo-servicos">Quando preferes que te ajude a fazer</h2>
            <ul className="servicos__lista">
              {SERVICOS.map((s) => (
                <CartaoServico key={s.id} id={s.id} video={s.id}>
                  <h3>{s.titulo}</h3>
                  <p>{s.texto}</p>
                  <div className="servico__botoes">
                    {s.externo && (
                      <a className="botao botao--rosa" href={s.externo.href} target="_blank" rel="noopener">
                        {s.externo.texto}
                        {NOVA_JANELA}
                      </a>
                    )}
                    <a
                      className={s.externo ? "botao botao--contorno-escuro" : "botao botao--rosa"}
                      href={`/?assunto=${encodeURIComponent(s.assunto)}#contacto`}
                    >
                      {s.botao}
                    </a>
                  </div>
                </CartaoServico>
              ))}
            </ul>
            <p className="servicos__nota">O preço combina-se depois de perceber o que precisas.</p>
          </div>
        </section>

        {/* 4. Trabalhos */}
        <section className="seccao trabalhos" id="trabalhos" aria-labelledby="titulo-trabalhos">
          <div className="envolvente">
            <p className="sobretitulo">Trabalhos feitos</p>
            <h2 id="titulo-trabalhos">Dois sites, duas formas de trabalhar</h2>
            <div className="trabalhos__lista">
              <article className="trabalho">
                <a className="trabalho__imagem" href="https://luismiguelgouveia.com" target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
                  <Image
                    src="/luismiguelgouveia-com.webp"
                    alt=""
                    width={1440}
                    height={810}
                    sizes="(min-width: 900px) 50vw, 100vw"
                  />
                </a>
                <div className="trabalho__texto">
                  <h3>Luís Miguel · luismiguelgouveia.com</h3>
                  <p>
                    O site do Luís Miguel, mentor, formador e especialista em Inteligência Emocional, e sócio da HN Hit
                    Nails. Uma página em que o scroll conduz um filme e pára em cada capítulo: o movimento
                    #AINDADÁTEMPO, a Mentoria RENOVO™, o H.E.A.R.T. e as palestras.
                  </p>
                  <a className="ligacao" href="https://luismiguelgouveia.com" target="_blank" rel="noopener">
                    Abrir luismiguelgouveia.com{NOVA_JANELA}
                  </a>
                </div>
              </article>
              <article className="trabalho">
                <a className="trabalho__imagem" href="https://www.belessa.pt" target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
                  <Image src="/belessa-pt-2x.webp" alt="" width={2880} height={1460} sizes="(min-width: 900px) 50vw, 100vw" />
                </a>
                <div className="trabalho__texto">
                  <h3>Belessa · belessa.pt</h3>
                  <p>
                    O programa para salões, estúdios e clínicas: agenda, marcações online, faturação e site, num só
                    sítio. É onde trabalho todos os dias com IA, e de onde vêm muitos dos exemplos do curso.
                  </p>
                  <a className="ligacao" href="https://www.belessa.pt" target="_blank" rel="noopener">
                    Abrir belessa.pt{NOVA_JANELA}
                  </a>
                </div>
              </article>
            </div>
            <p className="trabalhos__nota">Capturas das páginas iniciais, a 23 de novembro de 2026.</p>
          </div>
        </section>

        {/* 5. A família HN */}
        <section className="seccao hn" id="hn" aria-labelledby="titulo-hn">
          <div className="envolvente">
            <Image className="hn__logo" src="/hn-hit-nails-logo.png" alt="HN Hit Nails" width={1920} height={582} sizes="220px" />
            <h2 id="titulo-hn">Faço parte da HN Hit Nails</h2>
            <p className="seccao__lead">
              A HN é a minha casa. Daqui chegas a todo o ecossistema: os produtos, as formações, o Belessa e as marcas da
              família.
            </p>
            <Orbita />
          </div>
        </section>

        {/* 6. Sobre */}
        <section className="seccao sobre" id="sobre" aria-labelledby="titulo-sobre">
          <div className="envolvente sobre__grelha">
            <Image
              className="sobre__foto"
              src="/diogo-monteiro.webp"
              alt="Diogo Monteiro, de camisa verde, num fundo cinzento."
              width={760}
              height={951}
              sizes="(min-width: 900px) 34vw, 100vw"
            />
            <div className="sobre__texto">
              <h2 id="titulo-sobre">Da Glória do Ribatejo</h2>
              <p>
                Sou o {PESSOA.nome}, da {PESSOA.terra}. Trabalho com tecnologia e inteligência artificial, e faço parte da
                HN Hit Nails. O meu trabalho é pôr a IA ao serviço de quem tem pouco tempo entre clientes: a ferramenta
                certa, explicada de forma simples, aplicada no teu negócio.
              </p>
              <p>
                Na minha terra, entre 1951 e 1996, a RARET emitiu rádio para o outro lado da Europa: uma aldeia pequena
                ligada ao mundo. <a href="/raret">Conto a história aqui, com as fontes.</a>
              </p>
            </div>
          </div>
        </section>

        {/* 7. Perguntas */}
        <section className="seccao perguntas" id="perguntas" aria-labelledby="titulo-perguntas">
          <div className="envolvente">
            <h2 id="titulo-perguntas">Perguntas frequentes</h2>
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
          </div>
        </section>

        {/* 8. Contacto */}
        <section className="seccao contacto" id="contacto" aria-labelledby="titulo-contacto">
          <div className="envolvente contacto__grelha">
            <div className="contacto__texto">
              <h2 id="titulo-contacto">Conta-me o que precisas</h2>
              <p>
                Mentoria, um site, conteúdo ou o Belessa: diz-me que negócio tens, onde fica e o que queres resolver
                primeiro.
              </p>
              <ul className="contacto__canais">
                <li>
                  <a className="botao botao--whatsapp" href={whatsapp("Olá Diogo, vi o teu site e queria falar contigo.")} target="_blank" rel="noopener">
                    WhatsApp {WHATSAPP_VISIVEL}
                    {NOVA_JANELA}
                  </a>
                </li>
                <li>
                  <a className="ligacao ligacao--clara" href={INSTAGRAM} target="_blank" rel="noopener">
                    Instagram {INSTAGRAM_NOME}
                    {NOVA_JANELA}
                  </a>
                </li>
              </ul>
            </div>
            <Formulario />
          </div>
        </section>
      </main>

      <Rodape />
    </>
  );
}
