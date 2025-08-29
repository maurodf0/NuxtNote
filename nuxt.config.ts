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


  
})
