import { j as defineNuxtPlugin } from '../server.mjs';
import Prism$2 from 'prismjs';

(function() {
  if (typeof Prism === "undefined" || true) {
    return;
  }
  var lang_dependencies = (
    /*dependencies_placeholder[*/
    {
      "javascript": "clike",
      "actionscript": "javascript",
      "apex": [
        "clike",
        "sql"
      ],
      "arduino": "cpp",
      "aspnet": [
        "markup",
        "csharp"
      ],
      "birb": "clike",
      "bison": "c",
      "c": "clike",
      "csharp": "clike",
      "cpp": "c",
      "cfscript": "clike",
      "chaiscript": [
        "clike",
        "cpp"
      ],
      "coffeescript": "javascript",
      "crystal": "ruby",
      "css-extras": "css",
      "d": "clike",
      "dart": "clike",
      "django": "markup-templating",
      "ejs": [
        "javascript",
        "markup-templating"
      ],
      "etlua": [
        "lua",
        "markup-templating"
      ],
      "erb": [
        "ruby",
        "markup-templating"
      ],
      "fsharp": "clike",
      "firestore-security-rules": "clike",
      "flow": "javascript",
      "ftl": "markup-templating",
      "gml": "clike",
      "glsl": "c",
      "go": "clike",
      "gradle": "clike",
      "groovy": "clike",
      "haml": "ruby",
      "handlebars": "markup-templating",
      "haxe": "clike",
      "hlsl": "c",
      "idris": "haskell",
      "java": "clike",
      "javadoc": [
        "markup",
        "java",
        "javadoclike"
      ],
      "jolie": "clike",
      "jsdoc": [
        "javascript",
        "javadoclike",
        "typescript"
      ],
      "js-extras": "javascript",
      "json5": "json",
      "jsonp": "json",
      "js-templates": "javascript",
      "kotlin": "clike",
      "latte": [
        "clike",
        "markup-templating",
        "php"
      ],
      "less": "css",
      "lilypond": "scheme",
      "liquid": "markup-templating",
      "markdown": "markup",
      "markup-templating": "markup",
      "mongodb": "javascript",
      "n4js": "javascript",
      "objectivec": "c",
      "opencl": "c",
      "parser": "markup",
      "php": "markup-templating",
      "phpdoc": [
        "php",
        "javadoclike"
      ],
      "php-extras": "php",
      "plsql": "sql",
      "processing": "clike",
      "protobuf": "clike",
      "pug": [
        "markup",
        "javascript"
      ],
      "purebasic": "clike",
      "purescript": "haskell",
      "qsharp": "clike",
      "qml": "javascript",
      "qore": "clike",
      "racket": "scheme",
      "cshtml": [
        "markup",
        "csharp"
      ],
      "jsx": [
        "markup",
        "javascript"
      ],
      "tsx": [
        "jsx",
        "typescript"
      ],
      "reason": "clike",
      "ruby": "clike",
      "sass": "css",
      "scss": "css",
      "scala": "java",
      "shell-session": "bash",
      "smarty": "markup-templating",
      "solidity": "clike",
      "soy": "markup-templating",
      "sparql": "turtle",
      "sqf": "clike",
      "squirrel": "clike",
      "stata": [
        "mata",
        "java",
        "python"
      ],
      "t4-cs": [
        "t4-templating",
        "csharp"
      ],
      "t4-vb": [
        "t4-templating",
        "vbnet"
      ],
      "tap": "yaml",
      "tt2": [
        "clike",
        "markup-templating"
      ],
      "textile": "markup",
      "twig": "markup-templating",
      "typescript": "javascript",
      "v": "clike",
      "vala": "clike",
      "vbnet": "basic",
      "velocity": "markup",
      "wiki": "markup",
      "xeora": "markup",
      "xml-doc": "markup",
      "xquery": "markup"
    }
  );
  var lang_aliases = (
    /*aliases_placeholder[*/
    {
      "html": "markup",
      "xml": "markup",
      "svg": "markup",
      "mathml": "markup",
      "ssml": "markup",
      "atom": "markup",
      "rss": "markup",
      "js": "javascript",
      "g4": "antlr4",
      "ino": "arduino",
      "arm-asm": "armasm",
      "art": "arturo",
      "adoc": "asciidoc",
      "avs": "avisynth",
      "avdl": "avro-idl",
      "gawk": "awk",
      "shell": "bash",
      "shortcode": "bbcode",
      "rbnf": "bnf",
      "oscript": "bsl",
      "cs": "csharp",
      "dotnet": "csharp",
      "cfc": "cfscript",
      "coffee": "coffeescript",
      "conc": "concurnas",
      "jinja2": "django",
      "dns-zone": "dns-zone-file",
      "dockerfile": "docker",
      "gv": "dot",
      "eta": "ejs",
      "xlsx": "excel-formula",
      "xls": "excel-formula",
      "gamemakerlanguage": "gml",
      "po": "gettext",
      "gni": "gn",
      "ld": "linker-script",
      "go-mod": "go-module",
      "hbs": "handlebars",
      "mustache": "handlebars",
      "hs": "haskell",
      "idr": "idris",
      "gitignore": "ignore",
      "hgignore": "ignore",
      "npmignore": "ignore",
      "webmanifest": "json",
      "kt": "kotlin",
      "kts": "kotlin",
      "kum": "kumir",
      "tex": "latex",
      "context": "latex",
      "ly": "lilypond",
      "emacs": "lisp",
      "elisp": "lisp",
      "emacs-lisp": "lisp",
      "md": "markdown",
      "moon": "moonscript",
      "n4jsd": "n4js",
      "nani": "naniscript",
      "objc": "objectivec",
      "qasm": "openqasm",
      "objectpascal": "pascal",
      "px": "pcaxis",
      "pcode": "peoplecode",
      "plantuml": "plant-uml",
      "pq": "powerquery",
      "mscript": "powerquery",
      "pbfasm": "purebasic",
      "purs": "purescript",
      "py": "python",
      "qs": "qsharp",
      "rkt": "racket",
      "razor": "cshtml",
      "rpy": "renpy",
      "res": "rescript",
      "robot": "robotframework",
      "rb": "ruby",
      "sh-session": "shell-session",
      "shellsession": "shell-session",
      "smlnj": "sml",
      "sol": "solidity",
      "sln": "solution-file",
      "rq": "sparql",
      "sclang": "supercollider",
      "t4": "t4-cs",
      "trickle": "tremor",
      "troy": "tremor",
      "trig": "turtle",
      "ts": "typescript",
      "tsconfig": "typoscript",
      "uscript": "unrealscript",
      "uc": "unrealscript",
      "url": "uri",
      "vb": "visual-basic",
      "vba": "visual-basic",
      "webidl": "web-idl",
      "mathematica": "wolfram",
      "nb": "wolfram",
      "wl": "wolfram",
      "xeoracube": "xeora",
      "yml": "yaml"
    }
  );
  var lang_data = {};
  var ignored_language = "none";
  var languages_path = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/components/";
  var script = Prism.util.currentScript();
  if (script) {
    var autoloaderFile = /\bplugins\/autoloader\/prism-autoloader\.(?:min\.)?js(?:\?[^\r\n/]*)?$/i;
    var prismFile = /(^|\/)[\w-]+\.(?:min\.)?js(?:\?[^\r\n/]*)?$/i;
    var autoloaderPath = script.getAttribute("data-autoloader-path");
    if (autoloaderPath != null) {
      languages_path = autoloaderPath.trim().replace(/\/?$/, "/");
    } else {
      var src = script.src;
      if (autoloaderFile.test(src)) {
        languages_path = src.replace(autoloaderFile, "components/");
      } else if (prismFile.test(src)) {
        languages_path = src.replace(prismFile, "$1components/");
      }
    }
  }
  var config = Prism.plugins.autoloader = {
    languages_path,
    use_minified: true,
    loadLanguages
  };
  function addScript(src2, success, error) {
    var s = document.createElement("script");
    s.src = src2;
    s.async = true;
    s.onload = function() {
      document.body.removeChild(s);
      success && success();
    };
    s.onerror = function() {
      document.body.removeChild(s);
      error && error();
    };
    document.body.appendChild(s);
  }
  function getDependencies(element) {
    var deps = (element.getAttribute("data-dependencies") || "").trim();
    if (!deps) {
      var parent = element.parentElement;
      if (parent && parent.tagName.toLowerCase() === "pre") {
        deps = (parent.getAttribute("data-dependencies") || "").trim();
      }
    }
    return deps ? deps.split(/\s*,\s*/g) : [];
  }
  function isLoaded(lang) {
    if (lang.indexOf("!") >= 0) {
      return false;
    }
    lang = lang_aliases[lang] || lang;
    if (lang in Prism.languages) {
      return true;
    }
    var data = lang_data[lang];
    return data && !data.error && data.loading === false;
  }
  function getLanguagePath(lang) {
    return config.languages_path + "prism-" + lang + (config.use_minified ? ".min" : "") + ".js";
  }
  function loadLanguages(languages, success, error) {
    if (typeof languages === "string") {
      languages = [languages];
    }
    var total = languages.length;
    var completed = 0;
    var failed = false;
    if (total === 0) {
      if (success) {
        setTimeout(success, 0);
      }
      return;
    }
    function successCallback() {
      if (failed) {
        return;
      }
      completed++;
      if (completed === total) {
        success && success(languages);
      }
    }
    languages.forEach(function(lang) {
      loadLanguage(lang, successCallback, function() {
        if (failed) {
          return;
        }
        failed = true;
        error && error(lang);
      });
    });
  }
  function loadLanguage(lang, success, error) {
    var force = lang.indexOf("!") >= 0;
    lang = lang.replace("!", "");
    lang = lang_aliases[lang] || lang;
    function load() {
      var data = lang_data[lang];
      if (!data) {
        data = lang_data[lang] = {
          callbacks: []
        };
      }
      data.callbacks.push({
        success,
        error
      });
      if (!force && isLoaded(lang)) {
        languageCallback(lang, "success");
      } else if (!force && data.error) {
        languageCallback(lang, "error");
      } else if (force || !data.loading) {
        data.loading = true;
        data.error = false;
        addScript(getLanguagePath(lang), function() {
          data.loading = false;
          languageCallback(lang, "success");
        }, function() {
          data.loading = false;
          data.error = true;
          languageCallback(lang, "error");
        });
      }
    }
    var dependencies = lang_dependencies[lang];
    if (dependencies && dependencies.length) {
      loadLanguages(dependencies, load, error);
    } else {
      load();
    }
  }
  function languageCallback(lang, type) {
    if (lang_data[lang]) {
      var callbacks = lang_data[lang].callbacks;
      for (var i = 0, l = callbacks.length; i < l; i++) {
        var callback = callbacks[i][type];
        if (callback) {
          setTimeout(callback, 0);
        }
      }
      callbacks.length = 0;
    }
  }
  Prism.hooks.add("complete", function(env) {
    var element = env.element;
    var language = env.language;
    if (!element || !language || language === ignored_language) {
      return;
    }
    var deps = getDependencies(element);
    if (/^diff-./i.test(language)) {
      deps.push("diff");
      deps.push(language.substr("diff-".length));
    } else {
      deps.push(language);
    }
    if (!deps.every(isLoaded)) {
      loadLanguages(deps, function() {
        Prism.highlightElement(element);
      });
    }
  });
})();
Prism$2.manual = true;
const Prism$1 = /* @__PURE__ */ defineNuxtPlugin(Prism$2);

export { Prism$1 as P };
//# sourceMappingURL=prismjs.client-28120ed2.mjs.map
