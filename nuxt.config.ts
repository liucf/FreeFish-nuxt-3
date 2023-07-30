// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  runtimeConfig: {
    // The private keys which are only available server-side
    // apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      BASE_URL: process.env.BASE_URL,
      BASE_URL_SERVER: process.env.BASE_URL_SERVER,
      // apiBase: '/api'
      nuxtSanctumAuth: {
        token: false, // set true to use jwt-token auth instead of cookie. default is false
        baseUrl: 'http://localhost:8000',
        endpoints: {
          csrf: '/sanctum/csrf-cookie',
          login: '/login',
          logout: '/logout',
          user: '/api/user'
        },
        csrf: {
          headerKey: 'X-XSRF-TOKEN',
          cookieKey: 'XSRF-TOKEN',
          tokenCookieKey: 'nuxt-sanctum-auth-token'
        },
        redirects: {
          home: '/my',
          login: '/login',
          logout: '/'
        }
      },
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

  modules: [
    'dayjs-nuxt',
  ],



  dayjs: {
    locales: ['en'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'en',
    defaultTimezone: 'Pacific/Auckland'
  }

})
