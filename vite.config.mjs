import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as fs from 'fs'
import * as path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relative) => path.resolve(appDirectory, relative)
const root = path.resolve(__dirname, resolveApp('src'))

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    server: {
      port: Number(env.VITE_PORT),
    },
    plugins: [
      react(), 
      tsconfigPaths(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'static/icons')],
        symbolId: '[name]',
      }),
    ],
    publicDir: 'static',
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.mjs',
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', 'css', 'scss'],
      alias: {
        '@': `${root}/`,
        '@config': `${root}/config.ts`,
        '@static': `${root}/../static`,
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/mantine";`,
        },
      },
    },
  }
});
