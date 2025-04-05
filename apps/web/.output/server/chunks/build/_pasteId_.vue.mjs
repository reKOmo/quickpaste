import { _ as __nuxt_component_0, a as _imports_0, b as _imports_1 } from './logo-paste-created.svg.mjs';
import { ref, shallowRef, toRef, getCurrentInstance, onServerPrefetch, unref, withAsyncContext, resolveComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { h as useNuxtApp, j as asyncDataDefaults, c as createError, _ as _export_sfc, b as useUserStore, d as useNotificationStore, u as useHead, f as useRoute, k as useRequestHeaders, e as useRuntimeConfig, N as NotificationTypes } from './server.mjs';
import './prismjs.client.mjs';
import 'prismjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'pinia';
import 'fs';
import 'path';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/vue-fontawesome';
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/free-brands-svg-icons';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';

const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _b;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, _handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  const handler = _handler ;
  const getDefault = () => asyncDataDefaults.value;
  const getDefaultCachedData = () => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key];
  options.server ?? (options.server = true);
  options.default ?? (options.default = getDefault);
  options.getCachedData ?? (options.getCachedData = getDefaultCachedData);
  options.lazy ?? (options.lazy = false);
  options.immediate ?? (options.immediate = true);
  options.deep ?? (options.deep = asyncDataDefaults.deep);
  options.dedupe ?? (options.dedupe = "cancel");
  const initialCachedData = options.getCachedData(key, nuxtApp);
  const hasCachedData = initialCachedData != null;
  if (!nuxtApp._asyncData[key] || !options.immediate) {
    (_b = nuxtApp.payload._errors)[key] ?? (_b[key] = asyncDataDefaults.errorValue);
    const _ref = options.deep ? ref : shallowRef;
    nuxtApp._asyncData[key] = {
      data: _ref(hasCachedData ? initialCachedData : options.default()),
      pending: ref(!hasCachedData),
      error: toRef(nuxtApp.payload._errors, key),
      status: ref("idle"),
      _default: options.default
    };
  }
  const asyncData = { ...nuxtApp._asyncData[key] };
  delete asyncData._default;
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxtApp._asyncDataPromises[key]) {
      if (isDefer(opts.dedupe ?? options.dedupe)) {
        return nuxtApp._asyncDataPromises[key];
      }
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial || nuxtApp.isHydrating && opts._initial !== false) {
      const cachedData = opts._initial ? initialCachedData : options.getCachedData(key, nuxtApp);
      if (cachedData != null) {
        return Promise.resolve(cachedData);
      }
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxtApp));
        } catch (err) {
          reject(err);
        }
      }
    ).then(async (_result) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = await options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxtApp.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = asyncDataDefaults.errorValue;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxtApp._asyncDataPromises[key];
    });
    nuxtApp._asyncDataPromises[key] = promise;
    return nuxtApp._asyncDataPromises[key];
  };
  asyncData.clear = () => clearNuxtDataByKey(nuxtApp, key);
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    nuxtApp._asyncData[key].pending.value = false;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    if (nuxtApp._asyncDataPromises[key]) {
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    nuxtApp._asyncDataPromises[key] = void 0;
  }
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
    let { data: paste, error } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("paste", async () => {
      const route2 = useRoute();
      const pasteId = route2.params.pasteId;
      const cookieKey = useRequestHeaders(["cookie"]).cookie;
      const cookies = {};
      if (cookieKey) {
        cookieKey.split(";").forEach((frag) => {
          const a = frag.split("=");
          cookies[a[0].trim()] = a[1];
        });
      }
      const res = await $fetch(`${useRuntimeConfig().public.webAddress}/api/paste/${pasteId}`, {
        headers: {
          authorization: "ApiKey " + cookies["quickpaste_auth"]
        }
      });
      return res;
    }, {
      server: true
    })), __temp = await __temp, __restore(), __temp);
    if (paste.value && true) {
      useHead({
        title: "Quickpaste | " + paste.value.title.substring(0, 25)
      });
    }
    let { data: err } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("error", () => !paste.value && error.value ? error.value.statusCode : 200, { server: true })), __temp = await __temp, __restore(), __temp);
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
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-5ea59b0b>`);
      if (unref(paste)) {
        _push(`<div data-v-5ea59b0b>`);
        if (unref(pastePostingState) == 0) {
          _push(ssrRenderComponent(_component_PasteEditor, {
            onSubmit: rePaste,
            paste: unref(paste),
            editable: unref(editMode),
            submitText: "Re-Paste !"
          }, null, _parent));
        } else if (unref(pastePostingState) == 1) {
          _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-5ea59b0b><object width="300" height="300" type="image/svg+xml"${ssrRenderAttr("data", unref(_imports_0))} data-v-5ea59b0b><img${ssrRenderAttr("src", _imports_0)} data-v-5ea59b0b></object><div class="bg-gradient-to-tr from-green to-orange rounded p-6 h-min hidden md:block" data-v-5ea59b0b><h2 class="text-2xl font-bold" data-v-5ea59b0b>Creating paste</h2></div></div>`);
        } else {
          _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-5ea59b0b><object class="w-100px sm:w-150px md:w-300px" type="image/svg+xml"${ssrRenderAttr("data", unref(_imports_1))} data-v-5ea59b0b><img${ssrRenderAttr("src", _imports_1)} data-v-5ea59b0b></object><div class="doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min" data-v-5ea59b0b><h2 class="text-2xl font-bold" data-v-5ea59b0b>Paste created!</h2><h3 data-v-5ea59b0b> Check it at: <a class="font-bold"${ssrRenderAttr("href", `/paste/${(_a = unref(createdPaste)) == null ? void 0 : _a.pasteId}`)} data-v-5ea59b0b>${ssrInterpolate((_b = unref(createdPaste)) == null ? void 0 : _b.pasteId)} `);
          _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "arrow-up-right-from-square"] }, null, _parent));
          _push(`</a></h3></div></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<div data-v-5ea59b0b>`);
        if (unref(err) == 401) {
          _push(`<div class="flex flex-col items-center space-y-4" data-v-5ea59b0b><h2 class="text-xl text-gray-300" data-v-5ea59b0b>Enter password to view the paste</h2><div class="flex flex-col md:flex-row space-y-2 md:space-y-0" data-v-5ea59b0b><input${ssrRenderAttr("value", unref(password))} type="password" autocomplete="off" class="p-2 w-full md:w-auto text-center text-white rounded border-none focus:outline-none text-lg text-bold bg-darkgray mr-4" data-v-5ea59b0b><button class="bg-gradient-to-tr from-green to-orange rounded p-2 text-center hover:shadow-lg" data-v-5ea59b0b>Enter</button></div></div>`);
        } else {
          _push(`<div data-v-5ea59b0b><div class="flex flex-col justify-center content-center text-center bg-gradient-to-tr from-green to-orange mb-4 p-4 rounded" data-v-5ea59b0b><h1 class="text-3xl text-white text-shadow-sm" data-v-5ea59b0b> No paste here </h1></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/paste/[pasteId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _pasteId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5ea59b0b"]]);

export { _pasteId_ as default };
//# sourceMappingURL=_pasteId_.vue.mjs.map
