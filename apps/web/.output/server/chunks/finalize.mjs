import { d as defineEventHandler, s as sendRedirect, b as setCookie } from './nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'ufo';
import 'cookie-es';
import 'radix3';
import 'ohmyfetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';

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
  const query = parseQuery(e.req.url.split("?")[1]);
  const failedLogin = query["fail"];
  if (failedLogin) {
    await sendRedirect(e, "/login?failedLogin=1");
    return;
  } else {
    setCookie(e, "logged_in", "1");
    await sendRedirect(e, "/");
  }
});

export { finalize as default };
//# sourceMappingURL=finalize.mjs.map
