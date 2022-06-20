import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    typescript: {
        typeCheck: false
    },
    srcDir: "src/",
    modules: [
        "nuxt-windicss"
    ],
    components: true,
});
