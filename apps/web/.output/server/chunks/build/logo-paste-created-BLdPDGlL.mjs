import { b as buildAssetsURL } from '../routes/renderer.mjs';
import { useSSRContext, resolveComponent, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc, e as useRuntimeConfig, j as __nuxt_component_1$2 } from './server.mjs';
import { P as Prism$1 } from './prismjs.client-e_DZ7_Vi.mjs';

const _sfc_main$3 = {
  data() {
    return {
      title: this.options !== void 0 ? this.options.title : "",
      priv: this.options !== void 0 ? this.options.isPrivate : false,
      password: this.options !== void 0 && this.options.password.length > 0 ? this.options.password : "",
      rotation: 0
    };
  },
  props: {
    submitText: {
      type: String,
      default: () => "Paste !"
    },
    options: {
      type: Object
    },
    loggedIn: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    submit() {
      this.$emit("submit", {
        title: this.title,
        isPrivate: this.priv,
        password: this.password
      });
    },
    toggleMenu() {
      this.$refs["moreOptionsMenu"].classList.toggle("hidden");
      this.rotation = this.rotation === 0 ? 180 : 0;
    }
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-2 w-full lg:w-2xl" }, _attrs))} data-v-b9b7f3ed><div class="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2" data-v-b9b7f3ed><input${ssrRenderAttr("value", $data.title)} maxlength="50" tooltip="Click to edit" placeholder="Add paste title" class="p-2 text-center text-white rounded placeholder-white-100 border-none focus:outline-none text-lg text-bold flex-1 bg-darkgray" data-v-b9b7f3ed><button class="accept bg-gradient-to-tr from-green to-orange rounded w-1/4 lg:w-full p-2 text-center hover:shadow-lg" data-v-b9b7f3ed>${ssrInterpolate($props.submitText)}</button></div><div class="flex flex-col justify-center" data-v-b9b7f3ed><a class="select-none font-bold bg-clip-text text-lg m-2 text-transparent bg-gradient-to-tr from-green to-orange text-center cursor-pointer" data-v-b9b7f3ed> Options <span class="text-green ml-2" data-v-b9b7f3ed>`);
  _push(ssrRenderComponent(_component_font_awesome_icon, {
    icon: ["fas", "fa-caret-down"],
    rotation: $data.rotation
  }, null, _parent));
  _push(`</span></a><div class="overflow-hidden hidden px-4 py-4 text-xl px-4 bg-blue rounded shadow-md shadow-black/50" data-v-b9b7f3ed><div class="w-full flex items-center" data-v-b9b7f3ed><label class="w-1/3" data-v-b9b7f3ed>Private</label><input${ssrIncludeBooleanAttr(Array.isArray($data.priv) ? ssrLooseContain($data.priv, null) : $data.priv) ? " checked" : ""}${ssrIncludeBooleanAttr(!$props.loggedIn) ? " disabled" : ""} type="checkbox" class="h-4 w-4 rounded border-3 border-black bg-darkgray accent-darkgray text-blue" data-v-b9b7f3ed><span class="text-sm text-gray-500 px-4" data-v-b9b7f3ed>Logged in users only</span></div><div class="w-full flex items-center" data-v-b9b7f3ed><label class="w-1/3" data-v-b9b7f3ed>Password</label><input${ssrRenderAttr("value", $data.password)} type="password" class="p-px text-center text-white rounded border-none focus:outline-none text-lg text-bold bg-darkgray flex-1" data-v-b9b7f3ed></div></div></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SideMenu.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-b9b7f3ed"]]);
function setCaretPosition(elem, caretPos) {
  if (elem != null) {
    if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.move("character", caretPos);
      range.select();
    } else {
      if (elem.selectionStart) {
        elem.focus();
        elem.setSelectionRange(caretPos, caretPos);
      } else
        elem.focus();
    }
  }
}
const _sfc_main$2 = {
  props: {
    lang: {
      type: String,
      default() {
        return "text";
      }
    },
    editable: {
      type: Boolean,
      default() {
        return true;
      }
    },
    value: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      text: this.value,
      inputElemet: void 0,
      codeDisplay: void 0,
      lineNumbers: void 0,
      editor: void 0,
      preCode: void 0
    };
  },
  watch: {
    lang: {
      handler: function(n, o) {
        this.update();
      },
      flush: "post"
    },
    $route: {
      handler: function() {
        this.update({ target: this.$data.inputElemet });
        this.$data.editor.classList.remove("hide-editor");
      },
      deep: "true"
    }
  },
  mounted() {
    this.$data.inputElemet = this.$refs["input"];
    this.$data.codeDisplay = this.$refs["code"];
    this.$data.lineNumbers = this.$refs["line-numbers"];
    this.$data.editor = this.$refs["editor"];
    this.$data.preCode = this.$refs["pre-code"];
    this.$data.editor.classList.remove("hide-editor");
    setTimeout(this.update.bind(this, { target: this.$data.inputElemet }), 100);
    (void 0).addEventListener("resize", this.update.bind(this, { target: this.$data.inputElemet }));
  },
  methods: {
    update() {
      let text = this.text;
      if (text.charAt(text.length - 1) == "\n") {
        text += "\xA0";
      }
      this.$data.codeDisplay.textContent = text;
      Prism$1.highlightAll();
      const lines = (text.match(/\n/g) || "").length + 1;
      let s = "";
      for (let i = 1; i <= lines; i++) {
        s += i + "\n";
      }
      this.$data.lineNumbers.textContent = s;
      let c = [this.$data.inputElemet, this.$data.preCode];
      const linesWidth = this.$data.lineNumbers.clientWidth + 10;
      for (let i = 0; i < c.length; i++) {
        c[i].style.left = linesWidth + "px";
        c[i].style.width = this.$data.editor.clientWidth - linesWidth + "px";
      }
      this.$data.codeDisplay.style.width = this.$data.inputElemet.clientWidth + "px";
      this.$data.preCode.style.height = this.$data.inputElemet.clientHeight + "px";
      this.$data.lineNumbers.style.height = this.$data.inputElemet.clientHeight + "px";
      this.fixScroll();
    },
    fixScroll() {
      this.$data.preCode.scroll({
        left: this.$data.inputElemet.scrollLeft,
        top: this.$data.inputElemet.scrollTop,
        behavior: "instant"
      });
      this.$data.lineNumbers.scroll({
        top: this.$data.inputElemet.scrollTop,
        behavior: "instant"
      });
    },
    type(e) {
      if (e.key == "Tab") {
        e.preventDefault();
        let pos = e.target.selectionStart;
        let text = this.$data.inputElemet.value;
        this.$data.inputElemet.value = text.slice(0, pos) + "	" + text.slice(pos);
        setCaretPosition(this.$data.inputElemet, pos + 1);
        this.update({ target: this.$data.inputElemet });
      }
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "editor-container",
    style: _ctx.$attrs.style
  }, _attrs))}><div class="editor hide-editor"><pre class="${ssrRenderClass(["language-" + $props.lang, "pre-code code-container overflow-hidden h-md"])}">                <code class="${ssrRenderClass(["language-" + $props.lang, "code"])}">
                </code>
            </pre><pre class="line-numbers">1</pre><textarea${ssrIncludeBooleanAttr(!$props.editable) ? " disabled" : ""} class="code-container" resize="false" spellcheck="false">${ssrInterpolate($data.text)}</textarea></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Editor.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$1 = {
  props: {
    editable: {
      type: Boolean,
      default() {
        return true;
      }
    },
    value: {
      default() {
        return {
          name: "",
          syntax: "text",
          content: ""
        };
      }
    }
  },
  data() {
    return {
      languages: useRuntimeConfig().public.supportedSyntaxes,
      selectedLang: this.value.syntax || "text",
      title: this.value.name
    };
  },
  methods: {
    getValue() {
      return {
        name: this.title,
        syntax: this.selectedLang,
        content: this.$refs.editor.text
      };
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Editor = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "main shadow-black shadow-lg rounded" }, _attrs))} data-v-c1d1f40e><div class="header bg-gradient-to-tr from-green to-orange p-2 flex justify-center rounded" data-v-c1d1f40e><input${ssrIncludeBooleanAttr(!$props.editable) ? " disabled" : ""}${ssrRenderAttr("value", $data.title)} type="text" maxlength="50" tooltip="Click to edit" placeholder="Name this snippet" class="flex-1 sm:mr-4 py-2 text-center text-white rounded placeholder-white-100 border-none focus:outline-none text-lg text-bold" data-v-c1d1f40e><select class="bg-transparent rounded w-6em md:w-10em text-center border-none" data-v-c1d1f40e><!--[-->`);
  ssrRenderList($data.languages, (lang, index) => {
    _push(`<option${ssrRenderAttr("value", lang)} data-v-c1d1f40e>${ssrInterpolate(lang)}</option>`);
  });
  _push(`<!--]--></select></div>`);
  _push(ssrRenderComponent(_component_Editor, {
    ref: "editor",
    style: { "width": "100%", "border-radius": "0 0 5px 5px" },
    lang: $data.selectedLang,
    value: $props.value.content,
    editable: $props.editable
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SnippetEditor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-c1d1f40e"]]);
const _sfc_main = {
  emits: ["submit"],
  props: {
    editable: {
      type: Boolean,
      default: () => true
    },
    paste: {
      type: Object
    },
    submitText: {
      type: String
    },
    loggedIn: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      snippets: [0]
    };
  },
  mounted() {
    if (this.paste) {
      this.paste.created = new Date(this.paste.created).toLocaleDateString();
    }
  },
  methods: {
    scrollSnippets() {
      setTimeout(() => {
        const cont = this.$refs["editor-conteiner"];
        cont.scrollTo({
          top: cont.scrollHeight,
          behavior: "smooth"
        });
      }, 10);
    },
    snippetAmount() {
      return this.paste ? this.paste.fragments.length : this.snippets.length;
    },
    createPaste(options) {
      let fragments = [];
      this.$refs["snippet"].forEach((s) => fragments.push(s.getValue()));
      const paste = {};
      Object.assign(paste, options);
      paste["fragments"] = fragments;
      this.$emit("submit", paste);
    },
    addSnippet() {
      const target = this.paste ? this.paste.fragments : this.snippets;
      const newSnippet = this.paste ? target.length[target.length - 1] + 1 : void 0;
      if (this.loggedIn && target.length < 500 || target.length < 5) {
        target.push(newSnippet);
      }
      this.scrollSnippets();
    },
    removeSnippet() {
      const target = this.paste ? this.paste.fragments : this.snippets;
      target.pop();
      this.scrollSnippets();
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_SideMenu = __nuxt_component_0$2;
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_ClientOnly = __nuxt_component_1$2;
  const _component_SnippetEditor = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["flex flex-col", { "lg:flex-row-reverse": $props.editable }]
  }, _attrs))}>`);
  if ($props.editable) {
    _push(ssrRenderComponent(_component_SideMenu, {
      onSubmit: $options.createPaste,
      ref: "side-menu",
      class: "mb-4 side-menu",
      options: $props.paste,
      submitText: $props.submitText,
      loggedIn: $props.loggedIn
    }, null, _parent));
  } else {
    _push(`<div class="sticky z-10 top-0 flex flex-col md:flex-row justify-between content-center text-center bg-gradient-to-tr from-green to-orange mb-4 p-4 rounded md:mr-2"><h1 class="text-3xl text-white text-shadow-sm">${ssrInterpolate($props.paste.title)} <span class="text-lg text-black text-shadow-none">by ${ssrInterpolate($props.paste.owner.username)}</span><span class="text-sm mb-1 text-dark-700">`);
    if ($props.paste != void 0 && $props.paste.isPrivate) {
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fas", "fa-eye-slash"],
        class: "ml-2"
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if ($props.paste != void 0 && $props.paste.password) {
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fas", "fa-lock"],
        class: "ml-2"
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`</span></h1><h2 class="h-min self-center">Created on `);
    _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
    _push(`</h2></div>`);
  }
  _push(`<div class="flex flex-col min-w-xs w-full editor lg:mr-8 pr-4 overflow-x-hidden md:overflow-y-auto md:max-h-2xl"><div>`);
  if ($props.paste) {
    _push(`<div><!--[-->`);
    ssrRenderList($props.paste.fragments, (post, index) => {
      _push(ssrRenderComponent(_component_SnippetEditor, {
        ref_for: true,
        ref: "snippet",
        key: index,
        value: post,
        editable: $props.editable,
        class: "mb-8"
      }, null, _parent));
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<div><!--[-->`);
    ssrRenderList($data.snippets, (id) => {
      _push(ssrRenderComponent(_component_SnippetEditor, {
        ref_for: true,
        ref: "snippet",
        key: id,
        editable: $props.editable,
        class: "mb-8"
      }, null, _parent));
    });
    _push(`<!--]--></div>`);
  }
  _push(`</div>`);
  if ($props.editable) {
    _push(`<div class="w-full px-4 flex justify-center space-x-4">`);
    if ($props.loggedIn && $options.snippetAmount() < 500 || $options.snippetAmount() < 5) {
      _push(`<button class="bg-green sm:px-10 flex-1 md:max-w-xs rounded py-2 hover:shadow-lg">Add snippet</button>`);
    } else {
      _push(`<!---->`);
    }
    if ($options.snippetAmount() > 1) {
      _push(`<button class="bg-red-500 sm:px-10 flex-1 md:max-w-xs rounded py-2 hover:shadow-lg hide">Remove last snippet</button>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PasteEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
const _imports_0 = "" + buildAssetsURL("logo-paste-loading.DNBVPCrc.svg");
const _imports_1 = "" + buildAssetsURL("logo-paste-created.wGUnUIZN.svg");

export { _imports_0 as _, _imports_1 as a, __nuxt_component_0 as b };
//# sourceMappingURL=logo-paste-created-BLdPDGlL.mjs.map
