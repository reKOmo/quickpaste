globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseStatus, setResponseHeader, getRequestHeaders, createError, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { klona } from 'klona';
import defu, { defuFn } from 'defu';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/api-docs": {
        "isr": true
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "githubClientId": "31941398a5a8184b46c0",
    "webAddress": "http://172.29.0.2:8000",
    "hCaptchaSitekey": "10000000-ffff-ffff-ffff-000000000001",
    "supportedSyntaxes": [
      "text",
      "markup",
      "html",
      "xml",
      "svg",
      "mathml",
      "ssml",
      "atom",
      "rss",
      "css",
      "like",
      "javascript",
      "js",
      "abap",
      "abnf",
      "actionscript",
      "ada",
      "agda",
      "al",
      "antlr4",
      "g4",
      "apacheconf",
      "apex",
      "apl",
      "applescript",
      "aql",
      "arduino",
      "ino",
      "arff",
      "armasm",
      "arm",
      "arturo",
      "art",
      "asciidoc",
      "adoc",
      "aspnet",
      "asm6502",
      "asmatmel",
      "autohotkey",
      "autoit",
      "avisynth",
      "avs",
      "avro",
      "awk",
      "gawk",
      "bash",
      "sh",
      "shell",
      "basic",
      "batch",
      "bbcode",
      "shortcode",
      "bbj",
      "bicep",
      "birb",
      "bison",
      "bnf",
      "rbnf",
      "bqn",
      "brainfuck",
      "brightscript",
      "bro",
      "bsl",
      "oscript",
      "c",
      "csharp",
      "cs",
      "dotnet",
      "cpp",
      "cfscript",
      "cfc",
      "chaiscript",
      "cil",
      "cilkc",
      "cilk",
      "cilkcpp",
      "cilk",
      "clojure",
      "cmake",
      "cobol",
      "coffeescript",
      "coffee",
      "concurnas",
      "conc",
      "Security",
      "cooklang",
      "coq",
      "crystal",
      "css",
      "csv",
      "cue",
      "cypher",
      "d",
      "dart",
      "dataweave",
      "dax",
      "dhall",
      "diff",
      "django",
      "jinja2",
      "dns",
      "docker",
      "dockerfile",
      "dot",
      "gv",
      "ebnf",
      "editorconfig",
      "eiffel",
      "ejs",
      "eta",
      "elixir",
      "elm",
      "etlua",
      "erb",
      "erlang",
      "excel",
      "fsharp",
      "factor",
      "false",
      "firestore",
      "flow",
      "fortran",
      "ftl",
      "gml",
      "gamemakerlanguage",
      "gap",
      "code",
      "gdscript",
      "gedcom",
      "gettext",
      "po",
      "gherkin",
      "git",
      "glsl",
      "gn",
      "gni",
      "linker",
      "go",
      "go",
      "gradle",
      "graphql",
      "groovy",
      "haml",
      "handlebars",
      "hbs",
      "mustache",
      "haskell",
      "hs",
      "haxe",
      "hcl",
      "hlsl",
      "hoon",
      "http",
      "Key",
      "Transport",
      "ichigojam",
      "icon",
      "icu",
      "idris",
      "idr",
      "ignore",
      "gitignore",
      "hgignore",
      "npmignore",
      "inform7",
      "ini",
      "io",
      "j",
      "java",
      "javadoc",
      "like",
      "javastacktrace",
      "jexl",
      "jolie",
      "jq",
      "jsdoc",
      "json",
      "webmanifest",
      "json5",
      "jsonp",
      "jsstacktrace",
      "julia",
      "keepalived",
      "keyman",
      "kotlin",
      "kt",
      "kts",
      "kumir",
      "kum",
      "kusto",
      "latex",
      "tex",
      "context",
      "latte",
      "less",
      "lilypond",
      "ly",
      "liquid",
      "lisp",
      "emacs",
      "elisp",
      "emacs",
      "livescript",
      "llvm",
      "log",
      "lolcode",
      "lua",
      "magma",
      "makefile",
      "markdown",
      "md",
      "markup",
      "mata",
      "matlab",
      "maxscript",
      "mel",
      "mermaid",
      "metafont",
      "mizar",
      "mongodb",
      "monkey",
      "moonscript",
      "moon",
      "n1ql",
      "n4js",
      "n4jsd",
      "nand2tetris",
      "naniscript",
      "nani",
      "nasm",
      "neon",
      "nevod",
      "nginx",
      "nim",
      "nix",
      "nsis",
      "C",
      "ocaml",
      "odin",
      "opencl",
      "openqasm",
      "qasm",
      "oz",
      "parigp",
      "parser",
      "pascal",
      "objectpascal",
      "pascaligo",
      "psl",
      "Axis",
      "peoplecode",
      "pcode",
      "perl",
      "php",
      "phpdoc",
      "php",
      "plant",
      "plsql",
      "powerquery",
      "pq",
      "mscript",
      "powershell",
      "processing",
      "prolog",
      "promql",
      "properties",
      "protobuf",
      "pug",
      "puppet",
      "pure",
      "purebasic",
      "pbfasm",
      "purescript",
      "purs",
      "python",
      "py",
      "qsharp",
      "qs",
      "q",
      "qml",
      "qore",
      "r",
      "racket",
      "rkt",
      "cshtml",
      "razor",
      "jsx",
      "tsx",
      "reason",
      "regex",
      "rego",
      "renpy",
      "rpy",
      "rescript",
      "res",
      "rest",
      "rip",
      "roboconf",
      "robotframework",
      "robot",
      "ruby",
      "rb",
      "rust",
      "sas",
      "sass",
      "scss",
      "scala",
      "scheme",
      "shell",
      "smali",
      "smalltalk",
      "smarty",
      "sml",
      "smlnj",
      "solidity",
      "sol",
      "solution",
      "soy",
      "sparql",
      "rq",
      "splunk",
      "sqf",
      "sql",
      "squirrel",
      "stan",
      "stata",
      "3)",
      "stylus",
      "supercollider",
      "sclang",
      "swift",
      "systemd",
      "t4",
      "t4",
      "t4",
      "tap",
      "tcl",
      "tt2",
      "textile",
      "toml",
      "tremor",
      "trickle",
      "troy",
      "turtle",
      "trig",
      "twig",
      "typescript",
      "ts",
      "typoscript",
      "tsconfig",
      "unrealscript",
      "uscript",
      "uc",
      "uorazor",
      "uri",
      "url",
      "v",
      "vala",
      "vbnet",
      "velocity",
      "verilog",
      "vhdl",
      "vim",
      "visual",
      "warpscript",
      "wasm",
      "web",
      "wgsl",
      "wiki",
      "wolfram",
      "mathematica",
      "nb",
      "wl",
      "wren",
      "xeora",
      "xeoracube",
      "xml",
      "xojo",
      "xquery",
      "yaml",
      "yml",
      "yang",
      "zig"
    ]
  },
  "githubClientSecret": "70706dcf8a8934d225e6b331a3d2e4d3da846274",
  "githubClientId": "31941398a5a8184b46c0",
  "internalGatewayAddress": "http://172.29.0.2:8000",
  "internalApiAddress": "http://localhost:4000",
  "authServiceAddress": "http://localhost:4001",
  "webAddress": "http://172.29.0.2:8000",
  "rootDir": "/home/radek/projects/quickpaste/apps/web/src"
};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const _sharedRuntimeConfig = _deepFreeze(
  _applyEnv(klona(_inlineRuntimeConfig))
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  _applyEnv(runtimeConfig);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function _applyEnv(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = _getEnv(subKey);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      _applyEnv(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
  return obj;
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
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

storage.mount('/assets', assets$1);

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
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
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
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
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
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

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
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
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
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
    setResponseHeader(event, "Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  event.node.res.end(await res.text());
});

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3141e-/hBp+GCbZOw4zyIK0zeA94sxr7k\"",
    "mtime": "2023-06-22T16:33:58.759Z",
    "size": 201758,
    "path": "../public/favicon.ico"
  },
  "/_nuxt/Api-Docs.a83ad2d7.js": {
    "type": "application/javascript",
    "etag": "\"2ed4-5js9lfrq8h4MASbNj5VFhI0zDrs\"",
    "mtime": "2023-06-22T16:33:58.759Z",
    "size": 11988,
    "path": "../public/_nuxt/Api-Docs.a83ad2d7.js"
  },
  "/_nuxt/Default.8d0a6a97.js": {
    "type": "application/javascript",
    "etag": "\"1b3-IBs2Ub54q5jJF+6C7ZcrIa6Khn8\"",
    "mtime": "2023-06-22T16:33:58.759Z",
    "size": 435,
    "path": "../public/_nuxt/Default.8d0a6a97.js"
  },
  "/_nuxt/Login.11a7ad70.js": {
    "type": "application/javascript",
    "etag": "\"3c9-TXBUdT30mNy9x7gou8h02EyUki0\"",
    "mtime": "2023-06-22T16:33:58.759Z",
    "size": 969,
    "path": "../public/_nuxt/Login.11a7ad70.js"
  },
  "/_nuxt/Settings.50280bec.js": {
    "type": "application/javascript",
    "etag": "\"134c-paKK9DKxxfLM/GHcCvakOlyq2aU\"",
    "mtime": "2023-06-22T16:33:58.747Z",
    "size": 4940,
    "path": "../public/_nuxt/Settings.50280bec.js"
  },
  "/_nuxt/UserPanel.431f5cd5.js": {
    "type": "application/javascript",
    "etag": "\"354-/pB0fnoi75FdPGubdQvk9lVuxpM\"",
    "mtime": "2023-06-22T16:33:58.743Z",
    "size": 852,
    "path": "../public/_nuxt/UserPanel.431f5cd5.js"
  },
  "/_nuxt/UserPanel.6420f253.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"61-bVOtDCPnVXifAigm2OWjYK4lh54\"",
    "mtime": "2023-06-22T16:33:58.743Z",
    "size": 97,
    "path": "../public/_nuxt/UserPanel.6420f253.css"
  },
  "/_nuxt/_pasteId_.11350ca9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"74-s74lLezM77uEtvPfma3S8689R6s\"",
    "mtime": "2023-06-22T16:33:58.743Z",
    "size": 116,
    "path": "../public/_nuxt/_pasteId_.11350ca9.css"
  },
  "/_nuxt/_pasteId_.9d793605.js": {
    "type": "application/javascript",
    "etag": "\"12e4-TNNJmRrXE6AkOdbqpCfkqiZ5r68\"",
    "mtime": "2023-06-22T16:33:58.743Z",
    "size": 4836,
    "path": "../public/_nuxt/_pasteId_.9d793605.js"
  },
  "/_nuxt/auth.34ab2a31.js": {
    "type": "application/javascript",
    "etag": "\"93-/HwZBiXKFdS+1pchomv/YDjL5A8\"",
    "mtime": "2023-06-22T16:33:58.743Z",
    "size": 147,
    "path": "../public/_nuxt/auth.34ab2a31.js"
  },
  "/_nuxt/entry.3257e66e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6d42-JTz1p7aZJf+x3mGgbCS8fnv5RtM\"",
    "mtime": "2023-06-22T16:33:58.743Z",
    "size": 27970,
    "path": "../public/_nuxt/entry.3257e66e.css"
  },
  "/_nuxt/entry.ac7ce826.js": {
    "type": "application/javascript",
    "etag": "\"1cdc68-HEGEGlRWoAvXFpzUvXzUEPAPTsk\"",
    "mtime": "2023-06-22T16:33:58.743Z",
    "size": 1891432,
    "path": "../public/_nuxt/entry.ac7ce826.js"
  },
  "/_nuxt/error-404.c5b2a6a9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-g8RDwyww+IMs54aSu0dmqg03oP8\"",
    "mtime": "2023-06-22T16:33:58.743Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.c5b2a6a9.css"
  },
  "/_nuxt/error-404.f4731a3a.js": {
    "type": "application/javascript",
    "etag": "\"8ad-7MSWnFnZeQeuYU76U16a4IeEXbE\"",
    "mtime": "2023-06-22T16:33:58.739Z",
    "size": 2221,
    "path": "../public/_nuxt/error-404.f4731a3a.js"
  },
  "/_nuxt/error-500.30569a5c.js": {
    "type": "application/javascript",
    "etag": "\"756-/DyFHN7Ftz9j6zgGVUHMUW1wYow\"",
    "mtime": "2023-06-22T16:33:58.739Z",
    "size": 1878,
    "path": "../public/_nuxt/error-500.30569a5c.js"
  },
  "/_nuxt/error-500.7e02f53c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-O/+aVFg4LjyrEfrB5ziLvaSmMFc\"",
    "mtime": "2023-06-22T16:33:58.739Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.7e02f53c.css"
  },
  "/_nuxt/error-component.e862c101.js": {
    "type": "application/javascript",
    "etag": "\"45e-2KE4PIsdLGrd6clDHMTjsxhh3pM\"",
    "mtime": "2023-06-22T16:33:58.739Z",
    "size": 1118,
    "path": "../public/_nuxt/error-component.e862c101.js"
  },
  "/_nuxt/index.20373459.js": {
    "type": "application/javascript",
    "etag": "\"b83-p/PbUYmvAOKx85uMVSmShrPRBUs\"",
    "mtime": "2023-06-22T16:33:58.735Z",
    "size": 2947,
    "path": "../public/_nuxt/index.20373459.js"
  },
  "/_nuxt/index.6aa54f68.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c9-rIVdcwDG/xsTOVVuh6z5iWl7gqc\"",
    "mtime": "2023-06-22T16:33:58.735Z",
    "size": 201,
    "path": "../public/_nuxt/index.6aa54f68.css"
  },
  "/_nuxt/index.d376f7f6.js": {
    "type": "application/javascript",
    "etag": "\"b24-b9C6fREA1ltOJcTpTSX2zS035vI\"",
    "mtime": "2023-06-22T16:33:58.735Z",
    "size": 2852,
    "path": "../public/_nuxt/index.d376f7f6.js"
  },
  "/_nuxt/logo-paste-created.40f47787.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"67a-TWHWSoBELjDIaQOpOfCvJ+M7LyM\"",
    "mtime": "2023-06-22T16:33:58.735Z",
    "size": 1658,
    "path": "../public/_nuxt/logo-paste-created.40f47787.css"
  },
  "/_nuxt/logo-paste-created.50923283.svg": {
    "type": "image/svg+xml",
    "etag": "\"7c5b-h3C/3rEhyUIQslWbdhs+g1jBLbU\"",
    "mtime": "2023-06-22T16:33:58.735Z",
    "size": 31835,
    "path": "../public/_nuxt/logo-paste-created.50923283.svg"
  },
  "/_nuxt/logo-paste-created.acb6ac43.js": {
    "type": "application/javascript",
    "etag": "\"2998-wHqlgamsm5NnvxF5+M78mGQZU34\"",
    "mtime": "2023-06-22T16:33:58.735Z",
    "size": 10648,
    "path": "../public/_nuxt/logo-paste-created.acb6ac43.js"
  },
  "/_nuxt/logo-paste-loading.d9d6ef31.svg": {
    "type": "image/svg+xml",
    "etag": "\"7c47-Ah6t3A6JW1UViQ1l5XZdtTICiJw\"",
    "mtime": "2023-06-22T16:33:58.735Z",
    "size": 31815,
    "path": "../public/_nuxt/logo-paste-loading.d9d6ef31.svg"
  },
  "/_nuxt/quickpase-icon.40f31740.svg": {
    "type": "image/svg+xml",
    "etag": "\"21e8-Tw5w6+khSsIW+jdybSTvndrTU/8\"",
    "mtime": "2023-06-22T16:33:58.735Z",
    "size": 8680,
    "path": "../public/_nuxt/quickpase-icon.40f31740.svg"
  },
  "/_nuxt/ssr.3fd4b89c.js": {
    "type": "application/javascript",
    "etag": "\"907-ltUH9Lv6exkUAtXNYO2slz5TgiA\"",
    "mtime": "2023-06-22T16:33:58.735Z",
    "size": 2311,
    "path": "../public/_nuxt/ssr.3fd4b89c.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_Ye5h3A = () => import('../deleteAccount.mjs');
const _lazy_hwckZP = () => import('../generatePermaKey.mjs');
const _lazy_059ffv = () => import('../finalize.mjs');
const _lazy_mhhDeD = () => import('../github.mjs');
const _lazy_kR3dGD = () => import('../logout.mjs');
const _lazy_czsUe3 = () => import('../handlers/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/user/deleteAccount', handler: _lazy_Ye5h3A, lazy: true, middleware: false, method: undefined },
  { route: '/user/generatePermaKey', handler: _lazy_hwckZP, lazy: true, middleware: false, method: undefined },
  { route: '/user/login/finalize', handler: _lazy_059ffv, lazy: true, middleware: false, method: undefined },
  { route: '/user/login/github', handler: _lazy_mhhDeD, lazy: true, middleware: false, method: undefined },
  { route: '/user/logout', handler: _lazy_kR3dGD, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_czsUe3, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_czsUe3, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || {};
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
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
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { useNitroApp as a, getRouteRules as g, nodeServer as n, useRuntimeConfig as u };
//# sourceMappingURL=node-server.mjs.map
