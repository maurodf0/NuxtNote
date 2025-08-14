// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  }
}
,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    //'@prisma/nuxt',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt'
  ],
pwa: {
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
       workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,webmanifest}'],
      globIgnores: ['**/node_modules/**/*', '**/@fs/**/*'],
    },
      manifestFilename: 'nn-manifest.webmanifest',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
              name: 'Nuxt Notes - Your simple, powerful note-taking companion',
        short_name: 'NuxtNotes',
        description: 'Your simple, powerful note-taking companion',
        theme_color: '#000000',
        icons: [
          {
            src: 'nn-pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'nn-pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    
})