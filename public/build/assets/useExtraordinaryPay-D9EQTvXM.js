import{j as e,r as h,W as C}from"./app-Cw66xjMM.js";import{I as l}from"./InputError-BLU9BC3S.js";import{I as o}from"./InputLabel-FYVBMu7T.js";import{T as _}from"./TextInput-CbVSJyQ9.js";import{S as c}from"./SelectInput-BNDpfLtf.js";import{F as d,S as F}from"./FormItem-DGG98HLQ.js";import{F as N}from"./FormReportContainer-Cwn3cOtO.js";import{S as A}from"./index-BSlYVw32.js";import{S as E}from"./sweetalert2.all-N0wpTFe8.js";function k({semesters:m,handleSubmit:u,alerts:p,data:r,setData:i,errors:t,shifts:j,specialties:x,processing:f,btnSubmit:g,currentTeachers:v,subjects:b}){return e.jsxs(N,{handleSubmit:u,children:[e.jsx("div",{children:p.map((s,y)=>e.jsx(l,{message:s},y))}),e.jsxs(d,{children:[e.jsx(o,{htmlFor:"name",children:"Nombre(s):"}),e.jsx(_,{type:"text",name:"name",id:"name",placeholder:"Nombre del Alumno",value:r.name,onChange:s=>i("name",s.target.value)}),e.jsx(l,{message:t.name})]}),e.jsxs(d,{children:[e.jsx(o,{htmlFor:"father_last_name",children:"Apellido Paterno:"}),e.jsx(_,{type:"text",name:"father_last_name",id:"father_last_name",placeholder:"Apellido Paterno del Alumno",value:r.father_last_name,onChange:s=>i("father_last_name",s.target.value)}),e.jsx(l,{message:t.father_last_name})]}),e.jsxs(d,{children:[e.jsx(o,{htmlFor:"mother_last_name",children:"Apellido Materno:"}),e.jsx(_,{type:"text",name:"mother_last_name",id:"mother_last_name",placeholder:"Apellido Materno del Alumno",value:r.mother_last_name,onChange:s=>i("mother_last_name",s.target.value)}),e.jsx(l,{message:t.mother_last_name})]}),e.jsxs(d,{children:[e.jsx(o,{htmlFor:"code",children:"Número de Control:"}),e.jsx(_,{type:"number",name:"code",id:"code",placeholder:"Número de Control del Alumno",value:r.code,onChange:s=>i("code",s.target.value)}),e.jsx(l,{message:t.code})]}),e.jsxs(d,{children:[e.jsx(o,{htmlFor:"semester_id",children:"Semestre:"}),e.jsx(c,{name:"semester_id",id:"semester_id",value:r.semester_id,onChange:s=>i({...r,semester_id:Number(s.target.value),subject_id:0,teacher_id:0}),children:m.map(s=>e.jsx("option",{value:s.id,children:s.semester},s.id))}),e.jsx(l,{message:t.semester_id})]}),e.jsxs(d,{children:[e.jsx(o,{htmlFor:"specialty_id",children:"Especialidad:"}),e.jsx(c,{name:"specialty_id",id:"specialty_id",value:r.specialty_id,onChange:s=>i({...r,specialty_id:Number(s.target.value),subject_id:0,teacher_id:0}),children:x.map(s=>e.jsx("option",{value:s.id,children:s.specialty},s.id))}),e.jsx(l,{message:t.specialty_id})]}),e.jsxs(d,{children:[e.jsx(o,{htmlFor:"subject_id",children:"Materia:"}),e.jsx(c,{name:"subject_id",id:"subject_id",value:r.subject_id,onChange:s=>i({...r,subject_id:Number(s.target.value),teacher_id:0}),children:b.map(s=>e.jsx("option",{value:s.id,children:s.subject},s.id))}),e.jsx(l,{message:t.subject_id})]}),e.jsxs(d,{children:[e.jsx(o,{htmlFor:"teacher_id",children:"Profesor:"}),e.jsx(c,{name:"teacher_id",id:"teacher_id",value:r.teacher_id,onChange:s=>i("teacher_id",Number(s.target.value)),children:v.map(s=>e.jsxs("option",{value:s.id,children:[s.name," ",s.father_last_name," ",s.mother_last_name]},s.id))}),e.jsx(l,{message:t.teacher_id})]}),e.jsxs(d,{children:[e.jsx(o,{htmlFor:"shift_id",children:"Turno:"}),e.jsx(c,{name:"shift_id",id:"shift_id",value:r.shift_id,onChange:s=>i("shift_id",Number(s.target.value)),children:j.map(s=>e.jsx("option",{value:s.id,children:s.shift},s.id))}),e.jsx(l,{message:t.shift_id})]}),e.jsx(F,{value:g,disabled:f})]})}function q({nameRoute:m}){const[u,p]=h.useState([]),[r,i]=h.useState([]),{data:t,setData:j,post:x,patch:f,errors:g,processing:v}=C({name:"",mother_last_name:"",father_last_name:"",code:"",semester_id:0,shift_id:0,specialty_id:0,period_id:0,subject_id:0,teacher_id:0});h.useEffect(()=>{t.semester_id===0||t.specialty_id===0||(i([]),A.searchClassrooms(t.specialty_id,t.semester_id).then(({data:a})=>i(a)).catch(()=>E.fire({icon:"error",title:"Error",text:"Ocurrio un error al cargar las materias"})))},[t.semester_id,t.specialty_id]);const b=()=>{let a=[];return Object.values(t).some(n=>(n==null?void 0:n.toString().trim())===""||n===0)&&(a=["Todos los Campos son Obligatorios",...a]),(t.code.trim().length!==14||isNaN(Number(t.code)))&&(a=["El Numero de Control es Invalido",...a]),a},s=a=>{a.preventDefault();const n=b();if(p(n),n.length===0){if(t.id){f(route(m+".update",{pay:t.id}),{preserveScroll:!0});return}x(route(m+".store"),{preserveScroll:!0,onSuccess(S){location.href=route(m+".show",{pay:S.props.pay})}})}},y=h.useMemo(()=>{var a;return(((a=r.find(n=>n.id===t.subject_id))==null?void 0:a.teachers)??[]).filter(n=>n.active)},[t,r]);return{alerts:u,subjects:r,currentTeachers:y,data:t,setData:j,errors:g,processing:v,save:s}}export{k as E,q as u};