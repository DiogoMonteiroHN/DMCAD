// O teste da legenda: procura num texto os sinais que o fazem soar a genérico.
// Corre só no browser de quem o usa; o texto não sai do aparelho.
// Fontes das regras: Brand Book v5 da DMCAD (cap. 05, «Usar / Evitar») e a lista
// de lugares-comuns do gerador de sites do Belessa (CLICHES, src/lib/gerador/escrita.ts).

export type TipoDeSinal = "lugar-comum" | "brasil" | "exagero" | "emojis" | "grito";

export type Marca = { inicio: number; fim: number; tipo: TipoDeSinal };

export type Nota = { tipo: TipoDeSinal | "concreto" | "chamada"; texto: string; vezes?: number };

export type Resultado = { marcas: Marca[]; notas: Nota[] };

const LUGARES_COMUNS = [
  /realce a sua beleza/gi,
  /realça a tua beleza/gi,
  /a sua melhor vers[aã]o/gi,
  /a tua melhor vers[aã]o/gi,
  /onde a beleza encontra[^.!?\n]*/gi,
  /experi[eê]ncia [uú]nica/gi,
  /paix[aã]o pela excel[eê]ncia/gi,
  /profissionais altamente qualificad[oa]s/gi,
  /tecnologia de ponta/gi,
  /resultados incr[ií]veis/gi,
  /o melhor (?:sal[aã]o|espa[cç]o|est[uú]dio) d[aeo]\s+\p{L}+/giu,
  /a (?:sua|tua) beleza,? a nossa paix[aã]o/gi,
  /mim[ea]-(?:se|te)/gi,
  /momento s[oó] (?:seu|teu)/gi,
  /ambiente acolhedor e profissional/gi,
  /cuidamos de (?:si|ti)/gi,
  /venha descobrir/gi,
  /vem descobrir/gi,
  /n[aã]o perca(?:s)?(?: esta oportunidade)?/gi,
  /deix[ea]-(?:se|te) (?:levar|surpreender|mimar)/gi,
  /sinta-se (?:linda|[uú]nica|maravilhosa|especial)/gi,
  /sente-te (?:linda|[uú]nica|maravilhosa|especial)/gi,
  /transform[ea] o (?:seu|teu) (?:visual|look)/gi,
];

// \b não serve em português (trata «ê» como fronteira): palavra inteira por letras Unicode
const palavra = (alternativas: string, flags = "giu") => new RegExp(`(?<!\\p{L})(?:${alternativas})(?!\\p{L})`, flags);

const BRASIL = palavra("você|vocês|celular|celulares|tela|post|posts|tip|tips");

const EXAGEROS = palavra("hacks?|truques? secretos?|game changer|revolucion[aá]ri[oa]s?|garantid[oa]s?|milagros[oa]s?|milagre");

const EMOJI = /\p{Extended_Pictographic}(?:️|‍\p{Extended_Pictographic})*/gu;

const SIGLAS_PERMITIDAS = new Set(["IA", "SMS", "NIF", "IVA", "PDF", "URL"]);

const NOTAS: Record<TipoDeSinal, (n: number) => string> = {
  "lugar-comum": (n) =>
    n === 1
      ? "Um lugar-comum: a frase servia para qualquer salão. Troca-a por um pormenor do teu."
      : `${n} lugares-comuns: estas frases serviam para qualquer salão. Troca-as por pormenores do teu.`,
  brasil: () =>
    "Soa ao português do Brasil. Por cá diz-se publicação, dica, telemóvel e ecrã, e trata-se por tu ou sem pronome.",
  exagero: () => "Uma promessa exagerada. Diz o que fazes, não o milagre.",
  emojis: (n) => `${n} emojis. Um ou dois chegam; mais do que isso parece enfeite.`,
  grito: () => "Palavras em maiúsculas e pontos de exclamação seguidos soam a grito.",
};

function procurar(texto: string, padrao: RegExp, tipo: TipoDeSinal, marcas: Marca[]) {
  padrao.lastIndex = 0;
  for (const m of texto.matchAll(padrao)) {
    if (m.index === undefined || !m[0].length) continue;
    marcas.push({ inicio: m.index, fim: m.index + m[0].length, tipo });
  }
}

export function lerSinais(texto: string): Resultado {
  const candidatas: Marca[] = [];

  for (const p of LUGARES_COMUNS) procurar(texto, p, "lugar-comum", candidatas);
  procurar(texto, BRASIL, "brasil", candidatas);
  procurar(texto, EXAGEROS, "exagero", candidatas);

  const emojis = [...texto.matchAll(EMOJI)];
  if (emojis.length > 2) procurar(texto, EMOJI, "emojis", candidatas);

  procurar(texto, /!{2,}/g, "grito", candidatas);
  for (const m of texto.matchAll(palavra("\\p{Lu}{4,}", "gu"))) {
    if (m.index !== undefined && !SIGLAS_PERMITIDAS.has(m[0])) {
      candidatas.push({ inicio: m.index, fim: m.index + m[0].length, tipo: "grito" });
    }
  }

  // sem sobreposições: fica a que começa primeiro (e, empatadas, a mais longa)
  candidatas.sort((a, b) => a.inicio - b.inicio || b.fim - a.fim);
  const marcas: Marca[] = [];
  for (const m of candidatas) {
    const ultima = marcas[marcas.length - 1];
    if (!ultima || m.inicio >= ultima.fim) marcas.push(m);
  }

  const notas: Nota[] = [];
  const contar = (t: TipoDeSinal) => marcas.filter((m) => m.tipo === t).length;
  for (const tipo of ["lugar-comum", "brasil", "exagero", "emojis", "grito"] as TipoDeSinal[]) {
    const n = tipo === "emojis" ? emojis.length : contar(tipo);
    if (contar(tipo) > 0) notas.push({ tipo, texto: NOTAS[tipo](n), vezes: n });
  }

  const temConcreto =
    /\d|€/.test(texto) ||
    palavra("segunda|terça|terca|quarta|quinta|sexta|sábado|sabado|domingo|manhã|tarde|noite|minutos|horas?", "iu").test(texto);
  if (texto.trim().length > 0 && !temConcreto) {
    notas.push({
      tipo: "concreto",
      texto: "Não há nenhum pormenor concreto: o serviço, o preço, o dia ou a hora. É isso que distingue o teu salão.",
    });
  }

  const temChamada = palavra(
    "marc\\p{L}*|marqu\\p{L}*|reserv\\p{L}*|link|liga[çc][aã]o|bio|liga\\p{L}*|mensagem|whatsapp|telefon\\p{L}*",
    "iu",
  ).test(texto);
  if (texto.trim().length > 0 && !temChamada) {
    notas.push({ tipo: "chamada", texto: "Não diz o que fazer a seguir: marcar, mandar mensagem, ligar." });
  }

  return { marcas, notas };
}

// Divide o texto em pedaços simples e marcados, para desenhar.
export function emPedacos(texto: string, marcas: Marca[]) {
  const pedacos: { texto: string; tipo?: TipoDeSinal }[] = [];
  let i = 0;
  for (const m of marcas) {
    if (m.inicio > i) pedacos.push({ texto: texto.slice(i, m.inicio) });
    pedacos.push({ texto: texto.slice(m.inicio, m.fim), tipo: m.tipo });
    i = m.fim;
  }
  if (i < texto.length) pedacos.push({ texto: texto.slice(i) });
  return pedacos;
}
