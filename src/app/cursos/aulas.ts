// As 8 aulas do curso «Inteligência Artificial dentro da Beleza», por inteiro.
// Fonte: o material do curso (repositório do Belessa, docs/memoria/curso-ia-beleza/,
// 23/11/2026). Os salões dos exemplos são imaginados; as respostas são exemplos
// escritos para o curso, não vêm de nenhum cliente.

export type Passo = { forte?: string; texto: string };
export type Fala = { quem: "tu" | "ia"; texto: string };
export type Aula = {
  n: number;
  slug: string;
  titulo: string;
  resumo: string;
  sabes: string;
  passos: Passo[];
  conversa?: { titulo: string; falas: Fala[]; nota?: string }[];
  quadro?: { titulo: string; texto: string; nota?: string };
  imagem?: { src: string; alt: string; largura: number; altura: number; legenda: string; href?: string };
  regra?: string;
  convite: "academy" | "loja";
  video?: string; // ficheiro do vídeo da aula, quando houver (por exemplo /cursos/aula-1.mp4)
};

const LADY = {
  src: "/cursos/hn-lady-in-red.webp",
  alt: "Três frascos de verniz gel vermelho da coleção Lady in Red, numa caixa vermelha aberta.",
  largura: 800,
  altura: 800,
  legenda: "Coleção Verniz Gel Lady in Red, 3 cores, da HN Hit Nails (foto da loja).",
  href: "https://www.hnhitnails.com/produto/colecao-verniz-gel-lady-in-red-3-cores",
};
const EXPRESS = {
  src: "/cursos/hn-express-base-milky-white.webp",
  alt: "Frasco da Express Base Milky White, base de verniz gel da HN Hit Nails.",
  largura: 800,
  altura: 800,
  legenda: "Express Base Milky White 10 ml, da HN Hit Nails (foto da loja).",
  href: "https://www.hnhitnails.com/produto/express-base-milky-white-base-verniz-gel-autonivelante",
};

