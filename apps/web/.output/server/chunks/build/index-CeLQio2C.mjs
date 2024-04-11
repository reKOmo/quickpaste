import { _ as __nuxt_component_2 } from './UserPanel-CquXYGDT.mjs';
import { b as useUserStore, d as useNotificationStore, j as __nuxt_component_1$2 } from './server.mjs';
import { ref, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import '../runtime.mjs';
import 'fs';
import 'path';
import 'unhead';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/vue-fontawesome';
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/free-brands-svg-icons';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    useNotificationStore();
    let pastes = ref([]);
    ref(void 0);
    ref(false);
    ref(null);
    let update = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UserPanel = __nuxt_component_2;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_ClientOnly = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: unref(update),
        class: "flex flex-col md:flex-row w-full justify-between"
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UserPanel, null, null, _parent));
      _push(`<div class="md:w-4/5"><h1 class="text-5xl mb-6 text-orange text-shadow-sm border-b border-blue pb-4">Pastes</h1>`);
      if (unref(pastes).length > 0) {
        _push(`<div class="max-h-prose overflow-y-auto"><!--[-->`);
        ssrRenderList(unref(pastes), (paste) => {
          _push(`<div class="flex flex-col md:flex-row justify-between content-cetner mr-2 p-2 px-8 mb-4 rounded bg-blue"><a${ssrRenderAttr("href", `/paste/${paste.uuid}`)}><h3 class="text-2xl font-bold">${ssrInterpolate(paste.title)} <span class="text-sm font-normal italic text-gray-500">#${ssrInterpolate(paste.uuid)}</span>`);
          if (paste.isPrivate) {
            _push(ssrRenderComponent(_component_font_awesome_icon, {
              icon: ["fas", "fa-eye-slash"],
              class: "text-sm ml-2 mb-px"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          if (paste.password) {
            _push(ssrRenderComponent(_component_font_awesome_icon, {
              icon: ["fas", "fa-lock"],
              class: "text-sm ml-2 mb-px"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</h3>`);
          _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
          _push(`</a><div class="flex flex-row justify-between"><a class="bg-green flex-1 m-2 rounded p-4 text-center"${ssrRenderAttr("href", `/paste/${paste.uuid}?edit=1`)}>Edit</a><button class="bg-red-600 flex-1 m-2 rounded p-4 text-center">Remove</button></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center"><h2 class="text-gray-400">You can create some pastes <a href="/" class="text-green">here</a></h2></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CeLQio2C.mjs.map
