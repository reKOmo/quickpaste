import { _ as _imports_0, a as _imports_1, b as __nuxt_component_0 } from './logo-paste-created-ececeb4b.mjs';
import { _ as _export_sfc, f as useUserStore, d as useNotificationStore, u as useHead, g as useRoute, h as useRequestHeaders, b as useRuntimeConfig, N as NotificationTypes, e as useNuxtApp, c as createError } from '../server.mjs';
import { withAsyncContext, ref, resolveComponent, unref, useSSRContext, toRef, getCurrentInstance, onServerPrefetch } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../../nitro/node-server.mjs';
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
import 'devalue';
import './prismjs.client-28120ed2.mjs';
import 'prismjs';
import 'unctx';
import 'vue-router';
import 'fs';
import 'path';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/vue-fontawesome';
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/free-brands-svg-icons';

const getDefault = () => null;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e;
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
  options.lazy = (_c = options.lazy) != null ? _c : false;
  options.immediate = (_d = options.immediate) != null ? _d : true;
  const nuxt = useNuxtApp();
  const getCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  const hasCachedData = () => getCachedData() !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref((_e = getCachedData()) != null ? _e : options.default()),
      pending: ref(!hasCachedData()),
      error: toRef(nuxt.payload._errors, key),
      status: ref("idle")
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if ((opts._initial || nuxt.isHydrating && opts._initial !== false) && hasCachedData()) {
      return getCachedData();
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((_result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxt.hook("app:created", () => promise);
    }
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
    const notificationStore = useNotificationStore();
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
    const rePaste = async (p) => {
      pastePostingState.value = 1;
      paste.value = p;
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
      const data = await res.json();
      if (res.ok) {
        pastePostingState.value = 2;
        createdPaste.value = data.result;
      } else {
        pastePostingState.value = 0;
        if (data.result.includes("title")) {
          notificationStore.addNotification({
            title: "Paste title is missing",
            type: NotificationTypes.NOTIFICATION,
            level: 1
          });
        } else if (data.result.includes("name")) {
          notificationStore.addNotification({
            title: "One or more fragments are missing a title",
            type: NotificationTypes.NOTIFICATION,
            level: 1
          });
        } else if (data.result.includes("content")) {
          notificationStore.addNotification({
            title: "One or more fragments are missing content",
            description: "Please deleate them, or add missing content",
            type: NotificationTypes.NOTIFICATION,
            level: 1
          });
        } else {
          notificationStore.addNotification({
            title: "Error accured when creating the paste",
            description: "Please try again.",
            type: NotificationTypes.NOTIFICATION,
            level: 1
          });
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_PasteEditor = __nuxt_component_0;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-2f879e9d>`);
      if (unref(paste)) {
        _push(`<div data-v-2f879e9d>`);
        if (unref(pastePostingState) == 0) {
          _push(ssrRenderComponent(_component_PasteEditor, {
            onSubmit: rePaste,
            paste: unref(paste),
            editable: unref(editMode),
            submitText: "Re-Paste !"
          }, null, _parent));
        } else if (unref(pastePostingState) == 1) {
          _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-2f879e9d><object width="300" height="300" type="image/svg+xml"${ssrRenderAttr("data", unref(_imports_0))} data-v-2f879e9d><img${ssrRenderAttr("src", _imports_0)} data-v-2f879e9d></object><div class="bg-gradient-to-tr from-green to-orange rounded p-6 h-min hidden md:block" data-v-2f879e9d><h2 class="text-2xl font-bold" data-v-2f879e9d>Creating paste</h2></div></div>`);
        } else {
          _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-2f879e9d><object class="w-100px sm:w-150px md:w-300px" type="image/svg+xml"${ssrRenderAttr("data", unref(_imports_1))} data-v-2f879e9d><img${ssrRenderAttr("src", _imports_1)} data-v-2f879e9d></object><div class="doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min" data-v-2f879e9d><h2 class="text-2xl font-bold" data-v-2f879e9d>Paste created!</h2><h3 data-v-2f879e9d> Check it at: <a class="font-bold"${ssrRenderAttr("href", `/${(_a = unref(createdPaste)) == null ? void 0 : _a.pasteId}`)} data-v-2f879e9d>${ssrInterpolate((_b = unref(createdPaste)) == null ? void 0 : _b.pasteId)} `);
          _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "fa-arrow-up-right-from-square"] }, null, _parent));
          _push(`</a></h3></div></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<div data-v-2f879e9d>`);
        if (unref(err) == 401) {
          _push(`<div class="flex flex-col items-center space-y-4" data-v-2f879e9d><h2 class="text-xl text-gray-300" data-v-2f879e9d>Enter password to view the paste</h2><div class="flex flex-col md:flex-row space-y-2 md:space-y-0" data-v-2f879e9d><input${ssrRenderAttr("value", unref(password))} type="password" autocomplete="off" class="p-2 w-full md:w-auto text-center text-white rounded border-none focus:outline-none text-lg text-bold bg-darkgray mr-4" data-v-2f879e9d><button class="bg-gradient-to-tr from-green to-orange rounded p-2 text-center hover:shadow-lg" data-v-2f879e9d>Enter</button></div></div>`);
        } else {
          _push(`<div data-v-2f879e9d><div class="flex flex-col justify-center content-center text-center bg-gradient-to-tr from-green to-orange mb-4 p-4 rounded" data-v-2f879e9d><h1 class="text-3xl text-white text-shadow-sm" data-v-2f879e9d> No paste here </h1></div></div>`);
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
const _pasteId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2f879e9d"]]);

export { _pasteId_ as default };
//# sourceMappingURL=_pasteId_-033e4ff1.mjs.map
