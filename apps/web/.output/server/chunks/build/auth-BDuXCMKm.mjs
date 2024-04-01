import { l as defineNuxtRouteMiddleware, m as useCookie, n as navigateTo } from './server.mjs';
import 'vue';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import '../runtime.mjs';
import 'fs';
import 'path';
import 'unhead';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/vue-fontawesome';
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/free-brands-svg-icons';
import 'vue/server-renderer';

const auth = defineNuxtRouteMiddleware((to, from) => {
  const loggedIn = useCookie("logged_in").value;
  if (loggedIn != "1") {
    return navigateTo("/login");
  }
});

export { auth as default };
//# sourceMappingURL=auth-BDuXCMKm.mjs.map
