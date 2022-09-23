globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { withoutTrailingSlash, getQuery as getQuery$1, parseURL, withQuery, withLeadingSlash } from 'ufo';
import { serialize, parse } from 'cookie-es';
import { createRouter as createRouter$1 } from 'radix3';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { createStorage } from 'unstorage';
import { promises } from 'fs';
import { dirname, resolve } from 'pathe';
import { fileURLToPath } from 'url';

class H3Error extends Error {
  constructor() {
    super(...arguments);
    this.statusCode = 500;
    this.fatal = false;
    this.unhandled = false;
    this.statusMessage = "Internal Server Error";
  }
}
H3Error.__h3_error__ = true;
function createError(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage, input.cause ? { cause: input.cause } : void 0);
  if ("stack" in input) {
    try {
      Object.defineProperty(err, "stack", { get() {
        return input.stack;
      } });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.statusCode) {
    err.statusCode = input.statusCode;
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.res.writableEnded) {
    return;
  }
  const h3Error = isError(error) ? error : createError(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.res.writableEnded) {
    return;
  }
  event.res.statusCode = h3Error.statusCode;
  event.res.statusMessage = h3Error.statusMessage;
  event.res.setHeader("Content-Type", MIMES.json);
  event.res.end(JSON.stringify(responseBody, null, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.req.url || "");
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public"].concat(opts.cacheControls || []);
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.req.headers["if-modified-since"];
    event.res.setHeader("Last-Modified", modifiedTime.toUTCString());
    if (ifModifiedSince) {
      if (new Date(ifModifiedSince) >= opts.modifiedTime) {
        cacheMatched = true;
      }
    }
  }
  if (opts.etag) {
    event.res.setHeader("Etag", opts.etag);
    const ifNonMatch = event.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.res.setHeader("Cache-Control", cacheControls.join(", "));
  if (cacheMatched) {
    event.res.statusCode = 304;
    event.res.end("");
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const defer = typeof setImmediate !== "undefined" ? setImmediate : (fn) => fn();
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      event.res.end(data);
      resolve(void 0);
    });
  });
}
function defaultContentType(event, type) {
  if (type && !event.res.getHeader("Content-Type")) {
    event.res.setHeader("Content-Type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.res.statusCode = code;
  event.res.setHeader("Location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function appendResponseHeader(event, name, value) {
  let current = event.res.getHeader(name);
  if (!current) {
    event.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.res.setHeader(name, current.concat(value));
}
const appendHeader = appendResponseHeader;
function isStream(data) {
  return data && typeof data === "object" && typeof data.pipe === "function" && typeof data.on === "function";
}
function sendStream(event, data) {
  return new Promise((resolve, reject) => {
    data.pipe(event.res);
    data.on("end", () => resolve(void 0));
    data.on("error", (error) => reject(createError(error)));
  });
}

function parseCookies(event) {
  return parse(event.req.headers.cookie || "");
}
const useCookies = parseCookies;
function setCookie(event, name, value, serializeOptions) {
  const cookieStr = serialize(name, value, {
    path: "/",
    ...serializeOptions
  });
  appendHeader(event, "Set-Cookie", cookieStr);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}

class H3Headers {
  constructor(init) {
    if (!init) {
      this._headers = {};
    } else if (Array.isArray(init)) {
      this._headers = Object.fromEntries(init.map(([key, value]) => [key.toLowerCase(), value]));
    } else if (init && "append" in init) {
      this._headers = Object.fromEntries([...init.entries()]);
    } else {
      this._headers = Object.fromEntries(Object.entries(init).map(([key, value]) => [key.toLowerCase(), value]));
    }
  }
  append(name, value) {
    const _name = name.toLowerCase();
    this.set(_name, [this.get(_name), value].filter(Boolean).join(", "));
  }
  delete(name) {
    delete this._headers[name.toLowerCase()];
  }
  get(name) {
    return this._headers[name.toLowerCase()];
  }
  has(name) {
    return name.toLowerCase() in this._headers;
  }
  set(name, value) {
    this._headers[name.toLowerCase()] = String(value);
  }
  forEach(callbackfn) {
    Object.entries(this._headers).forEach(([key, value]) => callbackfn(value, key, this));
  }
}

class H3Response {
  constructor(body = null, init = {}) {
    this.body = null;
    this.type = "default";
    this.bodyUsed = false;
    this.headers = new H3Headers(init.headers);
    this.status = init.status ?? 200;
    this.statusText = init.statusText || "";
    this.redirected = !!init.status && [301, 302, 307, 308].includes(init.status);
    this._body = body;
    this.url = "";
    this.ok = this.status < 300 && this.status > 199;
  }
  clone() {
    return new H3Response(this.body, {
      headers: this.headers,
      status: this.status,
      statusText: this.statusText
    });
  }
  arrayBuffer() {
    return Promise.resolve(this._body);
  }
  blob() {
    return Promise.resolve(this._body);
  }
  formData() {
    return Promise.resolve(this._body);
  }
  json() {
    return Promise.resolve(this._body);
  }
  text() {
    return Promise.resolve(this._body);
  }
}

class H3Event {
  constructor(req, res) {
    this["__is_event__"] = true;
    this.context = {};
    this.req = req;
    this.res = res;
    this.event = this;
    req.event = this;
    req.context = this.context;
    req.req = req;
    req.res = res;
    res.event = this;
    res.res = res;
    res.req = res.req || {};
    res.req.res = res;
    res.req.req = req;
  }
  respondWith(r) {
    Promise.resolve(r).then((_response) => {
      if (this.res.writableEnded) {
        return;
      }
      const response = _response instanceof H3Response ? _response : new H3Response(_response);
      response.headers.forEach((value, key) => {
        this.res.setHeader(key, value);
      });
      if (response.status) {
        this.res.statusCode = response.status;
      }
      if (response.statusText) {
        this.res.statusMessage = response.statusText;
      }
      if (response.redirected) {
        this.res.setHeader("Location", response.url);
      }
      if (!response._body) {
        return this.res.end();
      }
      if (typeof response._body === "string" || "buffer" in response._body || "byteLength" in response._body) {
        return this.res.end(response._body);
      }
      if (!response.headers.has("content-type")) {
        response.headers.set("content-type", MIMES.json);
      }
      this.res.end(JSON.stringify(response._body));
    });
  }
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function callHandler(handler, req, res) {
  const isMiddleware = handler.length > 2;
  return new Promise((resolve, reject) => {
    const next = (err) => {
      if (isMiddleware) {
        res.off("close", next);
        res.off("error", next);
      }
      return err ? reject(createError(err)) : resolve(void 0);
    };
    try {
      const returned = handler(req, res, next);
      if (isMiddleware && returned === void 0) {
        res.once("close", next);
        res.once("error", next);
      } else {
        resolve(returned);
      }
    } catch (err) {
      next(err);
    }
  });
}

function defineEventHandler(handler) {
  handler.__is_handler__ = true;
  return handler;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return "__is_handler__" in input;
}
function toEventHandler(handler) {
  if (isEventHandler(handler)) {
    return handler;
  }
  if (typeof handler !== "function") {
    throw new TypeError("Invalid handler. It should be a function:", handler);
  }
  return eventHandler((event) => {
    return callHandler(handler, event.req, event.res);
  });
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler = r.default || r;
        if (typeof handler !== "function") {
          throw new TypeError("Invalid lazy handler result. It should be a function:", handler);
        }
        _resolved = toEventHandler(r.default || r);
        return _resolved;
      });
    }
    return _promise;
  };
  return eventHandler((event) => {
    if (_resolved) {
      return _resolved(event);
    }
    return resolveHandler().then((handler) => handler(event));
  });
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const nodeHandler = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await handler(event);
    } catch (_error) {
      const error = createError(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      if (options.onError) {
        await options.onError(error, event);
      } else {
        if (error.unhandled || error.fatal) {
          console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
        }
        await sendError(event, error, !!options.debug);
      }
    }
  };
  const app = nodeHandler;
  app.nodeHandler = nodeHandler;
  app.stack = stack;
  app.handler = handler;
  app.use = (arg1, arg2, arg3) => use(app, arg1, arg2, arg3);
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    arg1.forEach((i) => use(app, i, arg2, arg3));
  } else if (Array.isArray(arg2)) {
    arg2.forEach((i) => use(app, arg1, i, arg3));
  } else if (typeof arg1 === "string") {
    app.stack.push(normalizeLayer({ ...arg3, route: arg1, handler: arg2 }));
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, route: "/", handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.req.originalUrl = event.req.originalUrl || event.req.url || "/";
    const reqUrl = event.req.url || "/";
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!reqUrl.startsWith(layer.route)) {
          continue;
        }
        event.req.url = reqUrl.slice(layer.route.length) || "/";
      } else {
        event.req.url = reqUrl;
      }
      if (layer.match && !layer.match(event.req.url, event)) {
        continue;
      }
      const val = await layer.handler(event);
      if (event.res.writableEnded) {
        return;
      }
      const type = typeof val;
      if (type === "string") {
        return send(event, val, MIMES.html);
      } else if (isStream(val)) {
        return sendStream(event, val);
      } else if (val === null) {
        event.res.statusCode = 204;
        return send(event);
      } else if (type === "object" || type === "boolean" || type === "number") {
        if (val.buffer) {
          return send(event, val);
        } else if (val instanceof Error) {
          throw createError(val);
        } else {
          return send(event, JSON.stringify(val, null, spacing), MIMES.json);
        }
      }
    }
    if (!event.res.writableEnded) {
      throw createError({ statusCode: 404, statusMessage: "Not Found" });
    }
  });
}
function normalizeLayer(input) {
  let handler = input.handler || input.handle;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}

