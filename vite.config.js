// Configuração do Vite (a ferramenta que corre e empacota o projeto).
// O plugin do React permite escrever JSX nos ficheiros .jsx.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
