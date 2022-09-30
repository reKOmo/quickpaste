import { a as useRuntimeConfig, b as useNotificationStore, v as vue_cjs_prod, N as NotificationTypes } from './server.mjs';
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

const __default__ = {
  mounted() {
    const failedLogin = this.$route.query.failedLogin;
    document.title = "Quickpaste";
    if (failedLogin) {
      this.notificationStore.addNotification({
        type: NotificationTypes.NOTIFICATION,
        level: 1,
        title: "Failed to login. Please try again"
      });
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Login",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig().public;
    console.log(config);
    const githubAdress = `https://github.com/login/oauth/authorize?scope=read:user&client_id=${config.githubClientId}&redirect_uri=${config.webAddress}/user/login/github`;
    useNotificationStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_font_awesome_icon = vue_cjs_prod.resolveComponent("font-awesome-icon");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex flex-col" }, _attrs))}><a${serverRenderer.exports.ssrRenderAttr("href", githubAdress)} class="flex flex-row content-center justify-center bg-gradient-to-tr from-green to-orange rounded p-4 m-auto cursor-pointer">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fab", "github"],
        size: "2x",
        "fixed-width": ""
      }, null, _parent));
      _push(`<span class="h-min self-center text-shadow-sm">Continue with Github</span></a></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Login.f2696b7e.mjs.map
