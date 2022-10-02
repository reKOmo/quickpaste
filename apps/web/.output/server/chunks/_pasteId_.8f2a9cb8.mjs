import { _ as _export_sfc, c as useUserStore, b as useNotificationStore, d as useHead, e as useRoute, f as _imports_0$1, g as _imports_1, u as useNuxtApp, h as useRequestHeaders, a as useRuntimeConfig, i as __nuxt_component_0$3 } from './server.mjs';
import { withAsyncContext, ref, resolveComponent, unref, useSSRContext, onServerPrefetch } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import 'ohmyfetch';
import 'ufo';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'destr';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'cookie-es';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';
import 'defu';
import '@vue/shared';
import 'prismjs';
import '@fortawesome/vue-fontawesome';

const getDefault = () => null;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = (_a = options.server) != null ? _a : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  if (options.defer) {
    console.warn("[useAsyncData] `defer` has been renamed to `lazy`. Support for `defer` will be removed in RC.");
  }
  options.lazy = (_d = (_c = options.lazy) != null ? _c : options.defer) != null ? _d : false;
  options.initialCache = (_e = options.initialCache) != null ? _e : true;
  options.immediate = (_f = options.immediate) != null ? _f : true;
  const nuxt = useNuxtApp();
  const useInitialCache = () => (nuxt.isHydrating || options.initialCache) && nuxt.payload.data[key] !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref(useInitialCache() ? nuxt.payload.data[key] : (_h = (_g = options.default) == null ? void 0 : _g.call(options)) != null ? _h : null),
      pending: ref(!useInitialCache()),
      error: ref((_i = nuxt.payload._errors[key]) != null ? _i : null)
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      return nuxt._asyncDataPromises[key];
    }
    if (opts._initial && useInitialCache()) {
      return nuxt.payload.data[key];
    }
    asyncData.pending.value = true;
    nuxt._asyncDataPromises[key] = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((result) => {
      if (options.transform) {
        result = options.transform(result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      var _a2, _b2;
      asyncData.error.value = error;
      asyncData.data.value = unref((_b2 = (_a2 = options.default) == null ? void 0 : _a2.call(options)) != null ? _b2 : null);
    }).finally(() => {
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = true;
      }
      delete nuxt._asyncDataPromises[key];
    });
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    onServerPrefetch(() => promise);
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
const _sfc_main = {
  __name: "[pasteId]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useUserStore();
    useNotificationStore();
    let { data: pasteData, error } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("paste", async (ctx) => {
      const route2 = useRoute();
      const pasteId = route2.params.pasteId;
      const cookieKey = useRequestHeaders(["cookie"]).cookie;
      const cookies = {};
      cookieKey.split(";").forEach((frag) => {
        const a = frag.split("=");
        cookies[a[0].trim()] = a[1];
      });
      const res = await $fetch(`${useRuntimeConfig().public.webAddress}/api/paste/${pasteId}`, {
        headers: {
          "Authorization": "ApiKey " + cookies.quickpaste_auth
        },
        parseResponse: JSON.parse
      });
      return res;
    }, {
      server: true
    })), __temp = await __temp, __restore(), __temp);
    let paste = ref(pasteData);
    if (paste.value && true) {
      useHead({
        title: "Quickpaste | " + paste.value.title.substring(0, 25)
      });
    }
    if (error.value)
      console.log(error.value);
    let { data: err } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("error", () => error.value ? error.value.response.status : 200, { server: true })), __temp = await __temp, __restore(), __temp);
    let editMode = ref(false);
    const route = useRoute();
    let password = ref("");
    let pastePostingState = ref(0);
    let createdPaste = ref(void 0);
    ref(null);
    ref(null);
    const rePaste = async (p) => {
      pastePostingState.value = 1;
      const headers = {
        "Content-Type": "application/json"
      };
      if (password.value.length != 0) {
        headers["Paste-Authorization"] = password.value;
      }
      const res = await fetch(`/api/paste/${route.params["pasteId"]}`, {
        method: "PUT",
        headers,
        credentials: "include",
        body: JSON.stringify(p)
      });
      if (res.ok) {
        pastePostingState.value = 2;
        createdPaste.value = (await res.json()).result;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_PasteEditor = __nuxt_component_0$3;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-e7845850>`);
      if (unref(paste)) {
        _push(`<div data-v-e7845850>`);
        if (unref(pastePostingState) == 0) {
          _push(ssrRenderComponent(_component_PasteEditor, {
            onSubmit: rePaste,
            paste: unref(paste),
            editable: unref(editMode),
            submitText: "Re-Paste !"
          }, null, _parent));
        } else if (unref(pastePostingState) == 1) {
          _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-e7845850><object width="300" height="300" type="image/svg+xml"${ssrRenderAttr("data", unref(_imports_0$1))} data-v-e7845850><img${ssrRenderAttr("src", _imports_0$1)} data-v-e7845850></object><div class="bg-gradient-to-tr from-green to-orange rounded p-6 h-min" data-v-e7845850><h2 class="text-2xl font-bold" data-v-e7845850>Creating paste</h2></div></div>`);
        } else {
          _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-e7845850><object width="300" height="300" type="image/svg+xml"${ssrRenderAttr("data", unref(_imports_1))} data-v-e7845850><img${ssrRenderAttr("src", _imports_1)} data-v-e7845850></object><div class="doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min" data-v-e7845850><h2 class="text-2xl font-bold" data-v-e7845850>Paste created!</h2><h3 data-v-e7845850> Check it at: <a class="font-bold"${ssrRenderAttr("href", `/${(_a = unref(createdPaste)) == null ? void 0 : _a.pasteId}`)} data-v-e7845850>${ssrInterpolate((_b = unref(createdPaste)) == null ? void 0 : _b.pasteId)} `);
          _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "fa-arrow-up-right-from-square"] }, null, _parent));
          _push(`</a></h3></div></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<div data-v-e7845850>`);
        if (unref(err) == 401) {
          _push(`<div class="flex flex-col items-center space-y-4" data-v-e7845850><h2 class="text-xl text-gray-300" data-v-e7845850>Enter password to view the paste</h2><div class="flex flex-col md:flex-row space-y-2 md:space-y-0" data-v-e7845850><input${ssrRenderAttr("value", unref(password))} type="password" autocomplete="off" class="p-2 w-full md:w-auto text-center text-white rounded border-none focus:outline-none text-lg text-bold bg-darkgray mr-4" data-v-e7845850><button class="bg-gradient-to-tr from-green to-orange rounded p-2 text-center hover:shadow-lg" data-v-e7845850>Enter</button></div></div>`);
        } else {
          _push(`<div data-v-e7845850><div class="flex flex-col justify-center content-center text-center bg-gradient-to-tr from-green to-orange mb-4 p-4 rounded" data-v-e7845850><h1 class="text-3xl text-white text-shadow-sm" data-v-e7845850> No paste here </h1></div></div>`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[pasteId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _pasteId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e7845850"]]);

export { _pasteId_ as default };
//# sourceMappingURL=_pasteId_.8f2a9cb8.mjs.map
