import { d as defineEventHandler, b as deleteCookie, s as sendRedirect, u as useRuntimeConfig } from './nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ufo';
import 'radix3';
import 'cookie-es';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'klona';
import 'defu';
import 'ohash';
import 'unstorage';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'http-graceful-shutdown';

const logout = defineEventHandler(async (e) => {
  deleteCookie(e, "quickpaste_auth");
  deleteCookie(e, "logged_in");
  await sendRedirect(e, useRuntimeConfig().public.webAddress);
});

export { logout as default };
//# sourceMappingURL=logout.mjs.map
