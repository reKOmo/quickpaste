import{g as x,r as w,k as p,c,o as s,a as e,b as u,N as f,_ as k,F as _,p as b,t as g,q as y,x as v}from"./Dp9ICUzo.js";import{_ as h}from"./CFYx16Dx.js";const N={class:"flex flex-col"},A={class:"flex flex-row bg-darkgray rounded p-4 text-gray-200 shadow-black shadow-sm my-2 max-w-sm mx-auto"},T={class:"flex justify-center items-center mr-2"},C={class:"mt-4 flex"},O={key:0,class:"bg-darkgray rounded flex w-3/4 m-auto"},I=["value"],E={data(){return{key:void 0}},methods:{async getNewKey(){const a=await fetch("/user/generatePermaKey",{method:"GET",credentials:"include"});if(a.ok){const n=await a.json();this.key=n.result}else notificationStore.addNotification({type:f.NOTIFICATION,level:1,title:"To genedate api key"})}}},$=Object.assign(E,{__name:"GenerateApiKey",setup(a){const n=x(),i=w(null),l=async()=>{i.value.select(),i.value.setSelectionRange(0,99999);try{await navigator.clipboard.writeText(i.value.value),n.addNotification({type:f.NOTIFICATION,level:0,title:"Copied!"})}catch{n.addNotification({type:f.NOTIFICATION,level:1,title:"Failed to copy"})}};return(t,o)=>{const r=p("font-awesome-icon");return s(),c("div",N,[o[2]||(o[2]=e("p",{class:"ml-2 mb-4 text-gray-200"},"After clicking the button a new API key will be generated and all previous ones will be deemd invalid.",-1)),e("div",A,[e("div",T,[u(r,{icon:["fas","fa-circle-exclamation"],size:"xl","fixed-width":"",class:"text-red-500"})]),o[1]||(o[1]=e("div",{class:"flex flex-col"},[e("p",{class:"text-md"},"Please save the key after it is shown as you will not be able to retrieve it.")],-1))]),e("div",C,[t.key?(s(),c("div",O,[e("input",{ref_key:"keyContainer",ref:i,class:"flex-1 text-monospace text-gray-200 bg-darkgray rounded border-none text-center p-2 max-w-2xl break-word overflow-x-scroll",value:t.key,readonly:""},null,8,I),e("div",{onClick:l,class:"text-gray-200 p-2 text-xl flex justify-center items-center hover:text-orange transition cursor-pointer"},[u(r,{icon:["fa-solid","fa-copy"]})])])):(s(),c("button",{key:1,onClick:o[0]||(o[0]=(...d)=>t.getNewKey&&t.getNewKey(...d)),class:"m-auto bg-gradient-to-tr from-green to-orange rounded p-4 text-center text-lg hover:shadow-lg my-4"},"Generate key"))])])}}}),S={class:"flex flex-col"},L={class:"flex flex-row bg-darkgray rounded p-4 text-gray-200 shadow-black shadow-sm my-2 max-w-sm mx-auto"},j={class:"flex justify-center items-center mr-2"},F={__name:"DeleteAccount",setup(a){const n=x();async function i(){if(await n.addNotification({type:f.CONFIRM,title:"Are you sure you want to delete your account?",description:"This action can not be undone and will result in permanent data loss!"})){const t=await fetch("/user/deleteAccount",{method:"GET",credentials:"include",redirect:"follow"});t.redirected?window.location="/":t.ok||n.addNotification({type:f.NOTIFICATION,title:"Error accoured while deleting account. Please try again"})}}return(l,t)=>{const o=p("font-awesome-icon");return s(),c("div",S,[t[1]||(t[1]=e("p",{class:"ml-2 mb-4 text-gray-200"},"Click button below to delete your account.",-1)),e("div",L,[e("div",j,[u(o,{icon:["fas","fa-circle-exclamation"],size:"xl","fixed-width":"",class:"text-red-500"})]),t[0]||(t[0]=e("div",{class:"flex flex-col"},[e("p",{class:"text-md"},"DELETING YOUR ACCOUNT WILL ALSO DELETE ALL PASTES THAT YOU CREATED PERMANENTLY WITHOUT A WAY OF RECOVERING THEM")],-1))]),e("div",{class:"mt-4 flex"},[e("button",{onClick:i,class:"m-auto bg-red-500 rounded p-4 text-center text-lg hover:shadow-lg my-4"},"Delete account")])])}}},P={emits:["picked"],props:{options:{type:Object,default:()=>{}}},methods:{pick(a){this.$emit("picked",a)}}},D=["onClick"];function K(a,n,i,l,t,o){return s(),c(_,null,[n[0]||(n[0]=e("h2",{class:"text-3xl border-b-1 border-black pb-2 mb-4"},"Settings",-1)),e("ul",null,[(s(!0),c(_,null,b(i.options,(r,d)=>(s(),c("li",{key:d,onClick:m=>o.pick(r),class:"text-lg hover:text-gray-200 transition cursor-pointer"},g(r.name),9,D))),128))])],64)}const G=k(P,[["render",K]]),R={class:"flex flex-col md:flex-row w-full justify-between"},U={class:"md:w-4/5"},B={key:0},Y={class:"w-full flex justify-center items-center pt-2 text-xl border-b-1 border-black mb-2 text-gray-200"},H={data(){return{option:void 0}},methods:{changeOption(a){this.option=a}}},z=Object.assign(H,{__name:"Settings",setup(a){const l=[{name:"Generate Api Key",component:$},{name:"Delete Account",component:F}];return(t,o)=>{const r=h,d=p("font-awesome-icon"),m=G;return s(),c("div",R,[u(r),e("div",U,[t.option?(s(),c("div",B,[e("div",Y,[u(d,{icon:["fas","arrow-left"],onClick:o[0]||(o[0]=M=>t.changeOption(void 0)),class:"mr-4 p-2 cursor-pointer text-black hover:text-orange transition"}),e("span",null,g(t.option.name),1)]),(s(),y(v(t.option.component)))])):(s(),y(m,{key:1,onPicked:t.changeOption,options:l},null,8,["onPicked"]))])])}}});export{z as default};
