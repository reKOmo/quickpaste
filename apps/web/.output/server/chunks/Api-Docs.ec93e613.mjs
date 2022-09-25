import { v as vue_cjs_prod, _ as _export_sfc, u as useNuxtApp } from './server.mjs';
import { marked } from 'marked';
import Prism$1 from 'prismjs';
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
import '@fortawesome/vue-fontawesome';
import 'stream';

const __default__ = {
  data() {
    return {
      chapters: []
    };
  },
  mounted() {
    Prism$1.highlightAll();
    const headers = this.$refs["guide"].getElementsByTagName("h2");
    for (let i = 0; i < headers.length; i++) {
      this.chapters.push({
        title: headers[i].innerText,
        id: headers[i].id
      });
    }
  }
};
const _sfc_main = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  ...__default__,
  __name: "Api-Docs",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    let parsedMarkdown = "";
    {
      const { $loadFile } = useNuxtApp();
      const markdown = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => $loadFile("api.md")), __temp = await __temp, __restore(), __temp);
      parsedMarkdown = marked.parse(markdown);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-row w-full relative" }, _attrs))} data-v-ee5aa794><div class="sticky hidden lg:block top-8 h-min mr-8 p-4 mt-8" data-v-ee5aa794><h2 class="text-2xl bg-clip-text text-transparent bg-gradient-to-tr from-green to-orange mb-4 font-bold" data-v-ee5aa794>Table of contents</h2><ul class="text-md bg-blue rounded" data-v-ee5aa794><!--[-->`);
      serverRenderer.exports.ssrRenderList(_ctx.chapters, (chapter, index) => {
        _push(`<li class="py-2 pl-4 transform hover:translate-x-6 hover:text-red-500 word-break max-w-3/4" data-v-ee5aa794><a${serverRenderer.exports.ssrRenderAttr("href", `#${chapter.id}`)} data-v-ee5aa794>${serverRenderer.exports.ssrInterpolate(chapter.title)}</a></li>`);
      });
      _push(`<!--]--></ul></div><div class="article text-gray-100 w-full lg:w-3/4" data-v-ee5aa794>${vue_cjs_prod.unref(parsedMarkdown)}</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Api-Docs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ApiDocs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ee5aa794"]]);

export { ApiDocs as default };
//# sourceMappingURL=Api-Docs.ec93e613.mjs.map
