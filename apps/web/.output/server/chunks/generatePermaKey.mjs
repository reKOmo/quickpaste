import { d as defineEventHandler, c as useCookies, u as useRuntimeConfig } from './node-server.mjs';
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

const generatePermaKey = defineEventHandler(async (e) => {
  const authCookie = useCookies(e)["quickpaste_auth"];
  const res = await fetch(useRuntimeConfig().authServiceAddress + "/keys/generate", {
    method: "GET",
    headers: {
      "Authorization": "ApiKey " + authCookie
    }
  });
  e.res.statusCode = res.status;
  res.headers.forEach((key, value) => {
    e.res.setHeader(value, key);
  });
  return await res.text();
});

export { generatePermaKey as default };
//# sourceMappingURL=generatePermaKey.mjs.map
