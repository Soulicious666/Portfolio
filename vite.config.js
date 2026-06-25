import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For GitHub Pages project sites the app is served from /<repo-name>/.
// Set REPO_NAME (or edit the fallback) to your repository name.
const repo = process.env.REPO_NAME || "portfolio";

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? `/${repo}/` : "/",
});
