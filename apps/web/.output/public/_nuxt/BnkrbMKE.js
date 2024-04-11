import{_ as P}from"./BPCTXnOr.js";import{i as $,j as T,k as r,l as D,c,b as g,a as s,h as f,F as E,r as M,n as j,o as n,d as b,t as _,H as w,m as v,w as B,T as I,S as L,N as O}from"./DhotaUmr.js";const R=["id"],V={class:"md:w-4/5"},F=s("h1",{class:"text-5xl mb-6 text-orange text-shadow-sm border-b border-blue pb-4"},"Pastes",-1),H=["href"],J={class:"text-2xl font-bold"},U={class:"text-sm font-normal italic text-gray-500"},A={class:"flex flex-row justify-between"},Q=["href"],Y=["onClick"],q={key:1,class:"text-center"},z=s("h2",{class:"text-gray-400"},[b("You can create some pastes "),s("a",{href:"/",class:"text-green"},"here")],-1),G=[z],ee={__name:"index",setup(K){const p=$(),y=T();let a=r([]),d=r(void 0),u=r(!1),i=r(null),k=r(0);const N=async t=>{await y.addNotification({type:O.CONFIRM,title:"Delete paste?",description:"This action can not be reversed!"})&&(await $fetch(`/api/paste/${t}`,{method:"DELETE",credentials:"include"}),await m())},m=async()=>{const t=await $fetch("/api/user/pastes",{credentials:"include",parseResponse:JSON.parse});a.value=t.result.pastes,d.value=t.result.nextPage;for(let e=0;e<a.value.length;e++)a.value[e].created=new Date(a.value[e].created).toLocaleDateString()},S=async()=>{const t=i.value.scrollTop+i.value.clientHeight;if(d&&t>i.value.scrollHeight-20&&!u){u=!0;const e=await $fetch(`/api/user/pastes?pageId=${this.nextPageId}`,{credentials:"include",parseResponse:JSON.parse});d=e.result.nextPage;for(let l=0;l<e.result.pastes.length;l++)e.result.pastes[l].created=new Date(e.result.pastes[l].created).toLocaleDateString();a=a.concat(e.result.pastes),u=!1}},h=t=>{document.title=`Quickpaste | ${t}`};{let t=p.username();t==""?setTimeout(()=>{let e=p.username();h(e)},200):h(t)}return D(()=>{a.value.length===0&&m()}),(t,e)=>{const l=P,x=j("font-awesome-icon"),C=L;return n(),c("div",{id:f(k),class:"flex flex-col md:flex-row w-full justify-between"},[g(l),s("div",V,[F,f(a).length>0?(n(),c("div",{key:0,ref_key:"pasteContainer",ref:i,class:"max-h-prose overflow-y-auto",onScroll:S},[(n(!0),c(E,null,M(f(a),o=>(n(),c("div",{key:o.uuid,class:"flex flex-col md:flex-row justify-between content-cetner mr-2 p-2 px-8 mb-4 rounded bg-blue"},[s("a",{href:`/paste/${o.uuid}`},[s("h3",J,[b(_(o.title)+" ",1),s("span",U,"#"+_(o.uuid),1),o.isPrivate?(n(),w(x,{key:0,icon:["fas","fa-eye-slash"],class:"text-sm ml-2 mb-px"})):v("",!0),o.password?(n(),w(x,{key:1,icon:["fas","fa-lock"],class:"text-sm ml-2 mb-px"})):v("",!0)]),g(C,null,{default:B(()=>[s("p",null,"Created: "+_(o.created),1)]),_:2},1024)],8,H),s("div",A,[s("a",{class:"bg-green flex-1 m-2 rounded p-4 text-center",href:`/paste/${o.uuid}?edit=1`},"Edit",8,Q),s("button",{class:"bg-red-600 flex-1 m-2 rounded p-4 text-center",onClick:I(W=>N(o.uuid),["stop"])},"Remove",8,Y)])]))),128))],544)):(n(),c("div",q,G))])],8,R)}}};export{ee as default};