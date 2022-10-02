import { _ as _export_sfc, c as useUserStore, f as _imports_0$1, g as _imports_1, i as __nuxt_component_0$3, j as __nuxt_component_0$6 } from './server.mjs';
import { useSSRContext, resolveComponent, unref, withCtx, createTextVNode } from 'vue';
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

const __default__ = {
  data() {
    return {
      snippets: [0],
      offscreen: false,
      postingPaste: false,
      createdPaste: void 0,
      requestCode: 200
    };
  },
  mounted() {
    document.title = "Quickpaste";
  },
  watch: {
    snippets: {
      handler() {
        setTimeout(() => {
          const cont = this.$refs["editor-conteiner"];
          cont.scrollTo({
            top: cont.scrollHeight,
            behavior: "smooth"
          });
        }, 10);
      },
      deep: true
    }
  },
  methods: {
    async createPaste(paste) {
      this.postingPaste = true;
      const res = await fetch(`/api/paste`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(paste)
      });
      const data = await res.json();
      this.createdPaste = data.result;
      this.requestCode = res.status;
    },
    removeLast() {
      if (this.snippets.length > 1)
        this.snippets.pop();
      if (this.snippets.length == 1)
        this.$refs["remove"].classList.add("hide");
    },
    addSnippet() {
      this.snippets.push(this.snippets.length);
      if (this.snippets.length > 1)
        this.$refs["remove"].classList.remove("hide");
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const loggedIn = userStore.user() != void 0;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PasteEditor = __nuxt_component_0$3;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_NuxtLink = __nuxt_component_0$6;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-8ed73d0a>`);
      if (!_ctx.postingPaste) {
        _push(`<div class="container" data-v-8ed73d0a>`);
        _push(ssrRenderComponent(_component_PasteEditor, {
          onSubmit: _ctx.createPaste,
          loggedIn
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div data-v-8ed73d0a>`);
        if (!_ctx.createdPaste) {
          _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-8ed73d0a><object width="300" height="300" type="image/svg+xml"${ssrRenderAttr("data", unref(_imports_0$1))} data-v-8ed73d0a><img${ssrRenderAttr("src", _imports_0$1)} data-v-8ed73d0a></object><div class="bg-gradient-to-tr from-green to-orange rounded p-6 h-min" data-v-8ed73d0a><h2 class="text-2xl font-bold" data-v-8ed73d0a>Creating paste</h2></div></div>`);
        } else {
          _push(`<div data-v-8ed73d0a>`);
          if (_ctx.requestCode == 200) {
            _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-8ed73d0a><object width="300" height="300" type="image/svg+xml"${ssrRenderAttr("data", unref(_imports_1))} data-v-8ed73d0a><img${ssrRenderAttr("src", _imports_1)} data-v-8ed73d0a></object><div class="doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min" data-v-8ed73d0a><h2 class="text-2xl font-bold" data-v-8ed73d0a>Paste created!</h2><h3 data-v-8ed73d0a> Check it at: <a class="font-bold"${ssrRenderAttr("href", `/${_ctx.createdPaste.pasteId}`)} data-v-8ed73d0a>${ssrInterpolate(_ctx.createdPaste.pasteId)} `);
            _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "fa-arrow-up-right-from-square"] }, null, _parent));
            _push(`</a></h3></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (_ctx.requestCode == 429) {
            _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-8ed73d0a><div class="doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min" data-v-8ed73d0a><h2 class="text-2xl font-bold" data-v-8ed73d0a>Daily paste limit reached</h2><h3 data-v-8ed73d0a> You have surpassed your daily paste limit. For more information see `);
            _push(ssrRenderComponent(_component_NuxtLink, { href: "/" }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`here`);
                } else {
                  return [
                    createTextVNode("here")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</h3></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8ed73d0a"]]);

export { index as default };
//# sourceMappingURL=index.9e835d63.mjs.map
