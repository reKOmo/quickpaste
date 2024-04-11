import{j as x,k as g,n as p,o,c as i,a as e,b as _,N as u,_ as w,F as m,r as k,t as h,H as y,U as b}from"./DhotaUmr.js";import{_ as v}from"./BPCTXnOr.js";const N={class:"flex flex-col"},A=e("p",{class:"ml-2 mb-4 text-gray-200"},"After clicking the button a new API key will be generated and all previous ones will be deemd invalid.",-1),T={class:"flex flex-row bg-darkgray rounded p-4 text-gray-200 shadow-black shadow-sm my-2 max-w-sm mx-auto"},C={class:"flex justify-center items-center mr-2"},O=e("div",{class:"flex flex-col"},[e("p",{class:"text-md"},"Please save the key after it is shown as you will not be able to retrieve it.")],-1),$={class:"mt-4 flex"},I={key:0,class:"bg-darkgray rounded flex w-3/4 m-auto"},E=["value"],S={data(){return{key:void 0}},methods:{async getNewKey(){const n=await fetch("/user/generatePermaKey",{method:"GET",credentials:"include"});if(n.ok){const s=await n.json();this.key=s.result}else notificationStore.addNotification({type:u.NOTIFICATION,level:1,title:"To genedate api key"})}}},j=Object.assign(S,{__name:"GenerateApiKey",setup(n){const s=x(),a=g(null),l=async()=>{a.value.select(),a.value.setSelectionRange(0,99999);try{await navigator.clipboard.writeText(a.value.value),s.addNotification({type:u.NOTIFICATION,level:0,title:"Copied!"})}catch{s.addNotification({type:u.NOTIFICATION,level:1,title:"Failed to copy"})}};return(t,c)=>{const r=p("font-awesome-icon");return o(),i("div",N,[A,e("div",T,[e("div",C,[_(r,{icon:["fas","fa-circle-exclamation"],size:"xl","fixed-width":"",class:"text-red-500"})]),O]),e("div",$,[t.key?(o(),i("div",I,[e("input",{ref_key:"keyContainer",ref:a,class:"flex-1 text-monospace text-gray-200 bg-darkgray rounded border-none text-center p-2 max-w-2xl break-word overflow-x-scroll",value:t.key,readonly:""},null,8,E),e("div",{onClick:l,class:"text-gray-200 p-2 text-xl flex justify-center items-center hover:text-orange transition cursor-pointer"},[_(r,{icon:["fa-solid","fa-copy"]})])])):(o(),i("button",{key:1,onClick:c[0]||(c[0]=(...d)=>t.getNewKey&&t.getNewKey(...d)),class:"m-auto bg-gradient-to-tr from-green to-orange rounded p-4 text-center text-lg hover:shadow-lg my-4"},"Generate key"))])])}}}),L=j,F={class:"flex flex-col"},P=e("p",{class:"ml-2 mb-4 text-gray-200"},"Click button below to delete your account.",-1),D={class:"flex flex-row bg-darkgray rounded p-4 text-gray-200 shadow-black shadow-sm my-2 max-w-sm mx-auto"},K={class:"flex justify-center items-center mr-2"},G=e("div",{class:"flex flex-col"},[e("p",{class:"text-md"},"DELETING YOUR ACCOUNT WILL ALSO DELETE ALL PASTES THAT YOU CREATED PERMANENTLY WITHOUT A WAY OF RECOVERING THEM")],-1),R={__name:"DeleteAccount",setup(n){const s=x();async function a(){if(await s.addNotification({type:u.CONFIRM,title:"Are you sure you want to delete your account?",description:"This action can not be undone and will result in permanent data loss!"})){const t=await fetch("/user/deleteAccount",{method:"GET",credentials:"include",redirect:"follow"});t.redirected?window.location="/":t.ok||s.addNotification({type:u.NOTIFICATION,title:"Error accoured while deleting account. Please try again"})}}return(l,t)=>{const c=p("font-awesome-icon");return o(),i("div",F,[P,e("div",D,[e("div",K,[_(c,{icon:["fas","fa-circle-exclamation"],size:"xl","fixed-width":"",class:"text-red-500"})]),G]),e("div",{class:"mt-4 flex"},[e("button",{onClick:a,class:"m-auto bg-red-500 rounded p-4 text-center text-lg hover:shadow-lg my-4"},"Delete account")])])}}},U=R,B={emits:["picked"],props:{options:{type:Object,default:()=>{}}},methods:{pick(n){this.$emit("picked",n)}}},H=e("h2",{class:"text-3xl border-b-1 border-black pb-2 mb-4"},"Settings",-1),Y=["onClick"];function M(n,s,a,l,t,c){return o(),i(m,null,[H,e("ul",null,[(o(!0),i(m,null,k(a.options,(r,d)=>(o(),i("li",{key:d,onClick:f=>c.pick(r),class:"text-lg hover:text-gray-200 transition cursor-pointer"},h(r.name),9,Y))),128))])],64)}const V=w(B,[["render",M]]),W={class:"flex flex-col md:flex-row w-full justify-between"},z={class:"md:w-4/5"},q={key:0},J={class:"w-full flex justify-center items-center pt-2 text-xl border-b-1 border-black mb-2 text-gray-200"},Q={data(){return{option:void 0}},methods:{changeOption(n){this.option=n}}},te=Object.assign(Q,{__name:"Settings",setup(n){const l=[{name:"Generate Api Key",component:L},{name:"Delete Account",component:U}];return(t,c)=>{const r=v,d=p("font-awesome-icon"),f=V;return o(),i("div",W,[_(r),e("div",z,[t.option?(o(),i("div",q,[e("div",J,[_(d,{icon:["fas","arrow-left"],onClick:c[0]||(c[0]=X=>t.changeOption(void 0)),class:"mr-4 p-2 cursor-pointer text-black hover:text-orange transition"}),e("span",null,h(t.option.name),1)]),(o(),y(b(t.option.component)))])):(o(),y(f,{key:1,onPicked:t.changeOption,options:l},null,8,["onPicked"]))])])}}});export{te as default};
