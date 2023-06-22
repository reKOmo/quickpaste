import { _ as _export_sfc, u as useNuxtApp } from '../server.mjs';
import { useSSRContext, defineComponent, withAsyncContext, mergeProps, unref } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { marked } from 'marked';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ApiDocRenderer.server",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const nuxtApp = useNuxtApp();
    const doc = ([__temp, __restore] = withAsyncContext(() => nuxtApp.$loadFile("api.md")), __temp = await __temp, __restore(), __temp);
    const parsedMarkdown = marked.parse(doc);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ ref: "guide" }, _attrs))} data-v-f8e9085a>${unref(parsedMarkdown)}</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ApiDocRenderer.server.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ApiDocRenderer_server = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f8e9085a"]]);

export { ApiDocRenderer_server as default };
//# sourceMappingURL=ApiDocRenderer.server-329659ca.mjs.map
