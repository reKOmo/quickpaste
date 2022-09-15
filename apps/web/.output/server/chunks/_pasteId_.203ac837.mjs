import { v as vue_cjs_prod, _ as _export_sfc, c as useUserStore, b as useNotificationStore, d as useAsyncData, f as useRouter, g as useRequestHeaders, a as useRuntimeConfig, e as useHead, h as _sfc_main$g } from './server.mjs';
import { s as serverRenderer } from './renderer.mjs';
import 'unenv/runtime/mock/proxy';
import 'ohmyfetch';
import 'ufo';
import 'hookable';
import 'unctx';
import 'destr';
import 'h3';
import 'defu';
import 'prismjs';
import 'cookie-es';
import 'ohash';
import 'fs';
import 'path';
import '@fortawesome/vue-fontawesome';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'pathe';
import 'url';
import 'stream';

const __default__ = {
  data() {
    return {
      editMode: false,
      password: "",
      pastePostingState: 0,
      createdPaste: void 0
    };
  },
  mounted() {
    this.checkEditMode();
    if (this.paste)
      document.title = "Quickpaste | " + this.paste.title.substring(0, 25);
  },
  methods: {
    checkEditMode() {
      if (this.userStore.user() == void 0)
        return;
      if (!this.paste)
        return;
      if (this.paste.owner.id != this.userStore.id())
        return;
      if (this.$route.query["edit"])
        this.editMode = true;
    },
    async rePaste(paste) {
      this.pastePostingState = 1;
      const headers = {
        "Content-Type": "application/json"
      };
      if (this.password.length != 0) {
        headers["Paste-Authorization"] = this.password;
      }
      const res = await fetch(`/webapi/paste/${this.$route.params["pasteId"]}`, {
        method: "PUT",
        headers,
        credentials: "include",
        body: JSON.stringify(paste)
      });
      if (res.ok) {
        this.pastePostingState = 2;
        this.createdPaste = (await res.json()).result;
      }
    },
    async reloadPaste() {
      if (this.password.length === 0) {
        this.notificationStore.addNotification({
          type: 1,
          title: "Please enter password to enter",
          level: 1
        });
        return;
      }
      const res = await fetch(`/webapi/paste/${this.$route.params["pasteId"]}`, {
        method: "GET",
        headers: {
          "Paste-Authorization": this.password
        },
        credentials: "include"
      });
      if (res.ok) {
        this.paste = await res.json();
        if (this.password.length != 0) {
          this.paste["password"] = this.password;
        }
        this.checkEditMode();
        document.title = "Quickpaste | " + this.paste.title.substring(0, 25);
      } else {
        switch (res.status) {
          case 401:
            this.notificationStore.addNotification({
              type: 1,
              title: "Incorrect password",
              level: 1
            });
            break;
        }
        this.password = "";
        this.err = res.status;
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
    useNotificationStore();
    const { data: paste, error } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(async () => useAsyncData("paste", async (ctx) => {
      const router = useRouter();
      const pasteId = router.currentRoute.value.params.pasteId;
      const cookieKey = useRequestHeaders(["cookie"]).cookie;
      const cookies = {};
      cookieKey.split(";").forEach((frag) => {
        const a = frag.split("=");
        cookies[a[0].trim()] = a[1];
      });
      const res = await $fetch(`${useRuntimeConfig().internalGatewayAddress}/api/paste/${pasteId}`, {
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PasteEditor = _sfc_main$g;
      const _component_font_awesome_icon = vue_cjs_prod.resolveComponent("font-awesome-icon");
      if (vue_cjs_prod.unref(paste)) {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)} data-v-b860b54e>`);
        if (_ctx.pastePostingState == 0) {
          _push(serverRenderer.exports.ssrRenderComponent(_component_PasteEditor, {
            onSubmit: _ctx.rePaste,
            class: ["m-auto", { "max-w-4xl": !_ctx.editMode }],
            paste: vue_cjs_prod.unref(paste),
            editable: _ctx.editMode,
            submitText: "Re-Paste !"
          }, null, _parent));
        } else if (_ctx.pastePostingState == 1) {
          _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-b860b54e><iframe width="300" height="300" src="../assets/animated/logo-paste-loading.svg" alt="Loading" data-v-b860b54e></iframe><div class="bg-gradient-to-tr from-green to-orange rounded p-6 h-min" data-v-b860b54e><h2 class="text-2xl font-bold" data-v-b860b54e>Creating paste</h2></div></div>`);
        } else {
          _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-b860b54e><iframe width="300" height="300" src="../assets/animated/logo-paste-created.svg" alt="Created" data-v-b860b54e></iframe><div class="doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min" data-v-b860b54e><h2 class="text-2xl font-bold" data-v-b860b54e>Paste created!</h2><h3 data-v-b860b54e> Check it at: <a class="font-bold"${serverRenderer.exports.ssrRenderAttr("href", `/${_ctx.createdPaste.pasteId}`)} data-v-b860b54e>${serverRenderer.exports.ssrInterpolate(_ctx.createdPaste.pasteId)} `);
          _push(serverRenderer.exports.ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "fa-arrow-up-right-from-square"] }, null, _parent));
          _push(`</a></h3></div></div>`);
        }
        _push(`</div>`);
      } else if (vue_cjs_prod.unref(err) == 401) {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col items-center space-y-4" }, _attrs))} data-v-b860b54e><h2 class="text-xl text-gray-300" data-v-b860b54e>Enter password to view the paste</h2><div class="flex flex-col md:flex-row space-y-2 md:space-y-0" data-v-b860b54e><input${serverRenderer.exports.ssrRenderAttr("value", _ctx.password)} type="password" autocomplete="off" class="p-2 w-full md:w-auto text-center text-white rounded border-none focus:outline-none text-lg text-bold bg-darkgray mr-4" data-v-b860b54e><button class="bg-gradient-to-tr from-green to-orange rounded p-2 text-center hover:shadow-lg" data-v-b860b54e>Enter</button></div></div>`);
      } else {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)} data-v-b860b54e><div class="flex flex-col justify-center content-center text-center bg-gradient-to-tr from-green to-orange mb-4 p-4 rounded" data-v-b860b54e><h1 class="text-3xl text-white text-shadow-sm" data-v-b860b54e> No paste here </h1></div></div>`);
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
const _pasteId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b860b54e"]]);

export { _pasteId_ as default };
//# sourceMappingURL=_pasteId_.203ac837.mjs.map
