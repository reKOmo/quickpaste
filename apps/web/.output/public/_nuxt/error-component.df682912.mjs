import{d as a,_ as c,o as E,c as f,n as k,g as P,u as t}from"./entry.8bcf9037.mjs";const v={__name:"nuxt-error-page",props:{error:Object},setup(p){var n;const e=p.error;(e.stack||"").split(`
`).splice(1).map(s=>({text:s.replace("webpack:/","").replace(".vue",".js").trim(),internal:s.includes("node_modules")&&!s.includes(".cache")||s.includes("internal")||s.includes("new Promise")})).map(s=>`<span class="stack${s.internal?" internal":""}">${s.text}</span>`).join(`
`);const r=Number(e.statusCode||500),o=r===404,u=(n=e.statusMessage)!=null?n:o?"Page Not Found":"Internal Server Error",i=e.message||e.toString(),_=void 0,d=a(()=>c(()=>import("./error-404.65453fff.mjs"),["_nuxt/error-404.65453fff.mjs","_nuxt/error-404.3626dc7b.css","_nuxt/entry.8bcf9037.mjs","_nuxt/entry.c28c3de5.css"])),l=a(()=>c(()=>import("./error-500.5f32d5b6.mjs"),["_nuxt/error-500.5f32d5b6.mjs","_nuxt/error-500.a4adec0a.css","_nuxt/entry.8bcf9037.mjs","_nuxt/entry.c28c3de5.css"])),m=o?d:l;return(s,g)=>(E(),f(t(m),k(P({statusCode:t(r),statusMessage:t(u),description:t(i),stack:t(_)})),null,16))}},b=v;export{b as default};