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
})
