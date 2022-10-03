import{i as _,k as C,o as a,b as d,e as i,G as p,H as x,t as g,l as k,K as L,E as h,p as T,f as I,P as V,L as v,M as N,h as M,O as A,F as y,r as w,c as f,Q as m,R as B,S as D}from"./entry.e9799e26.js";const P={data(){return{title:this.options!==void 0?this.options.title:"",priv:this.options!==void 0?this.options.isPrivate:!1,password:this.options!==void 0&&this.options.password.length>0?this.options.password:"",rotation:0}},props:{submitText:{type:String,default:()=>"Paste !"},options:{type:Object},loggedIn:{type:Boolean,default:()=>!1}},methods:{submit(){this.$emit("submit",{title:this.title,isPrivate:this.priv,password:this.password})},toggleMenu(){this.$refs.moreOptionsMenu.classList.toggle("hidden"),this.rotation=this.rotation===0?180:0}}},S=s=>(T("data-v-f57cfd42"),s=s(),I(),s),O={class:"mt-2 w-full lg:w-2xl"},R={class:"flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2"},U={class:"flex flex-col justify-center"},j=h(" Options "),z={class:"text-green ml-2"},H={ref:"moreOptionsMenu",class:"overflow-hidden hidden px-4 py-4 text-xl px-4 bg-blue rounded shadow-md shadow-black/50"},W={class:"w-full flex items-center"},F=S(()=>i("label",{class:"w-1/3"},"Private",-1)),K=["disabled"],G=S(()=>i("span",{class:"text-sm text-gray-500 px-4"},"Logged in users only",-1)),Q={class:"w-full flex items-center"},q=S(()=>i("label",{class:"w-1/3"},"Password",-1));function J(s,e,t,c,o,n){const r=C("font-awesome-icon");return a(),d("div",O,[i("div",R,[p(i("input",{"onUpdate:modelValue":e[0]||(e[0]=l=>o.title=l),maxlength:"50",tooltip:"Click to edit",placeholder:"Add paste title +",class:"p-2 text-center text-white rounded placeholder-white-100 border-none focus:outline-none text-lg text-bold flex-1 bg-darkgray"},null,512),[[x,o.title]]),i("button",{onClick:e[1]||(e[1]=(...l)=>n.submit&&n.submit(...l)),class:"accept bg-gradient-to-tr from-green to-orange rounded w-1/4 lg:w-full p-2 text-center hover:shadow-lg"},g(t.submitText),1)]),i("div",U,[i("a",{onClick:e[2]||(e[2]=(...l)=>n.toggleMenu&&n.toggleMenu(...l)),class:"select-none font-bold bg-clip-text text-lg m-2 text-transparent bg-gradient-to-tr from-green to-orange text-center cursor-pointer"},[j,i("span",z,[k(r,{icon:["fas","fa-caret-down"],rotation:o.rotation},null,8,["rotation"])])]),i("div",H,[i("div",W,[F,p(i("input",{"onUpdate:modelValue":e[3]||(e[3]=l=>o.priv=l),disabled:!t.loggedIn,type:"checkbox",class:"h-4 w-4 rounded border-3 border-black bg-darkgray accent-darkgray text-blue"},null,8,K),[[L,o.priv]]),G]),i("div",Q,[q,p(i("input",{"onUpdate:modelValue":e[4]||(e[4]=l=>o.password=l),type:"password",class:"p-px text-center text-white rounded border-none focus:outline-none text-lg text-bold bg-darkgray flex-1"},null,512),[[x,o.password]])])],512)])])}const X=_(P,[["render",J],["__scopeId","data-v-f57cfd42"]]);function Y(s,e){if(s!=null)if(s.createTextRange){var t=s.createTextRange();t.move("character",e),t.select()}else s.selectionStart?(s.focus(),s.setSelectionRange(e,e)):s.focus()}const Z={props:{lang:{type:String,default(){return"text"}},editable:{type:Boolean,default(){return!0}},value:{type:String,default(){return""}}},data(){return{text:this.value,inputElemet:void 0,codeDisplay:void 0,lineNumbers:void 0,editor:void 0,preCode:void 0}},watch:{lang:{handler:function(s,e){this.update()},flush:"post"},$route:{handler:function(){this.update({target:this.$data.inputElemet}),this.$data.editor.classList.remove("hide-editor")},deep:"true"}},mounted(){this.$data.inputElemet=this.$refs.input,this.$data.codeDisplay=this.$refs.code,this.$data.lineNumbers=this.$refs["line-numbers"],this.$data.editor=this.$refs.editor,this.$data.preCode=this.$refs["pre-code"],this.$data.editor.classList.remove("hide-editor"),setTimeout(this.update.bind(this,{target:this.$data.inputElemet}),100),window.addEventListener("resize",this.update.bind(this,{target:this.$data.inputElemet}))},methods:{update(){let s=this.text;s.charAt(s.length-1)==`
`&&(s+="\xA0"),this.$data.codeDisplay.textContent=s,V.highlightAll();const e=(s.match(/\n/g)||"").length+1;let t="";for(let n=1;n<=e;n++)t+=n+`
`;this.$data.lineNumbers.textContent=t;let c=[this.$data.inputElemet,this.$data.preCode];const o=this.$data.lineNumbers.clientWidth+10;for(let n=0;n<c.length;n++)c[n].style.left=o+"px",c[n].style.width=this.$data.editor.clientWidth-o+"px";this.$data.codeDisplay.style.width=this.$data.inputElemet.clientWidth+"px",this.$data.preCode.style.height=this.$data.inputElemet.clientHeight+"px",this.$data.lineNumbers.style.height=this.$data.inputElemet.clientHeight+"px",this.fixScroll()},fixScroll(){this.$data.preCode.scroll({left:this.$data.inputElemet.scrollLeft,top:this.$data.inputElemet.scrollTop,behavior:"instant"}),this.$data.lineNumbers.scroll({top:this.$data.inputElemet.scrollTop,behavior:"instant"})},type(s){if(s.key=="Tab"){s.preventDefault();let e=s.target.selectionStart,t=this.$data.inputElemet.value;this.$data.inputElemet.value=t.slice(0,e)+"	"+t.slice(e),Y(this.$data.inputElemet,e+1),this.update({target:this.$data.inputElemet})}}}},ee={class:"editor hide-editor",ref:"editor"},te=h("                "),se=h(`\r
            `),ne={ref:"line-numbers",class:"line-numbers"},ie=["disabled"];function oe(s,e,t,c,o,n){return a(),d("div",{class:"editor-container",style:N(s.$attrs.style)},[i("div",ee,[i("pre",{ref:"pre-code",class:v(["language-"+t.lang,"pre-code code-container overflow-hidden h-md"])},[te,i("code",{ref:"code",class:v(["language-"+t.lang,"code"])},`\r
                `,2),se],2),i("pre",ne,"1",512),p(i("textarea",{"onUpdate:modelValue":e[0]||(e[0]=r=>o.text=r),disabled:!t.editable,onScroll:e[1]||(e[1]=(...r)=>n.fixScroll&&n.fixScroll(...r)),class:"code-container",ref:"input",onKeydown:e[2]||(e[2]=(...r)=>n.type&&n.type(...r)),onInput:e[3]||(e[3]=(...r)=>n.update&&n.update(...r)),resize:"false",spellcheck:"false"},null,40,ie),[[x,o.text]])],512)],4)}const le=_(Z,[["render",oe]]),ae={props:{editable:{type:Boolean,default(){return!0}},value:{default(){return{name:"",syntax:"text",content:""}}}},data(){return{languages:M().public.supportedSyntaxes,selectedLang:this.value.syntax||"text",title:this.value.name}},methods:{getValue(){return{name:this.title,syntax:this.selectedLang,content:this.$refs.editor.text}}}},de={class:"main shadow-black shadow-lg rounded"},re={class:"header bg-gradient-to-tr from-green to-orange p-2 flex justify-center rounded"},ce=["disabled"],ue=["value"];function pe(s,e,t,c,o,n){const r=le;return a(),d("div",de,[i("div",re,[p(i("input",{disabled:!t.editable,"onUpdate:modelValue":e[0]||(e[0]=l=>o.title=l),type:"text",maxlength:"50",tooltip:"Click to edit",placeholder:"Name this snippet +",class:"flex-1 sm:mr-4 py-2 text-center text-white rounded placeholder-white-100 border-none focus:outline-none text-lg text-bold"},null,8,ce),[[x,o.title,void 0,{trim:!0,lazy:!0}]]),p(i("select",{"onUpdate:modelValue":e[1]||(e[1]=l=>o.selectedLang=l),class:"bg-transparent rounded text-center border-none"},[(a(!0),d(y,null,w(o.languages,(l,b)=>(a(),d("option",{key:b,value:l},g(l),9,ue))),128))],512),[[A,o.selectedLang]])]),k(r,{ref:"editor",style:{width:"100%","border-radius":"0 0 5px 5px"},lang:o.selectedLang,value:t.value.content,editable:t.editable},null,8,["lang","value","editable"])])}const he=_(ae,[["render",pe],["__scopeId","data-v-29c82a4b"]]),fe={emits:["submit"],props:{editable:{type:Boolean,default:()=>!0},paste:{type:Object},submitText:{type:String},loggedIn:{type:Boolean,default:()=>!1}},data(){return{snippets:[0]}},mounted(){this.paste&&(this.paste.created=new Date(this.paste.created).toLocaleDateString())},methods:{scrollSnippets(){setTimeout(()=>{const s=this.$refs["editor-conteiner"];s.scrollTo({top:s.scrollHeight,behavior:"smooth"})},10)},snippetAmount(){return this.paste?this.paste.fragments.length:this.snippets.length},createPaste(s){let e=[];this.$refs.snippet.forEach(c=>e.push(c.getValue()));const t={};Object.assign(t,s),t.fragments=e,this.$emit("submit",t)},addSnippet(){const s=this.paste?this.paste.fragments:this.snippets,e=this.paste?s.length[s.length-1]+1:void 0;(this.loggedIn&&s.length<500||s.length<5)&&s.push(e),this.scrollSnippets()},removeSnippet(){(this.paste?this.paste.fragments:this.snippets).pop(),this.scrollSnippets()}}},me={key:1,class:"sticky z-10 top-0 flex flex-col md:flex-row justify-between content-center text-center bg-gradient-to-tr from-green to-orange mb-4 p-4 rounded md:mr-2"},ge={class:"text-3xl text-white text-shadow-sm"},xe={class:"text-lg text-black text-shadow-none"},_e={class:"text-sm mb-1 text-dark-700"},be={class:"h-min self-center"},ve=h("Created on "),ye={ref:"editor-conteiner",class:"flex flex-col min-w-xs w-full editor lg:mr-8 pr-4 overflow-x-hidden md:overflow-y-auto md:max-h-2xl"},we={key:0},ke={key:1},Se={key:0,class:"w-full px-4 flex justify-center space-x-4"};function $e(s,e,t,c,o,n){const r=X,l=C("font-awesome-icon"),b=D,$=he;return a(),d("div",{class:v(["flex flex-col",{"lg:flex-row-reverse":t.editable}])},[t.editable?(a(),f(r,{key:0,onSubmit:n.createPaste,ref:"side-menu",class:"mb-4 side-menu",options:t.paste,submitText:t.submitText,loggedIn:t.loggedIn},null,8,["onSubmit","options","submitText","loggedIn"])):(a(),d("div",me,[i("h1",ge,[h(g(t.paste.title)+" ",1),i("span",xe,"by "+g(t.paste.owner.username),1),i("span",_e,[t.paste!=null&&t.paste.isPrivate?(a(),f(l,{key:0,icon:["fas","fa-eye-slash"],class:"ml-2"})):m("",!0),t.paste!=null&&t.paste.password?(a(),f(l,{key:1,icon:["fas","fa-lock"],class:"ml-2"})):m("",!0)])]),i("h2",be,[ve,k(b,null,{default:B(()=>[h(g(t.paste.created),1)]),_:1})])])),i("div",ye,[i("div",null,[t.paste?(a(),d("div",we,[(a(!0),d(y,null,w(t.paste.fragments,(u,E)=>(a(),f($,{ref_for:!0,ref:"snippet",key:E,value:u,editable:t.editable,class:"mb-8"},null,8,["value","editable"]))),128))])):(a(),d("div",ke,[(a(!0),d(y,null,w(o.snippets,u=>(a(),f($,{ref_for:!0,ref:"snippet",key:u,editable:t.editable,class:"mb-8"},null,8,["editable"]))),128))]))]),t.editable?(a(),d("div",Se,[t.loggedIn&&n.snippetAmount()<500||n.snippetAmount()<5?(a(),d("button",{key:0,onClick:e[0]||(e[0]=(...u)=>n.addSnippet&&n.addSnippet(...u)),class:"bg-green sm:px-10 flex-1 md:max-w-xs rounded py-2 hover:shadow-lg"},"Add snippet")):m("",!0),n.snippetAmount()>1?(a(),d("button",{key:1,ref:"remove",onClick:e[1]||(e[1]=(...u)=>n.removeSnippet&&n.removeSnippet(...u)),class:"bg-red-500 sm:px-10 flex-1 md:max-w-xs rounded py-2 hover:shadow-lg hide"},"Remove last snippet",512)):m("",!0)])):m("",!0)],512)],2)}const Ee=_(fe,[["render",$e]]),Le=""+new URL("logo-paste-loading.d9d6ef31.svg",import.meta.url).href,Te=""+new URL("logo-paste-created.50923283.svg",import.meta.url).href;export{Ee as _,Te as a,Le as s};
