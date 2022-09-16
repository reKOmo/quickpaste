globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, createError, createApp, createRouter, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createRouter as createRouter$1 } from 'radix3';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import { promises } from 'fs';
import { dirname, resolve } from 'pathe';
import { fileURLToPath } from 'url';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{"supportedSyntaxes":["text","markup","html","xml","svg","mathml","ssml","atom","rss","css","like","javascript","js","abap","abnf","actionscript","ada","agda","al","antlr4","g4","apacheconf","apex","apl","applescript","aql","arduino","ino","arff","armasm","arm","arturo","art","asciidoc","adoc","aspnet","asm6502","asmatmel","autohotkey","autoit","avisynth","avs","avro","awk","gawk","bash","sh","shell","basic","batch","bbcode","shortcode","bbj","bicep","birb","bison","bnf","rbnf","bqn","brainfuck","brightscript","bro","bsl","oscript","c","csharp","cs","dotnet","cpp","cfscript","cfc","chaiscript","cil","cilkc","cilk","cilkcpp","cilk","clojure","cmake","cobol","coffeescript","coffee","concurnas","conc","Security","cooklang","coq","crystal","css","csv","cue","cypher","d","dart","dataweave","dax","dhall","diff","django","jinja2","dns","docker","dockerfile","dot","gv","ebnf","editorconfig","eiffel","ejs","eta","elixir","elm","etlua","erb","erlang","excel","fsharp","factor","false","firestore","flow","fortran","ftl","gml","gamemakerlanguage","gap","code","gdscript","gedcom","gettext","po","gherkin","git","glsl","gn","gni","linker","go","go","gradle","graphql","groovy","haml","handlebars","hbs","mustache","haskell","hs","haxe","hcl","hlsl","hoon","http","Key","Transport","ichigojam","icon","icu","idris","idr","ignore","gitignore","hgignore","npmignore","inform7","ini","io","j","java","javadoc","like","javastacktrace","jexl","jolie","jq","jsdoc","js","json","webmanifest","json5","jsonp","jsstacktrace","js","julia","keepalived","keyman","kotlin","kt","kts","kumir","kum","kusto","latex","tex","context","latte","less","lilypond","ly","liquid","lisp","emacs","elisp","emacs","livescript","llvm","log","lolcode","lua","magma","makefile","markdown","md","markup","mata","matlab","maxscript","mel","mermaid","metafont","mizar","mongodb","monkey","moonscript","moon","n1ql","n4js","n4jsd","nand2tetris","naniscript","nani","nasm","neon","nevod","nginx","nim","nix","nsis","C","ocaml","odin","opencl","openqasm","qasm","oz","parigp","parser","pascal","objectpascal","pascaligo","psl","Axis","peoplecode","pcode","perl","php","phpdoc","php","plant","plsql","powerquery","pq","mscript","powershell","processing","prolog","promql","properties","protobuf","pug","puppet","pure","purebasic","pbfasm","purescript","purs","python","py","qsharp","qs","q","qml","qore","r","racket","rkt","cshtml","razor","jsx","tsx","reason","regex","rego","renpy","rpy","rescript","res","rest","rip","roboconf","robotframework","robot","ruby","rb","rust","sas","sass","scss","scala","scheme","shell","smali","smalltalk","smarty","sml","smlnj","solidity","sol","solution","soy","sparql","rq","splunk","sqf","sql","squirrel","stan","stata","3)","stylus","supercollider","sclang","swift","systemd","t4","t4","t4","tap","tcl","tt2","textile","toml","tremor","trickle","troy","turtle","trig","twig","typescript","ts","typoscript","tsconfig","unrealscript","uscript","uc","uorazor","uri","url","v","vala","vbnet","velocity","verilog","vhdl","vim","visual","warpscript","wasm","web","wgsl","wiki","wolfram","mathematica","nb","wl","wren","xeora","xeoracube","xml","xojo","xquery","yaml","yml","yang","zig"]},"rootDir":"C:\\Users\\Bartosz\\Desktop\\quickpaste\\apps\\web\\src"};
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
    "etag": "\"1820-rU8IpEdOhsjSm072/ZuTDpzGTgg\"",
    "mtime": "2022-09-16T15:31:02.244Z",
    "path": "../public/manifest.json"
  },
  "/_nuxt/Api.67f98804.mjs": {
    "type": "application/javascript",
    "etag": "\"47f-unvmSFWsD+q7Os7KpkOQOPv/sl0\"",
    "mtime": "2022-09-16T15:31:02.242Z",
    "path": "../public/_nuxt/Api.67f98804.mjs"
  },
  "/_nuxt/Api.ea1f1a7f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"61-XQKibZh+CrBPfzNzWEWjnc8Y+LA\"",
    "mtime": "2022-09-16T15:31:02.242Z",
    "path": "../public/_nuxt/Api.ea1f1a7f.css"
  },
  "/_nuxt/Default.e3f41206.mjs": {
    "type": "application/javascript",
    "etag": "\"1b3-ODEzdftlyACL2DxJb5GtYRs+oMY\"",
    "mtime": "2022-09-16T15:31:02.242Z",
    "path": "../public/_nuxt/Default.e3f41206.mjs"
  },
  "/_nuxt/entry.7ef94d9d.mjs": {
    "type": "application/javascript",
    "etag": "\"1d0905-1hVpmP8iIJNu+CtACLF/cPI04MI\"",
    "mtime": "2022-09-16T15:31:02.244Z",
    "path": "../public/_nuxt/entry.7ef94d9d.mjs"
  },
  "/_nuxt/entry.a14b130f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4f90-mbXwTqT3qQ3Ta2pZLnncI7Df5oI\"",
    "mtime": "2022-09-16T15:31:02.243Z",
    "path": "../public/_nuxt/entry.a14b130f.css"
  },
  "/_nuxt/error-404.6de6133f.mjs": {
    "type": "application/javascript",
    "etag": "\"8a9-R7VyFP+BigwGq4pFSKBCsihLHzg\"",
    "mtime": "2022-09-16T15:31:02.242Z",
    "path": "../public/_nuxt/error-404.6de6133f.mjs"
  },
  "/_nuxt/error-404.c826347d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e34-prtLW2pPrWIlgN8Xboa0aH3bt08\"",
    "mtime": "2022-09-16T15:31:02.242Z",
    "path": "../public/_nuxt/error-404.c826347d.css"
  },
  "/_nuxt/error-500.be64bd42.mjs": {
    "type": "application/javascript",
    "etag": "\"752-lKrkjjwlvDUFIcN5rMGtfQon6js\"",
    "mtime": "2022-09-16T15:31:02.242Z",
    "path": "../public/_nuxt/error-500.be64bd42.mjs"
  },
  "/_nuxt/error-500.fa956197.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a4-uYu/jRukLu+S1LzjNS+2F42wEl0\"",
    "mtime": "2022-09-16T15:31:02.242Z",
    "path": "../public/_nuxt/error-500.fa956197.css"
  },
  "/_nuxt/error-component.c7a65731.mjs": {
    "type": "application/javascript",
    "etag": "\"44f-FaZw7lLWJJvG6HEl/SnkrUdPDzU\"",
    "mtime": "2022-09-16T15:31:02.242Z",
    "path": "../public/_nuxt/error-component.c7a65731.mjs"
  },
  "/_nuxt/index.371913af.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"139-RtmvozWpqB7yh9PBcd00HwUXMIk\"",
    "mtime": "2022-09-16T15:31:02.242Z",
    "path": "../public/_nuxt/index.371913af.css"
  },
  "/_nuxt/index.679c7966.mjs": {
    "type": "application/javascript",
    "etag": "\"b2e-B5eQxnfj6b00Wsa9FWb03Xhb+Tw\"",
    "mtime": "2022-09-16T15:31:02.242Z",
    "path": "../public/_nuxt/index.679c7966.mjs"
  },
  "/_nuxt/index.b1957841.mjs": {
    "type": "application/javascript",
    "etag": "\"c05-3CaGk7K0SpXS1Vgfbt4wjF9+JXI\"",
    "mtime": "2022-09-16T15:31:02.242Z",
    "path": "../public/_nuxt/index.b1957841.mjs"
  },
  "/_nuxt/Login.0759cd41.mjs": {
    "type": "application/javascript",
    "etag": "\"38f-CoEM/hUvMcQqr//LNUg6XytcYnw\"",
    "mtime": "2022-09-16T15:31:02.242Z",
    "path": "../public/_nuxt/Login.0759cd41.mjs"
  },
  "/_nuxt/PasteEditor.b2fb1e3b.mjs": {
    "type": "application/javascript",
    "etag": "\"28d2-EEiypvSozGm6BsFh6WB5ElXRn2Y\"",
    "mtime": "2022-09-16T15:31:02.242Z",
    "path": "../public/_nuxt/PasteEditor.b2fb1e3b.mjs"
  },
  "/_nuxt/quickpase-icon.40f31740.svg": {
    "type": "image/svg+xml",
    "etag": "\"21e8-Tw5w6+khSsIW+jdybSTvndrTU/8\"",
    "mtime": "2022-09-16T15:31:02.221Z",
    "path": "../public/_nuxt/quickpase-icon.40f31740.svg"
  },
  "/_nuxt/Settings.9ac9b89d.mjs": {
    "type": "application/javascript",
    "etag": "\"5f5-6+INDj7pLiwW9dAxPMVl9FfpuJQ\"",
    "mtime": "2022-09-16T15:31:02.242Z",
    "path": "../public/_nuxt/Settings.9ac9b89d.mjs"
  },
  "/_nuxt/UserPanel.d56d6e09.mjs": {
    "type": "application/javascript",
    "etag": "\"39b-DY9852KRnOZrLH77KS39M8ZRLZY\"",
    "mtime": "2022-09-16T15:31:02.242Z",
    "path": "../public/_nuxt/UserPanel.d56d6e09.mjs"
  },
  "/_nuxt/[pasteId].9b2a7b17.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"74-qxzWbz1IK7q+46jfGP/0Ij3Gg80\"",
    "mtime": "2022-09-16T15:31:02.242Z",
    "path": "../public/_nuxt/[pasteId].9b2a7b17.css"
  },
  "/_nuxt/_pasteId_.3ffedffc.mjs": {
    "type": "application/javascript",
    "etag": "\"1a15-peYSUyTflk+7bNb2Uv2vQMDzqyo\"",
    "mtime": "2022-09-16T15:31:02.242Z",
    "path": "../public/_nuxt/_pasteId_.3ffedffc.mjs"
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

const _lazy_AiJmTd = () => import('./_..._.mjs');
const _lazy_Ipiwql = () => import('./logout.mjs');
const _lazy_EMdIdT = () => import('./github.mjs');
const _lazy_UzDbgr = () => import('./finalize.mjs');
const _lazy_NpjLlO = () => import('./generatePermaKey.mjs');
const _lazy_vApH1j = () => import('./deleteAccount.mjs');
const _lazy_SscAZG = () => import('./_fileName_.get.mjs');
const _lazy_wlWjCD = () => import('./renderer.mjs').then(function (n) { return n.a; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/webapi/**', handler: _lazy_AiJmTd, lazy: true, middleware: false, method: undefined },
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

export { useNitroApp as a, nodeServer as n, useRuntimeConfig as u };
//# sourceMappingURL=node-server.mjs.map
