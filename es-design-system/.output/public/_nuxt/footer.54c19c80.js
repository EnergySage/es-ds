import{L as C,j as L,O as N,z as $,a as h,d as k}from"./bootstrap-vue-next.e37e9117.js";import{_ as D}from"./ds-link-list.68dcd062.js";import{N as y}from"./es-vue-base.esm.min.d076e988.js";import{_ as z,n as s,I as B,c as S,b as e,w as t,o as i,J as j,K as E,d as O}from"./entry.5878f36b.js";const U={name:"FooterLayout",computed:{breadcrumbs(){const a=this.$route.path.split("/");return[...new Set(a)].map(n=>{let o="Home";return n&&(o=n.replace(/-([a-z])/g,r=>r[1].toUpperCase()),o=o[0].toUpperCase()+o.slice(1)),{text:o,to:`/${n}`}})},footerContent(){return y()}}};function V(a,n,o,r,F,c){const d=N,m=$,u=C,p=D,b=s("b-sidebar"),f=s("es-breadcrumbs"),_=h,l=k,v=s("Nuxt"),x=L,g=s("es-footer"),w=B("b-toggle");return i(),S("div",null,[e(u,{class:"mb-3",type:"dark",variant:"primary"},{default:t(()=>[e(m,null,{default:t(()=>[j((i(),E(d,null,{default:t(()=>[O(" Menu ")]),_:1})),[[w,void 0,void 0,{"sidebar-1":!0}]])]),_:1})]),_:1}),e(b,{id:"sidebar-1",title:`ES DS ${a.$config.version}`,shadow:""},{default:t(()=>[e(p)]),_:1},8,["title"]),e(x,null,{default:t(()=>[e(l,{class:"mb-3"},{default:t(()=>[e(_,{cols:"12"},{default:t(()=>[e(f,{items:c.breadcrumbs},null,8,["items"])]),_:1})]),_:1}),e(l,null,{default:t(()=>[e(_,{cols:"12"},{default:t(()=>[e(v)]),_:1})]),_:1})]),_:1}),e(g,{content:c.footerContent},null,8,["content"])])}const M=z(U,[["render",V]]);export{M as default};