const RouterMethods = ["connect", "delete", "get", "head", "options", "post", "put", "trace", "patch"];
function createRouter() {
  const _router = createRouter$1({});
  const routes = {};
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      method.forEach((m) => addRoute(path, handler, m));
    } else {
      route.handlers[method] = toEventHandler(handler);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  router.handler = eventHandler((event) => {
    let path = event.req.url || "/";
    const queryUrlIndex = path.lastIndexOf("?");
    if (queryUrlIndex > -1) {
      path = path.substring(0, queryUrlIndex);
    }
    const matched = _router.lookup(path);
    if (!matched) {
      throw createError({
        statusCode: 404,
        name: "Not Found",
        statusMessage: `Cannot find any route matching ${event.req.url || "/"}.`
      });
    }
    const method = (event.req.method || "get").toLowerCase();
    const handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      throw createError({
        statusCode: 405,
        name: "Method Not Allowed",
        statusMessage: `Method ${method} is not allowed on this route.`
      });
    }
    const params = matched.params || {};
    event.event.context.params = params;
    event.req.context.params = params;
    return handler(event);
  });
  return router;
}

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{"githubClientId":"","webAddress":"","hCaptchaSitekey":"","supportedSyntaxes":["text","markup","html","xml","svg","mathml","ssml","atom","rss","css","like","javascript","js","abap","abnf","actionscript","ada","agda","al","antlr4","g4","apacheconf","apex","apl","applescript","aql","arduino","ino","arff","armasm","arm","arturo","art","asciidoc","adoc","aspnet","asm6502","asmatmel","autohotkey","autoit","avisynth","avs","avro","awk","gawk","bash","sh","shell","basic","batch","bbcode","shortcode","bbj","bicep","birb","bison","bnf","rbnf","bqn","brainfuck","brightscript","bro","bsl","oscript","c","csharp","cs","dotnet","cpp","cfscript","cfc","chaiscript","cil","cilkc","cilk","cilkcpp","cilk","clojure","cmake","cobol","coffeescript","coffee","concurnas","conc","Security","cooklang","coq","crystal","css","csv","cue","cypher","d","dart","dataweave","dax","dhall","diff","django","jinja2","dns","docker","dockerfile","dot","gv","ebnf","editorconfig","eiffel","ejs","eta","elixir","elm","etlua","erb","erlang","excel","fsharp","factor","false","firestore","flow","fortran","ftl","gml","gamemakerlanguage","gap","code","gdscript","gedcom","gettext","po","gherkin","git","glsl","gn","gni","linker","go","go","gradle","graphql","groovy","haml","handlebars","hbs","mustache","haskell","hs","haxe","hcl","hlsl","hoon","http","Key","Transport","ichigojam","icon","icu","idris","idr","ignore","gitignore","hgignore","npmignore","inform7","ini","io","j","java","javadoc","like","javastacktrace","jexl","jolie","jq","jsdoc","js","json","webmanifest","json5","jsonp","jsstacktrace","js","julia","keepalived","keyman","kotlin","kt","kts","kumir","kum","kusto","latex","tex","context","latte","less","lilypond","ly","liquid","lisp","emacs","elisp","emacs","livescript","llvm","log","lolcode","lua","magma","makefile","markdown","md","markup","mata","matlab","maxscript","mel","mermaid","metafont","mizar","mongodb","monkey","moonscript","moon","n1ql","n4js","n4jsd","nand2tetris","naniscript","nani","nasm","neon","nevod","nginx","nim","nix","nsis","C","ocaml","odin","opencl","openqasm","qasm","oz","parigp","parser","pascal","objectpascal","pascaligo","psl","Axis","peoplecode","pcode","perl","php","phpdoc","php","plant","plsql","powerquery","pq","mscript","powershell","processing","prolog","promql","properties","protobuf","pug","puppet","pure","purebasic","pbfasm","purescript","purs","python","py","qsharp","qs","q","qml","qore","r","racket","rkt","cshtml","razor","jsx","tsx","reason","regex","rego","renpy","rpy","rescript","res","rest","rip","roboconf","robotframework","robot","ruby","rb","rust","sas","sass","scss","scala","scheme","shell","smali","smalltalk","smarty","sml","smlnj","solidity","sol","solution","soy","sparql","rq","splunk","sqf","sql","squirrel","stan","stata","3)","stylus","supercollider","sclang","swift","systemd","t4","t4","t4","tap","tcl","tt2","textile","toml","tremor","trickle","troy","turtle","trig","twig","typescript","ts","typoscript","tsconfig","unrealscript","uscript","uc","uorazor","uri","url","v","vala","vbnet","velocity","verilog","vhdl","vim","visual","warpscript","wasm","web","wgsl","wiki","wolfram","mathematica","nb","wl","wren","xeora","xeoracube","xml","xojo","xquery","yaml","yml","yang","zig"]},"githubClientSecret":"","githubClientId":"","internalGatewayAddress":"","internalApiAddress":"","authServiceAddress":"","webAddress":""};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl;
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event);
    const headers = event.res.getHeaders();
    headers.Etag = `W/"${hash(body)}"`;
    headers["Last-Modified"] = new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["Cache-Control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["Last-Modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(req, header, includes) {
  const value = req.headers[header];
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event.req, "accept", "application/json") || hasReqHeader(event.req, "user-agent", "curl/") || hasReqHeader(event.req, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Route Not Found" : "Internal Server Error");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.req.url,
    statusCode,
    statusMessage,
    message,
    description: "",
    data: error.data
  };
  event.res.statusCode = errorObject.statusCode;
  event.res.statusMessage = errorObject.statusMessage;
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
    return;
  }
  const url = withQuery("/__nuxt_error", errorObject);
  const html = await $fetch(url).catch((error2) => {
    console.error("[nitro] Error while generating error response", error2);
    return errorObject.statusMessage;
  });
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  event.res.end(html);
});

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3141e-/hBp+GCbZOw4zyIK0zeA94sxr7k\"",
    "mtime": "2022-06-19T20:46:43.777Z",
    "path": "../public/favicon.ico"
  },
  "/manifest.json": {
    "type": "application/json",
    "etag": "\"1a10-hRtTAHypShea8c+0IK1UYWxvjX8\"",
    "mtime": "2022-09-23T12:40:35.778Z",
    "path": "../public/manifest.json"
  },
  "/_nuxt/Api-Docs.30488962.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"61-5OKrREENZyAvVeebPgS/dGYUzaw\"",
    "mtime": "2022-09-23T12:40:35.776Z",
    "path": "../public/_nuxt/Api-Docs.30488962.css"
  },
  "/_nuxt/Api-Docs.48586da2.mjs": {
    "type": "application/javascript",
    "etag": "\"489-ucjHnZmUPQcOKC4M5WoVAOUsmZk\"",
    "mtime": "2022-09-23T12:40:35.776Z",
    "path": "../public/_nuxt/Api-Docs.48586da2.mjs"
  },
  "/_nuxt/Default.c0904d69.mjs": {
    "type": "application/javascript",
    "etag": "\"1b3-WU+mYNY7alpkbT879jMEl1pUxTU\"",
    "mtime": "2022-09-23T12:40:35.776Z",
    "path": "../public/_nuxt/Default.c0904d69.mjs"
  },
  "/_nuxt/entry.8bcf9037.mjs": {
    "type": "application/javascript",
    "etag": "\"1d0bd8-UygqrKlrL0fKhhcxkC0wzq7sil0\"",
    "mtime": "2022-09-23T12:40:35.777Z",
    "path": "../public/_nuxt/entry.8bcf9037.mjs"
  },
  "/_nuxt/entry.c28c3de5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4f78-Uw3ZkzrwAzbwbosO99oaF1UG0rc\"",
    "mtime": "2022-09-23T12:40:35.776Z",
    "path": "../public/_nuxt/entry.c28c3de5.css"
  },
  "/_nuxt/error-404.3626dc7b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e34-B4lt0BRCotQG7YJZnABozMAEQc0\"",
    "mtime": "2022-09-23T12:40:35.778Z",
    "path": "../public/_nuxt/error-404.3626dc7b.css"
  },
  "/_nuxt/error-404.65453fff.mjs": {
    "type": "application/javascript",
    "etag": "\"8a9-L2yp++/5xPXwIjBW5HRkcm1mz9c\"",
    "mtime": "2022-09-23T12:40:35.776Z",
    "path": "../public/_nuxt/error-404.65453fff.mjs"
  },
  "/_nuxt/error-500.5f32d5b6.mjs": {
    "type": "application/javascript",
    "etag": "\"752-GziWL/awARIIc6IMiaTMnLAJ2To\"",
    "mtime": "2022-09-23T12:40:35.776Z",
    "path": "../public/_nuxt/error-500.5f32d5b6.mjs"
  },
  "/_nuxt/error-500.a4adec0a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a4-qu2GC9UNuoTvecwDT/bxf895lQw\"",
    "mtime": "2022-09-23T12:40:35.778Z",
    "path": "../public/_nuxt/error-500.a4adec0a.css"
  },
  "/_nuxt/error-component.df682912.mjs": {
    "type": "application/javascript",
    "etag": "\"44f-9zjcfuVnyQ4zmRM/gJ9p7dWmpIg\"",
    "mtime": "2022-09-23T12:40:35.775Z",
    "path": "../public/_nuxt/error-component.df682912.mjs"
  },
  "/_nuxt/index.0fc19a6b.mjs": {
    "type": "application/javascript",
    "etag": "\"bfc-dj1lxsvcJEBqtCGQW6/Hg67a2qs\"",
    "mtime": "2022-09-23T12:40:35.776Z",
    "path": "../public/_nuxt/index.0fc19a6b.mjs"
  },
  "/_nuxt/index.c018dc47.mjs": {
    "type": "application/javascript",
    "etag": "\"bae-xQ4imxswVgjmZGuaXmHdybdIrTk\"",
    "mtime": "2022-09-23T12:40:35.776Z",
    "path": "../public/_nuxt/index.c018dc47.mjs"
  },
  "/_nuxt/index.d86d23a3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"139-Ul/luIlUWs12GPXT9dbhmwwq7Mw\"",
    "mtime": "2022-09-23T12:40:35.776Z",
    "path": "../public/_nuxt/index.d86d23a3.css"
  },
  "/_nuxt/Login.d4a641d5.mjs": {
    "type": "application/javascript",
    "etag": "\"399-viU2q3N62P5d54s/O6nmF7cL6D0\"",
    "mtime": "2022-09-23T12:40:35.776Z",
    "path": "../public/_nuxt/Login.d4a641d5.mjs"
  },
  "/_nuxt/logo-paste-created.24b7c205.mjs": {
    "type": "application/javascript",
    "etag": "\"296e-H16dhld0UxYwSKeT3o+oIRYV2qo\"",
    "mtime": "2022-09-23T12:40:35.776Z",
    "path": "../public/_nuxt/logo-paste-created.24b7c205.mjs"
  },
  "/_nuxt/logo-paste-created.50923283.svg": {
    "type": "image/svg+xml",
    "etag": "\"7c5b-h3C/3rEhyUIQslWbdhs+g1jBLbU\"",
    "mtime": "2022-09-23T12:40:35.775Z",
    "path": "../public/_nuxt/logo-paste-created.50923283.svg"
  },
  "/_nuxt/logo-paste-loading.d9d6ef31.svg": {
    "type": "image/svg+xml",
    "etag": "\"7c47-Ah6t3A6JW1UViQ1l5XZdtTICiJw\"",
    "mtime": "2022-09-23T12:40:35.775Z",
    "path": "../public/_nuxt/logo-paste-loading.d9d6ef31.svg"
  },
  "/_nuxt/quickpase-icon.40f31740.svg": {
    "type": "image/svg+xml",
    "etag": "\"21e8-Tw5w6+khSsIW+jdybSTvndrTU/8\"",
    "mtime": "2022-09-23T12:40:35.768Z",
    "path": "../public/_nuxt/quickpase-icon.40f31740.svg"
  },
  "/_nuxt/Settings.0d4ed15a.mjs": {
    "type": "application/javascript",
    "etag": "\"5f5-Zf/i8193L6T/u9inFt4lfuKj0w8\"",
    "mtime": "2022-09-23T12:40:35.776Z",
    "path": "../public/_nuxt/Settings.0d4ed15a.mjs"
  },
  "/_nuxt/UserPanel.cc89f4c6.mjs": {
    "type": "application/javascript",
    "etag": "\"39b-RhGx5DW6h2ujANvbudJTM428p4A\"",
    "mtime": "2022-09-23T12:40:35.776Z",
    "path": "../public/_nuxt/UserPanel.cc89f4c6.mjs"
  },
  "/_nuxt/[pasteId].747a3bf9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"74-mNixJ+BR+QVnJgQDuwvGmwV+Rlg\"",
    "mtime": "2022-09-23T12:40:35.776Z",
    "path": "../public/_nuxt/[pasteId].747a3bf9.css"
  },
  "/_nuxt/_pasteId_.5f3d76db.mjs": {
    "type": "application/javascript",
    "etag": "\"1a4e-IW2Z6HMKjHLicgeJmoFndNEWfZs\"",
    "mtime": "2022-09-23T12:40:35.776Z",
    "path": "../public/_nuxt/_pasteId_.5f3d76db.mjs"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const _f4b49z = eventHandler(async (event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  for (const _id of [id, id + "/index.html"]) {
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
      break;
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end("Not Modified (etag)");
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end("Not Modified (mtime)");
      return;
    }
  }
  if (asset.type) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  const contents = await readAsset(id);
  event.res.end(contents);
});

