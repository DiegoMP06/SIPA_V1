import{r as m,W as f}from"./app-Cw66xjMM.js";function _({nameRoute:t}){const[i,a]=m.useState([]),{data:e,setData:n,post:c,patch:l,errors:p,processing:d}=f({name:"",mother_last_name:"",father_last_name:"",code:"",semester_id:0,shift_id:0,specialty_id:0,period_id:0}),u=()=>{let r=[];return Object.values(e).some(s=>(s==null?void 0:s.toString().trim())===""||s===0)&&(r=["Todos los Campos son Obligatorios",...r]),t=="re-registration"&&(e.code.trim().length!==14||isNaN(Number(e.code)))&&(r=["El Numero de Control es Invalido",...r]),t=="registration"&&(e.code.trim().length>4||isNaN(Number(e.code)))&&(r=["El Numero de Ficha es Invalido",...r]),r};return{alerts:i,data:e,setData:n,errors:p,processing:d,save:r=>{r.preventDefault();const s=u();if(a(s),s.length===0){if(e.id){l(route(t+".update",{pay:e.id}),{preserveScroll:!0});return}c(route(t+".store",t==="re-registration"?{semester:e.semester_id}:{}),{preserveScroll:!0,onSuccess(o){console.log(route(t+".show",{pay:o.props.pay})),location.href=route(t+".show",{pay:o.props.pay})}})}}}}export{_ as u};
