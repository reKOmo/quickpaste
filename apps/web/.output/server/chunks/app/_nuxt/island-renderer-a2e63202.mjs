import { defineComponent, createVNode, defineAsyncComponent } from 'vue';
import { c as createError } from '../server.mjs';
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
import 'vue/server-renderer';
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

const ApiDocRenderer = /* @__PURE__ */ defineAsyncComponent(() => import(
  './ApiDocRenderer.server-329659ca.mjs'
  /* webpackChunkName: "components/api-doc-renderer-server" */
).then((c) => c.default || c));
const islandComponents = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ApiDocRenderer
});
const islandRenderer = /* @__PURE__ */ defineComponent({
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const component = islandComponents[props.context.name];
    if (!component) {
      throw createError({
        statusCode: 404,
        statusMessage: `Island component not found: ${JSON.stringify(component)}`
      });
    }
    return () => createVNode(component || "span", { ...props.context.props, "nuxt-ssr-component-uid": "" });
  }
});

export { islandRenderer as default };
//# sourceMappingURL=island-renderer-a2e63202.mjs.map
