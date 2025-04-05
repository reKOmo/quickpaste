var we=Object.defineProperty;var ye=(p,e,t)=>e in p?we(p,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):p[e]=t;var k=(p,e,t)=>ye(p,typeof e!="symbol"?e+"":e,t);import{l as Se,c as G,a as A,F as Re,p as $e,i as Te,P as Ae,o as M,t as _e}from"./Dp9ICUzo.js";function Q(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let T=Q();function oe(p){T=p}const I={exec:()=>null};function f(p,e=""){let t=typeof p=="string"?p:p.source;const n={replace:(r,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(x.caret,"$1"),t=t.replace(r,i),n},getRegex:()=>new RegExp(t,e)};return n}const x={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:p=>new RegExp(`^( {0,3}${p})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:p=>new RegExp(`^ {0,${Math.min(3,p-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:p=>new RegExp(`^ {0,${Math.min(3,p-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:p=>new RegExp(`^ {0,${Math.min(3,p-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:p=>new RegExp(`^ {0,${Math.min(3,p-1)}}#`),htmlBeginRegex:p=>new RegExp(`^ {0,${Math.min(3,p-1)}}<(?:[a-z].*>|!--)`,"i")},ze=/^(?:[ \t]*(?:\n|$))+/,Pe=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ie=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,L=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ce=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,H=/(?:[*+-]|\d{1,9}[.)])/,ce=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,pe=f(ce).replace(/bull/g,H).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Le=f(ce).replace(/bull/g,H).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),F=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ee=/^[^\n]+/,U=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Be=f(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",U).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ve=f(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,H).getRegex(),j="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",X=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,qe=f("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",X).replace("tag",j).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),he=f(F).replace("hr",L).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",j).getRegex(),je=f(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",he).getRegex(),K={blockquote:je,code:Pe,def:Be,fences:Ie,heading:Ce,hr:L,html:qe,lheading:pe,list:ve,newline:ze,paragraph:he,table:I,text:Ee},se=f("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",L).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",j).getRegex(),De={...K,lheading:Le,table:se,paragraph:f(F).replace("hr",L).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",se).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",j).getRegex()},Oe={...K,html:f(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",X).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:I,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:f(F).replace("hr",L).replace("heading",` *#{1,6} *[^
]`).replace("lheading",pe).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Ze=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ge=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ue=/^( {2,}|\\)\n(?!\s*$)/,Me=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,D=/[\p{P}\p{S}]/u,J=/[\s\p{P}\p{S}]/u,ge=/[^\s\p{P}\p{S}]/u,Ne=f(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,J).getRegex(),fe=/(?!~)[\p{P}\p{S}]/u,Qe=/(?!~)[\s\p{P}\p{S}]/u,He=/(?:[^\s\p{P}\p{S}]|~)/u,Fe=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,de=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ue=f(de,"u").replace(/punct/g,D).getRegex(),Xe=f(de,"u").replace(/punct/g,fe).getRegex(),ke="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ke=f(ke,"gu").replace(/notPunctSpace/g,ge).replace(/punctSpace/g,J).replace(/punct/g,D).getRegex(),Je=f(ke,"gu").replace(/notPunctSpace/g,He).replace(/punctSpace/g,Qe).replace(/punct/g,fe).getRegex(),We=f("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ge).replace(/punctSpace/g,J).replace(/punct/g,D).getRegex(),Ve=f(/\\(punct)/,"gu").replace(/punct/g,D).getRegex(),Ye=f(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),et=f(X).replace("(?:-->|$)","-->").getRegex(),tt=f("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",et).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),B=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,nt=f(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",B).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),me=f(/^!?\[(label)\]\[(ref)\]/).replace("label",B).replace("ref",U).getRegex(),be=f(/^!?\[(ref)\](?:\[\])?/).replace("ref",U).getRegex(),st=f("reflink|nolink(?!\\()","g").replace("reflink",me).replace("nolink",be).getRegex(),W={_backpedal:I,anyPunctuation:Ve,autolink:Ye,blockSkip:Fe,br:ue,code:Ge,del:I,emStrongLDelim:Ue,emStrongRDelimAst:Ke,emStrongRDelimUnd:We,escape:Ze,link:nt,nolink:be,punctuation:Ne,reflink:me,reflinkSearch:st,tag:tt,text:Me,url:I},rt={...W,link:f(/^!?\[(label)\]\((.*?)\)/).replace("label",B).getRegex(),reflink:f(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",B).getRegex()},N={...W,emStrongRDelimAst:Je,emStrongLDelim:Xe,url:f(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},it={...N,br:f(ue).replace("{2,}","*").getRegex(),text:f(N.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},E={normal:K,gfm:De,pedantic:Oe},z={normal:W,gfm:N,breaks:it,pedantic:rt},lt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},re=p=>lt[p];function R(p,e){if(e){if(x.escapeTest.test(p))return p.replace(x.escapeReplace,re)}else if(x.escapeTestNoEncode.test(p))return p.replace(x.escapeReplaceNoEncode,re);return p}function ie(p){try{p=encodeURI(p).replace(x.percentDecode,"%")}catch{return null}return p}function le(p,e){var s;const t=p.replace(x.findPipe,(i,l,c)=>{let a=!1,o=l;for(;--o>=0&&c[o]==="\\";)a=!a;return a?"|":" |"}),n=t.split(x.splitPipe);let r=0;if(n[0].trim()||n.shift(),n.length>0&&!((s=n.at(-1))!=null&&s.trim())&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(x.slashPipe,"|");return n}function P(p,e,t){const n=p.length;if(n===0)return"";let r=0;for(;r<n&&p.charAt(n-r-1)===e;)r++;return p.slice(0,n-r)}function at(p,e){if(p.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<p.length;n++)if(p[n]==="\\")n++;else if(p[n]===e[0])t++;else if(p[n]===e[1]&&(t--,t<0))return n;return-1}function ae(p,e,t,n,r){const s=e.href,i=e.title||null,l=p[1].replace(r.other.outputLinkReplace,"$1");if(p[0].charAt(0)!=="!"){n.state.inLink=!0;const c={type:"link",raw:t,href:s,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}return{type:"image",raw:t,href:s,title:i,text:l}}function ot(p,e,t){const n=p.match(t.other.indentCodeCompensation);if(n===null)return e;const r=n[1];return e.split(`
`).map(s=>{const i=s.match(t.other.beginningSpace);if(i===null)return s;const[l]=i;return l.length>=r.length?s.slice(r.length):s}).join(`
`)}class v{constructor(e){k(this,"options");k(this,"rules");k(this,"lexer");this.options=e||T}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:P(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],r=ot(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const r=P(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:P(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=P(t[0],`
`).split(`
`),r="",s="";const i=[];for(;n.length>0;){let l=!1;const c=[];let a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))c.push(n[a]),l=!0;else if(!l)c.push(n[a]);else break;n=n.slice(a);const o=c.join(`
`),h=o.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${o}`:o,s=s?`${s}
${h}`:h;const u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,i,!0),this.lexer.state.top=u,n.length===0)break;const g=i.at(-1);if((g==null?void 0:g.type)==="code")break;if((g==null?void 0:g.type)==="blockquote"){const b=g,m=b.raw+`
`+n.join(`
`),w=this.blockquote(m);i[i.length-1]=w,r=r.substring(0,r.length-b.raw.length)+w.raw,s=s.substring(0,s.length-b.text.length)+w.text;break}else if((g==null?void 0:g.type)==="list"){const b=g,m=b.raw+`
`+n.join(`
`),w=this.list(m);i[i.length-1]=w,r=r.substring(0,r.length-g.raw.length)+w.raw,s=s.substring(0,s.length-b.raw.length)+w.raw,n=m.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");const i=this.rules.other.listItemRegex(n);let l=!1;for(;e;){let a=!1,o="",h="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;o=t[0],e=e.substring(o.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,O=>" ".repeat(3*O.length)),g=e.split(`
`,1)[0],b=!u.trim(),m=0;if(this.options.pedantic?(m=2,h=u.trimStart()):b?m=t[1].length+1:(m=t[2].search(this.rules.other.nonSpaceChar),m=m>4?1:m,h=u.slice(m),m+=t[1].length),b&&this.rules.other.blankLine.test(g)&&(o+=g+`
`,e=e.substring(g.length+1),a=!0),!a){const O=this.rules.other.nextBulletRegex(m),ee=this.rules.other.hrRegex(m),te=this.rules.other.fencesBeginRegex(m),ne=this.rules.other.headingBeginRegex(m),xe=this.rules.other.htmlBeginRegex(m);for(;e;){const Z=e.split(`
`,1)[0];let _;if(g=Z,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),_=g):_=g.replace(this.rules.other.tabCharGlobal,"    "),te.test(g)||ne.test(g)||xe.test(g)||O.test(g)||ee.test(g))break;if(_.search(this.rules.other.nonSpaceChar)>=m||!g.trim())h+=`
`+_.slice(m);else{if(b||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||te.test(u)||ne.test(u)||ee.test(u))break;h+=`
`+g}!b&&!g.trim()&&(b=!0),o+=Z+`
`,e=e.substring(Z.length+1),u=_.slice(m)}}s.loose||(l?s.loose=!0:this.rules.other.doubleBlankLine.test(o)&&(l=!0));let w=null,Y;this.options.gfm&&(w=this.rules.other.listIsTask.exec(h),w&&(Y=w[0]!=="[ ] ",h=h.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:o,task:!!w,checked:Y,loose:!1,text:h,tokens:[]}),s.raw+=o}const c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a=0;a<s.items.length;a++)if(this.lexer.state.top=!1,s.items[a].tokens=this.lexer.blockTokens(s.items[a].text,[]),!s.loose){const o=s.items[a].tokens.filter(u=>u.type==="space"),h=o.length>0&&o.some(u=>this.rules.other.anyLine.test(u.raw));s.loose=h}if(s.loose)for(let a=0;a<s.items.length;a++)s.items[a].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){var l;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=le(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(l=t[3])!=null&&l.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(const c of r)this.rules.other.tableAlignRight.test(c)?i.align.push("right"):this.rules.other.tableAlignCenter.test(c)?i.align.push("center"):this.rules.other.tableAlignLeft.test(c)?i.align.push("left"):i.align.push(null);for(let c=0;c<n.length;c++)i.header.push({text:n[c],tokens:this.lexer.inline(n[c]),header:!0,align:i.align[c]});for(const c of s)i.rows.push(le(c,i.header.length).map((a,o)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:i.align[o]})));return i}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const i=P(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{const i=at(t[2],"()");if(i>-1){const c=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,c).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){const i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],s=i[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),ae(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){const i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return ae(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(r[1]||r[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const i=[...r[0]].length-1;let l,c,a=i,o=0;const h=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,t=t.slice(-1*e.length+i);(r=h.exec(t))!=null;){if(l=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!l)continue;if(c=[...l].length,r[3]||r[4]){a+=c;continue}else if((r[5]||r[6])&&i%3&&!((i+c)%3)){o+=c;continue}if(a-=c,a>0)continue;c=Math.min(c,c+a+o);const u=[...r[0]][0].length,g=e.slice(0,i+r.index+u+c);if(Math.min(i,c)%2){const m=g.slice(1,-1);return{type:"em",raw:g,text:m,tokens:this.lexer.inlineTokens(m)}}const b=g.slice(2,-2);return{type:"strong",raw:g,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let r,s;if(t[2]==="@")r=t[0],s="mailto:"+r;else{let i;do i=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(i!==t[0]);r=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}}class y{constructor(e){k(this,"tokens");k(this,"options");k(this,"state");k(this,"tokenizer");k(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||T,this.options.tokenizer=this.options.tokenizer||new v,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={other:x,block:E.normal,inline:z.normal};this.options.pedantic?(t.block=E.pedantic,t.inline=z.pedantic):this.options.gfm&&(t.block=E.gfm,this.options.breaks?t.inline=z.breaks:t.inline=z.gfm),this.tokenizer.rules=t}static get rules(){return{block:E,inline:z}}static lex(e,t){return new y(t).lex(e)}static lexInline(e,t){return new y(t).inlineTokens(e)}lex(e){e=e.replace(x.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){var r,s,i;for(this.options.pedantic&&(e=e.replace(x.tabCharGlobal,"    ").replace(x.spaceLine,""));e;){let l;if((s=(r=this.options.extensions)==null?void 0:r.block)!=null&&s.some(a=>(l=a.call({lexer:this},e,t))?(e=e.substring(l.raw.length),t.push(l),!0):!1))continue;if(l=this.tokenizer.space(e)){e=e.substring(l.raw.length);const a=t.at(-1);l.raw.length===1&&a!==void 0?a.raw+=`
`:t.push(l);continue}if(l=this.tokenizer.code(e)){e=e.substring(l.raw.length);const a=t.at(-1);(a==null?void 0:a.type)==="paragraph"||(a==null?void 0:a.type)==="text"?(a.raw+=`
`+l.raw,a.text+=`
`+l.text,this.inlineQueue.at(-1).src=a.text):t.push(l);continue}if(l=this.tokenizer.fences(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.heading(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.hr(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.blockquote(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.list(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.html(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.def(e)){e=e.substring(l.raw.length);const a=t.at(-1);(a==null?void 0:a.type)==="paragraph"||(a==null?void 0:a.type)==="text"?(a.raw+=`
`+l.raw,a.text+=`
`+l.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[l.tag]||(this.tokens.links[l.tag]={href:l.href,title:l.title});continue}if(l=this.tokenizer.table(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.lheading(e)){e=e.substring(l.raw.length),t.push(l);continue}let c=e;if((i=this.options.extensions)!=null&&i.startBlock){let a=1/0;const o=e.slice(1);let h;this.options.extensions.startBlock.forEach(u=>{h=u.call({lexer:this},o),typeof h=="number"&&h>=0&&(a=Math.min(a,h))}),a<1/0&&a>=0&&(c=e.substring(0,a+1))}if(this.state.top&&(l=this.tokenizer.paragraph(c))){const a=t.at(-1);n&&(a==null?void 0:a.type)==="paragraph"?(a.raw+=`
`+l.raw,a.text+=`
`+l.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):t.push(l),n=c.length!==e.length,e=e.substring(l.raw.length);continue}if(l=this.tokenizer.text(e)){e=e.substring(l.raw.length);const a=t.at(-1);(a==null?void 0:a.type)==="text"?(a.raw+=`
`+l.raw,a.text+=`
`+l.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):t.push(l);continue}if(e){const a="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){var l,c,a;let n=e,r=null;if(this.tokens.links){const o=Object.keys(this.tokens.links);if(o.length>0)for(;(r=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)o.includes(r[0].slice(r[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(r=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)n=n.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(r=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,r.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s=!1,i="";for(;e;){s||(i=""),s=!1;let o;if((c=(l=this.options.extensions)==null?void 0:l.inline)!=null&&c.some(u=>(o=u.call({lexer:this},e,t))?(e=e.substring(o.raw.length),t.push(o),!0):!1))continue;if(o=this.tokenizer.escape(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.tag(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.link(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);const u=t.at(-1);o.type==="text"&&(u==null?void 0:u.type)==="text"?(u.raw+=o.raw,u.text+=o.text):t.push(o);continue}if(o=this.tokenizer.emStrong(e,n,i)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.codespan(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.br(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.del(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.autolink(e)){e=e.substring(o.raw.length),t.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),t.push(o);continue}let h=e;if((a=this.options.extensions)!=null&&a.startInline){let u=1/0;const g=e.slice(1);let b;this.options.extensions.startInline.forEach(m=>{b=m.call({lexer:this},g),typeof b=="number"&&b>=0&&(u=Math.min(u,b))}),u<1/0&&u>=0&&(h=e.substring(0,u+1))}if(o=this.tokenizer.inlineText(h)){e=e.substring(o.raw.length),o.raw.slice(-1)!=="_"&&(i=o.raw.slice(-1)),s=!0;const u=t.at(-1);(u==null?void 0:u.type)==="text"?(u.raw+=o.raw,u.text+=o.text):t.push(o);continue}if(e){const u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return t}}class q{constructor(e){k(this,"options");k(this,"parser");this.options=e||T}space(e){return""}code({text:e,lang:t,escaped:n}){var i;const r=(i=(t||"").match(x.notSpaceStart))==null?void 0:i[0],s=e.replace(x.endingNewline,"")+`
`;return r?'<pre><code class="language-'+R(r)+'">'+(n?s:R(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:R(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let r="";for(let l=0;l<e.items.length;l++){const c=e.items[l];r+=this.listitem(c)}const s=t?"ol":"ul",i=t&&n!==1?' start="'+n+'"':"";return"<"+s+i+`>
`+r+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const r=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=r+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=r+" "+R(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:r+" ",text:r+" ",escaped:!0}):t+=r+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let r="";for(let s=0;s<e.rows.length;s++){const i=e.rows[s];n="";for(let l=0;l<i.length;l++)n+=this.tablecell(i[l]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${R(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const r=this.parser.parseInline(n),s=ie(e);if(s===null)return r;e=s;let i='<a href="'+e+'"';return t&&(i+=' title="'+R(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n}){const r=ie(e);if(r===null)return R(n);e=r;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${R(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:R(e.text)}}class V{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}}class S{constructor(e){k(this,"options");k(this,"renderer");k(this,"textRenderer");this.options=e||T,this.options.renderer=this.options.renderer||new q,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new V}static parse(e,t){return new S(t).parse(e)}static parseInline(e,t){return new S(t).parseInline(e)}parse(e,t=!0){var r,s;let n="";for(let i=0;i<e.length;i++){const l=e[i];if((s=(r=this.options.extensions)==null?void 0:r.renderers)!=null&&s[l.type]){const a=l,o=this.options.extensions.renderers[a.type].call({parser:this},a);if(o!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(a.type)){n+=o||"";continue}}const c=l;switch(c.type){case"space":{n+=this.renderer.space(c);continue}case"hr":{n+=this.renderer.hr(c);continue}case"heading":{n+=this.renderer.heading(c);continue}case"code":{n+=this.renderer.code(c);continue}case"table":{n+=this.renderer.table(c);continue}case"blockquote":{n+=this.renderer.blockquote(c);continue}case"list":{n+=this.renderer.list(c);continue}case"html":{n+=this.renderer.html(c);continue}case"paragraph":{n+=this.renderer.paragraph(c);continue}case"text":{let a=c,o=this.renderer.text(a);for(;i+1<e.length&&e[i+1].type==="text";)a=e[++i],o+=`
`+this.renderer.text(a);t?n+=this.renderer.paragraph({type:"paragraph",raw:o,text:o,tokens:[{type:"text",raw:o,text:o,escaped:!0}]}):n+=o;continue}default:{const a='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(e,t=this.renderer){var r,s;let n="";for(let i=0;i<e.length;i++){const l=e[i];if((s=(r=this.options.extensions)==null?void 0:r.renderers)!=null&&s[l.type]){const a=this.options.extensions.renderers[l.type].call({parser:this},l);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(l.type)){n+=a||"";continue}}const c=l;switch(c.type){case"escape":{n+=t.text(c);break}case"html":{n+=t.html(c);break}case"link":{n+=t.link(c);break}case"image":{n+=t.image(c);break}case"strong":{n+=t.strong(c);break}case"em":{n+=t.em(c);break}case"codespan":{n+=t.codespan(c);break}case"br":{n+=t.br(c);break}case"del":{n+=t.del(c);break}case"text":{n+=t.text(c);break}default:{const a='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}}class C{constructor(e){k(this,"options");k(this,"block");this.options=e||T}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?y.lex:y.lexInline}provideParser(){return this.block?S.parse:S.parseInline}}k(C,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));class ct{constructor(...e){k(this,"defaults",Q());k(this,"options",this.setOptions);k(this,"parse",this.parseMarkdown(!0));k(this,"parseInline",this.parseMarkdown(!1));k(this,"Parser",S);k(this,"Renderer",q);k(this,"TextRenderer",V);k(this,"Lexer",y);k(this,"Tokenizer",v);k(this,"Hooks",C);this.use(...e)}walkTokens(e,t){var r,s;let n=[];for(const i of e)switch(n=n.concat(t.call(this,i)),i.type){case"table":{const l=i;for(const c of l.header)n=n.concat(this.walkTokens(c.tokens,t));for(const c of l.rows)for(const a of c)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{const l=i;n=n.concat(this.walkTokens(l.items,t));break}default:{const l=i;(s=(r=this.defaults.extensions)==null?void 0:r.childTokens)!=null&&s[l.type]?this.defaults.extensions.childTokens[l.type].forEach(c=>{const a=l[c].flat(1/0);n=n.concat(this.walkTokens(a,t))}):l.tokens&&(n=n.concat(this.walkTokens(l.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const i=t.renderers[s.name];i?t.renderers[s.name]=function(...l){let c=s.renderer.apply(this,l);return c===!1&&(c=i.apply(this,l)),c}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const i=t[s.level];i?i.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){const s=this.defaults.renderer||new q(this.defaults);for(const i in n.renderer){if(!(i in s))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;const l=i,c=n.renderer[l],a=s[l];s[l]=(...o)=>{let h=c.apply(s,o);return h===!1&&(h=a.apply(s,o)),h||""}}r.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new v(this.defaults);for(const i in n.tokenizer){if(!(i in s))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;const l=i,c=n.tokenizer[l],a=s[l];s[l]=(...o)=>{let h=c.apply(s,o);return h===!1&&(h=a.apply(s,o)),h}}r.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new C;for(const i in n.hooks){if(!(i in s))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;const l=i,c=n.hooks[l],a=s[l];C.passThroughHooks.has(i)?s[l]=o=>{if(this.defaults.async)return Promise.resolve(c.call(s,o)).then(u=>a.call(s,u));const h=c.call(s,o);return a.call(s,h)}:s[l]=(...o)=>{let h=c.apply(s,o);return h===!1&&(h=a.apply(s,o)),h}}r.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(l){let c=[];return c.push(i.call(this,l)),s&&(c=c.concat(s.call(this,l))),c}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return y.lex(e,t??this.defaults)}parser(e,t){return S.parse(e,t??this.defaults)}parseMarkdown(e){return(n,r)=>{const s={...r},i={...this.defaults,...s},l=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&s.async===!1)return l(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return l(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));i.hooks&&(i.hooks.options=i,i.hooks.block=e);const c=i.hooks?i.hooks.provideLexer():e?y.lex:y.lexInline,a=i.hooks?i.hooks.provideParser():e?S.parse:S.parseInline;if(i.async)return Promise.resolve(i.hooks?i.hooks.preprocess(n):n).then(o=>c(o,i)).then(o=>i.hooks?i.hooks.processAllTokens(o):o).then(o=>i.walkTokens?Promise.all(this.walkTokens(o,i.walkTokens)).then(()=>o):o).then(o=>a(o,i)).then(o=>i.hooks?i.hooks.postprocess(o):o).catch(l);try{i.hooks&&(n=i.hooks.preprocess(n));let o=c(n,i);i.hooks&&(o=i.hooks.processAllTokens(o)),i.walkTokens&&this.walkTokens(o,i.walkTokens);let h=a(o,i);return i.hooks&&(h=i.hooks.postprocess(h)),h}catch(o){return l(o)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const r="<p>An error occurred:</p><pre>"+R(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}}const $=new ct;function d(p,e){return $.parse(p,e)}d.options=d.setOptions=function(p){return $.setOptions(p),d.defaults=$.defaults,oe(d.defaults),d};d.getDefaults=Q;d.defaults=T;d.use=function(...p){return $.use(...p),d.defaults=$.defaults,oe(d.defaults),d};d.walkTokens=function(p,e){return $.walkTokens(p,e)};d.parseInline=$.parseInline;d.Parser=S;d.parser=S.parse;d.Renderer=q;d.TextRenderer=V;d.Lexer=y;d.lexer=y.lex;d.Tokenizer=v;d.Hooks=C;d.parse=d;d.options;d.setOptions;d.use;d.walkTokens;d.parseInline;S.parse;y.lex;const pt=`# Using the API
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
\`\`\``,ht={class:"flex flex-row w-full relative"},ut={ref:"tabOfContents",class:"sticky hidden lg:block top-8 h-min mr-8 p-4 mt-8"},gt={class:"text-md bg-blue rounded"},ft=["href"],dt={ref:"docs",class:"article text-gray-100 w-full lg:w-3/4"},kt=["innerHTML"],mt={data(){return{chapters:[]}},mounted(){Ae.highlightAll();const p=this.$refs.docs.getElementsByTagName("h2");for(let e=0;e<p.length;e++)this.chapters.push({title:p[e].innerText,id:p[e].id})}},wt=Se({...mt,__name:"Api-Docs",setup(p){const e=d.parse(pt);return(t,n)=>(M(),G("div",ht,[A("div",ut,[n[0]||(n[0]=A("h2",{class:"text-2xl bg-clip-text text-transparent bg-gradient-to-tr from-green to-orange mb-4 font-bold"}," Table of contents",-1)),A("ul",gt,[(M(!0),G(Re,null,$e(t.chapters,(r,s)=>(M(),G("li",{key:s,class:"py-2 pl-4 transform hover:translate-x-6 hover:text-red-500 word-break max-w-3/4"},[A("a",{href:`#${r.id}`},_e(r.title),9,ft)]))),128))])],512),A("div",dt,[A("div",{innerHTML:Te(e),ref:"docs"},null,8,kt)],512)]))}});export{wt as default};
