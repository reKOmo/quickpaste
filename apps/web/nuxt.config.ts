import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    typescript: {
        typeCheck: false
    },
    srcDir: "src/",
    modules: [
        "nuxt-windicss",
        "./src/modules/ContentLoader"
        // '@nuxtjs/composition-api/module',
        // '@pinia/nuxt'
    ],
    buildModules: [
        '@pinia/nuxt'
    ],
    css: ["@/assets/main.scss"],
    components: true,
    transpile: [
        '@fortawesome/vue-fontawesome',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/free-regular-svg-icons',
        '@fortawesome/free-brands-svg-icons'
    ],
    vite: {
        assetsInclude: ['**/*.md']
    }
});
