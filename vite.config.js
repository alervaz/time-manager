import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyComponentLibrary',
      fileName: 'bundle'
    },
    rollupOptions: {
      // This will prevent splitting code into different chunks.
      output: {
        manualChunks: undefined
      }
    }
  }
})


