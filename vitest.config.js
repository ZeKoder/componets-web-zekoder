import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      include: ['src/**/*.spec.js'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      alias: {
        '@zekoder': fileURLToPath(new URL('./node_modules/@zekoder', import.meta.url))
      },
      globals: true,
      clearMocks: true,
      css: true,
      mockReset: true,
      restoreMocks: true,
      coverage: {
        include: ['src/components/*'],
        exclude: ['src/**/*.stories.js', '**/index.js']
      }
    }
  })
)
