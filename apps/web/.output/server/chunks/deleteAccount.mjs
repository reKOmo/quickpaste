import { defineEventHandler, useCookies, sendRedirect } from 'h3';
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

const deleteAccount = defineEventHandler(async (e) => {
  const authCookie = useCookies(e)["quickpaste_auth"];
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
