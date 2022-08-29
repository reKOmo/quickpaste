import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
        githubSecret: process.env.GITHUB_CLIENT_SECRET,
        githubId: process.env.GITHUB_CLIENT_ID,
        internalGatewayAddress: process.env.INTERNAL_GATEWAY_ADDRESS,
        internalApiAddress: process.env.INTERNAL_API_ADDRESS,
        authServiceAddress: process.env.AUTH_SERVICE_ADDRESS,
        public: {
            githubId: process.env.GITHUB_CLIENT_ID,
            webAddress: process.env.WEB_ADDRESS,
            hCaptchaSiteley: process.env.HCAPTCHA_SITEKEY,
        }
    },
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
    },
    nitro: {
        prerender: {
            routes: ["/api"]
        }
    }
});
