import { d as defineEventHandler } from './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'ufo';
import 'cookie-es';
import 'radix3';
import 'ohmyfetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';

const _fileName__get = defineEventHandler(async (e) => {
  const fileName = e.context.params.fileName;
  const markdown = useNuxtApp().$loadFile(fileName);
  return markdown;
});

export { _fileName__get as default };
//# sourceMappingURL=_fileName_.get.mjs.map
