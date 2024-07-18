import{r as p,W as f,j as e,Y as j}from"./app-Cw66xjMM.js";import{A as N}from"./AuthenticatedLayout-CzCLG21V.js";import{N as b}from"./NavigateLink-CWJhe6fy.js";import{P as u}from"./Pagination-JTxBk0rq.js";import{S as v}from"./sweetalert2.all-N0wpTFe8.js";import{f as y}from"./index-BqreZRFo.js";import{S as _}from"./SearchForm-CZasjLTa.js";import"./ApplicationLogo-CbAPACeK.js";import"./logo_211-Av1HSfMb.js";import"./transition-Kuh-dpYi.js";function M({auth:l,period:t,payments:a,page:i,search:n}){const r=`${t.start_month} ${t.start_year} - ${t.end_month} ${t.end_year}`,c=p.useMemo(()=>a.data.length>0,[a]),d={1:"registration",2:"re-registration",3:"extraordinary-exam",4:"intersemester-appeal"}[t.type_pay_id],{data:x,setData:o,processing:m,get:h}=f({search:n,page:i}),g=s=>{s.preventDefault(),o("page",1),h(route("periods.show",{period:t}),{preserveScroll:!0,onError(){v.fire({title:"Error",text:"Ocurrio un Error al Obtener los Datos",icon:"error"})}})};return e.jsxs(N,{header:r,user:l.user,children:[e.jsx(j,{title:r}),e.jsx(b,{name:"dashboard",children:"Volver"}),e.jsxs("div",{className:"flex flex-col lg:flex-row lg:items-center my-16 gap-8",children:[e.jsxs("div",{className:"flex-1 bg-white p-4 shadow space-y-6",children:[e.jsx("h2",{className:"text-3xl font-bold text-gray-700",children:"Detalles:"}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-indigo-700 font-bold text-xl",children:["Periodo ",t.active?"Activo":"No Activo"]}),e.jsx("p",{className:"text-indigo-700 font-bold text-xl",children:t.type_pay.type}),e.jsxs("p",{className:"text-indigo-700 font-bold text-xl",children:["Número de Cuenta: ","",e.jsx("span",{className:"text-gray-700",children:t.account_number})]}),e.jsxs("p",{className:"text-indigo-700 font-bold text-xl",children:["Clabe Interbancaria: ","",e.jsx("span",{className:"text-gray-700",children:t.interbank_code})]}),e.jsxs("p",{className:"text-indigo-700 font-bold text-xl",children:["Monto: ","",e.jsx("span",{className:"text-gray-700",children:y(t.amount)})]})]})]}),e.jsx(_,{data:x,setData:o,processing:m,handleSearch:g,className:"flex-1"})]}),c?e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10",children:a.data.map(s=>e.jsxs("div",{className:"space-y-4 p-4 bg-white shadow-md",children:[e.jsxs("h3",{className:"font-bold text-indigo-700 text-xl lg:text-2xl",children:[s.name," ",s.father_last_name," ",s.mother_last_name]}),e.jsxs("div",{className:"space-y-1",children:[e.jsxs("p",{className:"font-bold text-indigo-700",children:[s.semester_id===1?"Número de Ficha":"Número de Control",": ","",e.jsx("span",{className:"text-gray-700",children:s.code})]}),e.jsxs("p",{className:"font-bold text-indigo-700",children:["Grupo: ","",e.jsxs("span",{className:"text-gray-700",children:[s.semester.semester,s.semester.group]})]}),e.jsxs("p",{className:"font-bold text-indigo-700",children:["Especialidad: ","",e.jsx("span",{className:"text-gray-700",children:s.specialty.specialty})]}),e.jsxs("p",{className:"font-bold text-indigo-700",children:["Turno: ","",e.jsx("span",{className:"text-gray-700",children:s.shift.shift})]})]}),e.jsx("div",{children:e.jsx("a",{target:"_blank",href:route(d+".show",{id:s.id}),className:"text-white font-bold bg-indigo-700 hover:bg-indigo-600 transition-colors px-4 py-2 inline-block",children:"Ver Ficha de Pago"})})]},s.id))}):e.jsx("p",{className:"text-xl font-bold text-gray-600 my-40 text-center",children:"No Hay Pagos Disponibles"}),e.jsx(u,{pagination:a})]})}export{M as default};
