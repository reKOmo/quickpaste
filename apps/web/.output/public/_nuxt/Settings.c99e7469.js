import{j as x,q as g,k as m,o as s,b as a,e,l as _,N as u,h as w,F as p,r as k,t as h,c as y,T as b}from"./entry.ebac6982.js";import{_ as v}from"./UserPanel.5e487784.js";const A={class:"flex flex-col"},$=e("p",{class:"ml-2 mb-4 text-gray-200"},"After clicking the button a new API key will be generated and all previous ones will be deemd invalid.",-1),C={class:"flex flex-row bg-darkgray rounded p-4 text-gray-200 shadow-black shadow-sm my-2 max-w-sm mx-auto"},N={class:"flex justify-center items-center mr-2"},T=e("div",{class:"flex flex-col"},[e("p",{class:"text-md"},"Please save the key after it is shown as you will not be able to retrieve it.")],-1),O={class:"mt-4 flex"},E={key:0,class:"bg-darkgray rounded flex w-3/4 m-auto"},I=["value"],j={data(){return{key:void 0}},methods:{async getNewKey(){const o=await fetch("/user/generatePermaKey",{method:"GET",credentials:"include"});if(o.ok){const n=await o.json();this.key=n.result}}}},S=Object.assign(j,{__name:"GenerateApiKey",setup(o){const n=x(),c=g(null),l=()=>{c.select(),document.execCommand("copy"),n.addNotification({type:u.NOTIFICATION,level:0,title:"Copied!"})};return(t,i)=>{const r=m("font-awesome-icon");return s(),a("div",A,[$,e("div",C,[e("div",N,[_(r,{icon:["fas","fa-circle-exclamation"],size:"xl","fixed-width":"",class:"text-red-500"})]),T]),e("div",O,[t.key?(s(),a("div",E,[e("input",{ref_key:"keyContainer",ref:c,class:"flex-1 text-monospace text-gray-200 bg-darkgray rounded border-none text-center p-2 max-w-2xl break-word overflow-x-scroll",value:t.key,readonly:""},null,8,I),e("div",{onClick:l,class:"text-gray-200 p-2 text-xl flex justify-center items-center hover:text-orange transition cursor-pointer"},[_(r,{icon:["fa-solid","fa-copy"]})])])):(s(),a("button",{key:1,onClick:i[0]||(i[0]=(...d)=>t.getNewKey&&t.getNewKey(...d)),class:"m-auto bg-gradient-to-tr from-green to-orange rounded p-4 text-center text-lg hover:shadow-lg my-4"},"Generate key"))])])}}}),L={class:"flex flex-col"},P=e("p",{class:"ml-2 mb-4 text-gray-200"},"Click button below to delete your account.",-1),D={class:"flex flex-row bg-darkgray rounded p-4 text-gray-200 shadow-black shadow-sm my-2 max-w-sm mx-auto"},K={class:"flex justify-center items-center mr-2"},G=e("div",{class:"flex flex-col"},[e("p",{class:"text-md"},"DELETING YOUR ACCOUNT WILL ALSO DELETE ALL PASTES THAT YOU CREATED PERMANENTLY WITHOUT A WAY OF RECOVERING THEM")],-1),F={class:"mt-4 flex"},R={methods:{async deleteAccount(){if(await this.notificationStore.addNotification({type:u.CONFIRM,title:"Are you sure you want to delete your account?",description:"This action can not be undone and will result in permanent data loss!"})){const n=await fetch("/user/deleteAccount",{method:"GET",credentials:"include",redirect:"follow"});n.redirected?window.location="/":n.ok||this.notificationStore.addNotification({type:u.NOTIFICATION,title:"Error accoured while deleting account. Please try again"})}}}},U=Object.assign(R,{__name:"DeleteAccount",setup(o){return x(),(n,c)=>{const l=m("font-awesome-icon");return s(),a("div",L,[P,e("div",D,[e("div",K,[_(l,{icon:["fas","fa-circle-exclamation"],size:"xl","fixed-width":"",class:"text-red-500"})]),G]),e("div",F,[e("button",{onClick:c[0]||(c[0]=(...t)=>n.deleteAccount&&n.deleteAccount(...t)),class:"m-auto bg-red-500 rounded p-4 text-center text-lg hover:shadow-lg my-4"},"Delete account")])])}}}),B={emits:["picked"],props:{options:{type:Object,default:()=>{}}},methods:{pick(o){this.$emit("picked",o)}}},Y=e("h2",{class:"text-3xl border-b-1 border-black pb-2 mb-4"},"Settings",-1),H=["onClick"];function M(o,n,c,l,t,i){return s(),a(p,null,[Y,e("ul",null,[(s(!0),a(p,null,k(c.options,(r,d)=>(s(),a("li",{key:d,onClick:f=>i.pick(r),class:"text-lg hover:text-gray-200 transition cursor-pointer"},h(r.name),9,H))),128))])],64)}const V=w(B,[["render",M]]),W={class:"flex flex-col md:flex-row w-full justify-between"},z={class:"md:w-4/5"},q={key:0},J={class:"w-full flex justify-center items-center pt-2 text-xl border-b-1 border-black mb-2 text-gray-200"},Q={data(){return{option:void 0}},methods:{changeOption(o){this.option=o}}},te=Object.assign(Q,{__name:"Settings",setup(o){const l=[{name:"Generate Api Key",component:S},{name:"Delete Account",component:U}];return(t,i)=>{const r=v,d=m("font-awesome-icon"),f=V;return s(),a("div",W,[_(r),e("div",z,[t.option?(s(),a("div",q,[e("div",J,[_(d,{icon:["fas","fa-arrow-left"],onClick:i[0]||(i[0]=X=>t.changeOption(void 0)),class:"mr-4 p-2 cursor-pointer text-black hover:text-orange transition"}),e("span",null,h(t.option.name),1)]),(s(),y(b(t.option.component)))])):(s(),y(f,{key:1,onPicked:t.changeOption,options:l},null,8,["onPicked"]))])])}}});export{te as default};
