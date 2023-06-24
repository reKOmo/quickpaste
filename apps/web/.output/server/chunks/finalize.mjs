import { d as defineEventHandler, s as sendRedirect, a as setCookie } from './nitro/node-server.mjs';
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

function parseQuery(q) {
  if (!q)
    return {};
  const data = q.split("&");
  const ob = {};
  data.forEach((s) => {
    const param = s.split("=");
    ob[param[0]] = param[1];
  });
  return ob;
}
const finalize = defineEventHandler(async (e) => {
  const query = parseQuery(e.node.req.url.split("?")[1]);
  const failedLogin = query["fail"];
  if (failedLogin) {
    await sendRedirect(e, "/login?failedLogin=1");
    return;
  } else {
    setCookie(e, "logged_in", "1");
    await sendRedirect(e, "/");
  }
});

export { finalize as default, parseQuery };
//# sourceMappingURL=finalize.mjs.map
