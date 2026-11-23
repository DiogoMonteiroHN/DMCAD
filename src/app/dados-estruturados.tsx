import { CURSO, DESCRICAO, ECOSSISTEMA, INSTAGRAM, PERGUNTAS, PESSOA, SERVICOS, SITE } from "./marca";

// Dados estruturados (schema.org, JSON-LD): dizem ao Google e aos motores de IA,
// sem adivinhar, quem é o Diogo Monteiro, a que casa pertence, o que oferece e as
// respostas às perguntas frequentes. Tudo sai de marca.ts, o mesmo que a página mostra.
export function DadosEstruturados() {
  const pessoa = `${SITE}/#diogo-monteiro`;
  const hn = `${SITE}/#hn-hit-nails`;

  const grafo = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": pessoa,
        name: PESSOA.nome,
        url: SITE,
        description: DESCRICAO,
        homeLocation: { "@type": "Place", name: PESSOA.terra, address: { "@type": "PostalAddress", addressCountry: "PT" } },
        worksFor: { "@id": hn },
        sameAs: [INSTAGRAM],
        knowsAbout: ["Inteligência artificial", "Redes sociais", "Criação de sites", "Negócios de beleza"],
        makesOffer: SERVICOS.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.titulo, description: s.texto },
        })),
      },
      {
        "@type": "Organization",
        "@id": hn,
        name: "HN Hit Nails",
        url: ECOSSISTEMA[0].href,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#site`,
        url: SITE,
        name: PESSOA.nome,
        inLanguage: "pt-PT",
        publisher: { "@id": pessoa },
      },
      {
        "@type": "Course",
        "@id": `${SITE}/cursos#curso`,
        name: CURSO.titulo,
        description: CURSO.resumo,
        url: `${SITE}/cursos`,
        inLanguage: "pt-PT",
        isAccessibleForFree: true,
        provider: { "@id": pessoa },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE}/#perguntas`,
        mainEntity: PERGUNTAS.map((p) => ({
          "@type": "Question",
          name: p.pergunta,
          acceptedAnswer: { "@type": "Answer", text: p.resposta },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(grafo).replace(/</g, "\\u003c") }}
    />
  );
}
