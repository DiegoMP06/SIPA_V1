import{W as d,r as x,j as e,Y as j}from"./app-DuhLKMCi.js";import{F as i,S as f}from"./FormItem-D6cDwvf-.js";import{I as c}from"./InputError-DrFylBXv.js";import{I as p}from"./InputLabel-DVdGQZ-6.js";import{S as g}from"./SelectInput-CjFMVWop.js";import{T as y}from"./TextInput-DIHUC1ZA.js";import{G as _}from"./GuestLayout-DaODCe1A.js";import"./ApplicationLogo-D7usuPaX.js";import"./logo_211-Av1HSfMb.js";function D({typePays:m}){const{data:a,setData:t,processing:S,errors:n,post:l}=d({search:"",type_pay_id:0}),[h,o]=x.useState([]),u=r=>{if(r.preventDefault(),Object.values(a).some(s=>s===""||s===0)){o(["Los Campos son Obligatorios"]);return}o([]),l(route("search.store"),{preserveScroll:!0})};return e.jsxs(_,{children:[e.jsx(j,{title:"Buscar Ficha de Pago"}),e.jsxs("form",{className:"grid grid-cols-1 gap-4",onSubmit:u,children:[e.jsxs(i,{children:[e.jsx(p,{htmlFor:"search",children:"Buscar:"}),e.jsx(y,{type:"search",name:"search",id:"search",placeholder:"No. Control, No. Ficha",onChange:r=>t("search",r.target.value),value:a.search})]}),e.jsxs(i,{children:[e.jsx(p,{htmlFor:"search",children:"Tipo de Ficha:"}),e.jsx(g,{name:"type_pay_id",id:"type_pay_id",onChange:r=>t("type_pay_id",Number(r.target.value)),value:a.type_pay_id,children:m.map(r=>e.jsx("option",{value:r.id,children:r.type},r.id))})]}),e.jsx(f,{value:"Buscar"})]}),e.jsx(c,{message:n.search}),h.map((r,s)=>e.jsx(c,{message:r},s))]})}export{D as default};