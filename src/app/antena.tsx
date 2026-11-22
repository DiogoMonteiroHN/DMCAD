import Image from "next/image";

// O elemento distintivo da página: a antena da RARET (o símbolo do logótipo)
// sobre a grelha técnica, com as ondas a continuar para lá do símbolo e as cotas
// do desenho técnico (o «CAD» do nome). Medidas em pixels do antena.png (395 × 577).
const LARGURA = 395;
const ALTURA = 577;
const CENTRO = { x: 197, y: 157 }; // centro das duas ondas do próprio símbolo
const PONTA = 107; // topo do mastro

function arco(r: number) {
  const a1 = (160 * Math.PI) / 180;
  const a2 = (20 * Math.PI) / 180;
  const x1 = CENTRO.x + r * Math.cos(a1);
  const y1 = CENTRO.y - r * Math.sin(a1);
  const x2 = CENTRO.x + r * Math.cos(a2);
  const y2 = CENTRO.y - r * Math.sin(a2);
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

const ONDAS = [215, 278, 340, 400];

export function Antena() {
  return (
    <figure className="antena" aria-labelledby="antena-legenda">
      <div className="antena__desenho">
        <svg
          className="antena__ondas"
          viewBox={`0 0 ${LARGURA} ${ALTURA}`}
          aria-hidden="true"
          focusable="false"
        >
          {ONDAS.map((r, i) => (
            <path key={r} d={arco(r)} className="onda" style={{ ["--i" as string]: i }} />
          ))}
        </svg>
        <Image
          src="/antena.png"
          alt="A antena da RARET, em laranja, com duas ondas de emissão em azul"
          width={LARGURA}
          height={ALTURA}
          priority
          sizes="(min-width: 960px) 300px, 180px"
          className="antena__imagem"
        />
        <svg
          className="antena__cotas"
          viewBox={`0 0 ${LARGURA} ${ALTURA}`}
          aria-hidden="true"
          focusable="false"
        >
          {/* cota vertical: do mastro à base */}
          <g className="cota">
            <line x1={-46} y1={PONTA} x2={-46} y2={ALTURA} />
            <line x1={-58} y1={PONTA} x2={-34} y2={PONTA} />
            <line x1={-58} y1={ALTURA} x2={-34} y2={ALTURA} />
            <line x1={-30} y1={PONTA} x2={180} y2={PONTA} className="cota__chamada" />
            <text
              x={-58}
              y={(PONTA + ALTURA) / 2}
              transform={`rotate(-90 -58 ${(PONTA + ALTURA) / 2})`}
              textAnchor="middle"
            >
              RARET, 1951–1996
            </text>
          </g>
          {/* cota horizontal: a base */}
          <g className="cota">
            <line x1={0} y1={ALTURA + 40} x2={LARGURA} y2={ALTURA + 40} />
            <line x1={0} y1={ALTURA + 28} x2={0} y2={ALTURA + 52} />
            <line x1={LARGURA} y1={ALTURA + 28} x2={LARGURA} y2={ALTURA + 52} />
            <text x={LARGURA / 2} y={ALTURA + 78} textAnchor="middle">
              Glória do Ribatejo → Portugal
            </text>
          </g>
        </svg>
      </div>
      <figcaption id="antena-legenda" className="visualmente-escondido">
        A antena da RARET, que emitiu da Glória do Ribatejo entre 1951 e 1996, é o símbolo da DMCAD.
      </figcaption>
    </figure>
  );
}
