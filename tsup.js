import { defineConfig } from 'tsup'
import multiEntry from '@rollup/plugin-multi-entry'

export default defineConfig({
  entry: ['src/module/**/*', 'src/shared/**/*'],
  format: ['esm'],
  tsconfig: 'tsconfig.json',
  target: 'es2021',
  plugins: [multiEntry({
    exclude: 'node_modules',
  })],
  outDir: './dist',
})
