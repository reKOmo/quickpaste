import { defineEventHandler } from 'h3';

const _fileName__get = defineEventHandler(async (e) => {
  const fileName = e.context.params.fileName;
  const markdown = useNuxtApp().$loadFile(fileName);
  return markdown;
});

export { _fileName__get as default };
//# sourceMappingURL=_fileName_.get.mjs.map
