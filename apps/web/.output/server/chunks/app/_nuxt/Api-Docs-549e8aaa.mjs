import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { marked } from 'marked';
import { P as Prism$1 } from './prismjs.client-28120ed2.mjs';
import '../server.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ufo';
import 'radix3';
import 'cookie-es';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'klona';
import 'defu';
import 'ohash';
import 'unstorage';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'http-graceful-shutdown';
import 'fs';
import 'path';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/vue-fontawesome';
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/free-brands-svg-icons';
import 'prismjs';

const markdown = '# Using the API\n---\n\n## Authentication and authorization\n\nTo get a permanent Api key  log into your Quickpaste account, then go to `Settings > Generate Api Key` and click `Genereate Api Key`.\n\n<br>\n\nTo authenticate when using the API include the API key in the `Authorization` header\n```text\n    Authorization: ApiKey eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\n```\n\n<br>\n\nFor password protected pastes use `Paste-Authorization` header to send the required password:\n```text\n    Paste-Authorization: sOme PaSSword1\n```\n\n<br>\n\n## Limits\n\nGuest users are limited to **3 daily pastes** and only **5 paste fragments** per paste.\nLogged in users have **30 daily pastes** with a limit of **500 paste fragments**.\n\nEach paste will be deleted after **1 month** on no activity (will not be viewed/modified).\n\n<br>\n\n## Paste format\n\nPaste format used when **sending** paste to API\n| | |\n|-|-|\n|`title`|Type: `string`|\n| | Length: 1-50 characters\n| | *Required*\n|`fragments`|Type: `array`|\n| | Array of [paste fragments](#paste-fragment).\n| | Min. length: 1\n| | *Required*\n|`isPrivate`|Type: `boolean`|\n| | Default: `false`|\n| | *Optional*\n|`password`|Type: `string`|\n| | Content of password protected pastes is encrypted with AES-256. If empty string provided no passowrd is applied\n| | *Optional*\n\n```json\n    {\n        "title": "Test",\n        "fragments": [\n            {\n\n            }\n        ],\n        "isPrivate": false,\n        "password": ""\n    }\n```\n\n### Paste fragment\n\nFormat for paste fragments.\n| | |\n|-|-|\n|`name`|Type: `string`|\n| | Length: 1-50 characters\n| | *Required*\n|`content`|Type: `string`|\n| | Content of paste fragment.\n| | *Required*\n|`syntax`|Type: `string`|\n| | Default: `text`\n| | `text` or one of supported syntaxes (<a href="https://prismjs.com/#supported-languages" target="_blank">see here</a>).\n| | *Optional*\n\n#### Sample upload ready paste\n\n```json\n    {\n        "title": "A new post",\n        "isPrivate": true,\n        "password": "",\n        "fragments": [\n            {\n                "name": "Sample text",\n                "syntax": "text",\n                "content": "Some sample text like Lorem Ipsum Dolores."\n            }\n        ]\n    }\n```\n\n<br>\n\n## Creating a paste\n\n```http \n    POST /api/paste\n```\n---  \n\n**Request body schema**: [Paste](#paste-format)\n\n**Sample responses:**\n- 200\n```json\n    {\n        "ok": true,\n        "result": {\n            "pasteId": "AabBcCX0"\n        }\n    }\n```\n\n- 403\n```json\n    {\n        "ok": false,\n        "result": string\n    }\n```\n\n<br>\n\n## Getting a paste    \n\n```http \n    GET /api/paste/{id}\n```\n\n---\n\n**Path parameters**\n- ***id*** - 8 character length alphanumerical string\n\n**Sample responses:**\n- 200\n```json\n    {\n        "title": "Sample",\n        "fragments": [\n            {\n                "name": "Sample",\n                "syntax": "text",\n                "content": "Congratulations!"\n            }\n        ],\n        "isPrivate": false,\n        "created": "2022-07-28T11:30:08.572Z",\n        "password": false,\n        "owner": {\n            "id": 0,\n            "username": "anonymus"\n        }\n    }\n```\n\n- 403\n```json\n    {\n        "ok": false,\n        "result": string\n    }\n```\n\n- 404\n```json\n    {\n        "ok": false,\n        "result": "Resource not found"\n    }\n```\n\n<br>\n\n## Deleting a paste    \n\n```http \n    DELETE /api/paste/{id}\n```\n\n---\n\n**Path parameters**\n- ***id*** - 8 character length alphanumerical string\n\n**Sample responses:**\n- 200\n```json\n    {\n    "ok": true,\n    "result": "Paste deleted"\n}\n```\n\n- 403\n```json\n    {\n        "ok": false,\n        "result": string\n    }\n```\n\n- 404\n```json\n    {\n        "ok": false,\n        "result": "Resource not found"\n    }\n```\n\n## Editing a paste    \n\n```http \n    PUT /api/paste/{id}\n```\n\n---\n\n**Request body schema**: [Paste](#paste-format)\n\n**Path parameters**\n- ***id*** - 8 character length alphanumerical string\n\n**Sample responses:**\n- 200\n```json\n    {\n        "ok": true,\n        "result": {\n            "pasteId": "faQSOcNP",\n            "message": "Updated paste"\n        }\n    }\n```\n\n- 403\n```json\n    {\n        "ok": false,\n        "result": string\n    }\n```\n\n- 404\n```json\n    {\n        "ok": false,\n        "result": "Resource not found"\n    }\n```\n\n## Getting authenticated users info    \n\n```http \n    GET /api/user\n```\n\n---\n\n**Sample responses:**\n- 200\n```json\n    {\n        "id": 2,\n        "username": "jade",\n        "joined": "2022-07-02T21:29:17.045Z"\n    }\n```\n\n- 403\n```json\n    {\n        "ok": false,\n        "result": string\n    }\n```\n\n## Getting authenticated users pastes\n\n```http \n    GET /api/user/pastes\n```\n\n---\n\n**Query parameters**\n- ***amount*** - number of pastes to return per page | *Default is 20*, *Optional*\n- ***pageId*** - id of page to display (returned from request) | *Optional*\n\n**Sample responses:**\n- 200\n```json\n    {\n    "ok": true,\n    "result": {\n        pastes: [\n            {\n                "title": "A new post",\n                "isPrivate": true,\n                "password": false,\n                "created": "2022-07-28T11:27:47.580Z",\n                "owner": {\n                    "username": "reKOmo",\n                    "id": 2\n                },\n                "uuid": "faQSOcNP"\n            },\n            {\n                "title": "e",\n                "isPrivate": false,\n                "password": false,\n                "created": "2022-07-28T11:25:02.333Z",\n                "owner": {\n                    "username": "reKOmo",\n                    "id": 2\n                },\n                "uuid": "sHFeCQmD"\n            }\n        ]\n    },\n    nextPage: 24\n}\n```\n\n- 403\n```json\n    {\n        "ok": false,\n        "result": string\n    }\n```';
const __default__ = {
  data() {
    return {
      chapters: []
    };
  },
  mounted() {
    Prism$1.highlightAll();
    const headers = this.$refs["docs"].getElementsByTagName("h2");
    for (let i = 0; i < headers.length; i++) {
      this.chapters.push({
        title: headers[i].innerText,
        id: headers[i].id
      });
    }
  }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "Api-Docs",
  __ssrInlineRender: true,
  setup(__props) {
    const parsedMarkdown = marked.parse(markdown);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-row w-full relative" }, _attrs))}><div class="sticky hidden lg:block top-8 h-min mr-8 p-4 mt-8"><h2 class="text-2xl bg-clip-text text-transparent bg-gradient-to-tr from-green to-orange mb-4 font-bold"> Table of contents</h2><ul class="text-md bg-blue rounded"><!--[-->`);
      ssrRenderList(_ctx.chapters, (chapter, index) => {
        _push(`<li class="py-2 pl-4 transform hover:translate-x-6 hover:text-red-500 word-break max-w-3/4"><a${ssrRenderAttr("href", `#${chapter.id}`)}>${ssrInterpolate(chapter.title)}</a></li>`);
      });
      _push(`<!--]--></ul></div><div class="article text-gray-100 w-full lg:w-3/4"><div>${unref(parsedMarkdown)}</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Api-Docs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Api-Docs-549e8aaa.mjs.map
