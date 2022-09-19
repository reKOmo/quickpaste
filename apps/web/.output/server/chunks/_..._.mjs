import { defineEventHandler, useCookies, useRawBody } from 'h3';
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

const _____ = defineEventHandler(async (e) => {
  const destRoute = e.req.url.replace("webapi", "api");
  const runtimeConfig = useRuntimeConfig();
  const authCookie = useCookies(e)["quickpaste_auth"];
  const headers = {
    "Authorization": "ApiKey " + authCookie,
    "Contente-Type": e.req.headers["content-type"],
    "Content-Length": e.req.headers["content-length"]
  };
  try {
    const res = await fetch(runtimeConfig.internalGatewayAddress + destRoute, {
      method: e.req.method,
      headers,
      body: ["GET", "DELETE", "TRACE", "OPTIONS", "HEAD"].includes(e.req.method) ? void 0 : await useRawBody(e)
    });
    e.res.statusCode = res.status;
    res.headers.forEach((key, value) => {
      e.res.setHeader(value, key);
    });
    return await res.text();
  } catch (err) {
    console.log(err);
    console.log(runtimeConfig.internalGatewayAddress);
    console.log(destRoute);
    e.res.statusCode = 500;
    return { ok: false, result: "Server error" };
  }
});

export { _____ as default };
//# sourceMappingURL=_..._.mjs.map
