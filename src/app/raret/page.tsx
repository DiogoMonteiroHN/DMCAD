import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PESSOA, SITE } from "../marca";
import { CampoDeAntenas } from "./campo-de-antenas";
import { Contador } from "./contador";
import { Setas } from "./setas";
import { FONTES, FOTOS, FOTOS_NOUTROS_SITIOS, FOTOS_RARET, numeroDaFonte, type IdDeFonte } from "./fontes";
import "../casa.css";
import { Rodape, Topo } from "../moldura";
import "./raret.css";

const TITULO = "RARET: a rádio da Glória do Ribatejo (1951–1996)";
const DESCRICAO =
  "Entre 1951 e 1996, a RARET retransmitiu a Radio Free Europe a partir de uma herdade da Glória do Ribatejo. A história, os números e a aldeia, com as fontes à vista.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: "/raret" },
  openGraph: { type: "article", locale: "pt_PT", url: `${SITE}/raret`, title: TITULO, description: DESCRICAO },
};

// A nota de rodapé: o número da fonte, a ligar à lista no fim da página.
function Nota({ id }: { id: IdDeFonte }) {
  const n = numeroDaFonte(id);
  return (
    <sup className="r-nota">
      <a href={`#fonte-${n}`} aria-label={`Fonte ${n}`}>
        {n}
      </a>
    </sup>
  );
}

const NUMEROS: { grande: React.ReactNode; texto: React.ReactNode }[] = [
  {
    grande: "4 jul. 1951",
    texto: (
      <>
        Primeira emissão a partir da Glória, com o emissor móvel «Barbara», de 7,5 kW, que viera da Alemanha.
        <Nota id="myer52" />
        <Nota id="herdeiro" />
      </>
    ),
  },
  {
    grande: "4 × 50 kW",
    texto: (
      <>
        Os primeiros emissores fixos de onda curta, a trabalhar no início de 1952 nas bandas dos 6, 7, 9 e 11 MHz.
        <Nota id="myer52" />
      </>
    ),
  },
  {
    grande: <Contador valor={18} />,
    texto: (
      <>
        Emissores em 1971, com 24 sistemas de antenas, segundo a RFE/RL.
        <Nota id="rfe" />
      </>
    ),
  },
  {
    grande: <Contador valor={87987} />,
    texto: (
      <>
        Horas de emissão entre 1952 e 1963, nos relatórios e contas da RARET.
        <Nota id="herdeiro" />
      </>
    ),
  },
  {
    grande: (
      <>
        ≈{"\u00a0"}
        <Contador valor={400} />
      </>
    ),
    texto: (
      <>
        Trabalhadores portugueses em 1963. Em 1951 eram 204.
        <Nota id="herdeiro" />
      </>
    ),
  },
  {
    grande: "184–200 ha",
    texto: (
      <>
        A área da herdade. O número muda de fonte para fonte, entre 184 e 200 hectares.
        <Nota id="rfe" />
        <Nota id="pioneiro" />
      </>
    ),
  },
];

const CAMINHO: { onde: string; o_que: string }[] = [
  { onde: "Munique e Nova Iorque", o_que: "Os programas eram feitos aqui, nunca em Portugal." },
  { onde: "Maxoqueira, Benavente", o_que: "O centro recetor apanhava a onda curta vinda de Holzkirchen ou de Nova Iorque." },
  { onde: "Lisboa", o_que: "Os estúdios recebiam e encaminhavam o sinal." },
  { onde: "Glória do Ribatejo", o_que: "Os emissores lançavam-no de novo, em onda curta." },
  { onde: "Leste da Europa", o_que: "Checoslováquia, Hungria, Polónia, Roménia e Bulgária." },
];

const VOZES: { citacao: string; quem: string; fonte: IdDeFonte }[] = [
  {
    citacao: "Posso afirmar que foram os melhores anos que a Glória teve, a todos os níveis.",
    quem: "Rogério Caneira, antigo operador",
    fonte: "ual",
  },
  {
    citacao: "Ninguém pensava na política, aquilo era o nosso meio de subsistência, queríamos era ganhar o nosso salário.",
    quem: "Carlos Cardoso, antigo operador",
    fonte: "obs",
  },
  {
    citacao: "Quando o muro de Berlim caiu, já sabíamos que a RARET estava condenada.",
    quem: "Joaquim Diamantino",
    fonte: "ual",
  },
];

