import{h as f,o as t,b as o,e as s,F as p,r as h,t as m,k,l as _,c as d,T as b}from"./entry.7ef94d9d.mjs";import{_ as g}from"./UserPanel.d56d6e09.mjs";const x={emits:["picked"],props:{options:{type:Object,default:()=>{}}},methods:{pick(n){this.$emit("picked",n)}}},y=s("h2",{class:"text-3xl border-b-1 border-black pb-2 mb-4"},"Settings",-1),v=["onClick"];function w(n,e,i,a,l,c){return t(),o(p,null,[y,s("ul",null,[(t(!0),o(p,null,h(i.options,(r,u)=>(t(),o("li",{key:u,onClick:S=>c.pick(r),class:"text-lg hover:text-gray-200 transition cursor-pointer"},m(r.name),9,v))),128))])],64)}const $=f(x,[["render",w]]),C={class:"flex flex-col md:flex-row w-full justify-between"},O={class:"md:w-4/5"},j={key:0},A={class:"w-full flex justify-center items-center pt-2 text-xl border-b-1 border-black mb-2 text-gray-200"},B={data(){return{option:void 0,options:[{name:"Generate Api Key",component:this.generateApiKey},{name:"Delete Account",component:this.deleteAccount}]}},methods:{changeOption(n){this.option=n}}},F=Object.assign(B,{__name:"Settings",setup(n){return(e,i)=>{const a=g,l=k("font-awesome-icon"),c=$;return t(),o("div",C,[_(a),s("div",O,[e.option?(t(),o("div",j,[s("div",A,[_(l,{icon:["fas","fa-arrow-left"],onClick:i[0]||(i[0]=r=>e.changeOption(void 0)),class:"mr-4 p-2 cursor-pointer text-black hover:text-orange transition"}),s("span",null,m(e.option.name),1)]),(t(),d(b(e.option.component)))])):(t(),d(c,{key:1,onPicked:e.changeOption,options:e.options},null,8,["onPicked","options"]))])])}}});export{F as default};
