import{r as E,j as r,Y as c}from"./app-BL-A_wWN.js";import{u as f,E as l}from"./useExtraordinaryPay-BywpJ5-F.js";import{F as y}from"./FormLayout-BJyNhsrV.js";import"./InputError-_szSvQ2L.js";import"./InputLabel-Byh6eqOG.js";import"./TextInput-o4T8VisA.js";import"./SelectInput-BHHkm5up.js";import"./FormItem-Dc6KW2hL.js";import"./FormReportContainer-C0vALg1O.js";import"./index-O7oXRBwp.js";import"./sweetalert2.all-Dbsf46tK.js";import"./logo_211-Av1HSfMb.js";function T({specialties:o,shifts:i,semesters:e,period:t}){const{data:m,setData:a,save:s,alerts:n,errors:x,processing:d,currentTeachers:p,subjects:u}=f({nameRoute:"extraordinary-exam"});return E.useEffect(()=>a("period_id",t.id),[]),r.jsxs(y,{title:"Solicitud de Examen Extraordinario",period:t,children:[r.jsx(c,{title:"Solicitud de Examen Extraordinario"}),r.jsx(l,{semesters:e,specialties:o,shifts:i,handleSubmit:s,alerts:n,data:m,setData:a,errors:x,processing:d,btnSubmit:"Confirmar",currentTeachers:p,subjects:u})]})}export{T as default};