var ne=Object.defineProperty;var se=(l,t,n)=>t in l?ne(l,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):l[t]=n;var M=(l,t,n)=>(se(l,typeof t!="symbol"?t+"":t,n),n);import{I as ie,c as q,a as P,J as re,K as le,n as ae,P as oe,o as O,t as he}from"./BLtwiURn.js";function X(){return{async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}let I=X();function ce(l){I=l}const J=/[&<>"']/,pe=new RegExp(J.source,"g"),V=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,ue=new RegExp(V.source,"g"),fe={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Q=l=>fe[l];function b(l,t){if(t){if(J.test(l))return l.replace(pe,Q)}else if(V.test(l))return l.replace(ue,Q);return l}const ge=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function W(l){return l.replace(ge,(t,n)=>(n=n.toLowerCase(),n==="colon"?":":n.charAt(0)==="#"?n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1)):""))}const de=/(^|[^\[])\^/g;function k(l,t){l=typeof l=="string"?l:l.source,t=t||"";const n={replace:(e,s)=>(s=s.source||s,s=s.replace(de,"$1"),l=l.replace(e,s),n),getRegex:()=>new RegExp(l,t)};return n}const me=/[^\w:]/g,ke=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function N(l,t,n){if(l){let e;try{e=decodeURIComponent(W(n)).replace(me,"").toLowerCase()}catch{return null}if(e.indexOf("javascript:")===0||e.indexOf("vbscript:")===0||e.indexOf("data:")===0)return null}t&&!ke.test(n)&&(n=ye(t,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch{return null}return n}const v={},xe=/^[^:]+:\/*[^/]*$/,we=/^([^:]+:)[\s\S]*$/,be=/^([^:]+:\/*[^/]*)[\s\S]*$/;function ye(l,t){v[" "+l]||(xe.test(l)?v[" "+l]=l+"/":v[" "+l]=L(l,"/",!0)),l=v[" "+l];const n=l.indexOf(":")===-1;return t.substring(0,2)==="//"?n?t:l.replace(we,"$1")+t:t.charAt(0)==="/"?n?t:l.replace(be,"$1")+t:l+t}const j={exec:function(){}};function G(l,t){const n=l.replace(/\|/g,(i,r,a)=>{let h=!1,d=r;for(;--d>=0&&a[d]==="\\";)h=!h;return h?"|":" |"}),e=n.split(/ \|/);let s=0;if(e[0].trim()||e.shift(),e.length>0&&!e[e.length-1].trim()&&e.pop(),e.length>t)e.splice(t);else for(;e.length<t;)e.push("");for(;s<e.length;s++)e[s]=e[s].trim().replace(/\\\|/g,"|");return e}function L(l,t,n){const e=l.length;if(e===0)return"";let s=0;for(;s<e;){const i=l.charAt(e-s-1);if(i===t&&!n)s++;else if(i!==t&&n)s++;else break}return l.slice(0,e-s)}function _e(l,t){if(l.indexOf(t[1])===-1)return-1;const n=l.length;let e=0,s=0;for(;s<n;s++)if(l[s]==="\\")s++;else if(l[s]===t[0])e++;else if(l[s]===t[1]&&(e--,e<0))return s;return-1}function $e(l){l&&l.sanitize&&!l.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}function F(l,t){if(t<1)return"";let n="";for(;t>1;)t&1&&(n+=l),t>>=1,l+=l;return n+l}function H(l,t,n,e){const s=t.href,i=t.title?b(t.title):null,r=l[1].replace(/\\([\[\]])/g,"$1");if(l[0].charAt(0)!=="!"){e.state.inLink=!0;const a={type:"link",raw:n,href:s,title:i,text:r,tokens:e.inlineTokens(r)};return e.state.inLink=!1,a}return{type:"image",raw:n,href:s,title:i,text:b(r)}}function ze(l,t){const n=l.match(/^(\s+)(?:```)/);if(n===null)return t;const e=n[1];return t.split(`
`).map(s=>{const i=s.match(/^\s+/);if(i===null)return s;const[r]=i;return r.length>=e.length?s.slice(e.length):s}).join(`
`)}class Z{constructor(t){this.options=t||I}space(t){const n=this.rules.block.newline.exec(t);if(n&&n[0].length>0)return{type:"space",raw:n[0]}}code(t){const n=this.rules.block.code.exec(t);if(n){const e=n[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?e:L(e,`
`)}}}fences(t){const n=this.rules.block.fences.exec(t);if(n){const e=n[0],s=ze(e,n[3]||"");return{type:"code",raw:e,lang:n[2]?n[2].trim().replace(this.rules.inline._escapes,"$1"):n[2],text:s}}}heading(t){const n=this.rules.block.heading.exec(t);if(n){let e=n[2].trim();if(/#$/.test(e)){const s=L(e,"#");(this.options.pedantic||!s||/ $/.test(s))&&(e=s.trim())}return{type:"heading",raw:n[0],depth:n[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(t){const n=this.rules.block.hr.exec(t);if(n)return{type:"hr",raw:n[0]}}blockquote(t){const n=this.rules.block.blockquote.exec(t);if(n){const e=n[0].replace(/^ *>[ \t]?/gm,""),s=this.lexer.state.top;this.lexer.state.top=!0;const i=this.lexer.blockTokens(e);return this.lexer.state.top=s,{type:"blockquote",raw:n[0],tokens:i,text:e}}}list(t){let n=this.rules.block.list.exec(t);if(n){let e,s,i,r,a,h,d,f,g,m,c,z,y=n[1].trim();const T=y.length>1,x={type:"list",raw:"",ordered:T,start:T?+y.slice(0,-1):"",loose:!1,items:[]};y=T?`\\d{1,9}\\${y.slice(-1)}`:`\\${y}`,this.options.pedantic&&(y=T?y:"[*+-]");const w=new RegExp(`^( {0,3}${y})((?:[	 ][^\\n]*)?(?:\\n|$))`);for(;t&&(z=!1,!(!(n=w.exec(t))||this.rules.block.hr.test(t)));){if(e=n[0],t=t.substring(e.length),f=n[2].split(`
`,1)[0].replace(/^\t+/,S=>" ".repeat(3*S.length)),g=t.split(`
`,1)[0],this.options.pedantic?(r=2,c=f.trimLeft()):(r=n[2].search(/[^ ]/),r=r>4?1:r,c=f.slice(r),r+=n[1].length),h=!1,!f&&/^ *$/.test(g)&&(e+=g+`
`,t=t.substring(g.length+1),z=!0),!z){const S=new RegExp(`^ {0,${Math.min(3,r-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),_=new RegExp(`^ {0,${Math.min(3,r-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),$=new RegExp(`^ {0,${Math.min(3,r-1)}}(?:\`\`\`|~~~)`),C=new RegExp(`^ {0,${Math.min(3,r-1)}}#`);for(;t&&(m=t.split(`
`,1)[0],g=m,this.options.pedantic&&(g=g.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!($.test(g)||C.test(g)||S.test(g)||_.test(t)));){if(g.search(/[^ ]/)>=r||!g.trim())c+=`
`+g.slice(r);else{if(h||f.search(/[^ ]/)>=4||$.test(f)||C.test(f)||_.test(f))break;c+=`
`+g}!h&&!g.trim()&&(h=!0),e+=m+`
`,t=t.substring(m.length+1),f=g.slice(r)}}x.loose||(d?x.loose=!0:/\n *\n *$/.test(e)&&(d=!0)),this.options.gfm&&(s=/^\[[ xX]\] /.exec(c),s&&(i=s[0]!=="[ ] ",c=c.replace(/^\[[ xX]\] +/,""))),x.items.push({type:"list_item",raw:e,task:!!s,checked:i,loose:!1,text:c}),x.raw+=e}x.items[x.items.length-1].raw=e.trimRight(),x.items[x.items.length-1].text=c.trimRight(),x.raw=x.raw.trimRight();const E=x.items.length;for(a=0;a<E;a++)if(this.lexer.state.top=!1,x.items[a].tokens=this.lexer.blockTokens(x.items[a].text,[]),!x.loose){const S=x.items[a].tokens.filter($=>$.type==="space"),_=S.length>0&&S.some($=>/\n.*\n/.test($.raw));x.loose=_}if(x.loose)for(a=0;a<E;a++)x.items[a].loose=!0;return x}}html(t){const n=this.rules.block.html.exec(t);if(n){const e={type:"html",raw:n[0],pre:!this.options.sanitizer&&(n[1]==="pre"||n[1]==="script"||n[1]==="style"),text:n[0]};if(this.options.sanitize){const s=this.options.sanitizer?this.options.sanitizer(n[0]):b(n[0]);e.type="paragraph",e.text=s,e.tokens=this.lexer.inline(s)}return e}}def(t){const n=this.rules.block.def.exec(t);if(n){const e=n[1].toLowerCase().replace(/\s+/g," "),s=n[2]?n[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline._escapes,"$1"):"",i=n[3]?n[3].substring(1,n[3].length-1).replace(this.rules.inline._escapes,"$1"):n[3];return{type:"def",tag:e,raw:n[0],href:s,title:i}}}table(t){const n=this.rules.block.table.exec(t);if(n){const e={type:"table",header:G(n[1]).map(s=>({text:s})),align:n[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:n[3]&&n[3].trim()?n[3].replace(/\n[ \t]*$/,"").split(`
`):[]};if(e.header.length===e.align.length){e.raw=n[0];let s=e.align.length,i,r,a,h;for(i=0;i<s;i++)/^ *-+: *$/.test(e.align[i])?e.align[i]="right":/^ *:-+: *$/.test(e.align[i])?e.align[i]="center":/^ *:-+ *$/.test(e.align[i])?e.align[i]="left":e.align[i]=null;for(s=e.rows.length,i=0;i<s;i++)e.rows[i]=G(e.rows[i],e.header.length).map(d=>({text:d}));for(s=e.header.length,r=0;r<s;r++)e.header[r].tokens=this.lexer.inline(e.header[r].text);for(s=e.rows.length,r=0;r<s;r++)for(h=e.rows[r],a=0;a<h.length;a++)h[a].tokens=this.lexer.inline(h[a].text);return e}}}lheading(t){const n=this.rules.block.lheading.exec(t);if(n)return{type:"heading",raw:n[0],depth:n[2].charAt(0)==="="?1:2,text:n[1],tokens:this.lexer.inline(n[1])}}paragraph(t){const n=this.rules.block.paragraph.exec(t);if(n){const e=n[1].charAt(n[1].length-1)===`
`?n[1].slice(0,-1):n[1];return{type:"paragraph",raw:n[0],text:e,tokens:this.lexer.inline(e)}}}text(t){const n=this.rules.block.text.exec(t);if(n)return{type:"text",raw:n[0],text:n[0],tokens:this.lexer.inline(n[0])}}escape(t){const n=this.rules.inline.escape.exec(t);if(n)return{type:"escape",raw:n[0],text:b(n[1])}}tag(t){const n=this.rules.inline.tag.exec(t);if(n)return!this.lexer.state.inLink&&/^<a /i.test(n[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(n[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(n[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:n[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(n[0]):b(n[0]):n[0]}}link(t){const n=this.rules.inline.link.exec(t);if(n){const e=n[2].trim();if(!this.options.pedantic&&/^</.test(e)){if(!/>$/.test(e))return;const r=L(e.slice(0,-1),"\\");if((e.length-r.length)%2===0)return}else{const r=_e(n[2],"()");if(r>-1){const h=(n[0].indexOf("!")===0?5:4)+n[1].length+r;n[2]=n[2].substring(0,r),n[0]=n[0].substring(0,h).trim(),n[3]=""}}let s=n[2],i="";if(this.options.pedantic){const r=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(s);r&&(s=r[1],i=r[3])}else i=n[3]?n[3].slice(1,-1):"";return s=s.trim(),/^</.test(s)&&(this.options.pedantic&&!/>$/.test(e)?s=s.slice(1):s=s.slice(1,-1)),H(n,{href:s&&s.replace(this.rules.inline._escapes,"$1"),title:i&&i.replace(this.rules.inline._escapes,"$1")},n[0],this.lexer)}}reflink(t,n){let e;if((e=this.rules.inline.reflink.exec(t))||(e=this.rules.inline.nolink.exec(t))){let s=(e[2]||e[1]).replace(/\s+/g," ");if(s=n[s.toLowerCase()],!s){const i=e[0].charAt(0);return{type:"text",raw:i,text:i}}return H(e,s,e[0],this.lexer)}}emStrong(t,n,e=""){let s=this.rules.inline.emStrong.lDelim.exec(t);if(!s||s[3]&&e.match(/[\p{L}\p{N}]/u))return;const i=s[1]||s[2]||"";if(!i||i&&(e===""||this.rules.inline.punctuation.exec(e))){const r=s[0].length-1;let a,h,d=r,f=0;const g=s[0][0]==="*"?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(g.lastIndex=0,n=n.slice(-1*t.length+r);(s=g.exec(n))!=null;){if(a=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!a)continue;if(h=a.length,s[3]||s[4]){d+=h;continue}else if((s[5]||s[6])&&r%3&&!((r+h)%3)){f+=h;continue}if(d-=h,d>0)continue;h=Math.min(h,h+d+f);const m=t.slice(0,r+s.index+(s[0].length-a.length)+h);if(Math.min(r,h)%2){const z=m.slice(1,-1);return{type:"em",raw:m,text:z,tokens:this.lexer.inlineTokens(z)}}const c=m.slice(2,-2);return{type:"strong",raw:m,text:c,tokens:this.lexer.inlineTokens(c)}}}}codespan(t){const n=this.rules.inline.code.exec(t);if(n){let e=n[2].replace(/\n/g," ");const s=/[^ ]/.test(e),i=/^ /.test(e)&&/ $/.test(e);return s&&i&&(e=e.substring(1,e.length-1)),e=b(e,!0),{type:"codespan",raw:n[0],text:e}}}br(t){const n=this.rules.inline.br.exec(t);if(n)return{type:"br",raw:n[0]}}del(t){const n=this.rules.inline.del.exec(t);if(n)return{type:"del",raw:n[0],text:n[2],tokens:this.lexer.inlineTokens(n[2])}}autolink(t,n){const e=this.rules.inline.autolink.exec(t);if(e){let s,i;return e[2]==="@"?(s=b(this.options.mangle?n(e[1]):e[1]),i="mailto:"+s):(s=b(e[1]),i=s),{type:"link",raw:e[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}url(t,n){let e;if(e=this.rules.inline.url.exec(t)){let s,i;if(e[2]==="@")s=b(this.options.mangle?n(e[0]):e[0]),i="mailto:"+s;else{let r;do r=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])[0];while(r!==e[0]);s=b(e[0]),e[1]==="www."?i="http://"+e[0]:i=e[0]}return{type:"link",raw:e[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(t,n){const e=this.rules.inline.text.exec(t);if(e){let s;return this.lexer.state.inRawBlock?s=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(e[0]):b(e[0]):e[0]:s=b(this.options.smartypants?n(e[0]):e[0]),{type:"text",raw:e[0],text:s}}}}const p={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:j,lheading:/^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/};p._label=/(?!\s*\])(?:\\.|[^\[\]\\])+/;p._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;p.def=k(p.def).replace("label",p._label).replace("title",p._title).getRegex();p.bullet=/(?:[*+-]|\d{1,9}[.)])/;p.listItemStart=k(/^( *)(bull) */).replace("bull",p.bullet).getRegex();p.list=k(p.list).replace(/bull/g,p.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+p.def.source+")").getRegex();p._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";p._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/;p.html=k(p.html,"i").replace("comment",p._comment).replace("tag",p._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();p.paragraph=k(p._paragraph).replace("hr",p.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",p._tag).getRegex();p.blockquote=k(p.blockquote).replace("paragraph",p.paragraph).getRegex();p.normal={...p};p.gfm={...p.normal,table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"};p.gfm.table=k(p.gfm.table).replace("hr",p.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",p._tag).getRegex();p.gfm.paragraph=k(p._paragraph).replace("hr",p.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",p.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",p._tag).getRegex();p.pedantic={...p.normal,html:k(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",p._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:j,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:k(p.normal._paragraph).replace("hr",p.hr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",p.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()};const o={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:j,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,rDelimUnd:/^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:j,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};o._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";o.punctuation=k(o.punctuation).replace(/punctuation/g,o._punctuation).getRegex();o.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;o.escapedEmSt=/(?:^|[^\\])(?:\\\\)*\\[*_]/g;o._comment=k(p._comment).replace("(?:-->|$)","-->").getRegex();o.emStrong.lDelim=k(o.emStrong.lDelim).replace(/punct/g,o._punctuation).getRegex();o.emStrong.rDelimAst=k(o.emStrong.rDelimAst,"g").replace(/punct/g,o._punctuation).getRegex();o.emStrong.rDelimUnd=k(o.emStrong.rDelimUnd,"g").replace(/punct/g,o._punctuation).getRegex();o._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;o._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;o._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;o.autolink=k(o.autolink).replace("scheme",o._scheme).replace("email",o._email).getRegex();o._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;o.tag=k(o.tag).replace("comment",o._comment).replace("attribute",o._attribute).getRegex();o._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;o._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;o._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;o.link=k(o.link).replace("label",o._label).replace("href",o._href).replace("title",o._title).getRegex();o.reflink=k(o.reflink).replace("label",o._label).replace("ref",p._label).getRegex();o.nolink=k(o.nolink).replace("ref",p._label).getRegex();o.reflinkSearch=k(o.reflinkSearch,"g").replace("reflink",o.reflink).replace("nolink",o.nolink).getRegex();o.normal={...o};o.pedantic={...o.normal,strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:k(/^!?\[(label)\]\((.*?)\)/).replace("label",o._label).getRegex(),reflink:k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",o._label).getRegex()};o.gfm={...o.normal,escape:k(o.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/};o.gfm.url=k(o.gfm.url,"i").replace("email",o.gfm._extended_email).getRegex();o.breaks={...o.gfm,br:k(o.br).replace("{2,}","*").getRegex(),text:k(o.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()};function Se(l){return l.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function K(l){let t="",n,e;const s=l.length;for(n=0;n<s;n++)e=l.charCodeAt(n),Math.random()>.5&&(e="x"+e.toString(16)),t+="&#"+e+";";return t}class R{constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||I,this.options.tokenizer=this.options.tokenizer||new Z,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={block:p.normal,inline:o.normal};this.options.pedantic?(n.block=p.pedantic,n.inline=o.pedantic):this.options.gfm&&(n.block=p.gfm,this.options.breaks?n.inline=o.breaks:n.inline=o.gfm),this.tokenizer.rules=n}static get rules(){return{block:p,inline:o}}static lex(t,n){return new R(n).lex(t)}static lexInline(t,n){return new R(n).inlineTokens(t)}lex(t){t=t.replace(/\r\n|\r/g,`
`),this.blockTokens(t,this.tokens);let n;for(;n=this.inlineQueue.shift();)this.inlineTokens(n.src,n.tokens);return this.tokens}blockTokens(t,n=[]){this.options.pedantic?t=t.replace(/\t/g,"    ").replace(/^ +$/gm,""):t=t.replace(/^( *)(\t+)/gm,(a,h,d)=>h+"    ".repeat(d.length));let e,s,i,r;for(;t;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(a=>(e=a.call({lexer:this},t,n))?(t=t.substring(e.raw.length),n.push(e),!0):!1))){if(e=this.tokenizer.space(t)){t=t.substring(e.raw.length),e.raw.length===1&&n.length>0?n[n.length-1].raw+=`
`:n.push(e);continue}if(e=this.tokenizer.code(t)){t=t.substring(e.raw.length),s=n[n.length-1],s&&(s.type==="paragraph"||s.type==="text")?(s.raw+=`
`+e.raw,s.text+=`
`+e.text,this.inlineQueue[this.inlineQueue.length-1].src=s.text):n.push(e);continue}if(e=this.tokenizer.fences(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.heading(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.hr(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.blockquote(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.list(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.html(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.def(t)){t=t.substring(e.raw.length),s=n[n.length-1],s&&(s.type==="paragraph"||s.type==="text")?(s.raw+=`
`+e.raw,s.text+=`
`+e.raw,this.inlineQueue[this.inlineQueue.length-1].src=s.text):this.tokens.links[e.tag]||(this.tokens.links[e.tag]={href:e.href,title:e.title});continue}if(e=this.tokenizer.table(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.lheading(t)){t=t.substring(e.raw.length),n.push(e);continue}if(i=t,this.options.extensions&&this.options.extensions.startBlock){let a=1/0;const h=t.slice(1);let d;this.options.extensions.startBlock.forEach(function(f){d=f.call({lexer:this},h),typeof d=="number"&&d>=0&&(a=Math.min(a,d))}),a<1/0&&a>=0&&(i=t.substring(0,a+1))}if(this.state.top&&(e=this.tokenizer.paragraph(i))){s=n[n.length-1],r&&s.type==="paragraph"?(s.raw+=`
`+e.raw,s.text+=`
`+e.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):n.push(e),r=i.length!==t.length,t=t.substring(e.raw.length);continue}if(e=this.tokenizer.text(t)){t=t.substring(e.raw.length),s=n[n.length-1],s&&s.type==="text"?(s.raw+=`
`+e.raw,s.text+=`
`+e.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):n.push(e);continue}if(t){const a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let e,s,i,r=t,a,h,d;if(this.tokens.links){const f=Object.keys(this.tokens.links);if(f.length>0)for(;(a=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)f.includes(a[0].slice(a[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,a.index)+"["+F("a",a[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(a=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,a.index)+"["+F("a",a[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(a=this.tokenizer.rules.inline.escapedEmSt.exec(r))!=null;)r=r.slice(0,a.index+a[0].length-2)+"++"+r.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex),this.tokenizer.rules.inline.escapedEmSt.lastIndex--;for(;t;)if(h||(d=""),h=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(f=>(e=f.call({lexer:this},t,n))?(t=t.substring(e.raw.length),n.push(e),!0):!1))){if(e=this.tokenizer.escape(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.tag(t)){t=t.substring(e.raw.length),s=n[n.length-1],s&&e.type==="text"&&s.type==="text"?(s.raw+=e.raw,s.text+=e.text):n.push(e);continue}if(e=this.tokenizer.link(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(e.raw.length),s=n[n.length-1],s&&e.type==="text"&&s.type==="text"?(s.raw+=e.raw,s.text+=e.text):n.push(e);continue}if(e=this.tokenizer.emStrong(t,r,d)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.codespan(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.br(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.del(t)){t=t.substring(e.raw.length),n.push(e);continue}if(e=this.tokenizer.autolink(t,K)){t=t.substring(e.raw.length),n.push(e);continue}if(!this.state.inLink&&(e=this.tokenizer.url(t,K))){t=t.substring(e.raw.length),n.push(e);continue}if(i=t,this.options.extensions&&this.options.extensions.startInline){let f=1/0;const g=t.slice(1);let m;this.options.extensions.startInline.forEach(function(c){m=c.call({lexer:this},g),typeof m=="number"&&m>=0&&(f=Math.min(f,m))}),f<1/0&&f>=0&&(i=t.substring(0,f+1))}if(e=this.tokenizer.inlineText(i,Se)){t=t.substring(e.raw.length),e.raw.slice(-1)!=="_"&&(d=e.raw.slice(-1)),h=!0,s=n[n.length-1],s&&s.type==="text"?(s.raw+=e.raw,s.text+=e.text):n.push(e);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}}class B{constructor(t){this.options=t||I}code(t,n,e){const s=(n||"").match(/\S*/)[0];if(this.options.highlight){const i=this.options.highlight(t,s);i!=null&&i!==t&&(e=!0,t=i)}return t=t.replace(/\n$/,"")+`
`,s?'<pre><code class="'+this.options.langPrefix+b(s)+'">'+(e?t:b(t,!0))+`</code></pre>
`:"<pre><code>"+(e?t:b(t,!0))+`</code></pre>
`}blockquote(t){return`<blockquote>
${t}</blockquote>
`}html(t){return t}heading(t,n,e,s){if(this.options.headerIds){const i=this.options.headerPrefix+s.slug(e);return`<h${n} id="${i}">${t}</h${n}>
`}return`<h${n}>${t}</h${n}>
`}hr(){return this.options.xhtml?`<hr/>
`:`<hr>
`}list(t,n,e){const s=n?"ol":"ul",i=n&&e!==1?' start="'+e+'"':"";return"<"+s+i+`>
`+t+"</"+s+`>
`}listitem(t){return`<li>${t}</li>
`}checkbox(t){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(t){return`<p>${t}</p>
`}table(t,n){return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+n+`</table>
`}tablerow(t){return`<tr>
${t}</tr>
`}tablecell(t,n){const e=n.header?"th":"td";return(n.align?`<${e} align="${n.align}">`:`<${e}>`)+t+`</${e}>
`}strong(t){return`<strong>${t}</strong>`}em(t){return`<em>${t}</em>`}codespan(t){return`<code>${t}</code>`}br(){return this.options.xhtml?"<br/>":"<br>"}del(t){return`<del>${t}</del>`}link(t,n,e){if(t=N(this.options.sanitize,this.options.baseUrl,t),t===null)return e;let s='<a href="'+t+'"';return n&&(s+=' title="'+n+'"'),s+=">"+e+"</a>",s}image(t,n,e){if(t=N(this.options.sanitize,this.options.baseUrl,t),t===null)return e;let s=`<img src="${t}" alt="${e}"`;return n&&(s+=` title="${n}"`),s+=this.options.xhtml?"/>":">",s}text(t){return t}}class Y{strong(t){return t}em(t){return t}codespan(t){return t}del(t){return t}html(t){return t}text(t){return t}link(t,n,e){return""+e}image(t,n,e){return""+e}br(){return""}}class ee{constructor(){this.seen={}}serialize(t){return t.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(t,n){let e=t,s=0;if(this.seen.hasOwnProperty(e)){s=this.seen[t];do s++,e=t+"-"+s;while(this.seen.hasOwnProperty(e))}return n||(this.seen[t]=s,this.seen[e]=0),e}slug(t,n={}){const e=this.serialize(t);return this.getNextSafeSlug(e,n.dryrun)}}class A{constructor(t){this.options=t||I,this.options.renderer=this.options.renderer||new B,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new Y,this.slugger=new ee}static parse(t,n){return new A(n).parse(t)}static parseInline(t,n){return new A(n).parseInline(t)}parse(t,n=!0){let e="",s,i,r,a,h,d,f,g,m,c,z,y,T,x,w,E,S,_,$;const C=t.length;for(s=0;s<C;s++){if(c=t[s],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[c.type]&&($=this.options.extensions.renderers[c.type].call({parser:this},c),$!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type))){e+=$||"";continue}switch(c.type){case"space":continue;case"hr":{e+=this.renderer.hr();continue}case"heading":{e+=this.renderer.heading(this.parseInline(c.tokens),c.depth,W(this.parseInline(c.tokens,this.textRenderer)),this.slugger);continue}case"code":{e+=this.renderer.code(c.text,c.lang,c.escaped);continue}case"table":{for(g="",f="",a=c.header.length,i=0;i<a;i++)f+=this.renderer.tablecell(this.parseInline(c.header[i].tokens),{header:!0,align:c.align[i]});for(g+=this.renderer.tablerow(f),m="",a=c.rows.length,i=0;i<a;i++){for(d=c.rows[i],f="",h=d.length,r=0;r<h;r++)f+=this.renderer.tablecell(this.parseInline(d[r].tokens),{header:!1,align:c.align[r]});m+=this.renderer.tablerow(f)}e+=this.renderer.table(g,m);continue}case"blockquote":{m=this.parse(c.tokens),e+=this.renderer.blockquote(m);continue}case"list":{for(z=c.ordered,y=c.start,T=c.loose,a=c.items.length,m="",i=0;i<a;i++)w=c.items[i],E=w.checked,S=w.task,x="",w.task&&(_=this.renderer.checkbox(E),T?w.tokens.length>0&&w.tokens[0].type==="paragraph"?(w.tokens[0].text=_+" "+w.tokens[0].text,w.tokens[0].tokens&&w.tokens[0].tokens.length>0&&w.tokens[0].tokens[0].type==="text"&&(w.tokens[0].tokens[0].text=_+" "+w.tokens[0].tokens[0].text)):w.tokens.unshift({type:"text",text:_}):x+=_),x+=this.parse(w.tokens,T),m+=this.renderer.listitem(x,S,E);e+=this.renderer.list(m,z,y);continue}case"html":{e+=this.renderer.html(c.text);continue}case"paragraph":{e+=this.renderer.paragraph(this.parseInline(c.tokens));continue}case"text":{for(m=c.tokens?this.parseInline(c.tokens):c.text;s+1<C&&t[s+1].type==="text";)c=t[++s],m+=`
`+(c.tokens?this.parseInline(c.tokens):c.text);e+=n?this.renderer.paragraph(m):m;continue}default:{const U='Token with "'+c.type+'" type was not found.';if(this.options.silent){console.error(U);return}else throw new Error(U)}}}return e}parseInline(t,n){n=n||this.renderer;let e="",s,i,r;const a=t.length;for(s=0;s<a;s++){if(i=t[s],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[i.type]&&(r=this.options.extensions.renderers[i.type].call({parser:this},i),r!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type))){e+=r||"";continue}switch(i.type){case"escape":{e+=n.text(i.text);break}case"html":{e+=n.html(i.text);break}case"link":{e+=n.link(i.href,i.title,this.parseInline(i.tokens,n));break}case"image":{e+=n.image(i.href,i.title,i.text);break}case"strong":{e+=n.strong(this.parseInline(i.tokens,n));break}case"em":{e+=n.em(this.parseInline(i.tokens,n));break}case"codespan":{e+=n.codespan(i.text);break}case"br":{e+=n.br();break}case"del":{e+=n.del(this.parseInline(i.tokens,n));break}case"text":{e+=n.text(i.text);break}default:{const h='Token with "'+i.type+'" type was not found.';if(this.options.silent){console.error(h);return}else throw new Error(h)}}}return e}}class D{constructor(t){this.options=t||I}preprocess(t){return t}postprocess(t){return t}}M(D,"passThroughHooks",new Set(["preprocess","postprocess"]));function Te(l,t,n){return e=>{if(e.message+=`
Please report this to https://github.com/markedjs/marked.`,l){const s="<p>An error occurred:</p><pre>"+b(e.message+"",!0)+"</pre>";if(t)return Promise.resolve(s);if(n){n(null,s);return}return s}if(t)return Promise.reject(e);if(n){n(e);return}throw e}}function te(l,t){return(n,e,s)=>{typeof e=="function"&&(s=e,e=null);const i={...e};e={...u.defaults,...i};const r=Te(e.silent,e.async,s);if(typeof n>"u"||n===null)return r(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return r(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if($e(e),e.hooks&&(e.hooks.options=e),s){const a=e.highlight;let h;try{e.hooks&&(n=e.hooks.preprocess(n)),h=l(n,e)}catch(g){return r(g)}const d=function(g){let m;if(!g)try{e.walkTokens&&u.walkTokens(h,e.walkTokens),m=t(h,e),e.hooks&&(m=e.hooks.postprocess(m))}catch(c){g=c}return e.highlight=a,g?r(g):s(null,m)};if(!a||a.length<3||(delete e.highlight,!h.length))return d();let f=0;u.walkTokens(h,function(g){g.type==="code"&&(f++,setTimeout(()=>{a(g.text,g.lang,function(m,c){if(m)return d(m);c!=null&&c!==g.text&&(g.text=c,g.escaped=!0),f--,f===0&&d()})},0))}),f===0&&d();return}if(e.async)return Promise.resolve(e.hooks?e.hooks.preprocess(n):n).then(a=>l(a,e)).then(a=>e.walkTokens?Promise.all(u.walkTokens(a,e.walkTokens)).then(()=>a):a).then(a=>t(a,e)).then(a=>e.hooks?e.hooks.postprocess(a):a).catch(r);try{e.hooks&&(n=e.hooks.preprocess(n));const a=l(n,e);e.walkTokens&&u.walkTokens(a,e.walkTokens);let h=t(a,e);return e.hooks&&(h=e.hooks.postprocess(h)),h}catch(a){return r(a)}}}function u(l,t,n){return te(R.lex,A.parse)(l,t,n)}u.options=u.setOptions=function(l){return u.defaults={...u.defaults,...l},ce(u.defaults),u};u.getDefaults=X;u.defaults=I;u.use=function(...l){const t=u.defaults.extensions||{renderers:{},childTokens:{}};l.forEach(n=>{const e={...n};if(e.async=u.defaults.async||e.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if(s.renderer){const i=t.renderers[s.name];i?t.renderers[s.name]=function(...r){let a=s.renderer.apply(this,r);return a===!1&&(a=i.apply(this,r)),a}:t.renderers[s.name]=s.renderer}if(s.tokenizer){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");t[s.level]?t[s.level].unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),e.extensions=t),n.renderer){const s=u.defaults.renderer||new B;for(const i in n.renderer){const r=s[i];s[i]=(...a)=>{let h=n.renderer[i].apply(s,a);return h===!1&&(h=r.apply(s,a)),h}}e.renderer=s}if(n.tokenizer){const s=u.defaults.tokenizer||new Z;for(const i in n.tokenizer){const r=s[i];s[i]=(...a)=>{let h=n.tokenizer[i].apply(s,a);return h===!1&&(h=r.apply(s,a)),h}}e.tokenizer=s}if(n.hooks){const s=u.defaults.hooks||new D;for(const i in n.hooks){const r=s[i];D.passThroughHooks.has(i)?s[i]=a=>{if(u.defaults.async)return Promise.resolve(n.hooks[i].call(s,a)).then(d=>r.call(s,d));const h=n.hooks[i].call(s,a);return r.call(s,h)}:s[i]=(...a)=>{let h=n.hooks[i].apply(s,a);return h===!1&&(h=r.apply(s,a)),h}}e.hooks=s}if(n.walkTokens){const s=u.defaults.walkTokens;e.walkTokens=function(i){let r=[];return r.push(n.walkTokens.call(this,i)),s&&(r=r.concat(s.call(this,i))),r}}u.setOptions(e)})};u.walkTokens=function(l,t){let n=[];for(const e of l)switch(n=n.concat(t.call(u,e)),e.type){case"table":{for(const s of e.header)n=n.concat(u.walkTokens(s.tokens,t));for(const s of e.rows)for(const i of s)n=n.concat(u.walkTokens(i.tokens,t));break}case"list":{n=n.concat(u.walkTokens(e.items,t));break}default:u.defaults.extensions&&u.defaults.extensions.childTokens&&u.defaults.extensions.childTokens[e.type]?u.defaults.extensions.childTokens[e.type].forEach(function(s){n=n.concat(u.walkTokens(e[s],t))}):e.tokens&&(n=n.concat(u.walkTokens(e.tokens,t)))}return n};u.parseInline=te(R.lexInline,A.parseInline);u.Parser=A;u.parser=A.parse;u.Renderer=B;u.TextRenderer=Y;u.Lexer=R;u.lexer=R.lex;u.Tokenizer=Z;u.Slugger=ee;u.Hooks=D;u.parse=u;u.options;u.setOptions;u.use;u.walkTokens;u.parseInline;A.parse;R.lex;const Re=`# Using the API
---

## Authentication and authorization

To get a permanent Api key  log into your Quickpaste account, then go to \`Settings > Generate Api Key\` and click \`Genereate Api Key\`.

<br>

To authenticate when using the API include the API key in the \`Authorization\` header
\`\`\`text
    Authorization: ApiKey eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

<br>

For password protected pastes use \`Paste-Authorization\` header to send the required password:
\`\`\`text
    Paste-Authorization: sOme PaSSword1
\`\`\`

<br>

## Limits

Guest users are limited to **3 daily pastes** and only **5 paste fragments** per paste.
Logged in users have **30 daily pastes** with a limit of **500 paste fragments**.

Each paste will be deleted after **1 month** on no activity (will not be viewed/modified).

<br>

## Paste format

Paste format used when **sending** paste to API
| | |
|-|-|
|\`title\`|Type: \`string\`|
| | Length: 1-50 characters
| | *Required*
|\`fragments\`|Type: \`array\`|
| | Array of [paste fragments](#paste-fragment).
| | Min. length: 1
| | *Required*
|\`isPrivate\`|Type: \`boolean\`|
| | Default: \`false\`|
| | *Optional*
|\`password\`|Type: \`string\`|
| | Content of password protected pastes is encrypted with AES-256. If empty string provided no passowrd is applied
| | *Optional*

\`\`\`json
    {
        "title": "Test",
        "fragments": [
            {

            }
        ],
        "isPrivate": false,
        "password": ""
    }
\`\`\`

### Paste fragment

Format for paste fragments.
| | |
|-|-|
|\`name\`|Type: \`string\`|
| | Length: 1-50 characters
| | *Required*
|\`content\`|Type: \`string\`|
| | Content of paste fragment.
| | *Required*
|\`syntax\`|Type: \`string\`|
| | Default: \`text\`
| | \`text\` or one of supported syntaxes (<a href="https://prismjs.com/#supported-languages" target="_blank">see here</a>).
| | *Optional*

#### Sample upload ready paste

\`\`\`json
    {
        "title": "A new post",
        "isPrivate": true,
        "password": "",
        "fragments": [
            {
                "name": "Sample text",
                "syntax": "text",
                "content": "Some sample text like Lorem Ipsum Dolores."
            }
        ]
    }
\`\`\`

<br>

## Creating a paste

\`\`\`http 
    POST /api/paste
\`\`\`
---  

**Request body schema**: [Paste](#paste-format)

**Sample responses:**
- 200
\`\`\`json
    {
        "ok": true,
        "result": {
            "pasteId": "AabBcCX0"
        }
    }
\`\`\`

- 403
\`\`\`json
    {
        "ok": false,
        "result": string
    }
\`\`\`

<br>

## Getting a paste    

\`\`\`http 
    GET /api/paste/{id}
\`\`\`

---

**Path parameters**
- ***id*** - 8 character length alphanumerical string

**Sample responses:**
- 200
\`\`\`json
    {
        "title": "Sample",
        "fragments": [
            {
                "name": "Sample",
                "syntax": "text",
                "content": "Congratulations!"
            }
        ],
        "isPrivate": false,
        "created": "2022-07-28T11:30:08.572Z",
        "password": false,
        "owner": {
            "id": 0,
            "username": "anonymus"
        }
    }
\`\`\`

- 403
\`\`\`json
    {
        "ok": false,
        "result": string
    }
\`\`\`

- 404
\`\`\`json
    {
        "ok": false,
        "result": "Resource not found"
    }
\`\`\`

<br>

## Deleting a paste    

\`\`\`http 
    DELETE /api/paste/{id}
\`\`\`

---

**Path parameters**
- ***id*** - 8 character length alphanumerical string

**Sample responses:**
- 200
\`\`\`json
    {
    "ok": true,
    "result": "Paste deleted"
}
\`\`\`

- 403
\`\`\`json
    {
        "ok": false,
        "result": string
    }
\`\`\`

- 404
\`\`\`json
    {
        "ok": false,
        "result": "Resource not found"
    }
\`\`\`

## Editing a paste    

\`\`\`http 
    PUT /api/paste/{id}
\`\`\`

---

**Request body schema**: [Paste](#paste-format)

**Path parameters**
- ***id*** - 8 character length alphanumerical string

**Sample responses:**
- 200
\`\`\`json
    {
        "ok": true,
        "result": {
            "pasteId": "faQSOcNP",
            "message": "Updated paste"
        }
    }
\`\`\`

- 403
\`\`\`json
    {
        "ok": false,
        "result": string
    }
\`\`\`

- 404
\`\`\`json
    {
        "ok": false,
        "result": "Resource not found"
    }
\`\`\`

## Getting authenticated users info    

\`\`\`http 
    GET /api/user
\`\`\`

---

**Sample responses:**
- 200
\`\`\`json
    {
        "id": 2,
        "username": "jade",
        "joined": "2022-07-02T21:29:17.045Z"
    }
\`\`\`

- 403
\`\`\`json
    {
        "ok": false,
        "result": string
    }
\`\`\`

## Getting authenticated users pastes

\`\`\`http 
    GET /api/user/pastes
\`\`\`

---

**Query parameters**
- ***amount*** - number of pastes to return per page | *Default is 20*, *Optional*
- ***pageId*** - id of page to display (returned from request) | *Optional*

**Sample responses:**
- 200
\`\`\`json
    {
    "ok": true,
    "result": {
        pastes: [
            {
                "title": "A new post",
                "isPrivate": true,
                "password": false,
                "created": "2022-07-28T11:27:47.580Z",
                "owner": {
                    "username": "reKOmo",
                    "id": 2
                },
                "uuid": "faQSOcNP"
            },
            {
                "title": "e",
                "isPrivate": false,
                "password": false,
                "created": "2022-07-28T11:25:02.333Z",
                "owner": {
                    "username": "reKOmo",
                    "id": 2
                },
                "uuid": "sHFeCQmD"
            }
        ]
    },
    nextPage: 24
}
\`\`\`

- 403
\`\`\`json
    {
        "ok": false,
        "result": string
    }
\`\`\``,Ae={class:"flex flex-row w-full relative"},Ie={ref:"tabOfContents",class:"sticky hidden lg:block top-8 h-min mr-8 p-4 mt-8"},Ee=P("h2",{class:"text-2xl bg-clip-text text-transparent bg-gradient-to-tr from-green to-orange mb-4 font-bold"}," Table of contents",-1),Pe={class:"text-md bg-blue rounded"},Ce=["href"],ve={ref:"docs",class:"article text-gray-100 w-full lg:w-3/4"},Le=["innerHTML"],je={data(){return{chapters:[]}},mounted(){oe.highlightAll();const l=this.$refs.docs.getElementsByTagName("h2");for(let t=0;t<l.length;t++)this.chapters.push({title:l[t].innerText,id:l[t].id})}},Oe=ie({...je,__name:"Api-Docs",setup(l){const t=u.parse(Re);return(n,e)=>(O(),q("div",Ae,[P("div",Ie,[Ee,P("ul",Pe,[(O(!0),q(re,null,le(n.chapters,(s,i)=>(O(),q("li",{key:i,class:"py-2 pl-4 transform hover:translate-x-6 hover:text-red-500 word-break max-w-3/4"},[P("a",{href:`#${s.id}`},he(s.title),9,Ce)]))),128))])],512),P("div",ve,[P("div",{innerHTML:ae(t),ref:"docs"},null,8,Le)],512)]))}});export{Oe as default};
