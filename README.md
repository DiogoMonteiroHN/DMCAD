# DMCAD — dmcad.pt

Landing page da DMCAD: IA prática para negócios de beleza em Portugal.
Next.js 16 (página estática), cores e letras do Brand Book v5 (22/11/2026).

    npm install
    npm run dev        # http://localhost:3000
    npm run build      # o que a Vercel corre

- Factos da marca (oferta, perguntas, contactos, morada): `src/app/marca.ts` — a página, os dados
  estruturados (`dados-estruturados.tsx`) e o `/llms.txt` leem todos daqui.
- Textos da página: `src/app/page.tsx`. Cores: `src/app/globals.css` (`:root`).
- O exemplo do topo (`legenda-exemplo.tsx`) e o teste da legenda (`teste-da-legenda.tsx`) usam as
  mesmas regras, em `sinais.ts`.
- A torre da RARET em 3D: `torre.tsx`, desenhada à mão num canvas 2D (sem bibliotecas).
- A página da RARET, `/raret` (`src/app/raret/`): cada facto liga a uma fonte de `fontes.ts`; a ficha
  completa, com citações, está em `docs/raret-ficha.md`. O campo de antenas 3D é uma reconstituição
  ilustrativa (`campo-de-antenas.tsx`), a partir do relatório técnico de 1952.
- SEO, GEO e AEO: metadados em `layout.tsx`, `robots.ts` (aberto aos assistentes de IA), `sitemap.ts`,
  `llms.txt/route.ts` e o JSON-LD (Organization, Person, WebSite, FAQPage).
- Sem cookies nem estatísticas; o teste da legenda corre no browser e não envia nada. A página não guarda dados de quem a visita.
