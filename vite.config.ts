import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import createSvgSpritePlugin from 'vite-plugin-svg-sprite'
import { fileURLToPath, URL } from 'node:url'
// @ts-ignore
import vuePugPlugin from 'vue-pug-plugin'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {
                preprocessOptions: {
                    plugins: [vuePugPlugin]
                }
            }
        }),
        createSvgSpritePlugin({
            include: '**/icons/**/*.svg',
            symbolId: '[name]'
        })
    ],
    // server: {
    //     proxy: {
    //         '/api': {
    //             target: 'https://dev-ar.zonesmart.com',
    //             changeOrigin: true
    //         }
    //     }
    // },
    css: {
        preprocessorOptions: {
            sass: {
                additionalData: '@import "@/assets/styles/mixins"\n'
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
            '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
            '@helpers': fileURLToPath(new URL('./src/helpers', import.meta.url)),
            '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
            '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
            '@ui': fileURLToPath(new URL('./src/ui', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url))
        }
    },
    build: {
        outDir: './docs'
    },
    base: '/zonesmart/'
})
