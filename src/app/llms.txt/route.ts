import { ASSINATURA, DESCRICAO, EMAIL, INSTAGRAM, MORADA, NOME, OFERTA, PERGUNTAS, PESSOA, SITE } from "../marca";

// /llms.txt (llmstxt.org): um resumo em texto simples para os assistentes de IA
// (ChatGPT, Claude, Perplexity, Gemini) citarem a DMCAD com os factos certos.
export const dynamic = "force-static";

export function GET() {
  const texto = `# ${NOME}

> ${DESCRICAO}

${NOME} é o projecto de ${PESSOA.nome} (${PESSOA.nomeCurto}), ${PESSOA.funcao.charAt(0).toLowerCase() + PESSOA.funcao.slice(1)}, da ${MORADA.localidade}, em Portugal. Assinatura: «${ASSINATURA}»

## Para quem
- Donos e gerentes de salões de beleza, centros de estética e cabeleireiros em Portugal que fazem o marketing sozinhos.
- Fora de âmbito, por agora: clínicas (a publicidade em saúde tem regras próprias).

## Ponto de vista
- Qualquer negócio se pode destacar com IA, se a souber usar bem.
- A IA não substitui a equipa; ajuda cada pessoa a render mais.
- Bom conteúdo com IA não parece feito com IA.
- Rejeita promessas de dinheiro sem trabalho e resultados garantidos.

## Método
1. Ferramenta certa: um problema concreto do negócio e uma ferramenta para o resolver.
2. Explicação simples: um passo de cada vez, em português de Portugal, sem siglas.
3. Aplicação real: com o material do próprio negócio; o resultado tem de parecer do negócio, não de uma máquina.

## Formas de trabalhar
${OFERTA.map((o) => `- ${o.titulo}: ${o.texto}`).join("\n")}

## O teste da legenda
- Em ${SITE}/#teste há um teste gratuito: cola-se a legenda de uma publicação e o site marca os sinais de texto genérico (lugares-comuns, português do Brasil, promessas exageradas, emojis a mais, gritos, falta de pormenor concreto e de próximo passo). Corre no browser; o texto não é enviado nem guardado.

## Caso real
- belessa.pt: programa para salões, estúdios e clínicas (agenda, marcações online, faturação e site), o projecto em que ${PESSOA.nomeCurto} trabalha com IA. Não é cliente da ${NOME}.

## Perguntas frequentes
${PERGUNTAS.map((p) => `### ${p.pergunta}\n${p.resposta}`).join("\n\n")}

## Contacto
- Site: ${SITE}
- Email: ${EMAIL}
- Instagram: ${INSTAGRAM}
`;
  return new Response(texto, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