const _lazy_Ipiwql = () => import('./logout.mjs');
const _lazy_EMdIdT = () => import('./github.mjs');
const _lazy_UzDbgr = () => import('./finalize.mjs');
const _lazy_NpjLlO = () => import('./generatePermaKey.mjs');
const _lazy_vApH1j = () => import('./deleteAccount.mjs');
const _lazy_SscAZG = () => import('./_fileName_.get.mjs');
const _lazy_wlWjCD = () => import('./renderer.mjs').then(function (n) { return n.a; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/user/logout', handler: _lazy_Ipiwql, lazy: true, middleware: false, method: undefined },
  { route: '/user/login/github', handler: _lazy_EMdIdT, lazy: true, middleware: false, method: undefined },
  { route: '/user/login/finalize', handler: _lazy_UzDbgr, lazy: true, middleware: false, method: undefined },
  { route: '/user/generatePermaKey', handler: _lazy_NpjLlO, lazy: true, middleware: false, method: undefined },
  { route: '/user/deleteAccount', handler: _lazy_vApH1j, lazy: true, middleware: false, method: undefined },
  { route: '/content/:fileName', handler: _lazy_SscAZG, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_wlWjCD, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_wlWjCD, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter();
  const routerOptions = createRouter$1({ routes: config.nitro.routes });
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    const referenceRoute = h.route.replace(/:\w+|\*\*/g, "_");
    const routeOptions = routerOptions.lookup(referenceRoute) || {};
    if (routeOptions.swr) {
      handler = cachedEventHandler(handler, {
        group: "nitro/routes"
      });
    }
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(h3App.nodeHandler);
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, nitroApp.h3App.nodeHandler) : new Server$1(nitroApp.h3App.nodeHandler);
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const hostname = process.env.NITRO_HOST || process.env.HOST || "0.0.0.0";
server.listen(port, hostname, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  console.log(`Listening on ${protocol}://${hostname}:${port}${useRuntimeConfig().app.baseURL}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { deleteCookie as a, setCookie as b, useCookies as c, defineEventHandler as d, eventHandler as e, useNitroApp as f, getQuery as g, createError as h, appendHeader as i, nodeServer as n, sendRedirect as s, useRuntimeConfig as u };
//# sourceMappingURL=node-server.mjs.map
