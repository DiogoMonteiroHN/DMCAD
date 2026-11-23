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

// O curso gratuito (definido a 23/11/2026; o material está no repositório do Belessa,
// docs/memoria/curso-ia-beleza/). As aulas saem no Instagram do Diogo.
export const CURSO = {
  titulo: "Inteligência Artificial dentro da Beleza",
  resumo:
    "Oito aulas curtas e gratuitas para quem já usa a IA às vezes e quer usá-la bem no salão, no estúdio ou na clínica.",
  aulas: [
    {
      n: 1,
      titulo: "Pedir bem à IA",
      sabes: "Pedir em 4 partes, corrigir sem recomeçar e guardar o «quem sou».",
      passos: [
        "Quem sou: o negócio, a terra, os clientes e o que te distingue.",
        "O que quero: a coisa concreta, não «um post».",
        "Como quero: tamanho, tom e «não inventes preços nem promoções».",
        "Um exemplo: cola um texto teu e escreve «no mesmo estilo».",
        "Não gostaste? Responde «mais curto» em vez de recomeçar.",
      ],
    },
    {
      n: 2,
      titulo: "Um mês de posts numa tarde",
      sabes: "Fazer o calendário de 12 posts e transformar uma linha num post pronto.",
      passos: [
        "Quatro tipos de post: mostrar o trabalho, ensinar, bastidores e novidade.",
        "Pede uma tabela: dia, tipo, ideia numa frase e a foto que precisas.",
        "Tira o que não é verdade no teu negócio.",
        "Escolhe uma linha e pede o post completo.",
        "Tira as fotos todas na mesma tarde.",
      ],
    },
    {
      n: 3,
      titulo: "Legendas que trazem gente",
      sabes: "Escrever a 1.ª linha que se pesquisa, as hashtags e o convite certo.",
      passos: [
        "A 1.ª linha diz o serviço e a terra.",
        "O meio ajuda: um cuidado, uma escolha, uma dúvida.",
        "O fim pede para guardar ou enviar. Nunca «comenta SIM».",
        "Até 5 hashtags, todas do assunto.",
        "Escreve o texto alternativo da foto.",
      ],
    },
    {
      n: 4,
      titulo: "Fotos com o telemóvel e IA",
      sabes: "Tirar e tratar uma foto sem mudar o resultado.",
      passos: [
        "Luz de janela, sem flash.",
        "Fundo liso e lente limpa, à altura do produto.",
        "Tira 3 a 5 fotos e escolhe uma.",
        "Trata: corta, endireita, um pouco de luz.",
        "Nunca mudes a cor, a forma ou tapes um defeito.",
      ],
    },
    {
      n: 5,
      titulo: "Fotos de clientes",
      sabes: "Pedir autorização e saber o que nunca vai para uma app de IA.",
      passos: [
        "Autorização por escrito antes de publicar.",
        "Diz que foto, onde, até quando e que se pode retirar.",
        "Nunca numa app de IA: caras, nomes, telefones, conversas, fichas.",
        "Para pedir um texto, escreve «um cliente» em vez do nome.",
        "Sem autorização, mostra o trabalho sem a pessoa.",
      ],
    },
    {
      n: 6,
      titulo: "Um Reel de 30 segundos",
      sabes: "Pedir o guião à IA, gravar e legendar.",
      passos: [
        "Pede o guião: gancho, 3 passos e um convite, com os segundos.",
        "O primeiro segundo é a imagem mais forte.",
        "Planos de 2 a 4 segundos, com o telemóvel de pé.",
        "Legendas automáticas, longe do fundo do ecrã.",
        "Acaba com a mesma imagem do princípio.",
      ],
    },
    {
      n: 7,
      titulo: "Ser encontrado",
      sabes: "Melhorar a bio, o perfil no Google e as respostas a avaliações.",
      passos: [
        "A bio diz o que fazes, onde e como se marca.",
        "O nome do perfil pode levar o serviço.",
        "Completa o perfil da empresa no Google.",
        "Responde a todas as avaliações.",
        "Na IA, cola só o texto da avaliação, sem o nome.",
      ],
    },
    {
      n: 8,
      titulo: "Um site feito com IA",
      sabes: "Criar o site com a IA do Belessa e rever os textos antes de aplicar.",
      passos: [
        "Um site diz o que fazes, onde, quanto custa e deixa marcar.",
        "No Belessa: Website → Aspeto e marca → Criar o site com a IA.",
        "Escolhe uma das 3 propostas e revê os textos.",
        "O site antigo fica em «Versões do site».",
        "Descreve os teus serviços primeiro: a IA escreve com o que sabe.",
      ],
    },
  ],
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
