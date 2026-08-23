import process from 'node:process'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : process.env.VITE_BASE_PATH || '/purakoro_calculator/',
  plugins: [
    vue(),
    tailwindcss(),
  ],
}))
