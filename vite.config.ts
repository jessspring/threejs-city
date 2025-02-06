import { defineConfig } from "vite"
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  base: "",
  esbuild: {
    supported: {
      'top-level-await': true
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'images',
          dest: './'
        }
      ]
    })
  ]
})