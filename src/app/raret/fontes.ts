// As fontes da página da RARET, por ordem de número. Lidas todas a 22/11/2026.
// Cada facto da página leva <Nota id="…"/> a apontar para uma destas.
// Ficha completa, com as citações exatas: docs/raret-ficha.md.

export const FONTES = [
  {
    id: "rfe",
    titulo: "«Glória: RFE's Portuguese Launchpad Over The Iron Curtain»",
    quem: "RFE/RL",
    data: "16/09/2021",
    url: "https://about.rferl.org/article/gloria-rfes-portuguese-launchpad-over-the-iron-curtain/",
  },
  {
    id: "myer52",
    titulo: "«Survey Report of Sociedade Anonima de Radio Retransmissao (RARET), Lisbon, Portugal»",
    quem: "Dwight A. Myer, Westinghouse Radio Stations (relatório técnico)",
    data: "março de 1952",
    url: "https://www.worldradiohistory.com/Archive-Modern-Era-Miscellaneous/RFE-RARET-Lisbon-1952.pdf",
  },
  {
    id: "herdeiro",
    titulo: "«A Guerra-Fria combatida a partir da charneca ribatejana: O Caso da RARET 1951-1963»",
    quem: "Vitor Madail Herdeiro, dissertação de mestrado, ISCTE",
    data: "setembro de 2019",
    url: "https://repositorio.iscte-iul.pt/bitstream/10071/19138/1/master_vitor_madail_herdeiro.pdf",
  },
  {
    id: "obs",
    titulo: "«“O mau foi a Guerra Fria ter acabado”. A história, as ruínas e os sobreviventes…»",
    quem: "Observador, José Paiva Capucho",
    data: "31/10/2021",
    url: "https://observador.pt/especiais/o-mau-foi-a-guerra-fria-ter-acabado-a-historia-as-ruinas-e-os-sobreviventes-de-uma-gloria-transformada-em-serie-portuguesa-da-netflix/",
  },
  {
    id: "obslusa",
    titulo: "«Livro que inspirou série “Glória” é apresentado esta quinta-feira em Lisboa»",
    quem: "Observador / Lusa",
    data: "10/02/2022",
    url: "https://observador.pt/2022/02/10/livro-que-inspirou-serie-gloria-e-apresentado-esta-quinta-feira-em-lisboa/",
  },
  {
    id: "dn",
    titulo: "«RARET - Quando Glória do Ribatejo era central no eixo EUA-Portugal»",
    quem: "Diário de Notícias",
    data: "12/02/2022",
    url: "https://www.dn.pt/sociedade/raret---quando-gloria-do-ribatejo-era-central-no-eixo-eua-portugal-14581383.html",
  },
  {
    id: "ual",
    titulo: "«RARET: A Guerra Fria em pleno Ribatejo»",
    quem: "UALMedia",
    data: "24/01/2023",
    url: "https://ualmedia.pt/raret-a-guerra-fria-em-pleno-ribatejo",
  },
  {
    id: "rfm",
    titulo: "«Raret, a rádio que poucos portugueses conheciam»",
    quem: "RFM",
    data: "03/11/2021",
    url: "https://rfm.pt/content/11677/raret-a-radio-que-poucos-portugueses-conheciam",
  },
  {
    id: "pioneiro",
    titulo: "«A ‘RARET’ no meu tempo», Vasco Hogan Teves, «Pioneiro» n.º 71",
    quem: "Associação dos Reformados e Pensionistas da RTP",
    data: "dezembro de 2023",
    url: "https://cdn-images.rtp.pt/mcm/pdf/dde/dde912acfa3096f332fcf1e971cdaa6b2.pdf",
  },
  {
    id: "cmsm",
    titulo: "Alteração do Plano de Pormenor da Herdade de Nossa Senhora da Glória (relatório)",
    quem: "Câmara Municipal de Salvaterra de Magos, no portal da DGT",
    data: "janeiro de 2022",
    url: "https://pcgt.dgterritorio.gov.pt/sites/default/files/141507_relatorio_pphnsg_art76_rjigt_v1.pdf",
  },
  {
    id: "ine",
    titulo: "População residente, Censos 2021 (indicador 0011609)",
    quem: "INE",
    data: "atualizado a 23/11/2022",
    url: "https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd=0011609&Dim1=S7A2021&Dim2=141507&lang=PT",
  },
  {
    id: "wppt",
    titulo: "«Glória do Ribatejo»",
    quem: "Wikipédia em português",
    data: "lida a 22/11/2026",
    url: "https://pt.wikipedia.org/wiki/Gl%C3%B3ria_do_Ribatejo",
  },
  {
    id: "wpen",
    titulo: "«Radio Free Europe/Radio Liberty»",
    quem: "Wikipédia em inglês",
    data: "lida a 22/11/2026",
    url: "https://en.wikipedia.org/wiki/Radio_Free_Europe/Radio_Liberty",
  },
  {
    id: "osm",
    titulo: "Área «Rádio Retransmissão (RARET)»",
    quem: "OpenStreetMap",
    data: "lida a 22/11/2026",
    url: "https://www.openstreetmap.org/way/1005917495",
  },
] as const;

export type IdDeFonte = (typeof FONTES)[number]["id"];

export const numeroDaFonte = (id: IdDeFonte) => FONTES.findIndex((f) => f.id === id) + 1;

export const FOTOS = [
  {
    src: "/raret/gloria-coreto-igreja.webp",
    largura: 1280,
    altura: 959,
    alt: "O coreto, pintado de azul e amarelo, e a torre branca da igreja da Glória do Ribatejo, sob um céu azul.",
    legenda: "O coreto e a igreja de Nossa Senhora da Glória, em 2006.",
    autor: "Vitor Oliveira",
    licenca: "CC BY-SA 2.0",
    licencaUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    origem: "https://commons.wikimedia.org/wiki/File:Gl%C3%B3ria_do_Ribatejo_-_Portugal_(2476144606).jpg",
  },
  {
    src: "/raret/gloria-igreja-largo.webp",
    largura: 1280,
    altura: 960,
    alt: "A igreja de Nossa Senhora da Glória, branca com barras azuis e torre do relógio, e o largo calcetado à frente.",
    legenda: "A igreja e o largo, em 2006.",
    autor: "Vitor Oliveira",
    licenca: "CC BY-SA 2.0",
    licencaUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    origem: "https://commons.wikimedia.org/wiki/File:Gl%C3%B3ria_do_Ribatejo_-_Portugal_(385590816).jpg",
  },
];
