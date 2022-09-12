import { defineEventHandler, sendRedirect, setCookie } from 'h3';

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
