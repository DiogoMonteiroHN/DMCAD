// Recebe um pedido do formulário e envia-o por email ao Diogo, pelo Resend.
// Nada fica guardado no site. Sem as variáveis abaixo, responde 503 e o formulário
// mostra o WhatsApp em vez de fingir que enviou.
//
// Variáveis (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY   a chave do Resend
//   PEDIDOS_PARA     o email que recebe os pedidos
//   PEDIDOS_DE       o remetente, de um domínio confirmado no Resend (ex.: «Site <pedidos@dmcad.pt>»)

import { ASSUNTOS } from "../../marca";

export const runtime = "nodejs";

const limpar = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(pedido: Request) {
  let corpo: Record<string, unknown>;
  try {
    corpo = await pedido.json();
  } catch {
    return Response.json({ erro: "pedido-invalido" }, { status: 400 });
  }

  // A armadilha para robôs: uma pessoa nunca preenche este campo.
  if (limpar(corpo.site, 200)) return Response.json({ ok: true });

  const nome = limpar(corpo.nome, 80);
  const contacto = limpar(corpo.contacto, 120);
  const negocio = limpar(corpo.negocio, 120);
  const mensagem = limpar(corpo.mensagem, 2000);
  const assunto = (ASSUNTOS as string[]).includes(limpar(corpo.assunto, 40)) ? limpar(corpo.assunto, 40) : "Outra coisa";

  if (!nome || !contacto || !mensagem || corpo.consentimento !== "sim") {
    return Response.json({ erro: "faltam-dados" }, { status: 400 });
  }

  const chave = process.env.RESEND_API_KEY;
  const para = process.env.PEDIDOS_PARA;
  const de = process.env.PEDIDOS_DE;
  if (!chave || !para || !de) return Response.json({ erro: "envio-por-ligar" }, { status: 503 });

  const pareceEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto);
  const texto = [
    `Assunto: ${assunto}`,
    `Nome: ${nome}`,
    `Contacto: ${contacto}`,
    `Negócio: ${negocio || "(não disse)"}`,
    "",
    mensagem,
    "",
    "— Enviado pelo formulário de dmcad.pt. A pessoa aceitou o uso dos dados só para responder a este pedido.",
  ].join("\n");

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: de,
        to: [para],
        subject: `Pedido pelo site: ${assunto} — ${nome}`,
        text: texto,
        ...(pareceEmail ? { reply_to: contacto } : {}),
      }),
    });
    if (!r.ok) {
      // Regista só o estado, nunca os dados da pessoa.
      console.error("pedido: o Resend respondeu", r.status);
      return Response.json({ erro: "envio-falhou" }, { status: 502 });
    }
  } catch {
    console.error("pedido: sem ligação ao Resend");
    return Response.json({ erro: "envio-falhou" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
