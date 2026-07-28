import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'Staff-All-In-Working-Space';
const basePath = process.env.VITE_BASE_PATH || '';

export default defineConfig(() => {
  const isGitHubPages = Boolean(process.env.GITHUB_ACTIONS);

  return {
    // Use an explicit base when provided, otherwise use a relative base for
    // GitHub Pages so the built assets are referenced with relative paths.
    // This avoids 404s when the site is hosted under a repo subpath.
    base: basePath || (isGitHubPages ? './' : '/'),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
