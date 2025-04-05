import { d as defineEventHandler, p as parseCookies, u as useRuntimeConfig } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const generatePermaKey = defineEventHandler(async (e) => {
  const authCookie = parseCookies(e)["quickpaste_auth"];
  const res = await fetch(useRuntimeConfig().authServiceAddress + "/keys/generate", {
    method: "GET",
    headers: {
      "Authorization": "ApiKey " + authCookie
    }
  });
  e.node.res.statusCode = res.status;
  res.headers.forEach((key, value) => {
    e.node.res.setHeader(value, key);
  });
  return await res.text();
});

export { generatePermaKey as default };
//# sourceMappingURL=generatePermaKey.mjs.map
