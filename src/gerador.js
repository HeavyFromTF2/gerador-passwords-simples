// Lógica pura (sem React): gerar a password e calcular a força.
// Está separada do React para ser mais fácil de perceber e testar.

// Os tipos de caracteres que a pessoa pode ligar ou desligar.
export const CONJUNTOS = {
  minusculas: { nome: "Minúsculas", chars: "abcdefghijklmnopqrstuvwxyz" },
  maiusculas: { nome: "Maiúsculas", chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
  numeros: { nome: "Números", chars: "0123456789" },
  simbolos: { nome: "Símbolos", chars: "!@#$%^&*()-_=+[]{};:,.?" },
};

// Devolve um número inteiro aleatório entre 0 e max-1.
// Usamos crypto.getRandomValues (aleatoriedade segura do navegador).
// NUNCA uses Math.random() para passwords: é previsível.
function inteiroAleatorio(max) {
  const valor = new Uint8Array(1); // um número entre 0 e 255
  const limite = 256 - (256 % max);
  // Se o valor cair na "sobra" da divisão, repete.
  // Isto evita que alguns caracteres saiam mais vezes que outros (viés).
  do {
    crypto.getRandomValues(valor);
  } while (valor[0] >= limite);
  return valor[0] % max;
}

// Gera a password.
// tamanho: quantos caracteres. ativos: lista de textos, ex: ["abc...", "0123..."]
export function gerarPassword(tamanho, ativos) {
  const todos = ativos.join(""); // junta todos os caracteres possíveis
  let password;

  do {
    // Cria um array com "tamanho" posições, cada uma com um caracter aleatório
    password = Array.from({ length: tamanho }, () => todos[inteiroAleatorio(todos.length)]).join("");
    // Repete até a password ter pelo menos 1 caracter de cada tipo escolhido
  } while (!ativos.every((conjunto) => [...password].some((c) => conjunto.includes(c))));

  return password;
}

// Entropia em bits: quanto maior, mais difícil de adivinhar.
// Fórmula: tamanho × log2(número de caracteres possíveis)
export function calcularEntropia(tamanho, ativos) {
  const total = ativos.join("").length;
  return total ? Math.round(tamanho * Math.log2(total)) : 0;
}

// Converte bits num texto fácil de ler.
export function nomeDaForca(bits) {
  if (bits < 60) return "Fraca";
  if (bits < 80) return "Razoável";
  if (bits < 110) return "Forte";
  return "Muito forte";
}
