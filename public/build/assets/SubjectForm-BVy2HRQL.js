import{j as a}from"./app-BL-A_wWN.js";import{F as p}from"./FormContainer-DhT6er7t.js";import{F as t,S as N}from"./FormItem-Dc6KW2hL.js";import{I as s}from"./InputError-_szSvQ2L.js";import{I as _}from"./InputLabel-Byh6eqOG.js";import{T as $}from"./TextInput-o4T8VisA.js";import{C as x}from"./Checkbox-fGoEWsEf.js";function T({alerts:c,handleSubmit:j,data:h,setData:b,errors:o,processing:g,btnSubmit:u,specialties:d,semestersOptions:l,activeSemester:i,addSpecialty:m,isOpen:n,edit:f}){return a.jsxs(p,{handleSubmit:j,children:[a.jsx("div",{children:c.map((r,e)=>a.jsx(s,{message:r},e))}),a.jsxs(t,{children:[a.jsx(_,{htmlFor:"subject",children:"Nombre:"}),a.jsx($,{type:"text",placeholder:"Nombre de la Materia",id:"subject",name:"subject",value:h.subject,onChange:r=>b("subject",r.target.value)}),a.jsx(s,{message:o.subject})]}),!f&&i&&n&&m&&a.jsxs(t,{children:[a.jsx("p",{className:"text-gray-700 font-bold block",children:"Disponible en:"}),a.jsx("ul",{role:"list",className:"grid grid-cols-1 gap-4",children:l==null?void 0:l.map(r=>a.jsxs("li",{className:"space-y-2",children:[a.jsxs("label",{htmlFor:`semester_${r.id}`,className:"flex items-center gap-4",children:[a.jsx(x,{name:`semester_${r.id}`,id:`semester_${r.id}`,onChange:e=>i(e.target.checked,r.id)}),a.jsxs("span",{className:"text-indigo-700 font-bold text-lg",children:["Semestre ",r.semester]})]}),n(r)&&a.jsx("div",{className:"grid grid-cols-1 gap-2 pl-4",children:d==null?void 0:d.map(e=>a.jsxs("label",{htmlFor:`semester_${r.id}_${e.id}`,className:"flex items-center gap-4",children:[a.jsx(x,{name:`semester_${r.id}_${e.id}`,id:`semester_${r.id}_${e.id}`,onChange:()=>m(e.id,r.id)}),a.jsx("span",{className:"text-gray-700 font-bold",children:e.specialty})]},e.id))})]},r.id))}),a.jsx(s,{message:o.classrooms})]}),a.jsx(N,{value:u,disabled:g})]})}export{T as S};
