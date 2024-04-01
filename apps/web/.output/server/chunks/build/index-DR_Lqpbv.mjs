import { _ as _imports_0, a as _imports_1, b as __nuxt_component_0 } from './logo-paste-created-7JdEbUmT.mjs';
import { _ as _export_sfc, e as useUserStore, f as useNotificationStore, N as NotificationTypes, a as __nuxt_component_0$1 } from './server.mjs';
import { ref, resolveComponent, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './prismjs.client-e_DZ7_Vi.mjs';
import 'prismjs';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:net';
import 'node:path';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/vue-fontawesome';
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/free-brands-svg-icons';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const notificationStore = useNotificationStore();
    const loggedIn = userStore.user() != void 0;
    let postingPaste = ref(false);
    let createdPaste = ref(void 0);
    let requestCode = ref(200);
    let clientSidePaste = ref(void 0);
    const createPaste = async (paste) => {
      clientSidePaste.value = paste;
      postingPaste.value = true;
      const res = await fetch(`/api/paste`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(paste)
      });
      const data = await res.json();
      requestCode.value = res.status;
      createdPaste.value = data.result;
      if (!data.ok) {
        if (requestCode.value == 429)
          return;
        postingPaste.value = false;
        if (data.result.includes("title")) {
          notificationStore.addNotification({
            title: "Paste title is missing",
            type: NotificationTypes.NOTIFICATION,
            level: 1
          });
        } else if (data.result.includes("name")) {
          notificationStore.addNotification({
            title: "One or more fragments are missing a title",
            type: NotificationTypes.NOTIFICATION,
            level: 1
          });
        } else if (data.result.includes("content")) {
          notificationStore.addNotification({
            title: "Some fragments are missing a title",
            description: "Please deleate them, or add missing content",
            type: NotificationTypes.NOTIFICATION,
            level: 1
          });
        } else {
          notificationStore.addNotification({
            title: "Error accured when creating the paste",
            description: "Please try again.",
            type: NotificationTypes.NOTIFICATION,
            level: 1
          });
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PasteEditor = __nuxt_component_0;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-44147587>`);
      if (!unref(postingPaste)) {
        _push(`<div class="container" data-v-44147587>`);
        _push(ssrRenderComponent(_component_PasteEditor, {
          onSubmit: createPaste,
          paste: unref(clientSidePaste),
          loggedIn
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div data-v-44147587>`);
        if (!unref(createdPaste)) {
          _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-44147587><object width="300" height="300" type="image/svg+xml"${ssrRenderAttr("data", unref(_imports_0))} data-v-44147587><img${ssrRenderAttr("src", _imports_0)} data-v-44147587></object><div class="bg-gradient-to-tr from-green to-orange rounded p-6 h-min hidden md:block" data-v-44147587><h2 class="text-2xl font-bold" data-v-44147587>Creating paste...</h2></div></div>`);
        } else {
          _push(`<div data-v-44147587>`);
          if (unref(requestCode) == 200) {
            _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-44147587><object class="w-100px sm:w-150px md:w-300px" type="image/svg+xml"${ssrRenderAttr("data", unref(_imports_1))} data-v-44147587><img${ssrRenderAttr("src", _imports_1)} data-v-44147587></object><div class="doneText bg-gradient-to-tr from-green to-orange rounded p-6 mt-6 h-min" data-v-44147587><h2 class="text-2xl font-bold" data-v-44147587>Paste created!</h2><h3 data-v-44147587> Check it at: <a class="font-bold"${ssrRenderAttr("href", `/${unref(createdPaste).pasteId}`)} data-v-44147587>${ssrInterpolate(unref(createdPaste).pasteId)} `);
            _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "arrow-up-right-from-square"] }, null, _parent));
            _push(`</a></h3></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(requestCode) == 429) {
            _push(`<div class="flex flex-row justify-center items-center mt-12" data-v-44147587><div class="doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min" data-v-44147587><h2 class="text-2xl font-bold" data-v-44147587>Daily paste limit reached</h2><h3 data-v-44147587> You have surpassed your daily paste limit. For more information see `);
            _push(ssrRenderComponent(_component_NuxtLink, { href: "/api-docs#limits" }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`here`);
                } else {
                  return [
                    createTextVNode("here")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</h3></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-44147587"]]);

export { index as default };
//# sourceMappingURL=index-DR_Lqpbv.mjs.map
