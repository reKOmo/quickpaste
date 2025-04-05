import { d as defineEventHandler, b as deleteCookie, s as sendRedirect, u as useRuntimeConfig } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const logout = defineEventHandler(async (e) => {
  deleteCookie(e, "quickpaste_auth");
  deleteCookie(e, "logged_in");
  await sendRedirect(e, useRuntimeConfig().public.webAddress);
});

export { logout as default };
//# sourceMappingURL=logout.mjs.map