const CRONOLOGIA: { quando: string; o_que: string; fontes: IdDeFonte[] }[] = [
  {
    quando: "1950",
    o_que: "A Radio Free Europe começa a emitir, da Alemanha. A 19 de dezembro, Salazar recebe o embaixador dos EUA.",
    fontes: ["rfe", "herdeiro"],
  },
  {
    quando: "Abril de 1951",
    o_que: "É constituída a RARET: a 20 de abril, segundo o relatório de 1952 e o Diário do Governo; outra fonte diz 10.",
    fontes: ["myer52", "herdeiro", "obslusa"],
  },
  {
    quando: "4 de julho de 1951",
    o_que: "Primeira emissão da Glória, com o «Barbara», dirigida à Checoslováquia.",
    fontes: ["myer52", "herdeiro"],
  },
  { quando: "25 de dezembro de 1951", o_que: "Entra ao serviço o primeiro emissor de 50 kW.", fontes: ["myer52"] },
  {
    quando: "1952",
    o_que: "Ficam prontos os quatro emissores de 50 kW. A 11 de novembro é descerrado um padrão com uma dedicatória de Salazar.",
    fontes: ["myer52", "herdeiro"],
  },
  { quando: "1954", o_que: "Ampliação: 12 emissores e 16 sistemas de antenas.", fontes: ["rfe"] },
  { quando: "1966", o_que: "É criada a freguesia da Glória do Ribatejo.", fontes: ["rfe", "wppt"] },
  { quando: "1967", o_que: "Abre a Escola Industrial da RARET.", fontes: ["herdeiro"] },
  { quando: "1971", o_que: "18 emissores e 24 sistemas de antenas.", fontes: ["rfe"] },
  {
    quando: "1974",
    o_que: "Depois do 25 de Abril, a dedicatória de Salazar é apagada do padrão. A maternidade funciona até esse ano.",
    fontes: ["obs"],
  },
  { quando: "1976", o_que: "A Radio Free Europe junta-se à Radio Liberty.", fontes: ["wpen"] },
  { quando: "Maio de 1985", o_que: "Atentado contra a RARET, sem vítimas.", fontes: ["rfm"] },
  { quando: "1995", o_que: "Fecha o centro recetor da Maxoqueira.", fontes: ["pioneiro"] },
  { quando: "1996", o_que: "Encerramento oficial da RARET.", fontes: ["pioneiro", "obslusa"] },
  {
    quando: "2010",
    o_que: "Plano de pormenor da herdade, com o objetivo de reabilitar as antigas instalações.",
    fontes: ["cmsm"],
  },
  {
    quando: "2021",
    o_que: "Estreia a série «Glória», filmada em parte nas antigas casas da RARET.",
    fontes: ["obs"],
  },
];

function DadosEstruturados() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE}/raret#artigo`,
    headline: TITULO,
    description: DESCRICAO,
    inLanguage: "pt-PT",
    datePublished: "2026-11-22",
    author: { "@id": `${SITE}/#diogo-monteiro`, "@type": "Person", name: PESSOA.nome },
    publisher: { "@id": `${SITE}/#diogo-monteiro` },
    about: {
      "@type": "Place",
      name: "RARET, Sociedade Anónima de Rádio Retransmissão",
      address: { "@type": "PostalAddress", addressLocality: "Glória do Ribatejo", addressCountry: "PT" },
      geo: { "@type": "GeoCoordinates", latitude: 39.0392, longitude: -8.657 },
    },
    citation: FONTES.map((f) => f.url),
    image: FOTOS.map((f) => `${SITE}${f.src}`),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }}
    />
  );
}

