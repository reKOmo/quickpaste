import{e as v,r as h,R as g,S as P,U as m,w as x,u as b,V as w,p as C}from"./entry.ac7ce826.js";const O=()=>null;function B(...i){const c=typeof i[i.length-1]=="string"?i.pop():void 0;typeof i[0]!="string"&&i.unshift(c);let[a,f,t={}]=i;if(typeof a!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof f!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");t.server=t.server??!0,t.default=t.default??O,t.lazy=t.lazy??!1,t.immediate=t.immediate??!0;const e=v(),l=()=>e.isHydrating?e.payload.data[a]:e.static.data[a],d=()=>l()!==void 0;e._asyncData[a]||(e._asyncData[a]={data:h(l()??t.default()),pending:h(!d()),error:g(e.payload._errors,a)});const n={...e._asyncData[a]};n.refresh=n.execute=(s={})=>{if(e._asyncDataPromises[a]){if(s.dedupe===!1)return e._asyncDataPromises[a];e._asyncDataPromises[a].cancelled=!0}if((s._initial||e.isHydrating&&s._initial!==!1)&&d())return l();n.pending.value=!0;const u=new Promise((r,o)=>{try{r(f(e))}catch(_){o(_)}}).then(r=>{if(u.cancelled)return e._asyncDataPromises[a];let o=r;t.transform&&(o=t.transform(r)),t.pick&&(o=k(o,t.pick)),n.data.value=o,n.error.value=null}).catch(r=>{if(u.cancelled)return e._asyncDataPromises[a];n.error.value=r,n.data.value=b(t.default())}).finally(()=>{u.cancelled||(n.pending.value=!1,e.payload.data[a]=n.data.value,n.error.value&&(e.payload._errors[a]=w(n.error.value)),delete e._asyncDataPromises[a])});return e._asyncDataPromises[a]=u,e._asyncDataPromises[a]};const y=()=>n.refresh({_initial:!0}),D=t.server!==!1&&e.payload.serverRendered;{const s=C();if(s&&!s._nuxtOnBeforeMountCbs){s._nuxtOnBeforeMountCbs=[];const r=s._nuxtOnBeforeMountCbs;s&&(P(()=>{r.forEach(o=>{o()}),r.splice(0,r.length)}),m(()=>r.splice(0,r.length)))}D&&e.isHydrating&&d()?n.pending.value=!1:s&&(e.payload.serverRendered&&e.isHydrating||t.lazy)&&t.immediate?s._nuxtOnBeforeMountCbs.push(y):t.immediate&&y(),t.watch&&x(t.watch,()=>n.refresh());const u=e.hook("app:data:refresh",r=>{if(!r||r.includes(a))return n.refresh()});s&&m(u)}const p=Promise.resolve(e._asyncDataPromises[a]).then(()=>n);return Object.assign(p,n),p}function k(i,c){const a={};for(const f of c)a[f]=i[f];return a}function E(i){return{}}function H(i=v()){var c;return(c=i.ssrContext)==null?void 0:c.event}export{B as a,E as b,H as u};
