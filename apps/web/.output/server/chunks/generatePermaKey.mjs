import { defineEventHandler, useCookies } from 'h3';
import { u as useRuntimeConfig } from './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'ufo';
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