export const AULAS: Aula[] = [
  {
    n: 1,
    slug: "aula-1-pedir-bem-a-ia",
    titulo: "Pedir bem à IA",
    resumo: "Porque é que a IA te dá textos genéricos, e o modelo das 4 partes que resolve isso.",
    sabes: "Pedir em 4 partes, corrigir a resposta sem recomeçar e guardar o «quem sou» para não o escrever sempre.",
    passos: [
      { texto: "Abre o ChatGPT. A versão gratuita serve." },
      { forte: "Quem sou:", texto: "o negócio, a terra, quem são os clientes e o que te distingue (uma coisa verdadeira)." },
      { forte: "O que quero:", texto: "a coisa concreta, por exemplo «um post para o Instagram a avisar que há horários ao sábado de manhã», e não «um post»." },
      { forte: "Como quero:", texto: "o tamanho, o tom («a tratar por tu»), o que pões no fim, e «não inventes preços, promoções nem promessas»." },
      { forte: "Um exemplo:", texto: "cola um texto teu de que gostes e escreve «no mesmo estilo»." },
      { forte: "Não gostaste?", texto: "Não recomeces: responde «mais curto», «tira a palavra mimar» ou «menos emojis»." },
      { forte: "Lê tudo antes de usar.", texto: "Se aparecer um preço, uma promoção ou uma promessa que não é tua, apaga." },
      { forte: "Guarda o «quem sou»", texto: "nas instruções personalizadas do ChatGPT, nas definições. A partir daí, ele já sabe quem és em todas as conversas." },
    ],
    conversa: [
      {
        titulo: "Sem as 4 partes",
        falas: [
          { quem: "tu", texto: "Escreve um post sobre unhas de gel." },
          { quem: "ia", texto: "✨ Unhas de gel: beleza e durabilidade! Descobre o brilho que dura semanas. Marca já a tua sessão e mima-te! 💅 #unhas #gel #beleza" },
        ],
        nota: "Certo, mas podia ser de qualquer salão do país.",
      },
      {
        titulo: "Com as 4 partes",
        falas: [
          { quem: "tu", texto: "Quem sou: tenho um salão de unhas em Glória do Ribatejo; os meus clientes têm entre 25 e 50 anos e muitos trabalham por turnos.\nO que quero: um post para o Instagram a avisar que agora há horários ao sábado de manhã.\nComo quero: curto, a tratar por tu, com uma pergunta no fim. Não inventes preços nem promoções." },
          { quem: "ia", texto: "Trabalhas por turnos e o sábado de manhã é o teu tempo livre? Agora há horários ao sábado de manhã no salão, em Glória do Ribatejo. Diz-nos: preferes logo às 9h ou mais perto do almoço?" },
          { quem: "tu", texto: "Mais curto." },
          { quem: "ia", texto: "Agora há horários ao sábado de manhã. Trabalhas por turnos? Esta é para ti. Preferes 9h ou 11h?" },
        ],
      },
    ],
    quadro: {
      titulo: "O modelo para copiar",
      texto: "QUEM SOU: Tenho um [tipo de negócio] em [terra]. Os meus clientes são [quem são]. O que nos distingue: [uma coisa verdadeira].\nO QUE QUERO: [um post / uma resposta a um cliente / …] sobre [assunto].\nCOMO QUERO: [curto / médio], a tratar por tu, [com uma pergunta no fim]. Não inventes preços, promoções nem promessas.\nEXEMPLO DO MEU ESTILO: [cola aqui um texto teu]",
    },
    convite: "academy",
  },
  {
    n: 2,
    slug: "aula-2-um-mes-de-posts-numa-tarde",
    titulo: "Um mês de posts numa tarde",
    resumo: "Decidir o mês de uma vez: 12 posts em 4 tipos, com a foto que cada um precisa.",
    sabes: "Pedir à IA o calendário de 12 posts para o mês e transformar uma linha num post pronto.",
    passos: [
      { texto: "Abre a conversa onde a IA já sabe quem és (aula 1), ou cola o teu «quem sou»." },
      { forte: "Mostrar o trabalho:", texto: "um antes e depois teu, um pormenor." },
      { forte: "Ensinar:", texto: "um cuidado, um erro comum, uma dúvida que te fazem sempre." },
      { forte: "Bastidores:", texto: "a preparação da mesa, uma novidade que chegou." },
      { forte: "Novidade:", texto: "um serviço, um horário, um produto novo no salão." },
      { texto: "Pede uma tabela: dia, tipo, ideia numa frase e a foto ou o vídeo que é preciso." },
      { texto: "Tira o que não é verdade no teu negócio e troca o que não te soa bem." },
      { texto: "Escolhe uma linha e pede o post completo. Repete ao longo do mês." },
      { texto: "Copia o calendário para as notas do telemóvel e tira as fotos todas na mesma tarde." },
    ],
    conversa: [
      {
        titulo: "O calendário",
        falas: [
          { quem: "tu", texto: "Usa o que sabes de mim. Faz o calendário de dezembro: 12 posts, à segunda, quarta e sexta, nos tipos mostrar o trabalho, ensinar, bastidores e novidade. Em tabela: dia, tipo, ideia numa frase, foto ou vídeo que preciso. Não inventes promoções nem eventos." },
          { quem: "ia", texto: "1.ª semana, segunda · Novidade · Chegou ao salão a coleção de verniz gel Lady in Red, para o Natal · foto dos 3 frascos\n1.ª semana, quarta · Ensinar · As 3 perguntas que mais nos fazem sobre unhas vermelhas · cartão com as perguntas\n1.ª semana, sexta · Bastidores · A mesa preparada para o primeiro sábado de dezembro · foto da mesa\n2.ª semana, segunda · Mostrar o trabalho · Um vermelho clássico, curto e redondo · foto de um trabalho, com autorização do cliente\n…" },
          { quem: "tu", texto: "Escreve o post da 1.ª linha." },
          { quem: "ia", texto: "Chegou o vermelho do Natal. A coleção Lady in Red já está no salão, em três tons. Qual é o teu: o mais vivo ou o mais escuro?" },
        ],
        nota: "Quatro das doze linhas. Doze ideias, e cada uma já diz que foto tirar.",
      },
    ],
    imagem: LADY,
    regra: "Se usas o Belessa, a Vera prepara as publicações da semana para as redes, com o texto, até 5 hashtags e uma ideia para a foto, e nunca publica sem ti. O Belessa é da nossa equipa.",
    convite: "academy",
  },
  {
    n: 3,
    slug: "aula-3-legendas-que-trazem-gente",
    titulo: "Legendas que trazem gente",
    resumo: "A primeira linha que se pesquisa, o meio útil e o convite certo.",
    sabes: "Escrever a legenda em três partes, escolher até 5 hashtags do assunto e escrever o texto alternativo da foto.",
    passos: [
      { forte: "A 1.ª linha", texto: "diz o assunto com as palavras que um cliente escreveria na pesquisa: o serviço e a terra. Por exemplo «Unhas de gel vermelhas para o Natal, em Glória do Ribatejo»." },
      { forte: "O meio", texto: "ajuda: um cuidado, uma escolha, uma dúvida respondida. Curto." },
      { forte: "O fim", texto: "pede uma ação útil: «Guarda para quando marcares» ou «Envia a quem vai contigo». Nunca «comenta SIM» nem «marca 3 amigos»: o Instagram diz que não recomenda esse tipo de pedido a quem não te segue." },
      { forte: "Hashtags:", texto: "até 5, todas do assunto." },
      { forte: "Texto alternativo", texto: "da foto, nas definições avançadas do post: descreve a foto e repete a palavra-chave." },
      { texto: "Pede à IA 3 versões da primeira linha e escolhe a que soa a ti." },
    ],
    conversa: [
      {
        titulo: "Três primeiras linhas",
        falas: [
          { quem: "tu", texto: "Para este post — chegou ao salão a coleção de verniz gel Lady in Red, para o Natal — escreve 3 primeiras linhas com as palavras que um cliente de Glória do Ribatejo pesquisaria. Depois a legenda inteira: curta, a tratar por tu, a acabar com um convite para guardar. Até 5 hashtags do assunto. E o texto alternativo da foto." },
          { quem: "ia", texto: "1. Unhas de gel vermelhas para o Natal, em Glória do Ribatejo.\n2. Vermelho de Natal nas unhas: chegou a coleção Lady in Red ao salão.\n3. Procuras unhas vermelhas para as festas em Glória do Ribatejo?\n\nTexto alternativo: Três frascos de verniz gel vermelho da coleção Lady in Red numa caixa vermelha." },
        ],
      },
    ],
    imagem: LADY,
    convite: "academy",
  },
  {
    n: 4,
    slug: "aula-4-fotos-com-o-telemovel-e-ia",
    titulo: "Fotos com o telemóvel e IA",
    resumo: "Quatro regras para a foto, o tratamento certo e a linha que não se passa.",
    sabes: "Tirar e tratar uma foto de produto ou de trabalho com o telemóvel, sem mudar o resultado.",
    passos: [
      { forte: "Luz:", texto: "ao pé de uma janela, de dia, sem sol direto. Desliga o flash." },
      { forte: "Fundo:", texto: "liso e de uma cor. Uma cartolina serve. Nada atrás que distraia." },
      { forte: "Lente limpa", texto: "(a ponta da t-shirt chega) e o telemóvel à altura do produto." },
      { forte: "Tira 3 a 5 fotos", texto: "um pouco diferentes e escolhe uma." },
      { forte: "Tratar:", texto: "endireitar, cortar, um pouco de luz e de contraste, tirar uma poeira. O editor do telemóvel faz isto, e em muitos telemóveis também tira o fundo." },
      { forte: "A IA para ideias:", texto: "pede ao ChatGPT formas diferentes de fotografar o produto." },
    ],
    conversa: [
      {
        titulo: "Ideias para a sessão de fotos",
        falas: [
          { quem: "tu", texto: "Dá-me 5 formas de fotografar esta coleção de verniz para o Instagram: ângulo, fundo e o que pôr à volta." },
          { quem: "ia", texto: "1. De cima, sobre papel kraft, com um ramo de pinheiro ao lado.\n2. De frente, à altura dos frascos, num fundo vermelho liso.\n3. A caixa aberta, de lado, com luz de janela a entrar pela esquerda.\n4. Um frasco só, em primeiro plano, e os outros dois desfocados atrás.\n5. Sobre uma toalha branca, com um laço vermelho." },
        ],
      },
    ],
    imagem: LADY,
    regra: "Melhorar o que existe: sim. Mudar a cor do verniz, a forma da unha ou tapar um defeito do trabalho: não. Quem marca por causa dessa foto espera o que viu. E se uma imagem for inteiramente gerada por IA e parecer real, diz-se.",
    convite: "loja",
  },
  {
    n: 5,
    slug: "aula-5-fotos-de-clientes",
    titulo: "Fotos de clientes",
    resumo: "A autorização por escrito, e o que nunca vai para uma app de IA.",
    sabes: "Pedir autorização antes de publicar a foto de um cliente, o que essa autorização diz, e o que nunca se envia a uma app de IA.",
    passos: [
      { forte: "Antes de publicar", texto: "a foto de um cliente (a cara, as mãos com um anel ou uma tatuagem que o identifiquem, o nome), pede autorização por escrito: uma mensagem ou um papel assinado." },
      { forte: "A autorização diz:", texto: "que foto, onde vai aparecer, até quando, e que a pessoa pode retirar a autorização e a foto sai." },
      { forte: "Guarda-a.", texto: "Se a pessoa pedir para tirar, tira-se." },
      { forte: "Nunca numa app de IA:", texto: "caras de clientes, nomes, telefones, prints de conversas, fichas, nada de saúde (alergias, medicação)." },
      { forte: "Para pedir um texto à IA,", texto: "escreve «um cliente» em vez do nome. O texto sai igual de bom." },
      { forte: "Sem autorização,", texto: "mostra o trabalho sem a pessoa: num tip, num expositor, com os produtos que usaste." },
    ],
    conversa: [
      {
        titulo: "O mesmo pedido, sem dados de ninguém",
        falas: [
          { quem: "tu", texto: "Responde a um cliente que perguntou se há vaga no sábado." },
        ],
        nota: "E não: «Responde à Ana, do telemóvel 9XX XXX XXX, que perguntou se há vaga no sábado.»",
      },
    ],
    quadro: {
      titulo: "Modelo de autorização",
      texto: "Autorizo [nome do salão] a publicar a fotografia [das minhas unhas de dd/mm/aaaa] no Instagram e no site do salão, até [data / eu pedir para retirar]. Sei que posso retirar esta autorização quando quiser, e a fotografia sai.\n[Nome, data, assinatura ou resposta por mensagem]",
      nota: "Adapta ao teu negócio. É um ponto de partida, não um parecer jurídico: na dúvida, confirma com um jurista.",
    },
    imagem: EXPRESS,
    convite: "loja",
  },
  {
    n: 6,
    slug: "aula-6-um-reel-de-30-segundos",
    titulo: "Um Reel de 30 segundos",
    resumo: "O guião pedido à IA, o gancho no primeiro segundo e as legendas para quem vê sem som.",
    sabes: "Pedir à IA o guião de um Reel curto com a lista de planos, gravá-lo com o telemóvel e pôr legendas.",
    passos: [
      { forte: "Pede o guião:", texto: "gancho, 3 passos e um convite, com o que se vê, os segundos e o texto no ecrã de cada parte." },
      { forte: "O primeiro segundo", texto: "é o gancho: a imagem mais forte e uma frase que abre uma pergunta." },
      { forte: "Grava plano a plano,", texto: "com o telemóvel de pé e a mesma luz de janela da aula 4. Cada plano com 2 a 4 segundos." },
      { forte: "Monta", texto: "no editor do Instagram ou numa app gratuita." },
      { forte: "Legendas automáticas", texto: "e texto no ecrã, longe do fundo do ecrã: é onde o Instagram põe os botões." },
      { forte: "Acaba com a mesma imagem do princípio:", texto: "o Reel recomeça sem se notar." },
    ],
    conversa: [
      {
        titulo: "O guião",
        falas: [
          { quem: "tu", texto: "Faz o guião de um Reel de 30 segundos: um gancho no primeiro segundo, 3 passos e um convite. Para cada parte: o que se vê, quantos segundos, e o texto que aparece no ecrã. Para ver sem som." },
          { quem: "ia", texto: "0–2 s · o tip pronto · «Vermelho de Natal em 3 passos»\n2–9 s · a base no tip · «1. Base Express Base Milky White»\n9–18 s · a cor no tip · «2. Lady in Red»\n18–25 s · o top no tip · «3. Top e lâmpada»\n25–30 s · o tip pronto, igual ao início · «Guarda para o teu próximo serviço»" },
        ],
        nota: "Tudo num tip, sem mãos de ninguém.",
      },
    ],
    imagem: EXPRESS,
    convite: "loja",
  },
  {
    n: 7,
    slug: "aula-7-ser-encontrado",
    titulo: "Ser encontrado",
    resumo: "A bio do Instagram, o perfil da empresa no Google e as respostas às avaliações.",
    sabes: "Melhorar a bio com o serviço, a terra e como marcar, completar o perfil no Google e responder a avaliações com a ajuda da IA.",
    passos: [
      { forte: "A bio", texto: "diz o que fazes, onde e como se marca. Pede à IA 5 versões curtas e escolhe uma." },
      { forte: "O nome do perfil", texto: "pode levar o serviço («Salão X · Unhas de gel»): o Instagram usa as palavras do perfil na pesquisa." },
      { forte: "O perfil da empresa no Google:", texto: "a categoria certa, a morada, o horário, o telefone e fotos tuas." },
      { forte: "Avaliações:", texto: "responde a todas. Para a IA, cola só o texto da avaliação, sem o nome de quem a escreveu." },
    ],
    conversa: [
      {
        titulo: "A bio",
        falas: [
          { quem: "tu", texto: "Sou um salão de unhas em Glória do Ribatejo, faço unhas de gel e nail art, marca-se pela ligação da bio. Dá-me 5 bios curtas para o Instagram, a tratar por tu, sem emojis a mais." },
          { quem: "ia", texto: "1. Unhas de gel e nail art em Glória do Ribatejo. Marca pela ligação abaixo.\n2. O teu salão de unhas em Glória do Ribatejo. Gel, nail art e horários ao sábado. Marca aqui ↓\n3. Unhas que duram, em Glória do Ribatejo. Marcações online na ligação." },
        ],
      },
      {
        titulo: "Uma avaliação (inventada para a aula)",
        falas: [
          { quem: "tu", texto: "Escreve uma resposta curta a esta avaliação: agradece, pede desculpa pela espera sem dar desculpas, e convida a voltar. A avaliação: «Adorei o resultado, mas esperei 20 minutos.»" },
          { quem: "ia", texto: "Obrigado por teres vindo e ainda bem que gostaste do resultado! Tens razão quanto à espera, e pedimos desculpa: não é o que queremos para ti. Da próxima vez, fazemos questão de começar à hora." },
        ],
      },
    ],
    regra: "Se usas o Belessa, a Vera propõe o título e a descrição que o Google e os assistentes de IA mostram sobre o teu site, e só entram quando aprovas. O Belessa é da nossa equipa.",
    convite: "academy",
  },
  {
    n: 8,
    slug: "aula-8-um-site-feito-com-ia",
    titulo: "Um site feito com IA",
    resumo: "Para que serve o site, e como se cria um com a IA do Belessa.",
    sabes: "Para que serve um site num negócio de beleza, e criar um com a IA do Belessa: escolher uma das 3 propostas, rever os textos e aplicar.",
    passos: [
      { forte: "O site tem um trabalho:", texto: "dizer o que fazes, onde, quanto custa, e deixar marcar. Tudo o que fizeste nas outras aulas leva para lá." },
      { forte: "No Belessa:", texto: "Website → Aspeto e marca → Criar o site com a IA. Escolhe até 3 formas de o site se sentir, por exemplo Calmo e Natural." },
      { forte: "Criar 3 propostas.", texto: "A IA pode levar até um minuto. Abres uma e a IA escreve a página dessa proposta." },
      { forte: "«O meu» ou «O da IA»:", texto: "onde já tinhas texto teu, ele fica, a não ser que escolhas o da IA. Uma secção que não te agrade: «Reescrever esta secção»." },
      { forte: "Aplicar esta proposta ao site.", texto: "Antes, o site fica guardado em «Versões do site», e «Repor» volta a ele." },
      { forte: "A dica:", texto: "a IA escreve com o que sabe de ti. Descreve os teus serviços primeiro." },
    ],
    imagem: {
      src: "/cursos/belessa-aspeto-e-marca.webp",
      alt: "A página «Aspeto e marca» do Belessa num telemóvel, com os temas do site.",
      largura: 780,
      altura: 1688,
      legenda: "A página «Aspeto e marca» do Belessa (captura do guia do Belessa, com dados de exemplo).",
      href: "https://www.belessa.pt",
    },
    regra: "Os passos vêm do guia do Belessa. O Belessa é da nossa equipa.",
    convite: "academy",
  },
];

export const aulaPorSlug = (slug: string) => AULAS.find((a) => a.slug === slug);
