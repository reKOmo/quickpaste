import fs from "fs";
import path from "path";

export default defineNuxtPlugin({
    name: "FileLoader",
    enforce: "pre",
    async setup(nuxtApp) {
        nuxtApp.provide("loadFile", async (filePath: string) => {
            return new Promise<string>((resolve, reject) => {
                const p = path.join(__dirname, "../../assets", filePath);
                fs.readFile(p, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
            })
        });
    }
});