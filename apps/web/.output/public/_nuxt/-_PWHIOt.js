import{l,m as d,g as f,n as p,h as _,N as m,k as g,c as h,o as x,b as n,w as b,a as i,e as w}from"./Dp9ICUzo.js";const N={class:"flex flex-col"},y=l({__name:"Login",setup(C){const e=d().public,s=`https://github.com/login/oauth/authorize?scope=read:user&client_id=${e.githubClientId}&redirect_uri=${e.webAddress}/user/login/github`,a=f(),c=p();return _(()=>{const t=c.query.failedLogin;document.title="Quickpaste",t&&a.addNotification({type:m.NOTIFICATION,level:1,title:"Failed to login. Please try again"})}),(t,o)=>{const r=g("font-awesome-icon"),u=w;return x(),h("div",N,[n(u,{external:!0,href:s,class:"flex flex-row content-center justify-center bg-gradient-to-tr from-green to-orange rounded p-4 m-auto cursor-pointer"},{default:b(()=>[i("span",null,[n(r,{icon:["fab","github"],size:"2x","fixed-width":""})]),o[0]||(o[0]=i("span",{class:"h-min self-center text-shadow-sm"},"Continue with Github",-1))]),_:1})])}}});export{y as default};