export default function Raret() {
  return (
    <div className="r">
      <DadosEstruturados />
      <a className="saltar" href="#r-conteudo">
        Saltar para o conteúdo
      </a>

      <Topo />
      <header className="r-topo envolvente">
        <Link href="/#sobre" className="r-topo__voltar">
          Página inicial
        </Link>
        <p className="r-topo__coord">
          39,039° N, 8,657° O
          <Nota id="osm" />
        </p>
      </header>

      <main id="r-conteudo">
        {/* Abertura: o campo de antenas em 3D */}
        <section className="r-abertura" aria-labelledby="r-titulo">
          <CampoDeAntenas />
          <div className="r-abertura__texto envolvente">
            <p className="r-abertura__onde">Glória do Ribatejo, 1951–1996</p>
            <h1 id="r-titulo">RARET</h1>
            <p className="r-abertura__frase">
              Durante 45 anos, uma herdade plana do Ribatejo emitiu, em onda curta, para lá da Cortina de Ferro.
              <Nota id="obslusa" />
            </p>
            <p className="r-abertura__nota">
              Reconstituição feita a partir do relatório técnico de 1952: duas filas de torres com antenas de cortina, a
              734 metros entre as torres das pontas.
              <Nota id="myer52" /> A altura das torres e a distância entre filas são ilustrativas.
            </p>
          </div>
        </section>

        {/* O que era */}
        <section className="r-seccao envolvente r-intro" aria-labelledby="r-o-que-era">
          <h2 id="r-o-que-era">Uma empresa portuguesa para uma rádio americana</h2>
          <div className="r-intro__texto">
            <p className="r-intro__abertura">
              A RARET, Sociedade Anónima de Rádio Retransmissão, nasceu em 1951 de um acordo com o governo de Salazar.
              <Nota id="rfe" /> O capital e a administração eram 60% portugueses e 40% americanos, como a lei exigia.
              <Nota id="herdeiro" />
              <Nota id="myer52" />
            </p>
            <p>
              O trabalho dela era retransmitir a Radio Free Europe: programas feitos em Nova Iorque e em Munique
              <Nota id="obslusa" />, dirigidos à Checoslováquia, à Hungria e à Polónia e, mais tarde, também à Roménia e à
              Bulgária, cada um na sua língua.
              <Nota id="herdeiro" /> A Radio Free Europe era financiada pela CIA e pela campanha «Cruzada pela
              Liberdade».
              <Nota id="obslusa" />
            </p>
            <p>
              Com o tempo, a Glória tornou-se o maior centro emissor da Radio Free Europe.
              <Nota id="rfe" />
            </p>
          </div>
        </section>

        {/* Os números */}
        <section className="r-seccao envolvente" aria-labelledby="r-numeros">
          <h2 id="r-numeros" className="r-numeros__titulo">
            Em números
          </h2>
          <ul className="r-numeros">
            {NUMEROS.map((n, i) => (
              <li key={i}>
                <p className="r-numeros__grande">{n.grande}</p>
                <p className="r-numeros__texto">{n.texto}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Porquê aqui */}
        <section className="r-seccao envolvente r-porque" aria-labelledby="r-porque-aqui">
          <div className="r-porque__texto">
            <h2 id="r-porque-aqui">Porquê aqui</h2>
            <p>
              Portugal ficava no extremo ocidental da Europa: longe da Cortina de Ferro, das interferências e da
              sabotagem, e à distância certa para a onda curta saltar na ionosfera até ao destino.
              <Nota id="herdeiro" />
              <Nota id="rfe" />
            </p>
            <p>
              Na Glória, os engenheiros Manuel Bívar e Henrique Leotte encontraram a Herdade de Nossa Senhora da Glória: um
              terreno «isolado o suficiente, plano e sem obstáculos naturais».
              <Nota id="herdeiro" />
              <Nota id="rfe" />
            </p>
            <p>
              Salazar pôs uma condição: nenhum programa podia ser produzido em Portugal.
              <Nota id="rfe" /> Por isso, o sinal fazia este caminho:
            </p>
          </div>
          <ol className="r-caminho" aria-label="O caminho do sinal">
            {CAMINHO.map((c) => (
              <li key={c.onde}>
                <h3>{c.onde}</h3>
                <p>{c.o_que}</p>
              </li>
            ))}
          </ol>
          <p className="r-caminho__fonte">
            Fontes do caminho:
            <Nota id="rfe" />
            <Nota id="herdeiro" />
          </p>
        </section>

        {/* A aldeia */}
        <section className="r-aldeia" aria-labelledby="r-a-aldeia">
          <div className="envolvente r-aldeia__grelha">
            <div className="r-aldeia__texto">
              <h2 id="r-a-aldeia">A aldeia que a rádio construiu</h2>
              <p>
                À volta dos emissores, a RARET construiu uma comunidade inteira: moradias, um hotel, um restaurante, uma
                escola, um posto médico e uma piscina.
                <Nota id="rfe" /> Pagou a linha elétrica que trouxe a eletricidade à Glória, 8 000 contos, e 40% da
                estrada de acesso.
                <Nota id="herdeiro" />
              </p>
              <p>
                O posto médico, a maternidade, a ambulância e a Escola Industrial, aberta em 1967, estavam abertos de graça
                à população.
                <Nota id="rfe" />
                <Nota id="herdeiro" /> Quando a freguesia foi criada, em 1966, o primeiro presidente da junta, José
                Augusto Catarino, era trabalhador da RARET.
                <Nota id="rfe" />
              </p>
              <p>
                O hotel chamava-se «Jackson», por Charles Douglas Jackson, presidente da Radio Free Europe. Hoje, o espaço
                Jackson é sede de coletividades da vila.
                <Nota id="obs" />
                <Nota id="ual" />
              </p>
            </div>
            <div className="r-vozes">
              {VOZES.map((v) => (
                <figure key={v.quem} className="r-voz">
                  <blockquote>«{v.citacao}»</blockquote>
                  <figcaption>
                    {v.quem}
                    <Nota id={v.fonte} />
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Cronologia */}
        <section className="r-seccao r-cronologia" aria-labelledby="r-crono">
          <div className="envolvente">
            <h2 id="r-crono">Cronologia</h2>
            <div className="r-cronologia__barra">
              <p className="r-cronologia__dica">Desliza para o lado para percorrer os anos.</p>
              <Setas alvo="r-linha" />
            </div>
          </div>
          <ol id="r-linha" className="r-linha" tabIndex={0} aria-label="Cronologia da RARET, de 1950 a 2021">
            {CRONOLOGIA.map((c) => (
              <li key={c.quando}>
                <p className="r-linha__quando">{c.quando}</p>
                <p className="r-linha__o-que">
                  {c.o_que}
                  {c.fontes.map((f) => (
                    <Nota key={f} id={f} />
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Hoje */}
        <section className="r-seccao envolvente r-hoje" aria-labelledby="r-e-hoje">
          <h2 id="r-e-hoje">E hoje?</h2>
          <div className="r-hoje__grelha">
            <div>
              <p>
                O encerramento oficial foi em 1996
                <Nota id="pioneiro" />, e dois anos depois as instalações estavam completamente abandonadas.
                <Nota id="rfm" /> Em 2021, a herdade servia para treinos da GNR, e o terreno é privado.
                <Nota id="obs" />
              </p>
              <p>
                O plano de pormenor da câmara tem como objetivo «promover a reabilitação e reutilização das antigas
                instalações da RARET».
                <Nota id="cmsm" />
              </p>
              <p>
                Na vila há uma rotunda com antenas, uma exposição comemorativa ao ar livre e um mural no antigo Hotel
                Jackson.
                <Nota id="obs" /> Continuam lá: confirmei-o em novembro de 2026.
              </p>
            </div>
            <figure className="r-voz r-voz--grande">
              <blockquote>«Ali está uma cidade a que me dói chamar fantasma.»</blockquote>
              <figcaption>
                Vasco Hogan Teves, operador da RARET em 1953
                <Nota id="pioneiro" />
              </figcaption>
            </figure>
          </div>
        </section>

        {/* As fotografias da RARET */}
        <section className="r-seccao envolvente r-galeria" aria-labelledby="r-fotografias">
          <div className="r-galeria__cabeca">
            <h2 id="r-fotografias">As fotografias da RARET</h2>
            <p>Imagens do arquivo da Radio Free Europe: a estação, as antenas e a campanha que a pagava.</p>
          </div>
          <div className="r-fotos">
            {FOTOS_RARET.map((f) => (
              <figure key={f.src} className="r-foto">
                <div className="r-foto__moldura">
                  <Image src={f.src} alt={f.alt} width={f.largura} height={f.altura} sizes="(min-width: 1000px) 400px, 100vw" />
                </div>
                <figcaption>
                  {f.legenda}
                  {f.legenda.includes("Cruzada") && <Nota id="obslusa" />}
                  <span className="r-foto__credito">© RFE/RL, Inc. Arquivo da RFE/RL.</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <h3 className="r-galeria__mais">Mais fotografias noutros sítios</h3>
          <ul className="r-galeria__lista">
            {FOTOS_NOUTROS_SITIOS.map((f) => (
              <li key={f.url + f.titulo}>
                <a className="r-cartao" href={f.url} target="_blank" rel="noopener">
                  <span className="r-cartao__titulo">{f.titulo}</span>
                  <span className="r-cartao__detalhe">{f.detalhe}</span>
                  <span className="r-cartao__credito">{f.credito}</span>
                  <span className="r-cartao__ver">
                    Ver em {f.onde}
                    <span className="visualmente-escondido"> (abre noutro separador)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* A Glória do Ribatejo */}
        <section className="r-gloria" aria-labelledby="r-a-gloria">
          <div className="envolvente">
            <h2 id="r-a-gloria">A Glória do Ribatejo</h2>
            <dl className="r-gloria__dados">
              <div>
                <dt>Onde</dt>
                <dd>
                  Concelho de Salvaterra de Magos, distrito de Santarém.
                  <Nota id="wppt" />
                </dd>
              </div>
              <div>
                <dt>Área</dt>
                <dd>
                  55,03 km².
                  <Nota id="wppt" />
                </dd>
              </div>
              <div>
                <dt>Gente</dt>
                <dd>
                  3 728 habitantes nos Censos 2021, contados com o Granho, porque as duas freguesias estavam juntas.
                  <Nota id="ine" /> A Glória voltou a ser freguesia sozinha em 2025.
                  <Nota id="wppt" />
                </dd>
              </div>
              <div>
                <dt>Nome</dt>
                <dd>
                  Chamava-se só «Glória» até 1968. É vila desde 1993.
                  <Nota id="wppt" />
                </dd>
              </div>
            </dl>
            <div className="r-gloria__fotos">
              {FOTOS.map((f) => (
                <figure key={f.src}>
                  <Image
                    src={f.src}
                    alt={f.alt}
                    width={f.largura}
                    height={f.altura}
                    sizes="(min-width: 900px) 600px, 100vw"
                  />
                  <figcaption>
                    {f.legenda} Foto: {f.autor},{" "}
                    <a href={f.licencaUrl} target="_blank" rel="noopener license">
                      {f.licenca}
                    </a>
                    , via{" "}
                    <a href={f.origem} target="_blank" rel="noopener">
                      Wikimedia Commons
                    </a>
                    .
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="r-gloria__nota">
              As fotografias da estação estão mais acima, em «As fotografias da RARET».
            </p>
          </div>
        </section>

        {/* Fontes */}
        <section className="r-seccao envolvente r-fontes" aria-labelledby="r-as-fontes">
          <h2 id="r-as-fontes">Fontes</h2>
          <p className="r-fontes__nota">Todas lidas a 22 de novembro de 2026. Os números no texto ligam aqui.</p>
          <ol className="r-fontes__lista">
            {FONTES.map((f, i) => (
              <li key={f.id} id={`fonte-${i + 1}`}>
                <a href={f.url} target="_blank" rel="noopener">
                  {f.titulo}
                </a>
                <span>
                  {" "}
                  {f.quem}, {f.data}.
                </span>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="r-rodape">
        <div className="envolvente r-rodape__grelha">
          <p>
            Esta página faz parte do site de <Link href="/">Diogo Monteiro</Link>, da Glória do Ribatejo. Uma aldeia
            pequena ligada ao mundo, como pode ser um pequeno negócio com a IA.
          </p>
          <Link href="/#sobre" className="r-rodape__voltar">
            Voltar à página inicial
          </Link>
        </div>
      </footer>
      <Rodape />
    </div>
  );
}
