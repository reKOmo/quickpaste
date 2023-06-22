import { mergeProps, useSSRContext, defineComponent, h, getCurrentInstance, ref, computed, createVNode, Fragment, createStaticVNode, Teleport } from 'vue';
import { hash } from 'ohash';
import { _ as _export_sfc, g as getFragmentHTML, u as useNuxtApp, a as useRequestEvent, b as useHead, d as getSlotProps } from '../server.mjs';
import { randomUUID } from 'uncrypto';
import { u as useAsyncData } from './asyncData-f6d9eb15.mjs';
import Prism from 'prismjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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

const pKey = "_islandPromises";
const UID_ATTR = /nuxt-ssr-component-uid(="([^"]*)")?/;
const SLOTNAME_RE = /nuxt-ssr-slot-name="([^"]*)"/g;
const SLOT_FALLBACK_RE = /<div nuxt-slot-fallback-start="([^"]*)"[^>]*><\/div>(((?!<div nuxt-slot-fallback-end[^>]*>)[\s\S])*)<div nuxt-slot-fallback-end[^>]*><\/div>/g;
const SSR_UID_RE = /nuxt-ssr-component-uid="([^"]*)"/;
const getId = randomUUID;
const createServerComponent = (name) => {
  return /* @__PURE__ */ defineComponent({
    name,
    inheritAttrs: false,
    setup(_props, { attrs, slots }) {
      return () => h(NuxtServerComponent, {
        name,
        props: attrs
      }, slots);
    }
  });
};
const NuxtServerComponent = /* @__PURE__ */ defineComponent({
  name: "NuxtServerComponent",
  props: {
    name: {
      type: String,
      required: true
    },
    props: {
      type: Object,
      default: () => void 0
    },
    context: {
      type: Object,
      default: () => ({})
    }
  },
  async setup(props, { slots }) {
    var _a2;
    var _a, _b, _c;
    const instance = getCurrentInstance();
    const uid = ref((_a2 = (_c = (_b = getFragmentHTML((_a = instance.vnode) == null ? void 0 : _a.el)[0]) == null ? void 0 : _b.match(SSR_UID_RE)) == null ? void 0 : _c[1]) != null ? _a2 : getId());
    const nuxtApp = useNuxtApp();
    const mounted = ref(false);
    const key = ref(0);
    const hashId = computed(() => hash([props.name, props.props, props.context]));
    useRequestEvent();
    function _fetchComponent() {
      const url = `/__nuxt_island/${props.name}:${hashId.value}`;
      return $fetch(url, {
        params: {
          ...props.context,
          props: props.props ? JSON.stringify(props.props) : void 0
        }
      });
    }
    const res = useAsyncData(
      `${props.name}:${hashId.value}`,
      async () => {
        nuxtApp[pKey] = nuxtApp[pKey] || {};
        if (!nuxtApp[pKey][hashId.value]) {
          nuxtApp[pKey][hashId.value] = _fetchComponent().finally(() => {
            delete nuxtApp[pKey][hashId.value];
          });
        }
        const res2 = await nuxtApp[pKey][hashId.value];
        return {
          html: res2.html,
          head: {
            link: res2.head.link,
            style: res2.head.style
          }
        };
      },
      {
        immediate: true,
        default: () => ({
          html: "",
          head: {
            link: [],
            style: []
          }
        })
      }
    );
    useHead(() => res.data.value.head);
    const slotProps = computed(() => {
      return getSlotProps(res.data.value.html);
    });
    const availableSlots = computed(() => {
      return [...res.data.value.html.matchAll(SLOTNAME_RE)].map((m) => m[1]);
    });
    const html = computed(() => {
      const currentSlots = Object.keys(slots);
      return res.data.value.html.replace(UID_ATTR, () => `nuxt-ssr-component-uid="${getId()}"`).replace(SLOT_FALLBACK_RE, (full, slotName, content) => {
        if (currentSlots.includes(slotName)) {
          return "";
        }
        return content;
      });
    });
    function setUid() {
      var _a3;
      var _a22;
      uid.value = (_a3 = (_a22 = html.value.match(SSR_UID_RE)) == null ? void 0 : _a22[1]) != null ? _a3 : getId();
    }
    await res;
    {
      setUid();
    }
    return () => {
      const nodes = [createVNode(Fragment, {
        key: key.value
      }, [createStaticVNode(html.value, 1)])];
      if (uid.value && (mounted.value || nuxtApp.isHydrating || true)) {
        for (const slot in slots) {
          if (availableSlots.value.includes(slot)) {
            nodes.push(createVNode(Teleport, { to: `uid=${uid.value};slot=${slot}` }, {
              default: () => {
                var _a3;
                return ((_a3 = slotProps.value[slot]) != null ? _a3 : [void 0]).map((data) => {
                  var _a22;
                  return (_a22 = slots[slot]) == null ? void 0 : _a22.call(slots, data);
                });
              }
            }));
          }
        }
      }
      return nodes;
    };
  }
});
const _sfc_main = {
  data() {
    return {
      chapters: []
    };
  },
  mounted() {
    Prism.highlightAll();
    const headers = this.$refs["docs"].getElementsByTagName("h2");
    for (let i = 0; i < headers.length; i++) {
      this.chapters.push({
        title: headers[i].innerText,
        id: headers[i].id
      });
    }
  }
};
const __nuxt_component_0 = createServerComponent("ApiDocRenderer");
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ApiDocRenderer = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-row w-full relative" }, _attrs))}><div class="sticky hidden lg:block top-8 h-min mr-8 p-4 mt-8"><h2 class="text-2xl bg-clip-text text-transparent bg-gradient-to-tr from-green to-orange mb-4 font-bold"> Table of contents</h2><ul class="text-md bg-blue rounded"><!--[-->`);
  ssrRenderList($data.chapters, (chapter, index) => {
    _push(`<li class="py-2 pl-4 transform hover:translate-x-6 hover:text-red-500 word-break max-w-3/4"><a${ssrRenderAttr("href", `#${chapter.id}`)}>${ssrInterpolate(chapter.title)}</a></li>`);
  });
  _push(`<!--]--></ul></div><div class="article text-gray-100 w-full lg:w-3/4">`);
  _push(ssrRenderComponent(_component_ApiDocRenderer, null, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Api-Docs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ApiDocs = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { ApiDocs as default };
//# sourceMappingURL=Api-Docs-6daca07c.mjs.map
