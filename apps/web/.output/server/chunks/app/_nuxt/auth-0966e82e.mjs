import { k as defineNuxtRouteMiddleware, l as useCookie, n as navigateTo } from '../server.mjs';
import 'vue';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ufo';
import 'radix3';
import 'cookie-es';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'klona';
import 'defu';
import 'ohash';
import 'unstorage';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'http-graceful-shutdown';
import 'fs';
import 'path';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/vue-fontawesome';
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/free-brands-svg-icons';
import 'vue/server-renderer';

const auth = /* @__PURE__ */ defineNuxtRouteMiddleware((to, from) => {
  const loggedIn = useCookie("logged_in").value;
  if (loggedIn != "1") {
    return navigateTo("/login");
  }
});

export { auth as default };
//# sourceMappingURL=auth-0966e82e.mjs.map
