import{r as p,W as f,y as n}from"./app-BL-A_wWN.js";import{S as o}from"./sweetalert2.all-Dbsf46tK.js";function v(){const[i,a]=p.useState([]),{data:r,setData:s,processing:c,errors:l,patch:u,post:d}=f({reference_number:"",account_number:"",interbank_code:"",amount:0,start_month:"",start_year:"",end_month:"",end_year:"",type_pay_id:0}),m=()=>{let e=[];return Object.values(r).some(t=>(t==null?void 0:t.toString().trim())===""||t===0)&&(e=[...e,"Todos los campos son obligatorios"]),(r.interbank_code.toString().length!==18||isNaN(Number(r.interbank_code)))&&(e=[...e,"La Clabe Interbancaria debe tener 18 dígitos"]),r.amount<0&&(e=[...e,"El Monto debe ser mayor a 0"]),e};return{alerts:i,data:r,setData:s,processing:c,errors:l,save:e=>{e.preventDefault();const t=m();if(a(t),t.length===0){if(r.id){u(route("periods.update",{period:r.id}),{preserveScroll:!0});return}d(route("periods.store"),{preserveScroll:!0})}},handleDelete:e=>{o.fire({title:"Atención",text:"¿Desea eliminar el periodo?",icon:"warning",showCancelButton:!0,confirmButtonText:"Si, Eliminar",cancelButtonText:"No, Cancelar"}).then(t=>{t.isConfirmed&&n.delete(route("periods.destroy",{period:e}),{preserveScroll:!0,onSuccess(){o.fire({title:"Exito",text:"El Periodo se Elimino Correctamente",icon:"success"})},onError(){o.fire({title:"Error",text:"Ocurrio un Error al Eliminar el Periodo",icon:"error"})}})})},handleActive:e=>{o.fire({title:"Atencion",text:e.active?"¿Desea desactivar el periodo?":"¿Desea activar el periodo?",icon:"warning",showCancelButton:!0,confirmButtonText:"Si",cancelButtonText:"No, Cancelar"}).then(t=>{t.isConfirmed&&n.patch(route("periods.update",{period:e}),{...e,active:!e.active,dashboard:!0},{preserveScroll:!0,onSuccess(){o.fire({title:"Exito",text:"El Periodo se Actualizo Correctamente",icon:"success"})},onError(){o.fire({title:"Error",text:"Ocurrio un Error al Actualizar el Periodo",icon:"error"})}})})}}}export{v as u};
