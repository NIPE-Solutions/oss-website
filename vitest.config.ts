import { fileURLToPath } from 'node:url'

import { defaultExclude, defineConfig } from 'vitest/config'

export default defineConfig({
  oxc: {
    jsx: {
      runtime: 'automatic',
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    exclude: [...defaultExclude, 'e2e/**', '.worktrees/**'],
    setupFiles: ['./src/test/setup.ts'],
  },
})
