import { m as defineNuxtRouteMiddleware, n as useCookie, o as navigateTo } from '../server.mjs';
import 'vue';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'h3';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'ufo';
import 'fs';
import 'path';
import '@fortawesome/vue-fontawesome';
import 'vue/server-renderer';
import 'cookie-es';
import 'ohash';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'klona';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const auth = /* @__PURE__ */ defineNuxtRouteMiddleware((to, from) => {
  const loggedIn = useCookie("logged_in").value;
  if (loggedIn != "1") {
    return navigateTo("/login");
  }
});

export { auth as default };
//# sourceMappingURL=auth-0c554e83.mjs.map
