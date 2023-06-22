import { defineEventHandler, parseCookies } from 'h3';
import { u as useRuntimeConfig } from './nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'klona';
import 'defu';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const generatePermaKey = defineEventHandler(async (e) => {
  const authCookie = parseCookies(e)["quickpaste_auth"];
  const res = await fetch(useRuntimeConfig().authServiceAddress + "/keys/generate", {
    method: "GET",
    headers: {
      "Authorization": "ApiKey " + authCookie
    }
  });
  e.node.res.statusCode = res.status;
  res.headers.forEach((key, value) => {
    e.node.res.setHeader(value, key);
  });
  return await res.text();
});

export { generatePermaKey as default };
//# sourceMappingURL=generatePermaKey.mjs.map
