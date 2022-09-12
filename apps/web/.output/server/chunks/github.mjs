import { defineEventHandler, sendRedirect, setCookie } from 'h3';
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

function parseQuery(q) {
  const data = q.split("&");
  const ob = {};
  data.forEach((s) => {
    const param = s.split("=");
    ob[param[0]] = param[1];
  });
  return ob;
}
const github = defineEventHandler(async (e) => {
  const query = parseQuery(e.req.url.split("?")[1]);
  if (!query.code) {
    await sendRedirect(e, "/user/login/finalize?fail=1", 302);
    return;
  }
  const res = await fetch(`https://github.com/login/oauth/access_token?client_secret=${useRuntimeConfig().githubSecret}&client_id=${useRuntimeConfig().githubId}&code=${query.code}`, {
    method: "POST",
    headers: {
      "Accept": "application/json"
    }
  });
  if (res.ok) {
    const data = await res.json();
    const internalRes = await fetch(useRuntimeConfig().authServiceAddress + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "github",
        token: data.access_token
      })
    });
    if (internalRes.ok) {
      const key = await internalRes.text();
      setCookie(e, "quickpaste_auth", key, {
        httpOnly: true
      });
      await sendRedirect(e, "/user/login/finalize", 302);
      return;
    } else {
      await sendRedirect(e, "/user/login/finalize?fail=1", 302);
      return;
    }
  } else {
    await sendRedirect(e, "/user/login/finalize?fail=1", 302);
  }
});

export { github as default };
//# sourceMappingURL=github.mjs.map
