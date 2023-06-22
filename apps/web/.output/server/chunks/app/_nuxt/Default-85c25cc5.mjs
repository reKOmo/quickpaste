import { mergeProps, useSSRContext } from 'vue';
import { j as useRoute, b as useHead } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'h3';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'ufo';
import 'fs';
import 'path';
import '@fortawesome/vue-fontawesome';
import 'cookie-es';
import 'ohash';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'klona';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const _sfc_main = {
  __name: "Default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const title = route.meta.title != void 0 ? "Quickpaste | " + route.meta.title : "Quickpaste";
    useHead({
      meta: [{ name: "og:title", content: title }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center mb-8" }, _attrs))}><div class="relative container sm:w-screen-xl mx-4 p-8 border-content bg-bgdark">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/Default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Default-85c25cc5.mjs.map
