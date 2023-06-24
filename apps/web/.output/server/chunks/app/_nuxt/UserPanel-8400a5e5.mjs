import { _ as _export_sfc, f as useUserStore, i as __nuxt_component_1$2, a as __nuxt_component_0$1 } from '../server.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = {
  __name: "UserPanel",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_1$2;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gradient-to-tr from-green to-orange rounded p-4 mr-12 w-full md:w-1/4 md:max-h-md md:min-h-sm mt-2" }, _attrs))} data-v-e9175cd8><div class="border-b border-black mb-4" data-v-e9175cd8>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div><ul class="flex flex-row gap-x-2 md:flex-col" data-v-e9175cd8><li class="hover:text-gray-200 py-1" data-v-e9175cd8>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/user" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Pastes`);
          } else {
            return [
              createTextVNode("Pastes")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="hover:text-gray-200 py-1" data-v-e9175cd8>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/user/settings" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Settings`);
          } else {
            return [
              createTextVNode("Settings")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UserPanel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e9175cd8"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=UserPanel-8400a5e5.mjs.map
