import{_ as R,a as B,b as O}from"./logo-paste-created.1e760a70.mjs";import{m as T,q as M,s as E,w as H,v as j,x as K,y as z,u as m,h as q,z as U,j as Q,A as $,B as V,D,k as J,o as g,b as k,c as G,E as F,e as r,G as A,t as L,l as W,H as X,I as Y,J as Z,K as ee,p as te,f as se,i as ae}from"./entry.0da65382.mjs";const oe=()=>null;function N(...n){var l,x,b,o,p,u,y;const i=typeof n[n.length-1]=="string"?n.pop():void 0;typeof n[0]!="string"&&n.unshift(i);let[e,h,s={}]=n;if(typeof e!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof h!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");s.server=(l=s.server)!=null?l:!0,s.default=(x=s.default)!=null?x:oe,s.defer&&console.warn("[useAsyncData] `defer` has been renamed to `lazy`. Support for `defer` will be removed in RC."),s.lazy=(o=(b=s.lazy)!=null?b:s.defer)!=null?o:!1,s.initialCache=(p=s.initialCache)!=null?p:!0;const a=T(),f=z();if(f&&!f._nuxtOnBeforeMountCbs){const c=f._nuxtOnBeforeMountCbs=[];f&&(M(()=>{c.forEach(d=>{d()}),c.splice(0,c.length)}),E(()=>c.splice(0,c.length)))}const _=()=>s.initialCache&&a.payload.data[e]!==void 0,t={data:H((u=a.payload.data[e])!=null?u:s.default()),pending:j(!_()),error:j((y=a.payload._errors[e])!=null?y:null)};t.refresh=(c={})=>a._asyncDataPromises[e]?a._asyncDataPromises[e]:c._initial&&_()?a.payload.data[e]:(t.pending.value=!0,a._asyncDataPromises[e]=new Promise((d,C)=>{try{d(h(a))}catch(S){C(S)}}).then(d=>{s.transform&&(d=s.transform(d)),s.pick&&(d=ne(d,s.pick)),t.data.value=d,t.error.value=null}).catch(d=>{t.error.value=d,t.data.value=m(s.default())}).finally(()=>{t.pending.value=!1,a.payload.data[e]=t.data.value,t.error.value&&(a.payload._errors[e]=!0),delete a._asyncDataPromises[e]}),a._asyncDataPromises[e]);const v=()=>t.refresh({_initial:!0}),w=s.server!==!1&&a.payload.serverRendered;{w&&a.isHydrating&&e in a.payload.data?t.pending.value=!1:f&&a.payload.serverRendered&&(a.isHydrating||s.lazy)?f._nuxtOnBeforeMountCbs.push(v):v(),s.watch&&K(s.watch,()=>t.refresh());const c=a.hook("app:data:refresh",d=>{if(!d||d.includes(e))return t.refresh()});f&&E(c)}const P=Promise.resolve(a._asyncDataPromises[e]).then(()=>t);return Object.assign(P,t),P}function ne(n,i){const e={};for(const h of i)e[h]=n[h];return e}function re(n){return{}}const I=n=>(te("data-v-d993d121"),n=n(),se(),n),ie={key:0},ce={key:1,class:"flex flex-row justify-center items-center mt-12"},de=["data"],le={ref:"img0",src:R},ue=I(()=>r("div",{class:"bg-gradient-to-tr from-green to-orange rounded p-6 h-min"},[r("h2",{class:"text-2xl font-bold"},"Creating paste")],-1)),fe={key:2,class:"flex flex-row justify-center items-center mt-12"},pe=["data"],he={ref:"img1",src:B},_e={class:"doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min"},me=I(()=>r("h2",{class:"text-2xl font-bold"},"Paste created!",-1)),ye=A(" Check it at: "),ge=["href"],ve={key:1,class:"flex flex-col items-center space-y-4"},we=I(()=>r("h2",{class:"text-xl text-gray-300"},"Enter password to view the paste",-1)),xe={class:"flex flex-col md:flex-row space-y-2 md:space-y-0"},be=["onKeyup"],ke={key:2},Pe=I(()=>r("div",{class:"flex flex-col justify-center content-center text-center bg-gradient-to-tr from-green to-orange mb-4 p-4 rounded"},[r("h1",{class:"text-3xl text-white text-shadow-sm"}," No paste here ")],-1)),Se=[Pe],Ie={data(){return{pastePostingState:0,createdPaste:void 0}},methods:{async rePaste(n){this.pastePostingState=1;const i={"Content-Type":"application/json"};this.password.length!=0&&(i["Paste-Authorization"]=this.password);const e=await fetch(`/api/paste/${this.$route.params.pasteId}`,{method:"PUT",headers:i,credentials:"include",body:JSON.stringify(n)});e.ok&&(this.pastePostingState=2,this.createdPaste=(await e.json()).result)}}},Ce=Object.assign(Ie,{__name:"[pasteId]",async setup(n){let i,e;const h=U(),a=Q().addNotification;let{data:f,error:_}=([i,e]=$(async()=>N("paste",async o=>{const u=D().params.pasteId,y=re().cookie,c={};return y.split(";").forEach(C=>{const S=C.split("=");c[S[0].trim()]=S[1]}),await $fetch(`${ae().public.webAddress}/api/paste/${u}`,{headers:{Authorization:"ApiKey "+c.quickpaste_auth},parseResponse:JSON.parse})},{server:!0},"$Ihw3rQE6if")),i=await i,e(),i),t=V(f);t.value,_.value&&console.log(_.value);const{data:v}=([i,e]=$(()=>N("error",()=>_.value?_.value.response.status:200,{server:!0},"$nnNzL6MnHs")),i=await i,e(),i);let w=j(!1);const P=D();let l="";function x(){if(h.user()==null||!t.value||t.value.owner.id!=h.id())return;D().query.edit&&(w=!0)}async function b(){var p;if(l.length===0){a({type:1,title:"Please enter password to enter",level:1});return}const o=await fetch(`/api/paste/${P.params.pasteId}`,{method:"GET",headers:{"Paste-Authorization":l},credentials:"include"});if(o.ok){t=await o.json(),l.length!=0&&(t.password=l),x(),document.title="Quickpaste | "+t.title.substring(0,25);const u=z();(p=u==null?void 0:u.proxy)==null||p.$forceUpdate()}else{switch(o.status){case 401:a({type:1,title:"Incorrect password",level:1});break}l="",v=o.status}}return t.value&&(document.title="Quickpaste | "+t.value.title.substring(0,25)),x(),(o,p)=>{const u=O,y=J("font-awesome-icon");return m(t)?(g(),k("div",ie,[o.pastePostingState==0?(g(),G(u,{key:0,onSubmit:o.rePaste,class:F(["m-auto",{"max-w-4xl":!m(w)}]),paste:m(t),editable:m(w),submitText:"Re-Paste !"},null,8,["onSubmit","class","paste","editable"])):o.pastePostingState==1?(g(),k("div",ce,[r("object",{width:"300",height:"300",type:"image/svg+xml",data:o.$refs.img0.src},[r("img",le,null,512)],8,de),ue])):(g(),k("div",fe,[r("object",{width:"300",height:"300",type:"image/svg+xml",data:o.$refs.img1.src},[r("img",he,null,512)],8,pe),r("div",_e,[me,r("h3",null,[ye,r("a",{class:"font-bold",href:`/${o.createdPaste.pasteId}`},[A(L(o.createdPaste.pasteId)+" ",1),W(y,{icon:["fas","fa-arrow-up-right-from-square"]})],8,ge)])])]))])):m(v)==401?(g(),k("div",ve,[we,r("div",xe,[X(r("input",{onKeyup:Z(b,["enter"]),"onUpdate:modelValue":p[0]||(p[0]=c=>ee(l)?l.value=c:l=c),type:"password",autocomplete:"off",class:"p-2 w-full md:w-auto text-center text-white rounded border-none focus:outline-none text-lg text-bold bg-darkgray mr-4"},null,40,be),[[Y,m(l)]]),r("button",{onClick:b,class:"bg-gradient-to-tr from-green to-orange rounded p-2 text-center hover:shadow-lg"},"Enter")])])):(g(),k("div",ke,Se))}}}),$e=q(Ce,[["__scopeId","data-v-d993d121"]]);export{$e as default};
