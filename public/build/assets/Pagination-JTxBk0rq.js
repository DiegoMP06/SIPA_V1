import{r as o,j as e,a as r}from"./app-Cw66xjMM.js";function x({pagination:s,withFunction:g=!1,handlePaginate:l}){const d=["pagination.previous","pagination.next"],i=o.useMemo(()=>s.links.filter(t=>!d.includes(t.label)),[s.links]),a=o.useMemo(()=>s.last_page>1,[s.last_page]),n=o.useMemo(()=>s.current_page===1,[s.current_page]),c=o.useMemo(()=>s.current_page===s.last_page,[s.current_page,s.last_page]);return a&&(g&&l?e.jsxs("div",{className:"flex justify-between items-center my-16 gap-6 flex-col md:flex-row",children:[e.jsxs("p",{className:"text-gray-700 font-bold text-lg",children:["Página ",s.current_page," de ",s.last_page," (",s.per_page," Registros Por Pagina)"]}),e.jsxs("nav",{className:"flex gap-2",children:[!n&&e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",onClick:()=>l(1),className:"bg-indigo-700 size-10 grid place-content-center text-white font-bold hover:bg-indigo-600 transition-colors",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"128",height:"128",className:"size-8",viewBox:"0 0 24 24",children:e.jsx("path",{fill:"currentColor",d:"m4.836 12l6.207 6.207l1.414-1.414L7.664 12l4.793-4.793l-1.414-1.414zm5.65 0l6.207 6.207l1.414-1.414L13.314 12l4.793-4.793l-1.414-1.414z"})})}),e.jsx("button",{type:"button",onClick:()=>l(s.current_page-1),className:"bg-indigo-700 size-10 grid place-content-center text-white font-bold hover:bg-indigo-600 transition-colors",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"128",height:"128",className:"size-6",viewBox:"0 0 24 24",children:e.jsx("path",{fill:"currentColor",d:"M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"})})})]}),i.map(t=>e.jsx("button",{type:"button",onClick:()=>l(Number(t.label)),className:"hidden lg:grid bg-indigo-700 size-10 place-content-center text-white font-bold hover:bg-indigo-600 transition-colors",children:t.label},t.label)),!c&&e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",onClick:()=>l(s.current_page+1),className:"bg-indigo-700 size-10 grid place-content-center text-white font-bold hover:bg-indigo-600 transition-colors",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"128",height:"128",className:"size-6",viewBox:"0 0 24 24",children:e.jsx("path",{fill:"currentColor",d:"M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z"})})}),e.jsx("button",{type:"button",onClick:()=>l(s.last_page),className:"bg-indigo-700 size-10 grid place-content-center text-white font-bold hover:bg-indigo-600 transition-colors",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"128",height:"128",className:"size-8",viewBox:"0 0 24 24",children:e.jsx("path",{fill:"currentColor",d:"m19.164 12l-6.207-6.207l-1.414 1.414L16.336 12l-4.793 4.793l1.414 1.414zm-5.65 0L7.307 5.793L5.893 7.207L10.686 12l-4.793 4.793l1.414 1.414z"})})})]})]})]}):e.jsxs("div",{className:"flex justify-between items-center my-16 gap-6 flex-col md:flex-row",children:[e.jsxs("p",{className:"text-gray-700 font-bold text-lg",children:["Página ",s.current_page," de ",s.last_page," (",s.per_page," Registros Por Pagina)"]}),e.jsxs("nav",{className:"flex gap-2",children:[!n&&e.jsxs(e.Fragment,{children:[e.jsx(r,{href:s.first_page_url,className:"bg-indigo-700 size-10 grid place-content-center text-white font-bold hover:bg-indigo-600 transition-colors",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"128",height:"128",className:"size-8",viewBox:"0 0 24 24",children:e.jsx("path",{fill:"currentColor",d:"m4.836 12l6.207 6.207l1.414-1.414L7.664 12l4.793-4.793l-1.414-1.414zm5.65 0l6.207 6.207l1.414-1.414L13.314 12l4.793-4.793l-1.414-1.414z"})})}),e.jsx(r,{href:s.prev_page_url??"",className:"bg-indigo-700 size-10 grid place-content-center text-white font-bold hover:bg-indigo-600 transition-colors",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"128",height:"128",className:"size-6",viewBox:"0 0 24 24",children:e.jsx("path",{fill:"currentColor",d:"M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"})})})]}),i.map(t=>e.jsx(r,{href:t.url??"",className:"hidden lg:grid bg-indigo-700 size-10 place-content-center text-white font-bold hover:bg-indigo-600 transition-colors",children:t.label},t.label)),!c&&e.jsxs(e.Fragment,{children:[e.jsx(r,{href:s.next_page_url??"",className:"bg-indigo-700 size-10 grid place-content-center text-white font-bold hover:bg-indigo-600 transition-colors",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"128",height:"128",className:"size-6",viewBox:"0 0 24 24",children:e.jsx("path",{fill:"currentColor",d:"M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z"})})}),e.jsx(r,{href:s.last_page_url,className:"bg-indigo-700 size-10 grid place-content-center text-white font-bold hover:bg-indigo-600 transition-colors",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"128",height:"128",className:"size-8",viewBox:"0 0 24 24",children:e.jsx("path",{fill:"currentColor",d:"m19.164 12l-6.207-6.207l-1.414 1.414L16.336 12l-4.793 4.793l1.414 1.414zm-5.65 0L7.307 5.793L5.893 7.207L10.686 12l-4.793 4.793l1.414 1.414z"})})})]})]})]}))}export{x as P};