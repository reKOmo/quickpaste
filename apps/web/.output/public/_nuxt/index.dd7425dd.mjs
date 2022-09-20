import{_ as p,a as m,b as f}from"./logo-paste-created.ced4e2b1.mjs";import{h as u,A as g,k as v,o,b as n,l as a,e as t,m as i,t as y,O as c,Q as x,S as b,p as w,f as P}from"./entry.4998e646.mjs";const r=s=>(w("data-v-088c79f6"),s=s(),P(),s),k={key:0,class:"container"},S={key:1},I={key:0,class:"flex flex-row justify-center items-center mt-12"},C=["data"],j={ref:"img0",src:p},T=r(()=>t("div",{class:"bg-gradient-to-tr from-green to-orange rounded p-6 h-min"},[t("h2",{class:"text-2xl font-bold"},"Creating paste")],-1)),$={key:1},N={key:0,class:"flex flex-row justify-center items-center mt-12"},q=["data"],L={ref:"img1",src:m},O={class:"doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min"},V=r(()=>t("h2",{class:"text-2xl font-bold"},"Paste created!",-1)),B=i(" Check it at: "),D=["href"],E={key:1,class:"flex flex-row justify-center items-center mt-12"},Q={class:"doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min"},A=r(()=>t("h2",{class:"text-2xl font-bold"},"Daily paste limit reached",-1)),F=i(" You have surpassed your daily paste limit. For more information see "),H=i("here"),J={data(){return{snippets:[0],offscreen:!1,postingPaste:!1,createdPaste:void 0,loggedIn:!1,requestCode:200}},mounted(){this.loggedIn=this.userStore.user()!=null,document.title="Quickpaste"},watch:{snippets:{handler(){setTimeout(()=>{const s=this.$refs["editor-conteiner"];s.scrollTo({top:s.scrollHeight,behavior:"smooth"})},10)},deep:!0}},methods:{async createPaste(s){this.postingPaste=!0;const e=await fetch("/api/paste",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(s)}),d=await e.json();this.createdPaste=d.result,this.requestCode=e.status},removeLast(){this.snippets.length>1&&this.snippets.pop(),this.snippets.length==1&&this.$refs.remove.classList.add("hide")},addSnippet(){this.snippets.push(this.snippets.length),this.snippets.length>1&&this.$refs.remove.classList.remove("hide")}}},U=Object.assign(J,{__name:"index",setup(s){return g(),(e,d)=>{const l=f,h=v("font-awesome-icon"),_=b;return o(),n("div",null,[e.postingPaste?(o(),n("div",S,[e.createdPaste?(o(),n("div",$,[e.requestCode==200?(o(),n("div",N,[t("object",{width:"300",height:"300",type:"image/svg+xml",data:e.$refs.img1.src},[t("img",L,null,512)],8,q),t("div",O,[V,t("h3",null,[B,t("a",{class:"font-bold",href:`/${e.createdPaste.pasteId}`},[i(y(e.createdPaste.pasteId)+" ",1),a(h,{icon:["fas","fa-arrow-up-right-from-square"]})],8,D)])])])):c("",!0),e.requestCode==429?(o(),n("div",E,[t("div",Q,[A,t("h3",null,[F,a(_,{href:"/"},{default:x(()=>[H]),_:1})])])])):c("",!0)])):(o(),n("div",I,[t("object",{width:"300",height:"300",type:"image/svg+xml",data:e.$refs.img0.src},[t("img",j,null,512)],8,C),T]))])):(o(),n("div",k,[a(l,{onSubmit:e.createPaste,loggedIn:e.loggedIn},null,8,["onSubmit","loggedIn"])]))])}}}),G=u(U,[["__scopeId","data-v-088c79f6"]]);export{G as default};