import{W as p,r as h,j as r,Y as m}from"./app-Cd6Eq6nm.js";import{I as t}from"./InputError-DM3SsLLD.js";import{G as g}from"./GuestLayout-QhaBYJfj.js";import"./ApplicationLogo-CRLKz_zo.js";import"./logo_211-Av1HSfMb.js";function w(){const{data:s,setData:a,processing:i,errors:n,post:c}=p({search:""}),[d,o]=h.useState([]),l=e=>{if(e.preventDefault(),s.search.trim()===""){o(["Ingrese un valor para buscar"]);return}o([]),c(route("search.store"),{preserveScroll:!0})};return r.jsxs(g,{children:[r.jsx(m,{title:"Buscar Ficha de Pago"}),r.jsxs("form",{className:"flex",onSubmit:l,children:[r.jsx("input",{type:"search",name:"search",id:"search",className:"flex-1 block rounded-tl rounded-bl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",placeholder:"Buscar [CURP, No. Control, No. Ficha]",onChange:e=>a("search",e.target.value),value:s.search}),r.jsx("button",{type:"submit",disabled:i,className:"bg-indigo-700 text-white px-4 py-2 rounded-tr rounded-br hover:bg-indigo-600 transition-colors disabled:opacity-25 disabled:bg-indigo-700 disabled:cursor-default cursor-pointer",children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"size-6",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"})})})]}),r.jsx(t,{message:n.search}),d.map((e,u)=>r.jsx(t,{message:e},u))]})}export{w as default};