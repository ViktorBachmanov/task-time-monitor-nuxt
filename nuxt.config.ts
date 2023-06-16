// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    // apiSecret: "123",
    databaseHost: "",
    databaseUser: "",
    databasePassword: "",
    database: "",
    // Keys within public are also exposed client-side
    public: {
      // apiBase: '/api'
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "@/assets/_reset.scss" as *; @use "@/assets/_colors.scss" as *;',
        },
      },
    },
  },

  components: ["~/components"],

  modules: ["@invictus.codes/nuxt-vuetify"],

  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      // @TODO: list all vuetify options
      theme: {
        defaultTheme: "dark",
      },
    },
  },
});
