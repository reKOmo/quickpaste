import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit';
import path from "path";


export default defineNuxtModule({
    meta: {
        configKey: "contentLoader",
        compatibility: {
            // Semver version of supported nuxt versions
            nuxt: '^3.0.0'
        }
    },
    async setup(moduleOptions, nuxt) {
        const { resolve } = createResolver(import.meta.url);

        nuxt.options.runtimeConfig["rootDir"] = path.resolve(__dirname, "../");

        addPlugin(resolve('./plugins/MarkdownLoader.server'));
    }
});