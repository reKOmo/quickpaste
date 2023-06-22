import { defineEventHandler, deleteCookie, sendRedirect } from 'h3';
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

const logout = defineEventHandler(async (e) => {
  deleteCookie(e, "quickpaste_auth");
  deleteCookie(e, "logged_in");
  await sendRedirect(e, useRuntimeConfig().public.webAddress);
});

export { logout as default };
//# sourceMappingURL=logout.mjs.map
