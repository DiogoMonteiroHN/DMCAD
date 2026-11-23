import { CURSO, DESCRICAO, ECOSSISTEMA, PERGUNTAS, PESSOA, SERVICOS, SITE, WHATSAPP_VISIVEL, INSTAGRAM_NOME } from "../marca";

// /llms.txt (llmstxt.org): um resumo em texto simples para os assistentes de IA
// citarem o Diogo Monteiro com os factos certos. Sai de marca.ts, como a página.
export const dynamic = "force-static";

export function GET() {
  const texto = `# ${PESSOA.nome}

> ${DESCRICAO}

${PESSOA.nome} é da ${PESSOA.terra}, em Portugal, e é ${PESSOA.papel.charAt(0).toLowerCase() + PESSOA.papel.slice(1)}.

## Curso gratuito: ${CURSO.titulo}
${CURSO.aulas.map((a) => `- Aula ${a.n}, ${a.titulo}: ${a.sabes}`).join("\n")}
Página: ${SITE}/cursos

## Serviços
${SERVICOS.map((s) => `- ${s.titulo}: ${s.texto}`).join("\n")}

## Ecossistema HN Hit Nails
${ECOSSISTEMA.map((m) => `- ${m.nome}: ${m.href}${m.texto ? ` — ${m.texto}` : ""}`).join("\n")}

## Perguntas frequentes
${PERGUNTAS.map((p) => `- ${p.pergunta} ${p.resposta}`).join("\n")}

## Contacto
- WhatsApp: ${WHATSAPP_VISIVEL}
- Instagram: ${INSTAGRAM_NOME}
- Formulário: ${SITE}/#contacto
`;
  return new Response(texto, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
