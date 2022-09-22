import { defineNuxtConfig } from 'nuxt';
import * as dotenv from "dotenv";
import qConfig from "quickpaste-constants";

if (process.env.NODE_ENV == "development") {
    dotenv.config({
        path: "./src/dev.env"
    });
}

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
        githubClientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
        githubClientId: process.env.GITHUB_CLIENT_ID ?? "",
        internalGatewayAddress: process.env.INTERNAL_GATEWAY_ADDRESS ?? "",
        internalApiAddress: process.env.INTERNAL_API_ADDRESS ?? "",
        authServiceAddress: process.env.AUTH_SERVICE_ADDRESS ?? "",
        webAddress: process.env.WEB_ADDRESS ?? "",
        public: {
            githubClientId: process.env.GITHUB_CLIENT_ID ?? "",
            webAddress: process.env.WEB_ADDRESS ?? "",
            hCaptchaSitekey: process.env.HCAPTCHA_SITEKEY ?? "",
            supportedSyntaxes: qConfig.SUPPORTED_SYNTAXES
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
    server: {
        port: 3000
    }
});
