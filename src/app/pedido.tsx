"use client";

import { useState } from "react";
import { PEDIDO_BOM } from "./marca";

// O pedido usado na imagem natural, com um botão para o copiar.
export function Pedido() {
  const [copiado, setCopiado] = useState(false);
  return (
    <div className="pedido">
      <pre className="pedido__texto">
        <code>{PEDIDO_BOM}</code>
      </pre>
      <button
        type="button"
        className="botao botao--preto pedido__copiar"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(PEDIDO_BOM);
            setCopiado(true);
            window.setTimeout(() => setCopiado(false), 2400);
          } catch {
            setCopiado(false);
          }
        }}
      >
        {copiado ? "Copiado" : "Copiar o pedido"}
      </button>
      <span className="visualmente-escondido" aria-live="polite">
        {copiado ? "O pedido foi copiado." : ""}
      </span>
    </div>
  );
}
