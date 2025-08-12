// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    ssr: {
      noExternal: ['@prisma/client']
    }
  },
  nitro: {
    externals: {
      inline: ['@prisma/client']
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@prisma/nuxt',
    '@vueuse/nuxt',
  ]
})