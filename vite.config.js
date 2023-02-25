import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject'
import path from 'path'
import { resolve } from 'path'
// import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  optimizeDeps: {
    // disabled: false, // https://github.com/vitejs/vite/issues/9703
  },
  resolve: {
    alias: {
      // https://github.com/web3/web3.js/issues/4453#issuecomment-1054186564
      https: 'agent-base',
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  build: {
    rollupOptions: {
      // https://gist.github.com/darkoatanasovski/ed7ea7f4d7d2f174d2ebbd3540879fec
      plugins: [inject({ Buffer: ['Buffer', 'Buffer'], process: 'process' })],
      input: {
        main: resolve(__dirname, 'index.html'),
        test: resolve(__dirname, 'test/index.html')
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true, // https://github.com/chnejohnson/vue-dapp/issues/20
    },
  },
  define: {
    // global: {}, // https://stackoverflow.com/questions/72114775/vite-global-is-not-defined
    // 'process.env': {}, // https://github.com/vitejs/vite/issues/1973
  },
})