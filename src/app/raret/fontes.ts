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

// Fotografias da RARET que existem mas têm direitos reservados: mostram-se como
// ligações, não se copiam. Licença: autorização escrita da RFE/RL (permissions@rferl.org),
// segundo about.rferl.org/use-our-content, lido a 23/11/2026.
export const FOTOS_NOUTROS_SITIOS = [
  {
    titulo: "Fotografias de arquivo da RFE/RL",
    detalhe: "As imagens do artigo da própria RFE/RL sobre a Glória, de 2021.",
    credito: "© RFE/RL, Inc.",
    onde: "about.rferl.org",
    url: "https://about.rferl.org/article/gloria-rfes-portuguese-launchpad-over-the-iron-curtain/",
  },
  {
    titulo: "As ruínas e as moradias, em 2021",
    detalhe: "A herdade abandonada, as antigas casas e o obelisco, na reportagem do Observador.",
    credito: "Fotografias de Tomás Silva / Observador e Paulo Goulart Photography",
    onde: "observador.pt",
    url: "https://observador.pt/especiais/o-mau-foi-a-guerra-fria-ter-acabado-a-historia-as-ruinas-e-os-sobreviventes-de-uma-gloria-transformada-em-serie-portuguesa-da-netflix/",
  },
];

// Fotografias da RARET dadas pelo Diogo a 23/11/2026, do arquivo da RFE/RL.
// Publicadas por decisão dele; crédito à RFE/RL em cada uma.
export const FOTOS_RARET = [
  {
    src: "/raret/raret-antenas-chao.webp",
    largura: 617,
    altura: 332,
    alt: "Fotografia a preto e branco, tirada rente ao chão: uma estrada em primeiro plano e, ao fundo, as torres altas das antenas e postes de linhas.",
    legenda: "O campo de antenas, visto ao nível do chão.",
  },
  {
    src: "/raret/raret-antenas-sino.webp",
    largura: 381,
    altura: 500,
    alt: "Página a preto e branco com as torres altas e as cortinas de fios das antenas e, em baixo à direita, um sino.",
    legenda: "As torres e as cortinas de antenas, com o sino que surge também no envelope da «Cruzada pela Liberdade».",
  },
  {
    src: "/raret/raret-vista-aerea.webp",
    largura: 309,
    altura: 254,
    alt: "Fotografia aérea a preto e branco do centro emissor: edifícios brancos entre árvores, caminhos e linhas de antenas ao fundo.",
    legenda: "O centro emissor da Glória visto do ar.",
  },
  {
    src: "/raret/raret-sala-emissores.webp",
    largura: 307,
    altura: 249,
    alt: "Fotografia a preto e branco de uma sala alta e comprida, com os armários dos emissores alinhados dos dois lados e um balcão de controlo ao fundo.",
    legenda: "A sala dos emissores.",
  },
  {
    src: "/raret/raret-envelope-cruzada.webp",
    largura: 547,
    altura: 162,
    alt: "Envelope antigo, manchado, com uma etiqueta azul: um sino e as palavras «Crusade for Freedom, in support of Radio Free Europe».",
    legenda: "Envelope da «Cruzada pela Liberdade», a campanha que angariava fundos para a Radio Free Europe.",
  },
];
