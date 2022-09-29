import{_ as k}from"./UserPanel.eba278df.mjs";import{z as N,j as S,B as $,v as h,k as C,o as r,b as i,l as _,e as o,u as m,F as M,r as j,G as g,t as d,c as p,Q as x,R as D,X as T,S as I,N as B}from"./entry.b5baf245.mjs";const E={class:"flex flex-col md:flex-row w-full justify-between"},O={class:"md:w-4/5"},R=o("h1",{class:"text-5xl mb-6 text-orange text-shadow-sm border-b border-blue pb-4"},"Pastes",-1),L=["href"],V={class:"text-2xl font-bold"},F={class:"text-sm font-normal italic text-gray-500"},H={class:"flex flex-row justify-between"},J=["href"],Q=["onClick"],U={key:1,class:"text-center"},z=o("h2",{class:"text-gray-400"},[g("You can create some pastes "),o("a",{href:"/",class:"text-green"},"here")],-1),A=[z],G={methods:{async loadMorePastes(){const c=this.$refs["paste-container"],l=c.scrollTop+c.clientHeight;if(this.nextPageId&&l>c.scrollHeight-20&&!this.loadingMore){this.loadingMore=!0;const n=await $fetch(`/api/user/pastes?pageId=${this.nextPageId}`,{credentials:"include",parseResponse:JSON.json});this.nextPageId=n.result.nextPage;for(let t=0;t<n.result.pastes.length;t++)n.result.pastes[t].created=new Date(n.result.pastes[t].created).toLocaleDateString();this.pastes=this.pastes.concat(n.result.pastes),this.loadingMore=!1}}},mounted(){this.pastes.length===0&&this.refreshPastes()}},K=Object.assign(G,{__name:"index",setup(c){const l=N(),n=S();let t=$([]),w=h(void 0);h(!1);const b=async e=>{await n.addNotification({type:B.CONFIRM,title:"Delete paste?",description:"This action can not be reversed!"})&&(await $fetch(`/api/paste/${e}`,{method:"DELETE",credentials:"include"}),await y())},y=async()=>{const e=await $fetch("/api/user/pastes",{credentials:"include",parseResponse:JSON.json});t=e.result.pastes,w.value=e.result.nextPage;for(let a=0;a<t.length;a++)t[a].created=new Date(t[a].created).toLocaleDateString()},u=e=>{document.title=`Quickpaste | ${e}`};{let e=l.username();e==""?setTimeout(()=>{let a=l.username();u(a)},200):u(e)}return(e,a)=>{const v=k,f=C("font-awesome-icon"),P=I;return r(),i("div",E,[_(v),o("div",O,[R,m(t).length>0?(r(),i("div",{key:0,ref:"paste-container",class:"max-h-prose overflow-y-auto",onScroll:a[0]||(a[0]=(...s)=>e.loadMorePastes&&e.loadMorePastes(...s))},[(r(!0),i(M,null,j(m(t),s=>(r(),i("div",{key:s.uuid,class:"flex flex-col md:flex-row justify-between content-cetner mr-2 p-2 px-8 mb-4 rounded bg-blue"},[o("a",{href:`/${s.uuid}`},[o("h3",V,[g(d(s.title)+" ",1),o("span",F,"#"+d(s.uuid),1),s.isPrivate?(r(),p(f,{key:0,icon:["fas","fa-eye-slash"],class:"text-sm ml-2 mb-px"})):x("",!0),s.password?(r(),p(f,{key:1,icon:["fas","fa-lock"],class:"text-sm ml-2 mb-px"})):x("",!0)]),_(P,null,{default:D(()=>[o("p",null,"Created: "+d(s.created),1)]),_:2},1024)],8,L),o("div",H,[o("a",{class:"bg-green flex-1 m-2 rounded p-4 text-center",href:`/${s.uuid}?edit=1`},"Edit",8,J),o("button",{class:"bg-red-600 flex-1 m-2 rounded p-4 text-center",onClick:T(X=>b(s.uuid),["stop"])},"Remove",8,Q)])]))),128))],544)):(r(),i("div",U,A))])])}}});export{K as default};
