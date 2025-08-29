// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],

  vite: {
    ssr: {
      noExternal: ['@prisma/nuxt'],
      external: []
    },
    optimizeDeps: {
      exclude: ['@prisma/nuxt']
    }
  },

  nitro: {
    externals: {
      inline: ['@prisma/nuxt'],
      external: []
    },
    // ✅ Forza la copia degli asset generati dal PWA in produzione su Vercel
    publicAssets: [
      { baseURL: '/', dir: 'public' },
      { baseURL: '/', dir: '.output/public' }
    ]
  },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    //'@prisma/nuxt',
    '@vueuse/nuxt',
    // '@vite-pwa/nuxt'
  ],

  // pwa: {
  //   registerType: 'autoUpdate',
  //   devOptions: {
  //     enabled: true,
  //     suppressWarnings: true
  //   },
 
  //   manifestFilename: 'nn-manifest.webmanifest',
  //   includeAssets: ['favicon.ico', 'robots.txt'],
  //   manifest: {
  //     name: 'Nuxt Notes - Your simple, powerful note-taking companion',
  //     short_name: 'NuxtNotes',
  //     description: 'Your simple, powerful note-taking companion',
  //     start_url: '/',
  //     display: 'standalone',
  //     background_color: '#ffffff',
  //     theme_color: '#000000',
  //     icons: [
  //       {
  //         src: 'nn-pwa-192.png',
  //         sizes: '192x192',
  //         type: 'image/png'
  //       },
  //       {
  //         src: 'nn-pwa-512.png',
  //         sizes: '512x512',
  //         type: 'image/png'
  //       }
  //     ]
  //   }
  // }
})
