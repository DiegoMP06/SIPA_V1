import{r,j as a}from"./app-Cd6Eq6nm.js";const d=r.forwardRef(function({type:o="text",className:s="",isFocused:u=!1,...f},n){const t=r.useRef(null);return r.useImperativeHandle(n,()=>({focus:()=>{var e;return(e=t.current)==null?void 0:e.focus()}})),r.useEffect(()=>{var e;u&&((e=t.current)==null||e.focus())},[]),a.jsx("input",{...f,type:o,className:"border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm placeholder:text-gray-500 text-gray-700 block w-full "+s,ref:t})});export{d as T};
