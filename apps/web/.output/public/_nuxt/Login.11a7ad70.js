import{z as c,A as r,B as u,t as l,l as o,C as _,N as d,D as f,o as h,v as n}from"./entry.ac7ce826.js";const p={class:"flex flex-col"},g=n("span",{class:"h-min self-center text-shadow-sm"},"Continue with Github",-1),m={mounted(){const e=this.$route.query.failedLogin;document.title="Quickpaste",e&&this.notificationStore.addNotification({type:d.NOTIFICATION,level:1,title:"Failed to login. Please try again"})}},w=Object.assign(m,{__name:"Login",setup(e){const t=c().public,i=`https://github.com/login/oauth/authorize?scope=read:user&client_id=${t.githubClientId}&redirect_uri=${t.webAddress}/user/login/github`;return r(),(x,b)=>{const s=u("font-awesome-icon"),a=f;return h(),l("div",p,[o(a,{external:"true",href:i,class:"flex flex-row content-center justify-center bg-gradient-to-tr from-green to-orange rounded p-4 m-auto cursor-pointer"},{default:_(()=>[n("span",null,[o(s,{icon:["fab","github"],size:"2x","fixed-width":""})]),g]),_:1})])}}});export{w as default};
