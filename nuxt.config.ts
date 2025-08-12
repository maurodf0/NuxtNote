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
  ]
})