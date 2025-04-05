import { e as useRuntimeConfig, d as useNotificationStore, f as useRoute, a as __nuxt_component_0 } from './server.mjs';
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Login",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig().public;
    const githubAdress = `https://github.com/login/oauth/authorize?scope=read:user&client_id=${config.githubClientId}&redirect_uri=${config.webAddress}/user/login/github`;
    useNotificationStore();
    useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        external: true,
        href: githubAdress,
        class: "flex flex-row content-center justify-center bg-gradient-to-tr from-green to-orange rounded p-4 m-auto cursor-pointer"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>`);
            _push2(ssrRenderComponent(_component_font_awesome_icon, {
              icon: ["fab", "github"],
              size: "2x",
              "fixed-width": ""
            }, null, _parent2, _scopeId));
            _push2(`</span><span class="h-min self-center text-shadow-sm"${_scopeId}>Continue with Github</span>`);
          } else {
            return [
              createVNode("span", null, [
                createVNode(_component_font_awesome_icon, {
                  icon: ["fab", "github"],
                  size: "2x",
                  "fixed-width": ""
                })
              ]),
              createVNode("span", { class: "h-min self-center text-shadow-sm" }, "Continue with Github")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Login.vue.mjs.map
