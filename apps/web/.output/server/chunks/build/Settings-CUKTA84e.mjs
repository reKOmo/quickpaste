import { useSSRContext, resolveComponent, mergeProps, createVNode, resolveDynamicComponent, ref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderVNode, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { f as useNotificationStore, N as NotificationTypes, _ as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_2 } from './UserPanel-ByoUS8nx.mjs';
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

const __default__$2 = {
  data() {
    return {
      key: void 0
    };
  },
  methods: {
    async getNewKey() {
      const res = await fetch("/user/generatePermaKey", {
        method: "GET",
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        this.key = data.result;
      } else {
        notificationStore.addNotification({
          type: NotificationTypes.NOTIFICATION,
          level: 1,
          title: "To genedate api key"
        });
      }
    }
  }
};
const _sfc_main$3 = /* @__PURE__ */ Object.assign(__default__$2, {
  __name: "GenerateApiKey",
  __ssrInlineRender: true,
  setup(__props) {
    useNotificationStore();
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}><p class="ml-2 mb-4 text-gray-200">After clicking the button a new API key will be generated and all previous ones will be deemd invalid.</p><div class="flex flex-row bg-darkgray rounded p-4 text-gray-200 shadow-black shadow-sm my-2 max-w-sm mx-auto"><div class="flex justify-center items-center mr-2">`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fas", "fa-circle-exclamation"],
        size: "xl",
        "fixed-width": "",
        class: "text-red-500"
      }, null, _parent));
      _push(`</div><div class="flex flex-col"><p class="text-md">Please save the key after it is shown as you will not be able to retrieve it.</p></div></div><div class="mt-4 flex">`);
      if (_ctx.key) {
        _push(`<div class="bg-darkgray rounded flex w-3/4 m-auto"><input class="flex-1 text-monospace text-gray-200 bg-darkgray rounded border-none text-center p-2 max-w-2xl break-word overflow-x-scroll"${ssrRenderAttr("value", _ctx.key)} readonly><div class="text-gray-200 p-2 text-xl flex justify-center items-center hover:text-orange transition cursor-pointer">`);
        _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fa-solid", "fa-copy"] }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<button class="m-auto bg-gradient-to-tr from-green to-orange rounded p-4 text-center text-lg hover:shadow-lg my-4">Generate key</button>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GenerateApiKey.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$3;
const __default__$1 = {
  methods: {
    async deleteAccount() {
      const proceed = await this.notificationStore.addNotification({
        type: NotificationTypes.CONFIRM,
        title: "Are you sure you want to delete your account?",
        description: "This action can not be undone and will result in permanent data loss!"
      });
      if (proceed) {
        const res = await fetch("/user/deleteAccount", {
          method: "GET",
          credentials: "include",
          redirect: "follow"
        });
        if (res.redirected) {
          (void 0).location = "/";
        } else if (!res.ok) {
          this.notificationStore.addNotification({
            type: NotificationTypes.NOTIFICATION,
            title: "Error accoured while deleting account. Please try again"
          });
        }
      }
    }
  }
};
const _sfc_main$2 = /* @__PURE__ */ Object.assign(__default__$1, {
  __name: "DeleteAccount",
  __ssrInlineRender: true,
  setup(__props) {
    useNotificationStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}><p class="ml-2 mb-4 text-gray-200">Click button below to delete your account.</p><div class="flex flex-row bg-darkgray rounded p-4 text-gray-200 shadow-black shadow-sm my-2 max-w-sm mx-auto"><div class="flex justify-center items-center mr-2">`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fas", "fa-circle-exclamation"],
        size: "xl",
        "fixed-width": "",
        class: "text-red-500"
      }, null, _parent));
      _push(`</div><div class="flex flex-col"><p class="text-md">DELETING YOUR ACCOUNT WILL ALSO DELETE ALL PASTES THAT YOU CREATED PERMANENTLY WITHOUT A WAY OF RECOVERING THEM</p></div></div><div class="mt-4 flex"><button class="m-auto bg-red-500 rounded p-4 text-center text-lg hover:shadow-lg my-4">Delete account</button></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DeleteAccount.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$2;
const _sfc_main$1 = {
  emits: ["picked"],
  props: {
    options: {
      type: Object,
      default: () => {
      }
    }
  },
  methods: {
    pick(op) {
      this.$emit("picked", op);
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><h2 class="text-3xl border-b-1 border-black pb-2 mb-4">Settings</h2><ul><!--[-->`);
  ssrRenderList($props.options, (option, index) => {
    _push(`<li class="text-lg hover:text-gray-200 transition cursor-pointer">${ssrInterpolate(option.name)}</li>`);
  });
  _push(`<!--]--></ul><!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SettingsList.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const __default__ = {
  data() {
    return {
      option: void 0
    };
  },
  methods: {
    changeOption(o) {
      this.option = o;
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Settings",
  __ssrInlineRender: true,
  setup(__props) {
    const generateApiKey = __nuxt_component_0;
    const deleteAccount = __nuxt_component_1;
    const options = [
      {
        name: "Generate Api Key",
        component: generateApiKey
      },
      {
        name: "Delete Account",
        component: deleteAccount
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UserPanel = __nuxt_component_2;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_SettingsList = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col md:flex-row w-full justify-between" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UserPanel, null, null, _parent));
      _push(`<div class="md:w-4/5">`);
      if (_ctx.option) {
        _push(`<div><div class="w-full flex justify-center items-center pt-2 text-xl border-b-1 border-black mb-2 text-gray-200">`);
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: ["fas", "arrow-left"],
          onClick: ($event) => _ctx.changeOption(void 0),
          class: "mr-4 p-2 cursor-pointer text-black hover:text-orange transition"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(_ctx.option.name)}</span></div>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.option.component), null, null), _parent);
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_component_SettingsList, {
          onPicked: _ctx.changeOption,
          options
        }, null, _parent));
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/Settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Settings-CUKTA84e.mjs.map
