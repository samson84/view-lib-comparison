import {defineConfig} from 'vitest/config'
import {svelte} from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte({hot: !process.env.VITEST})],
  test: {
    globals: true,
    environment: 'jsdom',
    alias: [{ find: /^svelte$/, replacement: 'svelte/internal' }],
    setupFiles: ['./vitest-setup.ts']
  }
})