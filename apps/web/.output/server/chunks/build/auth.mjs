import { m as defineNuxtRouteMiddleware, n as useCookie, o as navigateTo } from './server.mjs';
import 'vue';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'pinia';
import 'fs';
import 'path';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/vue-fontawesome';
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/free-brands-svg-icons';
import 'vue/server-renderer';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';

const auth = defineNuxtRouteMiddleware((to, from) => {
  const loggedIn = useCookie("logged_in").value;
  if (loggedIn != "1") {
    return navigateTo("/login");
  }
});

export { auth as default };
//# sourceMappingURL=auth.mjs.map
