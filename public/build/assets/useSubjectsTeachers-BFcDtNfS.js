import{r,y as p}from"./app-BL-A_wWN.js";import{S as s}from"./sweetalert2.all-Dbsf46tK.js";import{S as y}from"./index-O7oXRBwp.js";function k({currentTeachers:t=[],subject:i}){const[h,c]=r.useState(!1),[m,u]=r.useState(!1),[n,S]=r.useState({data:[],current_page:1,first_page_url:"",from:1,last_page:1,last_page_url:"",links:[],next_page_url:"",path:"",per_page:1,prev_page_url:"",to:1,total:1}),[a,d]=r.useState({search:"",page:1}),f=()=>{c(!1)},g=()=>{c(!0),l()},_=e=>{e.preventDefault(),l()},x=e=>l(e),l=e=>{u(!0),e&&d({...a,page:e}),y.getSubjectsTeachers(e||a.page,a.search).then(({data:o})=>S(o)).catch(()=>s.fire({icon:"error",title:"Oops...",text:"Ha Ocurrido un Error"})).finally(()=>u(!1))},E=e=>{p.post(route("subjects-teachers.store"),{subject_id:i==null?void 0:i.id,teacher_id:e},{preserveScroll:!0,onSuccess(){s.fire({title:"Exito",text:"El profesor se Asigno Correctamente",icon:"success"}),f()},onError:o=>s.fire({title:"Error",text:o.teacher_id?o.teacher_id:"Ocurrio un Error al Asignar el profesor",icon:"error"})})},v=e=>{s.fire({title:"Atención",text:"¿Desea Desvincular el Profesor?",icon:"warning",showCancelButton:!0,confirmButtonText:"Si, Eliminar",cancelButtonText:"No, Cancelar"}).then(o=>{o.isConfirmed&&p.delete(route("subjects-teachers.destroy",{subjects_teacher:e}),{preserveScroll:!0,onSuccess(){s.fire({title:"Exito",text:"el Profesor se Devinculo Correctamente",icon:"success"})},onError(){s.fire({title:"Error",text:"Ocurrio un Error al Desvincular el Profesor",icon:"error"})}})})},D=r.useMemo(()=>n.data.length>0,[n]),M=r.useMemo(()=>e=>t==null?void 0:t.some(o=>o.id===e),[t]),C=r.useMemo(()=>(t==null?void 0:t.length)>0,[t]);return{activeModal:h,data:a,setData:d,teachers:n,loading:m,openModal:g,closeModal:f,addTeacher:E,handleDelete:v,handleSearch:_,handlePaginate:x,hasTeachers:D,isLinked:M,hasLinkedTeachers:C}}export{k as u};
