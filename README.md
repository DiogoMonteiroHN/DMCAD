# DMCAD — dmcad.pt

Landing page da DMCAD: IA prática para negócios de beleza em Portugal.
Next.js 16 (página estática), cores e letras do Brand Book v5 (22/11/2026).

    npm install
    npm run dev        # http://localhost:3000
    npm run build      # o que a Vercel corre

- Factos da marca (oferta, perguntas, contactos, morada): `src/app/marca.ts` — a página, os dados
  estruturados (`dados-estruturados.tsx`) e o `/llms.txt` leem todos daqui.
- Textos da página: `src/app/page.tsx`. Cores: `src/app/globals.css` (`:root`).
- A antena: `src/app/antena.tsx` (imagem, vem no HTML) e `src/app/cena-antena.ts` (a torre em 3D,
  three.js, carregada à parte por `antena-3d.tsx`; fica a imagem com «menos movimento» ou poupança de dados).
- SEO, GEO e AEO: metadados em `layout.tsx`, `robots.ts` (aberto aos assistentes de IA), `sitemap.ts`,
  `llms.txt/route.ts` e o JSON-LD (Organization, Person, WebSite, FAQPage).
- Sem cookies, sem estatísticas, sem formulários: a página não guarda dados de quem a visita.
