import { b as useNotificationStore, c as useUserStore, v as vue_cjs_prod, N as NotificationTypes, l as __nuxt_component_0$2, n as __nuxt_component_1$2 } from './server.mjs';
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
      pastes: [],
      nextPageId: void 0,
      loadingMore: false
    };
  },
  methods: {
    async deletePaste(uuid) {
      const res = await this.notificationStore.addNotification({
        type: NotificationTypes.CONFIRM,
        title: "Delete paste?",
        description: "This action can not be reversed!"
      });
      if (res) {
        await $fetch(`/webapi/paste/${uuid}`, {
          method: "DELETE",
          credentials: "include"
        });
        await this.refreshPastes();
      }
    },
    async refreshPastes() {
      const res = await $fetch("/webapi/user/pastes", {
        credentials: "include",
        parseResponse: JSON.json
      });
      this.pastes = res.result.pastes;
      this.nextPageId = res.result.nextPage;
      for (let i = 0; i < this.pastes.length; i++) {
        this.pastes[i].created = new Date(this.pastes[i].created).toLocaleDateString();
      }
    },
    async loadMorePastes() {
      const cont = this.$refs["paste-container"];
      const scrollAm = cont.scrollTop + cont.clientHeight;
      if (this.nextPageId && scrollAm > cont.scrollHeight - 20 && !this.loadingMore) {
        this.loadingMore = true;
        const res = await $fetch(`/webapi/user/pastes?pageId=${this.nextPageId}`, {
          credentials: "include",
          parseResponse: JSON.json
        });
        this.nextPageId = res.result.nextPage;
        for (let i = 0; i < res.result.pastes.length; i++) {
          res.result.pastes[i].created = new Date(res.result.pastes[i].created).toLocaleDateString();
        }
        this.pastes = this.pastes.concat(res.result.pastes);
        this.loadingMore = false;
      }
    }
  },
  mounted() {
    document.title = `Quickpaste | ${this.userStore.username()}`;
    if (this.pastes.length === 0)
      this.refreshPastes();
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useNotificationStore();
    useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UserPanel = __nuxt_component_0$2;
      const _component_font_awesome_icon = vue_cjs_prod.resolveComponent("font-awesome-icon");
      const _component_ClientOnly = __nuxt_component_1$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col md:flex-row w-full justify-between" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_UserPanel, null, null, _parent));
      _push(`<div class="md:w-4/5"><h1 class="text-5xl mb-6 text-orange text-shadow-sm border-b border-blue pb-4">Pastes</h1>`);
      if (_ctx.pastes.length > 0) {
        _push(`<div class="max-h-prose overflow-y-auto"><!--[-->`);
        serverRenderer.exports.ssrRenderList(_ctx.pastes, (paste) => {
          _push(`<div class="flex flex-col md:flex-row justify-between content-cetner mr-2 p-2 px-8 mb-4 rounded bg-blue"><a${serverRenderer.exports.ssrRenderAttr("href", `/${paste.uuid}`)}><h3 class="text-2xl font-bold">${serverRenderer.exports.ssrInterpolate(paste.title)} <span class="text-sm font-normal italic text-gray-500">#${serverRenderer.exports.ssrInterpolate(paste.uuid)}</span>`);
          if (paste.isPrivate) {
            _push(serverRenderer.exports.ssrRenderComponent(_component_font_awesome_icon, {
              icon: ["fas", "fa-eye-slash"],
              class: "text-sm ml-2 mb-px"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          if (paste.password) {
            _push(serverRenderer.exports.ssrRenderComponent(_component_font_awesome_icon, {
              icon: ["fas", "fa-lock"],
              class: "text-sm ml-2 mb-px"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</h3>`);
          _push(serverRenderer.exports.ssrRenderComponent(_component_ClientOnly, null, {
            default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<p${_scopeId}>Created: ${serverRenderer.exports.ssrInterpolate(paste.created)}</p>`);
              } else {
                return [
                  vue_cjs_prod.createVNode("p", null, "Created: " + vue_cjs_prod.toDisplayString(paste.created), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</a><div class="flex flex-row justify-between"><a class="bg-green flex-1 m-2 rounded p-4 text-center"${serverRenderer.exports.ssrRenderAttr("href", `/${paste.uuid}?edit=1`)}>Edit</a><button class="bg-red-600 flex-1 m-2 rounded p-4 text-center">Remove</button></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center"><h2 class="text-gray-400">You can create some pastes <a href="/" class="text-green">here</a></h2></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.c92bcf00.mjs.map
