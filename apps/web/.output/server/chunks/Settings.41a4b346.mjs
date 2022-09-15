import { v as vue_cjs_prod, j as __nuxt_component_0$2, k as __nuxt_component_3$1 } from './server.mjs';
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
      option: void 0,
      options: [
        {
          name: "Generate Api Key",
          component: this.generateApiKey
        },
        {
          name: "Delete Account",
          component: this.deleteAccount
        }
      ]
    };
  },
  methods: {
    changeOption(o) {
      this.option = o;
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Settings",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UserPanel = __nuxt_component_0$2;
      const _component_font_awesome_icon = vue_cjs_prod.resolveComponent("font-awesome-icon");
      const _component_SettingsList = __nuxt_component_3$1;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col md:flex-row w-full justify-between" }, _attrs))}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_UserPanel, null, null, _parent));
      _push(`<div class="md:w-4/5">`);
      if (_ctx.option) {
        _push(`<div><div class="w-full flex justify-center items-center pt-2 text-xl border-b-1 border-black mb-2 text-gray-200">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_font_awesome_icon, {
          icon: ["fas", "fa-arrow-left"],
          onClick: ($event) => _ctx.changeOption(void 0),
          class: "mr-4 p-2 cursor-pointer text-black hover:text-orange transition"
        }, null, _parent));
        _push(`<span>${serverRenderer.exports.ssrInterpolate(_ctx.option.name)}</span></div>`);
        serverRenderer.exports.ssrRenderVNode(_push, vue_cjs_prod.createVNode(vue_cjs_prod.resolveDynamicComponent(_ctx.option.component), null, null), _parent);
        _push(`</div>`);
      } else {
        _push(serverRenderer.exports.ssrRenderComponent(_component_SettingsList, {
          onPicked: _ctx.changeOption,
          options: _ctx.options
        }, null, _parent));
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/Settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Settings.41a4b346.mjs.map
