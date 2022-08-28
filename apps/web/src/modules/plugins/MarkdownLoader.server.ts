import fs from "fs";
import path from "path";

export default defineNuxtPlugin(async (app) => {
    return {
        provide: {
            loadFile: async (pathInContent: string) => {
                const f = fs.readFileSync(path.join(app.ssrContext.runtimeConfig.rootDir, "content", pathInContent)).toString("utf-8");
                return f;
            }
        }
    };
});