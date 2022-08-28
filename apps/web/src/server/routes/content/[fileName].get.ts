export default defineEventHandler(async (e) => {
    const fileName = e.context.params.fileName;
    const markdown = useNuxtApp().$loadFile(fileName);

    return markdown;
});