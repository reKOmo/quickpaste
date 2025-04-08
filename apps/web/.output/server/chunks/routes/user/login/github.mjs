import { d as defineEventHandler, s as sendRedirect, u as useRuntimeConfig, a as setCookie } from '../../../nitro/nitro.mjs';
import { parseQuery } from './finalize.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const github = defineEventHandler(async (e) => {
  const query = parseQuery(e.node.req.url.split("?")[1]);
  console.log(query);
  if (!query.code) {
    await sendRedirect(e, "/user/login/finalize?fail=1", 302);
    return;
  }
  try {
    const res = await fetch(`https://github.com/login/oauth/access_token?client_secret=${useRuntimeConfig().githubClientSecret}&client_id=${useRuntimeConfig().githubClientId}&code=${query.code}`, {
      method: "POST",
      headers: {
        "Accept": "application/json"
      }
    });
    if (res.status == 200) {
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
  } catch (err) {
    await sendRedirect(e, "/user/login/finalize?fail=1", 302);
  }
});

export { github as default };
//# sourceMappingURL=github.mjs.map
