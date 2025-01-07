// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/eslint"],
  devtools: { enabled: true },
  css: ["@/assets/css/base.css"],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-12-23",

  eslint: {
    config: {
      stylistic: {
        quotes: "double",
      },
    },
  },

  runtimeConfig: {
    nodeEnv: process.env.NODE_ENV,
    public: {
      apiBaseURL: process.env.NODE_ENV === "production"
        ? 'https://bic-api.vercel.app/'
        : "http://localhost:3000"
    }
  },

  nitro: {
    experimental: {
      openAPI: true,
    },
    routeRules: {
      "/api/**": { cors: true },
    },
  },
})
