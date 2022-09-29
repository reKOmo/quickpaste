import { v as vue_cjs_prod, _ as _export_sfc, c as useUserStore, b as useNotificationStore, d as useAsyncData, f as useRoute, i as useRequestHeaders, a as useRuntimeConfig, e as useHead, g as _imports_0$1, h as _imports_1, j as _sfc_main$g } from './server.mjs';
import { s as serverRenderer } from './renderer.mjs';
import 'unenv/runtime/mock/proxy';
import 'ohmyfetch';
import 'ufo';
import 'hookable';
import 'unctx';
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
import 'prismjs';
import '@fortawesome/vue-fontawesome';
import 'stream';

const __default__ = {
  data() {
    return {
      pastePostingState: 0,
      createdPaste: void 0
    };
  },
  methods: {
    async rePaste(paste) {
      this.pastePostingState = 1;
      const headers = {
        "Content-Type": "application/json"
      };
      if (this.password.length != 0) {
        headers["Paste-Authorization"] = this.password;
      }
      const res = await fetch(`/api/paste/${this.$route.params["pasteId"]}`, {
        method: "PUT",
        headers,
        credentials: "include",
        body: JSON.stringify(paste)
      });
      if (res.ok) {
        this.pastePostingState = 2;
        this.createdPaste = (await res.json()).result;
      }
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "[pasteId]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useUserStore();
    const notificationStore = useNotificationStore();
    notificationStore.addNotification;
    let { data: paste, error } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("paste", async (ctx) => {
      const route = useRoute();
      const pasteId = route.params.pasteId;
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
    }, "$Ihw3rQE6if")), __temp = await __temp, __restore(), __temp);
    if (paste.value && true) {
      useHead({
        title: "Quickpaste | " + paste.value.title.substring(0, 25)
      });
    }
    if (error.value)
      console.log(error.value);
    const { data: err } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("error", () => error.value ? error.value.response.status : 200, { server: true }, "$nnNzL6MnHs")), __temp = await __temp, __restore(), __temp);
    let editMode = vue_cjs_prod.ref(false);
    useRoute();
    let password = "";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PasteEditor = _sfc_main$g;
      const _component_font_awesome_icon = vue_cjs_prod.resolveComponent("font-awesome-icon");
      if (vue_cjs_prod.unref(paste)) {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)} data-v-39b55880>`);
        if (_ctx.pastePostingState == 0) {
          _push(serverRenderer.exports.ssrRenderComponent(_component_PasteEditor, {
            onSubmit: _ctx.rePaste,
            class: ["m-auto", { "max-w-4xl": !vue_cjs_prod.unref(editMode) }],
            paste: vue_cjs_prod.unref(paste),
            editable: vue_cjs_prod.unref(editMode),
            submitText: "Re-Paste !"
          }, null, _parent));
        } else if (_ctx.pastePostingState == 1) {
          _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-39b55880><object width="300" height="300" type="image/svg+xml"${serverRenderer.exports.ssrRenderAttr("data", _ctx.$refs["img0"].src)} data-v-39b55880><img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$1)} data-v-39b55880></object><div class="bg-gradient-to-tr from-green to-orange rounded p-6 h-min" data-v-39b55880><h2 class="text-2xl font-bold" data-v-39b55880>Creating paste</h2></div></div>`);
        } else {
          _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-39b55880><object width="300" height="300" type="image/svg+xml"${serverRenderer.exports.ssrRenderAttr("data", _ctx.$refs["img1"].src)} data-v-39b55880><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1)} data-v-39b55880></object><div class="doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min" data-v-39b55880><h2 class="text-2xl font-bold" data-v-39b55880>Paste created!</h2><h3 data-v-39b55880> Check it at: <a class="font-bold"${serverRenderer.exports.ssrRenderAttr("href", `/${_ctx.createdPaste.pasteId}`)} data-v-39b55880>${serverRenderer.exports.ssrInterpolate(_ctx.createdPaste.pasteId)} `);
          _push(serverRenderer.exports.ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "fa-arrow-up-right-from-square"] }, null, _parent));
          _push(`</a></h3></div></div>`);
        }
        _push(`</div>`);
      } else if (vue_cjs_prod.unref(err) == 401) {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col items-center space-y-4" }, _attrs))} data-v-39b55880><h2 class="text-xl text-gray-300" data-v-39b55880>Enter password to view the paste</h2><div class="flex flex-col md:flex-row space-y-2 md:space-y-0" data-v-39b55880><input${serverRenderer.exports.ssrRenderAttr("value", vue_cjs_prod.unref(password))} type="password" autocomplete="off" class="p-2 w-full md:w-auto text-center text-white rounded border-none focus:outline-none text-lg text-bold bg-darkgray mr-4" data-v-39b55880><button class="bg-gradient-to-tr from-green to-orange rounded p-2 text-center hover:shadow-lg" data-v-39b55880>Enter</button></div></div>`);
      } else {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)} data-v-39b55880><div class="flex flex-col justify-center content-center text-center bg-gradient-to-tr from-green to-orange mb-4 p-4 rounded" data-v-39b55880><h1 class="text-3xl text-white text-shadow-sm" data-v-39b55880> No paste here </h1></div></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[pasteId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _pasteId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-39b55880"]]);

export { _pasteId_ as default };
//# sourceMappingURL=_pasteId_.4ccf832c.mjs.map
