import{_ as A,a as R,b as B}from"./logo-paste-created.49117f88.mjs";import{m as O,q as T,s as D,w as M,v as C,x as H,y as K,u as h,h as q,z as Q,j as U,A as j,C as S,k as V,o as g,b,c as J,D as G,e as i,E as N,t as F,l as L,G as W,H as X,I as Y,J as Z,p as ee,f as te,i as se}from"./entry.335a1af2.mjs";const ae=()=>null;function E(...r){var x,o,_,m,y,p,I;const c=typeof r[r.length-1]=="string"?r.pop():void 0;typeof r[0]!="string"&&r.unshift(c);let[t,f,s={}]=r;if(typeof t!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof f!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");s.server=(x=s.server)!=null?x:!0,s.default=(o=s.default)!=null?o:ae,s.defer&&console.warn("[useAsyncData] `defer` has been renamed to `lazy`. Support for `defer` will be removed in RC."),s.lazy=(m=(_=s.lazy)!=null?_:s.defer)!=null?m:!1,s.initialCache=(y=s.initialCache)!=null?y:!0;const e=O(),d=K();if(d&&!d._nuxtOnBeforeMountCbs){const u=d._nuxtOnBeforeMountCbs=[];d&&(T(()=>{u.forEach(n=>{n()}),u.splice(0,u.length)}),D(()=>u.splice(0,u.length)))}const v=()=>s.initialCache&&e.payload.data[t]!==void 0,a={data:M((p=e.payload.data[t])!=null?p:s.default()),pending:C(!v()),error:C((I=e.payload._errors[t])!=null?I:null)};a.refresh=(u={})=>e._asyncDataPromises[t]?e._asyncDataPromises[t]:u._initial&&v()?e.payload.data[t]:(a.pending.value=!0,e._asyncDataPromises[t]=new Promise((n,$)=>{try{n(f(e))}catch(z){$(z)}}).then(n=>{s.transform&&(n=s.transform(n)),s.pick&&(n=oe(n,s.pick)),a.data.value=n,a.error.value=null}).catch(n=>{a.error.value=n,a.data.value=h(s.default())}).finally(()=>{a.pending.value=!1,e.payload.data[t]=a.data.value,a.error.value&&(e.payload._errors[t]=!0),delete e._asyncDataPromises[t]}),e._asyncDataPromises[t]);const k=()=>a.refresh({_initial:!0}),l=s.server!==!1&&e.payload.serverRendered;{l&&e.isHydrating&&t in e.payload.data?a.pending.value=!1:d&&e.payload.serverRendered&&(e.isHydrating||s.lazy)?d._nuxtOnBeforeMountCbs.push(k):k(),s.watch&&H(s.watch,()=>a.refresh());const u=e.hook("app:data:refresh",n=>{if(!n||n.includes(t))return a.refresh()});d&&D(u)}const w=Promise.resolve(e._asyncDataPromises[t]).then(()=>a);return Object.assign(w,a),w}function oe(r,c){const t={};for(const f of c)t[f]=r[f];return t}function ne(r){return{}}const P=r=>(ee("data-v-dd75aaf1"),r=r(),te(),r),re={key:0},ie={key:1,class:"flex flex-row justify-center items-center mt-12"},ce=["data"],de={ref:"img0",src:A},le=P(()=>i("div",{class:"bg-gradient-to-tr from-green to-orange rounded p-6 h-min"},[i("h2",{class:"text-2xl font-bold"},"Creating paste")],-1)),ue={key:2,class:"flex flex-row justify-center items-center mt-12"},fe=["data"],pe={ref:"img1",src:R},he={class:"doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min"},_e=P(()=>i("h2",{class:"text-2xl font-bold"},"Paste created!",-1)),me=N(" Check it at: "),ye=["href"],ge={key:1,class:"flex flex-col items-center space-y-4"},ve=P(()=>i("h2",{class:"text-xl text-gray-300"},"Enter password to view the paste",-1)),we={class:"flex flex-col md:flex-row space-y-2 md:space-y-0"},xe=["onKeyup"],be={key:2},ke=P(()=>i("div",{class:"flex flex-col justify-center content-center text-center bg-gradient-to-tr from-green to-orange mb-4 p-4 rounded"},[i("h1",{class:"text-3xl text-white text-shadow-sm"}," No paste here ")],-1)),Pe=[ke],Ie={data(){return{pastePostingState:0,createdPaste:void 0}},methods:{async rePaste(r){this.pastePostingState=1;const c={"Content-Type":"application/json"};this.password.length!=0&&(c["Paste-Authorization"]=this.password);const t=await fetch(`/api/paste/${this.$route.params.pasteId}`,{method:"PUT",headers:c,credentials:"include",body:JSON.stringify(r)});t.ok&&(this.pastePostingState=2,this.createdPaste=(await t.json()).result)}}},Se=Object.assign(Ie,{__name:"[pasteId]",async setup(r){let c,t;const f=Q(),s=U();let{data:e,error:d}=([c,t]=j(async()=>E("paste",async o=>{const m=S().params.pasteId,y=ne().cookie,p={};return y.split(";").forEach(u=>{const n=u.split("=");p[n[0].trim()]=n[1]}),await $fetch(`${se().public.webAddress}/api/paste/${m}`,{headers:{Authorization:"ApiKey "+p.quickpaste_auth},parseResponse:JSON.parse})},{server:!0},"$Ihw3rQE6if")),c=await c,t(),c);e.value,d.value&&console.log(d.value);const{data:v}=([c,t]=j(()=>E("error",()=>d.value?d.value.response.status:200,{server:!0},"$nnNzL6MnHs")),c=await c,t(),c);let a=C(!1);const k=S();let l="";function w(){if(f.user()==null||!e.value||e.value.owner.id!=f.id())return;S().query.edit&&(a=!0)}async function x(){if(l.length===0){s.addNotification({type:1,title:"Please enter password to enter",level:1});return}const o=await fetch(`/api/paste/${k.params.pasteId}`,{method:"GET",headers:{"Paste-Authorization":l},credentials:"include"});if(o.ok)e=await o.json(),l.length!=0&&(e.password=l),w(),document.title="Quickpaste | "+e.title.substring(0,25);else{switch(o.status){case 401:s.addNotification({type:1,title:"Incorrect password",level:1});break}l="",v=o.status}}return e.value&&(document.title="Quickpaste | "+e.value.title.substring(0,25)),w(),(o,_)=>{const m=B,y=V("font-awesome-icon");return h(e)?(g(),b("div",re,[o.pastePostingState==0?(g(),J(m,{key:0,onSubmit:o.rePaste,class:G(["m-auto",{"max-w-4xl":!h(a)}]),paste:h(e),editable:h(a),submitText:"Re-Paste !"},null,8,["onSubmit","class","paste","editable"])):o.pastePostingState==1?(g(),b("div",ie,[i("object",{width:"300",height:"300",type:"image/svg+xml",data:o.$refs.img0.src},[i("img",de,null,512)],8,ce),le])):(g(),b("div",ue,[i("object",{width:"300",height:"300",type:"image/svg+xml",data:o.$refs.img1.src},[i("img",pe,null,512)],8,fe),i("div",he,[_e,i("h3",null,[me,i("a",{class:"font-bold",href:`/${o.createdPaste.pasteId}`},[N(F(o.createdPaste.pasteId)+" ",1),L(y,{icon:["fas","fa-arrow-up-right-from-square"]})],8,ye)])])]))])):h(v)==401?(g(),b("div",ge,[ve,i("div",we,[W(i("input",{onKeyup:Y(x,["enter"]),"onUpdate:modelValue":_[0]||(_[0]=p=>Z(l)?l.value=p:l=p),type:"password",autocomplete:"off",class:"p-2 w-full md:w-auto text-center text-white rounded border-none focus:outline-none text-lg text-bold bg-darkgray mr-4"},null,40,xe),[[X,h(l)]]),i("button",{onClick:x,class:"bg-gradient-to-tr from-green to-orange rounded p-2 text-center hover:shadow-lg"},"Enter")])])):(g(),b("div",be,Pe))}}}),Ee=q(Se,[["__scopeId","data-v-dd75aaf1"]]);export{Ee as default};