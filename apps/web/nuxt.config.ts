import { defineNuxtConfig } from 'nuxt/config'
import * as dotenv from "dotenv";
import qConfig from "quickpaste-constants";

if (process.env.NODE_ENV == "development") {
    dotenv.config({
        path: "./src/dev.env"
    });
}

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    routeRules: {
        "/api-docs": {
            //isr: true,
            prerender: true
        }
    },
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
        "./src/modules/ContentLoader",
        // '@nuxtjs/composition-api/module',
        '@pinia/nuxt'
    ],
    css: [
        "@/assets/main.scss",
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],
    components: true,
    vite: {
        assetsInclude: ['**/*.md']
    },
    experimental: {
        componentIslands: true
    }
});
