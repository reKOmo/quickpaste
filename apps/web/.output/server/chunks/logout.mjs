import { defineEventHandler, deleteCookie, sendRedirect } from 'h3';
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

const logout = defineEventHandler(async (e) => {
  deleteCookie(e, "quickpaste_auth");
  deleteCookie(e, "logged_in");
  await sendRedirect(e, useRuntimeConfig().public.webAddress);
});

export { logout as default };
//# sourceMappingURL=logout.mjs.map