import{g as ee,c as q,a as P,F as te,r as ne,h as ie,P as se,o as B,t as re}from"./entry.cb013063.js";function X(){return{baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}let C=X();function le(l){C=l}const ae=/[&<>"']/,oe=/[&<>"']/g,pe=/[<>"']|&(?!#?\w+;)/,he=/[<>"']|&(?!#?\w+;)/g,ce={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},M=l=>ce[l];function x(l,e){if(e){if(ae.test(l))return l.replace(oe,M)}else if(pe.test(l))return l.replace(he,M);return l}const ue=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function H(l){return l.replace(ue,(e,n)=>(n=n.toLowerCase(),n==="colon"?":":n.charAt(0)==="#"?n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1)):""))}const fe=/(^|[^\[])\^/g;function d(l,e){l=typeof l=="string"?l:l.source,e=e||"";const n={replace:(t,i)=>(i=i.source||i,i=i.replace(fe,"$1"),l=l.replace(t,i),n),getRegex:()=>new RegExp(l,e)};return n}const ge=/[^\w:]/g,de=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function Q(l,e,n){if(l){let t;try{t=decodeURIComponent(H(n)).replace(ge,"").toLowerCase()}catch{return null}if(t.indexOf("javascript:")===0||t.indexOf("vbscript:")===0||t.indexOf("data:")===0)return null}e&&!de.test(n)&&(n=we(e,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch{return null}return n}const v={},me=/^[^:]+:\/*[^/]*$/,ke=/^([^:]+:)[\s\S]*$/,xe=/^([^:]+:\/*[^/]*)[\s\S]*$/;function we(l,e){v[" "+l]||(me.test(l)?v[" "+l]=l+"/":v[" "+l]=D(l,"/",!0)),l=v[" "+l];const n=l.indexOf(":")===-1;return e.substring(0,2)==="//"?n?e:l.replace(ke,"$1")+e:e.charAt(0)==="/"?n?e:l.replace(xe,"$1")+e:l+e}const O={exec:function(){}};function _(l){let e=1,n,t;for(;e<arguments.length;e++){n=arguments[e];for(t in n)Object.prototype.hasOwnProperty.call(n,t)&&(l[t]=n[t])}return l}function N(l,e){const n=l.replace(/\|/g,(s,r,a)=>{let p=!1,f=r;for(;--f>=0&&a[f]==="\\";)p=!p;return p?"|":" |"}),t=n.split(/ \|/);let i=0;if(t[0].trim()||t.shift(),t.length>0&&!t[t.length-1].trim()&&t.pop(),t.length>e)t.splice(e);else for(;t.length<e;)t.push("");for(;i<t.length;i++)t[i]=t[i].trim().replace(/\\\|/g,"|");return t}function D(l,e,n){const t=l.length;if(t===0)return"";let i=0;for(;i<t;){const s=l.charAt(t-i-1);if(s===e&&!n)i++;else if(s!==e&&n)i++;else break}return l.slice(0,t-i)}function be(l,e){if(l.indexOf(e[1])===-1)return-1;const n=l.length;let t=0,i=0;for(;i<n;i++)if(l[i]==="\\")i++;else if(l[i]===e[0])t++;else if(l[i]===e[1]&&(t--,t<0))return i;return-1}function J(l){l&&l.sanitize&&!l.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}function G(l,e){if(e<1)return"";let n="";for(;e>1;)e&1&&(n+=l),e>>=1,l+=l;return n+l}function F(l,e,n,t){const i=e.href,s=e.title?x(e.title):null,r=l[1].replace(/\\([\[\]])/g,"$1");if(l[0].charAt(0)!=="!"){t.state.inLink=!0;const a={type:"link",raw:n,href:i,title:s,text:r,tokens:t.inlineTokens(r,[])};return t.state.inLink=!1,a}return{type:"image",raw:n,href:i,title:s,text:x(r)}}function ye(l,e){const n=l.match(/^(\s+)(?:```)/);if(n===null)return e;const t=n[1];return e.split(`
`).map(i=>{const s=i.match(/^\s+/);if(s===null)return i;const[r]=s;return r.length>=t.length?i.slice(t.length):i}).join(`
`)}class Z{constructor(e){this.options=e||C}space(e){const n=this.rules.block.newline.exec(e);if(n&&n[0].length>0)return{type:"space",raw:n[0]}}code(e){const n=this.rules.block.code.exec(e);if(n){const t=n[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?t:D(t,`
`)}}}fences(e){const n=this.rules.block.fences.exec(e);if(n){const t=n[0],i=ye(t,n[3]||"");return{type:"code",raw:t,lang:n[2]?n[2].trim():n[2],text:i}}}heading(e){const n=this.rules.block.heading.exec(e);if(n){let t=n[2].trim();if(/#$/.test(t)){const s=D(t,"#");(this.options.pedantic||!s||/ $/.test(s))&&(t=s.trim())}const i={type:"heading",raw:n[0],depth:n[1].length,text:t,tokens:[]};return this.lexer.inline(i.text,i.tokens),i}}hr(e){const n=this.rules.block.hr.exec(e);if(n)return{type:"hr",raw:n[0]}}blockquote(e){const n=this.rules.block.blockquote.exec(e);if(n){const t=n[0].replace(/^ *>[ \t]?/gm,"");return{type:"blockquote",raw:n[0],tokens:this.lexer.blockTokens(t,[]),text:t}}}list(e){let n=this.rules.block.list.exec(e);if(n){let t,i,s,r,a,p,f,g,b,m,c,I,y=n[1].trim();const R=y.length>1,k={type:"list",raw:"",ordered:R,start:R?+y.slice(0,-1):"",loose:!1,items:[]};y=R?`\\d{1,9}\\${y.slice(-1)}`:`\\${y}`,this.options.pedantic&&(y=R?y:"[*+-]");const w=new RegExp(`^( {0,3}${y})((?:[	 ][^\\n]*)?(?:\\n|$))`);for(;e&&(I=!1,!(!(n=w.exec(e))||this.rules.block.hr.test(e)));){if(t=n[0],e=e.substring(t.length),g=n[2].split(`
`,1)[0],b=e.split(`
`,1)[0],this.options.pedantic?(r=2,c=g.trimLeft()):(r=n[2].search(/[^ ]/),r=r>4?1:r,c=g.slice(r),r+=n[1].length),p=!1,!g&&/^ *$/.test(b)&&(t+=b+`
`,e=e.substring(b.length+1),I=!0),!I){const A=new RegExp(`^ {0,${Math.min(3,r-1)}}(?:[*+-]|\\d{1,9}[.)])((?: [^\\n]*)?(?:\\n|$))`),$=new RegExp(`^ {0,${Math.min(3,r-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),z=new RegExp(`^ {0,${Math.min(3,r-1)}}(?:\`\`\`|~~~)`),E=new RegExp(`^ {0,${Math.min(3,r-1)}}#`);for(;e&&(m=e.split(`
`,1)[0],g=m,this.options.pedantic&&(g=g.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!(z.test(g)||E.test(g)||A.test(g)||$.test(e)));){if(g.search(/[^ ]/)>=r||!g.trim())c+=`
`+g.slice(r);else if(!p)c+=`
`+g;else break;!p&&!g.trim()&&(p=!0),t+=m+`
`,e=e.substring(m.length+1)}}k.loose||(f?k.loose=!0:/\n *\n *$/.test(t)&&(f=!0)),this.options.gfm&&(i=/^\[[ xX]\] /.exec(c),i&&(s=i[0]!=="[ ] ",c=c.replace(/^\[[ xX]\] +/,""))),k.items.push({type:"list_item",raw:t,task:!!i,checked:s,loose:!1,text:c}),k.raw+=t}k.items[k.items.length-1].raw=t.trimRight(),k.items[k.items.length-1].text=c.trimRight(),k.raw=k.raw.trimRight();const L=k.items.length;for(a=0;a<L;a++){this.lexer.state.top=!1,k.items[a].tokens=this.lexer.blockTokens(k.items[a].text,[]);const A=k.items[a].tokens.filter(z=>z.type==="space"),$=A.every(z=>{const E=z.raw.split("");let j=0;for(const Y of E)if(Y===`
`&&(j+=1),j>1)return!0;return!1});!k.loose&&A.length&&$&&(k.loose=!0,k.items[a].loose=!0)}return k}}html(e){const n=this.rules.block.html.exec(e);if(n){const t={type:"html",raw:n[0],pre:!this.options.sanitizer&&(n[1]==="pre"||n[1]==="script"||n[1]==="style"),text:n[0]};return this.options.sanitize&&(t.type="paragraph",t.text=this.options.sanitizer?this.options.sanitizer(n[0]):x(n[0]),t.tokens=[],this.lexer.inline(t.text,t.tokens)),t}}def(e){const n=this.rules.block.def.exec(e);if(n)return n[3]&&(n[3]=n[3].substring(1,n[3].length-1)),{type:"def",tag:n[1].toLowerCase().replace(/\s+/g," "),raw:n[0],href:n[2],title:n[3]}}table(e){const n=this.rules.block.table.exec(e);if(n){const t={type:"table",header:N(n[1]).map(i=>({text:i})),align:n[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:n[3]&&n[3].trim()?n[3].replace(/\n[ \t]*$/,"").split(`
`):[]};if(t.header.length===t.align.length){t.raw=n[0];let i=t.align.length,s,r,a,p;for(s=0;s<i;s++)/^ *-+: *$/.test(t.align[s])?t.align[s]="right":/^ *:-+: *$/.test(t.align[s])?t.align[s]="center":/^ *:-+ *$/.test(t.align[s])?t.align[s]="left":t.align[s]=null;for(i=t.rows.length,s=0;s<i;s++)t.rows[s]=N(t.rows[s],t.header.length).map(f=>({text:f}));for(i=t.header.length,r=0;r<i;r++)t.header[r].tokens=[],this.lexer.inline(t.header[r].text,t.header[r].tokens);for(i=t.rows.length,r=0;r<i;r++)for(p=t.rows[r],a=0;a<p.length;a++)p[a].tokens=[],this.lexer.inline(p[a].text,p[a].tokens);return t}}}lheading(e){const n=this.rules.block.lheading.exec(e);if(n){const t={type:"heading",raw:n[0],depth:n[2].charAt(0)==="="?1:2,text:n[1],tokens:[]};return this.lexer.inline(t.text,t.tokens),t}}paragraph(e){const n=this.rules.block.paragraph.exec(e);if(n){const t={type:"paragraph",raw:n[0],text:n[1].charAt(n[1].length-1)===`
`?n[1].slice(0,-1):n[1],tokens:[]};return this.lexer.inline(t.text,t.tokens),t}}text(e){const n=this.rules.block.text.exec(e);if(n){const t={type:"text",raw:n[0],text:n[0],tokens:[]};return this.lexer.inline(t.text,t.tokens),t}}escape(e){const n=this.rules.inline.escape.exec(e);if(n)return{type:"escape",raw:n[0],text:x(n[1])}}tag(e){const n=this.rules.inline.tag.exec(e);if(n)return!this.lexer.state.inLink&&/^<a /i.test(n[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(n[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(n[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:n[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(n[0]):x(n[0]):n[0]}}link(e){const n=this.rules.inline.link.exec(e);if(n){const t=n[2].trim();if(!this.options.pedantic&&/^</.test(t)){if(!/>$/.test(t))return;const r=D(t.slice(0,-1),"\\");if((t.length-r.length)%2===0)return}else{const r=be(n[2],"()");if(r>-1){const p=(n[0].indexOf("!")===0?5:4)+n[1].length+r;n[2]=n[2].substring(0,r),n[0]=n[0].substring(0,p).trim(),n[3]=""}}let i=n[2],s="";if(this.options.pedantic){const r=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);r&&(i=r[1],s=r[3])}else s=n[3]?n[3].slice(1,-1):"";return i=i.trim(),/^</.test(i)&&(this.options.pedantic&&!/>$/.test(t)?i=i.slice(1):i=i.slice(1,-1)),F(n,{href:i&&i.replace(this.rules.inline._escapes,"$1"),title:s&&s.replace(this.rules.inline._escapes,"$1")},n[0],this.lexer)}}reflink(e,n){let t;if((t=this.rules.inline.reflink.exec(e))||(t=this.rules.inline.nolink.exec(e))){let i=(t[2]||t[1]).replace(/\s+/g," ");if(i=n[i.toLowerCase()],!i||!i.href){const s=t[0].charAt(0);return{type:"text",raw:s,text:s}}return F(t,i,t[0],this.lexer)}}emStrong(e,n,t=""){let i=this.rules.inline.emStrong.lDelim.exec(e);if(!i||i[3]&&t.match(/[\p{L}\p{N}]/u))return;const s=i[1]||i[2]||"";if(!s||s&&(t===""||this.rules.inline.punctuation.exec(t))){const r=i[0].length-1;let a,p,f=r,g=0;const b=i[0][0]==="*"?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(b.lastIndex=0,n=n.slice(-1*e.length+r);(i=b.exec(n))!=null;){if(a=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!a)continue;if(p=a.length,i[3]||i[4]){f+=p;continue}else if((i[5]||i[6])&&r%3&&!((r+p)%3)){g+=p;continue}if(f-=p,f>0)continue;if(p=Math.min(p,p+f+g),Math.min(r,p)%2){const c=e.slice(1,r+i.index+p);return{type:"em",raw:e.slice(0,r+i.index+p+1),text:c,tokens:this.lexer.inlineTokens(c,[])}}const m=e.slice(2,r+i.index+p-1);return{type:"strong",raw:e.slice(0,r+i.index+p+1),text:m,tokens:this.lexer.inlineTokens(m,[])}}}}codespan(e){const n=this.rules.inline.code.exec(e);if(n){let t=n[2].replace(/\n/g," ");const i=/[^ ]/.test(t),s=/^ /.test(t)&&/ $/.test(t);return i&&s&&(t=t.substring(1,t.length-1)),t=x(t,!0),{type:"codespan",raw:n[0],text:t}}}br(e){const n=this.rules.inline.br.exec(e);if(n)return{type:"br",raw:n[0]}}del(e){const n=this.rules.inline.del.exec(e);if(n)return{type:"del",raw:n[0],text:n[2],tokens:this.lexer.inlineTokens(n[2],[])}}autolink(e,n){const t=this.rules.inline.autolink.exec(e);if(t){let i,s;return t[2]==="@"?(i=x(this.options.mangle?n(t[1]):t[1]),s="mailto:"+i):(i=x(t[1]),s=i),{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}url(e,n){let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=x(this.options.mangle?n(t[0]):t[0]),s="mailto:"+i;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])[0];while(r!==t[0]);i=x(t[0]),t[1]==="www."?s="http://"+i:s=i}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e,n){const t=this.rules.inline.text.exec(e);if(t){let i;return this.lexer.state.inRawBlock?i=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):x(t[0]):t[0]:i=x(this.options.smartypants?n(t[0]):t[0]),{type:"text",raw:t[0],text:i}}}}const h={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:O,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/};h._label=/(?!\s*\])(?:\\.|[^\[\]\\])+/;h._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;h.def=d(h.def).replace("label",h._label).replace("title",h._title).getRegex();h.bullet=/(?:[*+-]|\d{1,9}[.)])/;h.listItemStart=d(/^( *)(bull) */).replace("bull",h.bullet).getRegex();h.list=d(h.list).replace(/bull/g,h.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+h.def.source+")").getRegex();h._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";h._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/;h.html=d(h.html,"i").replace("comment",h._comment).replace("tag",h._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();h.paragraph=d(h._paragraph).replace("hr",h.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",h._tag).getRegex();h.blockquote=d(h.blockquote).replace("paragraph",h.paragraph).getRegex();h.normal=_({},h);h.gfm=_({},h.normal,{table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"});h.gfm.table=d(h.gfm.table).replace("hr",h.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",h._tag).getRegex();h.gfm.paragraph=d(h._paragraph).replace("hr",h.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",h.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",h._tag).getRegex();h.pedantic=_({},h.normal,{html:d(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",h._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:O,paragraph:d(h.normal._paragraph).replace("hr",h.hr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",h.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});const o={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:O,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[^*]+(?=[^*])|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,rDelimUnd:/^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:O,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};o._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";o.punctuation=d(o.punctuation).replace(/punctuation/g,o._punctuation).getRegex();o.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;o.escapedEmSt=/\\\*|\\_/g;o._comment=d(h._comment).replace("(?:-->|$)","-->").getRegex();o.emStrong.lDelim=d(o.emStrong.lDelim).replace(/punct/g,o._punctuation).getRegex();o.emStrong.rDelimAst=d(o.emStrong.rDelimAst,"g").replace(/punct/g,o._punctuation).getRegex();o.emStrong.rDelimUnd=d(o.emStrong.rDelimUnd,"g").replace(/punct/g,o._punctuation).getRegex();o._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;o._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;o._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;o.autolink=d(o.autolink).replace("scheme",o._scheme).replace("email",o._email).getRegex();o._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;o.tag=d(o.tag).replace("comment",o._comment).replace("attribute",o._attribute).getRegex();o._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;o._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;o._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;o.link=d(o.link).replace("label",o._label).replace("href",o._href).replace("title",o._title).getRegex();o.reflink=d(o.reflink).replace("label",o._label).replace("ref",h._label).getRegex();o.nolink=d(o.nolink).replace("ref",h._label).getRegex();o.reflinkSearch=d(o.reflinkSearch,"g").replace("reflink",o.reflink).replace("nolink",o.nolink).getRegex();o.normal=_({},o);o.pedantic=_({},o.normal,{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:d(/^!?\[(label)\]\((.*?)\)/).replace("label",o._label).getRegex(),reflink:d(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",o._label).getRegex()});o.gfm=_({},o.normal,{escape:d(o.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/});o.gfm.url=d(o.gfm.url,"i").replace("email",o.gfm._extended_email).getRegex();o.breaks=_({},o.gfm,{br:d(o.br).replace("{2,}","*").getRegex(),text:d(o.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});function _e(l){return l.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function K(l){let e="",n,t;const i=l.length;for(n=0;n<i;n++)t=l.charCodeAt(n),Math.random()>.5&&(t="x"+t.toString(16)),e+="&#"+t+";";return e}class S{constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||C,this.options.tokenizer=this.options.tokenizer||new Z,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={block:h.normal,inline:o.normal};this.options.pedantic?(n.block=h.pedantic,n.inline=o.pedantic):this.options.gfm&&(n.block=h.gfm,this.options.breaks?n.inline=o.breaks:n.inline=o.gfm),this.tokenizer.rules=n}static get rules(){return{block:h,inline:o}}static lex(e,n){return new S(n).lex(e)}static lexInline(e,n){return new S(n).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);let n;for(;n=this.inlineQueue.shift();)this.inlineTokens(n.src,n.tokens);return this.tokens}blockTokens(e,n=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(a,p,f)=>p+"    ".repeat(f.length));let t,i,s,r;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(a=>(t=a.call({lexer:this},e,n))?(e=e.substring(t.raw.length),n.push(t),!0):!1))){if(t=this.tokenizer.space(e)){e=e.substring(t.raw.length),t.raw.length===1&&n.length>0?n[n.length-1].raw+=`
`:n.push(t);continue}if(t=this.tokenizer.code(e)){e=e.substring(t.raw.length),i=n[n.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+t.raw,i.text+=`
`+t.text,this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(t);continue}if(t=this.tokenizer.fences(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.heading(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.hr(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.blockquote(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.list(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.html(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.def(e)){e=e.substring(t.raw.length),i=n[n.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+t.raw,i.text+=`
`+t.raw,this.inlineQueue[this.inlineQueue.length-1].src=i.text):this.tokens.links[t.tag]||(this.tokens.links[t.tag]={href:t.href,title:t.title});continue}if(t=this.tokenizer.table(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.lheading(e)){e=e.substring(t.raw.length),n.push(t);continue}if(s=e,this.options.extensions&&this.options.extensions.startBlock){let a=1/0;const p=e.slice(1);let f;this.options.extensions.startBlock.forEach(function(g){f=g.call({lexer:this},p),typeof f=="number"&&f>=0&&(a=Math.min(a,f))}),a<1/0&&a>=0&&(s=e.substring(0,a+1))}if(this.state.top&&(t=this.tokenizer.paragraph(s))){i=n[n.length-1],r&&i.type==="paragraph"?(i.raw+=`
`+t.raw,i.text+=`
`+t.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(t),r=s.length!==e.length,e=e.substring(t.raw.length);continue}if(t=this.tokenizer.text(e)){e=e.substring(t.raw.length),i=n[n.length-1],i&&i.type==="text"?(i.raw+=`
`+t.raw,i.text+=`
`+t.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(t);continue}if(e){const a="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(e,n=[]){return this.inlineQueue.push({src:e,tokens:n}),n}inlineTokens(e,n=[]){let t,i,s,r=e,a,p,f;if(this.tokens.links){const g=Object.keys(this.tokens.links);if(g.length>0)for(;(a=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)g.includes(a[0].slice(a[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,a.index)+"["+G("a",a[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(a=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,a.index)+"["+G("a",a[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(a=this.tokenizer.rules.inline.escapedEmSt.exec(r))!=null;)r=r.slice(0,a.index)+"++"+r.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);for(;e;)if(p||(f=""),p=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(g=>(t=g.call({lexer:this},e,n))?(e=e.substring(t.raw.length),n.push(t),!0):!1))){if(t=this.tokenizer.escape(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.tag(e)){e=e.substring(t.raw.length),i=n[n.length-1],i&&t.type==="text"&&i.type==="text"?(i.raw+=t.raw,i.text+=t.text):n.push(t);continue}if(t=this.tokenizer.link(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(t.raw.length),i=n[n.length-1],i&&t.type==="text"&&i.type==="text"?(i.raw+=t.raw,i.text+=t.text):n.push(t);continue}if(t=this.tokenizer.emStrong(e,r,f)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.codespan(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.br(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.del(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.autolink(e,K)){e=e.substring(t.raw.length),n.push(t);continue}if(!this.state.inLink&&(t=this.tokenizer.url(e,K))){e=e.substring(t.raw.length),n.push(t);continue}if(s=e,this.options.extensions&&this.options.extensions.startInline){let g=1/0;const b=e.slice(1);let m;this.options.extensions.startInline.forEach(function(c){m=c.call({lexer:this},b),typeof m=="number"&&m>=0&&(g=Math.min(g,m))}),g<1/0&&g>=0&&(s=e.substring(0,g+1))}if(t=this.tokenizer.inlineText(s,_e)){e=e.substring(t.raw.length),t.raw.slice(-1)!=="_"&&(f=t.raw.slice(-1)),p=!0,i=n[n.length-1],i&&i.type==="text"?(i.raw+=t.raw,i.text+=t.text):n.push(t);continue}if(e){const g="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(g);break}else throw new Error(g)}}return n}}class U{constructor(e){this.options=e||C}code(e,n,t){const i=(n||"").match(/\S*/)[0];if(this.options.highlight){const s=this.options.highlight(e,i);s!=null&&s!==e&&(t=!0,e=s)}return e=e.replace(/\n$/,"")+`
`,i?'<pre><code class="'+this.options.langPrefix+x(i,!0)+'">'+(t?e:x(e,!0))+`</code></pre>
`:"<pre><code>"+(t?e:x(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e){return e}heading(e,n,t,i){if(this.options.headerIds){const s=this.options.headerPrefix+i.slug(t);return`<h${n} id="${s}">${e}</h${n}>
`}return`<h${n}>${e}</h${n}>
`}hr(){return this.options.xhtml?`<hr/>
`:`<hr>
`}list(e,n,t){const i=n?"ol":"ul",s=n&&t!==1?' start="'+t+'"':"";return"<"+i+s+`>
`+e+"</"+i+`>
`}listitem(e){return`<li>${e}</li>
`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return`<p>${e}</p>
`}table(e,n){return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow(e){return`<tr>
${e}</tr>
`}tablecell(e,n){const t=n.header?"th":"td";return(n.align?`<${t} align="${n.align}">`:`<${t}>`)+e+`</${t}>
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return`<del>${e}</del>`}link(e,n,t){if(e=Q(this.options.sanitize,this.options.baseUrl,e),e===null)return t;let i='<a href="'+x(e)+'"';return n&&(i+=' title="'+n+'"'),i+=">"+t+"</a>",i}image(e,n,t){if(e=Q(this.options.sanitize,this.options.baseUrl,e),e===null)return t;let i=`<img src="${e}" alt="${t}"`;return n&&(i+=` title="${n}"`),i+=this.options.xhtml?"/>":">",i}text(e){return e}}class V{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,n,t){return""+t}image(e,n,t){return""+t}br(){return""}}class W{constructor(){this.seen={}}serialize(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(e,n){let t=e,i=0;if(this.seen.hasOwnProperty(t)){i=this.seen[e];do i++,t=e+"-"+i;while(this.seen.hasOwnProperty(t))}return n||(this.seen[e]=i,this.seen[t]=0),t}slug(e,n={}){const t=this.serialize(e);return this.getNextSafeSlug(t,n.dryrun)}}class T{constructor(e){this.options=e||C,this.options.renderer=this.options.renderer||new U,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new V,this.slugger=new W}static parse(e,n){return new T(n).parse(e)}static parseInline(e,n){return new T(n).parseInline(e)}parse(e,n=!0){let t="",i,s,r,a,p,f,g,b,m,c,I,y,R,k,w,L,A,$,z;const E=e.length;for(i=0;i<E;i++){if(c=e[i],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[c.type]&&(z=this.options.extensions.renderers[c.type].call({parser:this},c),z!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type))){t+=z||"";continue}switch(c.type){case"space":continue;case"hr":{t+=this.renderer.hr();continue}case"heading":{t+=this.renderer.heading(this.parseInline(c.tokens),c.depth,H(this.parseInline(c.tokens,this.textRenderer)),this.slugger);continue}case"code":{t+=this.renderer.code(c.text,c.lang,c.escaped);continue}case"table":{for(b="",g="",a=c.header.length,s=0;s<a;s++)g+=this.renderer.tablecell(this.parseInline(c.header[s].tokens),{header:!0,align:c.align[s]});for(b+=this.renderer.tablerow(g),m="",a=c.rows.length,s=0;s<a;s++){for(f=c.rows[s],g="",p=f.length,r=0;r<p;r++)g+=this.renderer.tablecell(this.parseInline(f[r].tokens),{header:!1,align:c.align[r]});m+=this.renderer.tablerow(g)}t+=this.renderer.table(b,m);continue}case"blockquote":{m=this.parse(c.tokens),t+=this.renderer.blockquote(m);continue}case"list":{for(I=c.ordered,y=c.start,R=c.loose,a=c.items.length,m="",s=0;s<a;s++)w=c.items[s],L=w.checked,A=w.task,k="",w.task&&($=this.renderer.checkbox(L),R?w.tokens.length>0&&w.tokens[0].type==="paragraph"?(w.tokens[0].text=$+" "+w.tokens[0].text,w.tokens[0].tokens&&w.tokens[0].tokens.length>0&&w.tokens[0].tokens[0].type==="text"&&(w.tokens[0].tokens[0].text=$+" "+w.tokens[0].tokens[0].text)):w.tokens.unshift({type:"text",text:$}):k+=$),k+=this.parse(w.tokens,R),m+=this.renderer.listitem(k,A,L);t+=this.renderer.list(m,I,y);continue}case"html":{t+=this.renderer.html(c.text);continue}case"paragraph":{t+=this.renderer.paragraph(this.parseInline(c.tokens));continue}case"text":{for(m=c.tokens?this.parseInline(c.tokens):c.text;i+1<E&&e[i+1].type==="text";)c=e[++i],m+=`
`+(c.tokens?this.parseInline(c.tokens):c.text);t+=n?this.renderer.paragraph(m):m;continue}default:{const j='Token with "'+c.type+'" type was not found.';if(this.options.silent){console.error(j);return}else throw new Error(j)}}}return t}parseInline(e,n){n=n||this.renderer;let t="",i,s,r;const a=e.length;for(i=0;i<a;i++){if(s=e[i],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[s.type]&&(r=this.options.extensions.renderers[s.type].call({parser:this},s),r!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type))){t+=r||"";continue}switch(s.type){case"escape":{t+=n.text(s.text);break}case"html":{t+=n.html(s.text);break}case"link":{t+=n.link(s.href,s.title,this.parseInline(s.tokens,n));break}case"image":{t+=n.image(s.href,s.title,s.text);break}case"strong":{t+=n.strong(this.parseInline(s.tokens,n));break}case"em":{t+=n.em(this.parseInline(s.tokens,n));break}case"codespan":{t+=n.codespan(s.text);break}case"br":{t+=n.br();break}case"del":{t+=n.del(this.parseInline(s.tokens,n));break}case"text":{t+=n.text(s.text);break}default:{const p='Token with "'+s.type+'" type was not found.';if(this.options.silent){console.error(p);return}else throw new Error(p)}}}return t}}function u(l,e,n){if(typeof l>"u"||l===null)throw new Error("marked(): input parameter is undefined or null");if(typeof l!="string")throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(l)+", string expected");if(typeof e=="function"&&(n=e,e=null),e=_({},u.defaults,e||{}),J(e),n){const t=e.highlight;let i;try{i=S.lex(l,e)}catch(a){return n(a)}const s=function(a){let p;if(!a)try{e.walkTokens&&u.walkTokens(i,e.walkTokens),p=T.parse(i,e)}catch(f){a=f}return e.highlight=t,a?n(a):n(null,p)};if(!t||t.length<3||(delete e.highlight,!i.length))return s();let r=0;u.walkTokens(i,function(a){a.type==="code"&&(r++,setTimeout(()=>{t(a.text,a.lang,function(p,f){if(p)return s(p);f!=null&&f!==a.text&&(a.text=f,a.escaped=!0),r--,r===0&&s()})},0))}),r===0&&s();return}try{const t=S.lex(l,e);return e.walkTokens&&u.walkTokens(t,e.walkTokens),T.parse(t,e)}catch(t){if(t.message+=`
Please report this to https://github.com/markedjs/marked.`,e.silent)return"<p>An error occurred:</p><pre>"+x(t.message+"",!0)+"</pre>";throw t}}u.options=u.setOptions=function(l){return _(u.defaults,l),le(u.defaults),u};u.getDefaults=X;u.defaults=C;u.use=function(...l){const e=_({},...l),n=u.defaults.extensions||{renderers:{},childTokens:{}};let t;l.forEach(i=>{if(i.extensions&&(t=!0,i.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if(s.renderer){const r=n.renderers?n.renderers[s.name]:null;r?n.renderers[s.name]=function(...a){let p=s.renderer.apply(this,a);return p===!1&&(p=r.apply(this,a)),p}:n.renderers[s.name]=s.renderer}if(s.tokenizer){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");n[s.level]?n[s.level].unshift(s.tokenizer):n[s.level]=[s.tokenizer],s.start&&(s.level==="block"?n.startBlock?n.startBlock.push(s.start):n.startBlock=[s.start]:s.level==="inline"&&(n.startInline?n.startInline.push(s.start):n.startInline=[s.start]))}s.childTokens&&(n.childTokens[s.name]=s.childTokens)})),i.renderer){const s=u.defaults.renderer||new U;for(const r in i.renderer){const a=s[r];s[r]=(...p)=>{let f=i.renderer[r].apply(s,p);return f===!1&&(f=a.apply(s,p)),f}}e.renderer=s}if(i.tokenizer){const s=u.defaults.tokenizer||new Z;for(const r in i.tokenizer){const a=s[r];s[r]=(...p)=>{let f=i.tokenizer[r].apply(s,p);return f===!1&&(f=a.apply(s,p)),f}}e.tokenizer=s}if(i.walkTokens){const s=u.defaults.walkTokens;e.walkTokens=function(r){i.walkTokens.call(this,r),s&&s.call(this,r)}}t&&(e.extensions=n),u.setOptions(e)})};u.walkTokens=function(l,e){for(const n of l)switch(e.call(u,n),n.type){case"table":{for(const t of n.header)u.walkTokens(t.tokens,e);for(const t of n.rows)for(const i of t)u.walkTokens(i.tokens,e);break}case"list":{u.walkTokens(n.items,e);break}default:u.defaults.extensions&&u.defaults.extensions.childTokens&&u.defaults.extensions.childTokens[n.type]?u.defaults.extensions.childTokens[n.type].forEach(function(t){u.walkTokens(n[t],e)}):n.tokens&&u.walkTokens(n.tokens,e)}};u.parseInline=function(l,e){if(typeof l>"u"||l===null)throw new Error("marked.parseInline(): input parameter is undefined or null");if(typeof l!="string")throw new Error("marked.parseInline(): input parameter is of type "+Object.prototype.toString.call(l)+", string expected");e=_({},u.defaults,e||{}),J(e);try{const n=S.lexInline(l,e);return e.walkTokens&&u.walkTokens(n,e.walkTokens),T.parseInline(n,e)}catch(n){if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e.silent)return"<p>An error occurred:</p><pre>"+x(n.message+"",!0)+"</pre>";throw n}};u.Parser=T;u.parser=T.parse;u.Renderer=U;u.TextRenderer=V;u.Lexer=S;u.lexer=S.lex;u.Tokenizer=Z;u.Slugger=W;u.parse=u;u.options;u.setOptions;u.use;u.walkTokens;u.parseInline;T.parse;S.lex;const $e=`# Using the API
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
\`\`\``,ze={class:"flex flex-row w-full relative"},Se={ref:"tabOfContents",class:"sticky hidden lg:block top-8 h-min mr-8 p-4 mt-8"},Te=P("h2",{class:"text-2xl bg-clip-text text-transparent bg-gradient-to-tr from-green to-orange mb-4 font-bold"}," Table of contents",-1),Re={class:"text-md bg-blue rounded"},Ae=["href"],Ie={ref:"docs",class:"article text-gray-100 w-full lg:w-3/4"},Ee=["innerHTML"],Pe={data(){return{chapters:[]}},mounted(){se.highlightAll();const l=this.$refs.docs.getElementsByTagName("h2");for(let e=0;e<l.length;e++)this.chapters.push({title:l[e].innerText,id:l[e].id})}},Le=ee({...Pe,__name:"Api-Docs",setup(l){const e=u.parse($e);return(n,t)=>(B(),q("div",ze,[P("div",Se,[Te,P("ul",Re,[(B(!0),q(te,null,ne(n.chapters,(i,s)=>(B(),q("li",{key:s,class:"py-2 pl-4 transform hover:translate-x-6 hover:text-red-500 word-break max-w-3/4"},[P("a",{href:`#${i.id}`},re(i.title),9,Ae)]))),128))])],512),P("div",Ie,[P("div",{innerHTML:ie(e),ref:"docs"},null,8,Ee)],512)]))}});export{Le as default};
