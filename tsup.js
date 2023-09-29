import { defineConfig } from 'tsup'
import multiEntry from 'rollup-plugin-multi-entry'

export default defineConfig({
  entry: ['src/module/**/*', 'src/shared/**/*'],
  format: ['cjs', 'esm'],
  plugins: [multiEntry()],
  outDir: './dist',
})
