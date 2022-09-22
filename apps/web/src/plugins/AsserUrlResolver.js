import path from "path";

export default defineNuxtPlugin(async () => {
    return {
        provide: {
            /**
             * 
             * @param {string} pathInAssets 
             * @returns 
             */
            resolveAssetUrl: (pathInAssets) => {
                if (pathInAssets.charAt(0) == "/") {
                    pathInAssets = pathInAssets.substring(1);
                }
                return new URL('/assets/' + pathInAssets, import.meta.url);
            }
        }
    };
});