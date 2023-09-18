import { defineConfig } from 'tsup'
import multiEntry from 'rollup-plugin-multi-entry'

export default defineConfig({
  entry: ['src/module/**/*', 'src/shared/**/*'],
  format: ['cjs'],
  plugins: [multiEntry()],
  outDir: './dist',
})
