// O componente principal. Um componente React é uma função que devolve
// o que deve aparecer no ecrã (em JSX, que parece HTML).
import { useState } from "react";
import { CONJUNTOS, gerarPassword, calcularEntropia, nomeDaForca } from "./gerador.js";

export default function App() {
  // useState guarda valores que mudam. Sempre que mudam, o React volta a desenhar o ecrã.
  // const [valor, funçãoParaMudarOValor] = useState(valorInicial)
  const [tamanho, setTamanho] = useState(16);
  const [ligados, setLigados] = useState({
    minusculas: true,
    maiusculas: true,
    numeros: true,
    simbolos: true,
  });
  const [copiada, setCopiada] = useState(false);

  // Lista dos conjuntos que estão ligados (só os textos de caracteres)
  const ativos = Object.keys(CONJUNTOS)
    .filter((chave) => ligados[chave])
    .map((chave) => CONJUNTOS[chave].chars);

  // Password inicial. Passar uma função ao useState faz com que só corra uma vez.
  const [password, setPassword] = useState(() =>
    gerarPassword(16, Object.values(CONJUNTOS).map((c) => c.chars))
  );

  // Chamada ao carregar em "Gerar nova"
  function gerar() {
    if (ativos.length === 0) return; // sem tipos escolhidos não há nada a gerar
    setPassword(gerarPassword(tamanho, ativos));
    setCopiada(false);
  }

  // Chamada ao carregar em "Copiar"
  async function copiar() {
    try {
      await navigator.clipboard.writeText(password);
      setCopiada(true);
    } catch {
      setCopiada(false); // o navegador pode bloquear a cópia
    }
  }

  // Liga/desliga um tipo de caracter
  function alternar(chave) {
    // { ...ligados } copia o objeto. Nunca se altera o estado diretamente.
    setLigados({ ...ligados, [chave]: !ligados[chave] });
  }

  // Estes valores são calculados a cada desenho, a partir do estado
  const bits = calcularEntropia(tamanho, ativos);
  const forca = nomeDaForca(bits);

  // O que aparece no ecrã. {chaves} inserem JavaScript dentro do JSX.
  return (
    <main className="cartao">
      <h1>Gerador de passwords</h1>

      <div className="resultado" aria-live="polite">
        {ativos.length ? password : "Escolhe pelo menos um tipo de caracter"}
      </div>

      {/* Barra de força: a largura depende dos bits (máximo 100%) */}
      <div className="barra">
        <div style={{ width: Math.min(100, bits) + "%" }} />
      </div>
      <p className="nota">
        {forca} · {bits} bits de entropia
      </p>

      <label htmlFor="tamanho">Tamanho: {tamanho}</label>
      <input
        id="tamanho"
        type="range"
        min="8"
        max="64"
        value={tamanho}
        onChange={(e) => setTamanho(Number(e.target.value))}
      />

      {/* .map() cria um checkbox por cada tipo de caracter.
          "key" ajuda o React a distinguir os itens da lista. */}
      {Object.keys(CONJUNTOS).map((chave) => (
        <label key={chave}>
          <input
            type="checkbox"
            checked={ligados[chave]}
            onChange={() => alternar(chave)}
          />
          {CONJUNTOS[chave].nome}
        </label>
      ))}

      <div className="botoes">
        <button onClick={gerar}>Gerar nova</button>
        <button className="secundario" onClick={copiar}>
          {copiada ? "Copiada" : "Copiar"}
        </button>
      </div>

      <p className="nota">
        Tudo acontece no teu navegador. Nada é enviado nem guardado.
      </p>
    </main>
  );
}
