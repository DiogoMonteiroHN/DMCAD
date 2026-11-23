// Os factos do site num só sítio: a página, os dados estruturados (Google e
// motores de IA) e o /llms.txt leem daqui, para nunca dizerem coisas diferentes.
// Fonte: o que o Diogo disse a 23/11/2026 (a DMCAD acabou; o Diogo faz parte da HN Hit Nails).

export const SITE = "https://dmcad.pt";
export const INSTAGRAM = "https://www.instagram.com/diogomm1992/";
export const INSTAGRAM_NOME = "@diogomm1992";

// WhatsApp: o número dado pelo Diogo a 23/11/2026.
export const WHATSAPP_NUMERO = "351927243450";
export const WHATSAPP_VISIVEL = "+351 927 243 450";
export function whatsapp(mensagem: string) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

export const PESSOA = {
  nome: "Diogo Monteiro",
  papel: "Colaborador da HN Hit Nails",
  terra: "Glória do Ribatejo",
};

export const DESCRICAO =
  "Diogo Monteiro, colaborador da HN Hit Nails. Ajudo salões, estúdios, clínicas e pequenos negócios a usar bem a inteligência artificial: redes sociais, fotos, site e o dia a dia do negócio.";

// O Belessa com o código de revendedor do Diogo (dado a 23/11/2026). O formato do
// link é o da área do revendedor do Belessa: /aderir?convite=CÓDIGO.
export const BELESSA_CODIGO = "ZHRPW6TUDM";
export const BELESSA_ADERIR = `https://www.belessa.pt/aderir?convite=${BELESSA_CODIGO}`;

// O ecossistema HN: os endereços e a ordem são os da faixa do ecossistema da
// Academy (EcosystemStrip.tsx). Só tem descrição o que tem fonte; o resto fica
// com o nome, até o Diogo dar a frase.
export const ECOSSISTEMA: { nome: string; href: string; texto?: string }[] = [
  {
    nome: "Loja HN Hit Nails",
    href: "https://www.hnhitnails.com",
    texto: "Produtos profissionais para unhas e estética.",
  },
  {
    nome: "Hit Nails Academy",
    href: "https://academy.hnhitnails.com",
    texto: "Formações em nail art e estética.",
  },
  {
    nome: "Belessa",
    href: "https://www.belessa.pt",
    texto: "O programa de gestão para salões, estúdios e clínicas.",
  },
  { nome: "Pink Experience", href: "https://pink-experience.com" },
  { nome: "Elite Mind Business", href: "https://elitemindbusiness.com" },
  { nome: "BBP", href: "https://www.bbpower.pt" },
  { nome: "Círculo de Elite", href: "https://circulodeelite.com" },
];

export type Assunto = "Mentoria" | "Um site" | "Conteúdo com IA" | "O Belessa" | "Outra coisa";
export const ASSUNTOS: Assunto[] = ["Mentoria", "Um site", "Conteúdo com IA", "O Belessa", "Outra coisa"];

export const SERVICOS: {
  id: string;
  titulo: string;
  texto: string;
  assunto: Assunto;
  botao: string;
  externo?: { href: string; texto: string };
}[] = [
  {
    id: "mentoria",
    titulo: "Mentoria",
    texto:
      "Trazes um problema do teu negócio e resolvemos juntos, caso a caso, com as ferramentas que fazem sentido para ti. Sem quinze aplicações: a que serve.",
    assunto: "Mentoria",
    botao: "Pedir mentoria",
  },
  {
    id: "sites",
    titulo: "Criação de sites",
    texto:
      "Um site que diz o que fazes, onde estás e como se marca, e que se encontra no Google. Feito contigo, com a cara do teu negócio.",
    assunto: "Um site",
    botao: "Pedir um site",
  },
  {
    id: "conteudo",
    titulo: "Conteúdo com IA",
    texto:
      "Se não tens tempo para aprender, faço contigo: publicações, legendas, fotos de produtos e material publicitário, sem cara de máquina.",
    assunto: "Conteúdo com IA",
    botao: "Pedir ajuda com conteúdo",
  },
  {
    id: "belessa",
    titulo: "O Belessa",
    texto:
      "Agenda, marcações online, faturação e site num só programa, para salões, estúdios e clínicas. Experimenta, ou pede-me para to mostrar primeiro.",
    assunto: "O Belessa",
    botao: "Pedir uma demonstração",
    externo: { href: BELESSA_ADERIR, texto: "Aderir ao Belessa" },
  },
];

// O curso gratuito (definido a 23/11/2026). As aulas, por inteiro, estão em
// cursos/aulas.ts: é a única lista (a página inicial, o sitemap e o llms.txt leem de lá).
export const CURSO = {
  titulo: "Inteligência Artificial dentro da Beleza",
  resumo:
    "Oito aulas curtas e gratuitas para quem já usa a IA às vezes e quer usá-la bem no salão, no estúdio ou na clínica.",
};

export const MODELO_4_PARTES = `QUEM SOU: Tenho um [tipo de negócio] em [terra]. Os meus clientes são [quem são]. O que nos distingue: [uma coisa verdadeira].
O QUE QUERO: [um post / uma resposta a um cliente / …] sobre [assunto].
COMO QUERO: [curto / médio], a tratar por tu, [com uma pergunta no fim]. Não inventes preços, promoções nem promessas.
EXEMPLO DO MEU ESTILO: [cola aqui um texto teu]`;

export const PERGUNTAS = [
  {
    pergunta: "Quem é o Diogo Monteiro?",
    resposta:
      "Sou colaborador da HN Hit Nails, da Glória do Ribatejo. Trabalho com tecnologia e inteligência artificial e ajudo salões, estúdios, clínicas e pequenos negócios a usá-las bem.",
  },
  {
    pergunta: "O curso é mesmo gratuito?",
    resposta:
      "Sim. São oito aulas curtas que saem no meu Instagram. Não pedem registo nem pagamento.",
  },
  {
    pergunta: "Preciso de perceber de tecnologia?",
    resposta:
      "Não. Cada ferramenta é explicada um passo de cada vez, em português de Portugal, a pensar em quem tem pouco tempo entre clientes.",
  },
  {
    pergunta: "Quanto custa uma mentoria ou um site?",
    resposta:
      "Depende do que precisas. Conta-me o teu caso pelo formulário ou pelo WhatsApp e respondo com uma proposta.",
  },
  {
    pergunta: "E as clínicas?",
    resposta:
      "Também. Numa clínica de saúde, a publicidade tem regras próprias: nada de promessas de resultados. É uma das coisas que vemos juntos.",
  },
  {
    pergunta: "Como entro em contacto?",
    resposta: `Pelo formulário desta página, pelo WhatsApp (${WHATSAPP_VISIVEL}) ou por mensagem no Instagram (${INSTAGRAM_NOME}).`,
  },
];
