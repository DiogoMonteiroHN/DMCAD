# dmcad.pt — Diogo Monteiro, HN Hit Nails

O site do Diogo Monteiro, colaborador da HN Hit Nails (a marca DMCAD acabou a 23/11/2026). Next.js 16, cores, letras e
logótipo da HN Hit Nails (loja `hnhitnails.com`: `src/index.css` e `src/assets/brand/logo-hitnails.png`).

    npm install
    npm run dev        # http://localhost:3000
    npm run build      # o que a Vercel corre

- Factos num só sítio: `src/app/marca.ts` (serviços, curso, ecossistema HN, perguntas, WhatsApp, código de revendedor do
  Belessa). A página, os dados estruturados (`dados-estruturados.tsx`) e o `/llms.txt` leem daqui.
- Páginas: `/` (`page.tsx`), `/cursos` (o curso gratuito «Inteligência Artificial dentro da Beleza»), `/privacidade` e
  `/raret` (a história da RARET, com o seu próprio aspeto e as cores antigas, em `raret/raret.css`).
- Topo e rodapé: `moldura.tsx`. Estilos: `globals.css` (cores e base) e `casa.css`.
- Contraste medido (WCAG): quase preto sobre rosa 11,1:1 · rosa-texto `#A3264F` sobre branco 7,1:1 · cinza `#5B6372`
  sobre branco 6,1:1 · cinza claro `#A6ADBB` sobre quase preto 8,2:1. O rosa da HN nunca leva texto branco.

## O formulário

`formulario.tsx` → `/api/pedido` → um email ao Diogo pelo Resend. Nada fica guardado no site. Sem as variáveis, a rota
responde 503 e o formulário mostra o WhatsApp com a mensagem já escrita (não finge que enviou).

| Variável (Vercel) | Para quê |
|---|---|
| `RESEND_API_KEY` | a chave do Resend |
| `PEDIDOS_PARA` | o email que recebe os pedidos |
| `PEDIDOS_DE` | o remetente, de um domínio confirmado no Resend (ex.: `Site <pedidos@dmcad.pt>`) |

Sem cookies nem estatísticas.
