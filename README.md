# Gerador de passwords (React + Vite)

## Como correr
1. Instala o Node.js (https://nodejs.org)
2. Na pasta do projeto:
   npm install
   npm run dev
3. Abre o endereço que aparece (normalmente http://localhost:5173)

## Onde está cada coisa
- src/gerador.js : lógica (gerar password, calcular força). Sem React.
- src/App.jsx    : o ecrã e a interação (React).
- src/App.css    : aspeto.
- src/main.jsx   : liga o React à página.
- index.html     : página base (inclui regras de segurança CSP).
