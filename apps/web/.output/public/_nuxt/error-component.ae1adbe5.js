import{o as m,c as E,n as f,g,u as s,d as n,_ as a}from"./entry.f19d1878.js";const k={__name:"nuxt-error-page",props:{error:Object},setup(c){const u=c,{error:t}=u;(t.stack||"").split(`
`).splice(1).map(e=>({text:e.replace("webpack:/","").replace(".vue",".js").trim(),internal:e.includes("node_modules")&&!e.includes(".cache")||e.includes("internal")||e.includes("new Promise")})).map(e=>`<span class="stack${e.internal?" internal":""}">${e.text}</span>`).join(`
`);const r=Number(t.statusCode||500),o=r===404,i=t.statusMessage??(o?"Page Not Found":"Internal Server Error"),p=t.message||t.toString(),_=void 0,d=o?n(()=>a(()=>import("./error-404.aced3b1d.js"),["./error-404.aced3b1d.js","./entry.f19d1878.js","./entry.3257e66e.css","./error-404.c5b2a6a9.css"],import.meta.url).then(e=>e.default||e)):n(()=>a(()=>import("./error-500.23d3aa1e.js"),["./error-500.23d3aa1e.js","./entry.f19d1878.js","./entry.3257e66e.css","./error-500.7e02f53c.css"],import.meta.url).then(e=>e.default||e));return(e,l)=>(m(),E(s(d),f(g({statusCode:s(r),statusMessage:s(i),description:s(p),stack:s(_)})),null,16))}},h=k;export{h as default};
