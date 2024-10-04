// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/scss/variable.scss'],
  ssr: false,
  runtimeConfig: {
    public: {
      BASE_URL: process.env.NUXT_PUBLIC_BASE_URL,
      UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    }
  },

  modules: ['@pinia/nuxt']
})