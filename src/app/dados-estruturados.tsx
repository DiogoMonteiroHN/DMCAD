import {
  ASSINATURA,
  DESCRICAO,
  EMAIL,
  INSTAGRAM,
  MORADA,
  NOME,
  OFERTA,
  PERGUNTAS,
  PESSOA,
  SITE,
  TRANSCRICAO,
  VIDEO,
} from "./marca";

// Dados estruturados (schema.org, JSON-LD): dizem ao Google e aos motores de IA,
// sem adivinhar, quem é a DMCAD, quem está por trás, o que oferece e as respostas
// às perguntas frequentes. Tudo sai de marca.ts, o mesmo que a página mostra.
export function DadosEstruturados() {
  const org = `${SITE}/#dmcad`;
  const pessoa = `${SITE}/#diogo-monteiro`;

  const grafo = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: NOME,
        url: SITE,
        logo: `${SITE}/dmcad-logo.png`,
        image: `${SITE}/opengraph-image.png`,
        description: DESCRICAO,
        slogan: ASSINATURA,
        email: EMAIL,
        address: {
          "@type": "PostalAddress",
          streetAddress: MORADA.rua,
          postalCode: MORADA.codigoPostal,
          addressLocality: MORADA.localidade,
          addressCountry: MORADA.pais,
        },
        areaServed: { "@type": "Country", name: "Portugal" },
        founder: { "@id": pessoa },
        sameAs: [INSTAGRAM],
        knowsAbout: [
          "Inteligência artificial",
          "Marketing para salões de beleza",
          "Conteúdo para centros de estética",
          "Conteúdo para cabeleireiros",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Formas de trabalhar com a DMCAD",
          itemListElement: OFERTA.map((o) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: o.titulo,
              description: o.texto,
              provider: { "@id": org },
              areaServed: { "@type": "Country", name: "Portugal" },
              audience: {
                "@type": "BusinessAudience",
                audienceType: "Salões de beleza, centros de estética e cabeleireiros",
              },
            },
          })),
        },
      },
      {
        "@type": "Person",
        "@id": pessoa,
        name: PESSOA.nome,
        alternateName: PESSOA.nomeCurto,
        jobTitle: PESSOA.funcao,
        homeLocation: { "@type": "Place", name: `${MORADA.localidade}, Portugal` },
        sameAs: [INSTAGRAM],
      },
      {
        "@type": "VideoObject",
        "@id": `${SITE}/#apresentacao`,
        name: VIDEO.titulo,
        description: VIDEO.descricao,
        thumbnailUrl: `${SITE}${VIDEO.poster}`,
        contentUrl: `${SITE}${VIDEO.ficheiro}`,
        uploadDate: VIDEO.data,
        duration: VIDEO.duracaoIso,
        inLanguage: "pt-PT",
        transcript: TRANSCRICAO.join(" "),
        creator: { "@id": pessoa },
        publisher: { "@id": org },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#site`,
        url: SITE,
        name: NOME,
        inLanguage: "pt-PT",
        publisher: { "@id": org },
      },
      {
        "@type": ["WebPage", "FAQPage"],
        "@id": `${SITE}/#pagina`,
        url: SITE,
        name: "DMCAD · IA prática para salões de beleza em Portugal",
        description: DESCRICAO,
        inLanguage: "pt-PT",
        isPartOf: { "@id": `${SITE}/#site` },
        about: { "@id": org },
        primaryImageOfPage: `${SITE}/opengraph-image.png`,
        mainEntity: PERGUNTAS.map((p) => ({
          "@type": "Question",
          name: p.pergunta,
          acceptedAnswer: { "@type": "Answer", text: p.resposta },
        })),
      },
    ],
  };

  // «<» escapado: o JSON vai dentro de uma etiqueta <script>
  const json = JSON.stringify(grafo).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
