import { f as useRoute, e as useHead, v as vue_cjs_prod } from './server.mjs';
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
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex justify-center mb-8" }, _attrs))}><div class="relative container sm:w-screen-xl mx-4 p-8 border-content bg-bgdark">`);
      serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/Default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Default.5e49f421.mjs.map
