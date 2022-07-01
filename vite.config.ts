import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const pathResolve = (dir: string) => resolve(__dirname, dir)


export default defineConfig({
  plugins: [
    vue(),
    AutoImport(),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/components'],
      extensions: ['vue'],
      dts: 'src/components.d.ts',
      include: [/.vue$/, /.vue?vue/],
      exclude: [/[\/]node_modules[\/]/, /[\/].git[\/]/, /[\/].nuxt[\/]/],
    }),
  ],
  resolve: {
    alias: {
      '@': pathResolve('./src'),
      views: pathResolve('./src/views'),
      componetns: pathResolve('./src/components'),
      assets: pathResolve('./src/assets')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/common.scss";`,
        javascriptEnbled: true
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    cors: true
  }
})
