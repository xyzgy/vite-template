import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { VantResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers';


const path = require('path');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [VantResolver(), ElementPlusResolver()],
    })],
  server: {
    hmr: { overlay: true },
    port: 8088,
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      vue: "vue/dist/vue.esm-bundler.js" // vue文件  注册局部组件时 出现警告

    }
  },
  css: {
    postcss: {
      plugins: [
        require('./src/utils/postcss-pxtorem')({
          rootValue: 75,
          propList: ['*'],
          minPixelValue: 10,
          unitPrecision: 2,
          exclude: (file) => {
            const ignore = ['node_modules/element-plus', 'node_modules/vant'];
            for (const str in ignore) {
              return file.indexOf(ignore[str]) > -1;
            }
          },
          mediaQuery: true,
          // selectorBlackList: ['.el']  //过滤不需要zhuan rem的classs
        })
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/variables" as * ;`
      }
    }
  },
})
