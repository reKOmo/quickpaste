import { d as defineEventHandler, s as sendRedirect, a as setCookie } from '../../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';

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
