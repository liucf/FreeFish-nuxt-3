// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      BASE_URL: process.env.BASE_URL,
      BASE_URL_SERVER: process.env.BASE_URL_SERVER
      // apiBase: '/api'
    }
  },

  css: [
    '@/assets/css/main.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

})
