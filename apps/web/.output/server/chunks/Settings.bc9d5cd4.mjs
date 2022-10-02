import { k as __nuxt_component_0$2, l as __nuxt_component_3$1, m as _sfc_main$c, n as _sfc_main$b } from './server.mjs';
import { resolveComponent, mergeProps, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderVNode } from 'vue/server-renderer';
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
      option: void 0
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
    const generateApiKey = _sfc_main$c;
    const deleteAccount = _sfc_main$b;
    const options = [
      {
        name: "Generate Api Key",
        component: generateApiKey
      },
      {
        name: "Delete Account",
        component: deleteAccount
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UserPanel = __nuxt_component_0$2;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_SettingsList = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col md:flex-row w-full justify-between" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UserPanel, null, null, _parent));
      _push(`<div class="md:w-4/5">`);
      if (_ctx.option) {
        _push(`<div><div class="w-full flex justify-center items-center pt-2 text-xl border-b-1 border-black mb-2 text-gray-200">`);
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: ["fas", "fa-arrow-left"],
          onClick: ($event) => _ctx.changeOption(void 0),
          class: "mr-4 p-2 cursor-pointer text-black hover:text-orange transition"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(_ctx.option.name)}</span></div>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.option.component), null, null), _parent);
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_component_SettingsList, {
          onPicked: _ctx.changeOption,
          options
        }, null, _parent));
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/Settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Settings.bc9d5cd4.mjs.map
