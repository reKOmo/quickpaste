import { d as defineEventHandler, p as parseCookies, u as useRuntimeConfig, s as sendRedirect } from './nitro/node-server.mjs';
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

const deleteAccount = defineEventHandler(async (e) => {
  const authCookie = parseCookies(e)["quickpaste_auth"];
  const config = useRuntimeConfig();
  const authenticationRes = await fetch(config.authServiceAddress + "/keys/auth", {
    method: "GET",
    headers: {
      "Authorization": "ApiKey " + authCookie
    }
  });
  if (authenticationRes.ok) {
    const userId = authenticationRes.headers.get("authorization");
    await fetch(config.internalApiAddress + "/internalapi/user", {
      method: "DELETE",
      //@ts-ignore
      headers: {
        "X-User": userId
      }
    });
    await sendRedirect(e, config.public.webAddress + "/user/logout");
  } else {
    e.res.statusCode = authenticationRes.status;
    authenticationRes.headers.forEach((key, value) => {
      e.res.setHeader(value, key);
    });
    return await authenticationRes.text();
  }
});

export { deleteAccount as default };
//# sourceMappingURL=deleteAccount.mjs.map
