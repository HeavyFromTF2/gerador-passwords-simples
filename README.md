# Gerador de passwords

Aplicação web simples, feita com React e Vite, que gera passwords seguras diretamente no navegador.

## Funcionalidades

- Tamanho da password entre 8 e 64 caracteres
- Escolha de minúsculas, maiúsculas, números e símbolos
- Indicador de força (entropia em bits)
- Botão para copiar

## Segurança

- Usa `crypto.getRandomValues` (aleatoriedade segura), nunca `Math.random`
- Tudo corre no navegador: nada é enviado nem guardado
- Política CSP no `index.html` que bloqueia pedidos e scripts externos

## Como correr

É preciso ter o [Node.js](https://nodejs.org) instalado (versão LTS).

```bash
npm install
npm run dev
```

Abre o endereço que aparecer (normalmente http://localhost:5173).

## Estrutura

| Ficheiro | Função |
| --- | --- |
| `src/gerador.js` | Lógica: gerar password e calcular força |
| `src/App.jsx` | Interface e interação (React) |
| `src/App.css` | Estilos |
| `src/main.jsx` | Liga o React à página |
| `index.html` | Página base |
