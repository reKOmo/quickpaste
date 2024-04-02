import { _ as _imports_0, a as _imports_1, b as __nuxt_component_0 } from './logo-paste-created-7JdEbUmT.mjs';
import { withAsyncContext, ref, resolveComponent, unref, useSSRContext, shallowRef, toRef, getCurrentInstance, onServerPrefetch } from 'vue';
import { _ as _export_sfc, e as useUserStore, f as useNotificationStore, u as useHead, g as useRoute$1, b as asyncDataDefaults, h as useRequestHeaders, i as useRuntimeConfig, N as NotificationTypes, d as useNuxtApp, c as createError } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './prismjs.client-e_DZ7_Vi.mjs';
import 'prismjs';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:net';
import 'node:path';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/vue-fontawesome';
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/free-brands-svg-icons';

const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a2, _b2, _c, _d, _e, _f, _g, _h, _i;
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
  const getDefault = () => null;
  const getDefaultCachedData = () => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key];
  options.server = (_a2 = options.server) != null ? _a2 : true;
  options.default = (_b2 = options.default) != null ? _b2 : getDefault;
  options.getCachedData = (_c = options.getCachedData) != null ? _c : getDefaultCachedData;
  options.lazy = (_d = options.lazy) != null ? _d : false;
  options.immediate = (_e = options.immediate) != null ? _e : true;
  options.deep = (_f = options.deep) != null ? _f : asyncDataDefaults.deep;
  options.dedupe = (_g = options.dedupe) != null ? _g : "cancel";
  const hasCachedData = () => options.getCachedData(key, nuxtApp) != null;
  if (!nuxtApp._asyncData[key] || !options.immediate) {
    (_h = (_b = nuxtApp.payload._errors)[key]) != null ? _h : _b[key] = null;
    const _ref = options.deep ? ref : shallowRef;
    nuxtApp._asyncData[key] = {
      data: _ref((_i = options.getCachedData(key, nuxtApp)) != null ? _i : options.default()),
      pending: ref(!hasCachedData()),
      error: toRef(nuxtApp.payload._errors, key),
      status: ref("idle")
    };
  }
  const asyncData = { ...nuxtApp._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    var _a3;
    if (nuxtApp._asyncDataPromises[key]) {
      if (isDefer((_a3 = opts.dedupe) != null ? _a3 : options.dedupe)) {
        return nuxtApp._asyncDataPromises[key];
      }
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    if ((opts._initial || nuxtApp.isHydrating && opts._initial !== false) && hasCachedData()) {
      return Promise.resolve(options.getCachedData(key, nuxtApp));
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
      asyncData.error.value = null;
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
    nuxtApp.payload._errors[key] = null;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = null;
    nuxtApp._asyncData[key].pending.value = false;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key].cancelled = true;
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
    let { data: pasteData, error } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("paste", async (ctx) => {
      const route2 = useRoute$1();
      const pasteId = route2.params.pasteId;
      const cookieKey = useRequestHeaders(["cookie"]).cookie;
      const cookies = {};
      console.log(cookieKey);
      if (cookieKey) {
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
        console.log(res);
        return res;
      } else {
        return void 0;
      }
    }, {
      server: true
    })), __temp = await __temp, __restore(), __temp);
    let paste = ref(pasteData);
    if (paste.value && true) {
      useHead({
        title: "Quickpaste | " + paste.value.title.substring(0, 25)
      });
    }
    let { data: err } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("error", () => error.value ? error.value.response.status : 200, { server: true })), __temp = await __temp, __restore(), __temp);
    let editMode = ref(false);
    const route = useRoute$1();
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
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-f9506f66>`);
      if (unref(paste)) {
        _push(`<div data-v-f9506f66>`);
        if (unref(pastePostingState) == 0) {
          _push(ssrRenderComponent(_component_PasteEditor, {
            onSubmit: rePaste,
            paste: unref(paste),
            editable: unref(editMode),
            submitText: "Re-Paste !"
          }, null, _parent));
        } else if (unref(pastePostingState) == 1) {
          _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-f9506f66><object width="300" height="300" type="image/svg+xml"${ssrRenderAttr("data", unref(_imports_0))} data-v-f9506f66><img${ssrRenderAttr("src", _imports_0)} data-v-f9506f66></object><div class="bg-gradient-to-tr from-green to-orange rounded p-6 h-min hidden md:block" data-v-f9506f66><h2 class="text-2xl font-bold" data-v-f9506f66>Creating paste</h2></div></div>`);
        } else {
          _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-f9506f66><object class="w-100px sm:w-150px md:w-300px" type="image/svg+xml"${ssrRenderAttr("data", unref(_imports_1))} data-v-f9506f66><img${ssrRenderAttr("src", _imports_1)} data-v-f9506f66></object><div class="doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min" data-v-f9506f66><h2 class="text-2xl font-bold" data-v-f9506f66>Paste created!</h2><h3 data-v-f9506f66> Check it at: <a class="font-bold"${ssrRenderAttr("href", `/${(_a = unref(createdPaste)) == null ? void 0 : _a.pasteId}`)} data-v-f9506f66>${ssrInterpolate((_b = unref(createdPaste)) == null ? void 0 : _b.pasteId)} `);
          _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "arrow-up-right-from-square"] }, null, _parent));
          _push(`</a></h3></div></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<div data-v-f9506f66>`);
        if (unref(err) == 401) {
          _push(`<div class="flex flex-col items-center space-y-4" data-v-f9506f66><h2 class="text-xl text-gray-300" data-v-f9506f66>Enter password to view the paste</h2><div class="flex flex-col md:flex-row space-y-2 md:space-y-0" data-v-f9506f66><input${ssrRenderAttr("value", unref(password))} type="password" autocomplete="off" class="p-2 w-full md:w-auto text-center text-white rounded border-none focus:outline-none text-lg text-bold bg-darkgray mr-4" data-v-f9506f66><button class="bg-gradient-to-tr from-green to-orange rounded p-2 text-center hover:shadow-lg" data-v-f9506f66>Enter</button></div></div>`);
        } else {
          _push(`<div data-v-f9506f66><div class="flex flex-col justify-center content-center text-center bg-gradient-to-tr from-green to-orange mb-4 p-4 rounded" data-v-f9506f66><h1 class="text-3xl text-white text-shadow-sm" data-v-f9506f66> No paste here </h1></div></div>`);
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
const _pasteId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f9506f66"]]);

export { _pasteId_ as default };
//# sourceMappingURL=_pasteId_-DSp1Ifg7.mjs.map
