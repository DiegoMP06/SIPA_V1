import{r,j as e,a as t}from"./app-Cd6Eq6nm.js";function h({pagination:s}){const i=["pagination.previous","pagination.next"],o=r.useMemo(()=>s.links.filter(l=>!i.includes(l.label)),[s.links]),c=r.useMemo(()=>s.last_page>1,[s.last_page]),n=r.useMemo(()=>s.current_page===1,[s.current_page]),a=r.useMemo(()=>s.current_page===s.last_page,[s.current_page,s.last_page]);return c&&e.jsxs("div",{className:"flex justify-between items-center my-16 gap-6 flex-col md:flex-row",children:[e.jsxs("p",{className:"text-gray-700 font-bold text-lg",children:["Página ",s.current_page," de ",s.last_page," (",s.per_page," Registros Por Pagina)"]}),e.jsxs("nav",{className:"flex gap-2",children:[!n&&e.jsxs(e.Fragment,{children:[e.jsx(t,{href:s.first_page_url,className:"bg-indigo-700 size-10 grid place-content-center text-white font-bold hover:bg-indigo-600 transition-colors",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"128",height:"128",className:"size-8",viewBox:"0 0 24 24",children:e.jsx("path",{fill:"currentColor",d:"m4.836 12l6.207 6.207l1.414-1.414L7.664 12l4.793-4.793l-1.414-1.414zm5.65 0l6.207 6.207l1.414-1.414L13.314 12l4.793-4.793l-1.414-1.414z"})})}),e.jsx(t,{href:s.prev_page_url??"",className:"bg-indigo-700 size-10 grid place-content-center text-white font-bold hover:bg-indigo-600 transition-colors",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"128",height:"128",className:"size-6",viewBox:"0 0 24 24",children:e.jsx("path",{fill:"currentColor",d:"M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"})})})]}),o.map(l=>e.jsx(t,{href:l.url??"",className:"hidden lg:grid bg-indigo-700 size-10 place-content-center text-white font-bold hover:bg-indigo-600 transition-colors",children:l.label},l.label)),!a&&e.jsxs(e.Fragment,{children:[e.jsx(t,{href:s.next_page_url??"",className:"bg-indigo-700 size-10 grid place-content-center text-white font-bold hover:bg-indigo-600 transition-colors",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"128",height:"128",className:"size-6",viewBox:"0 0 24 24",children:e.jsx("path",{fill:"currentColor",d:"M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z"})})}),e.jsx(t,{href:s.last_page_url,className:"bg-indigo-700 size-10 grid place-content-center text-white font-bold hover:bg-indigo-600 transition-colors",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"128",height:"128",className:"size-8",viewBox:"0 0 24 24",children:e.jsx("path",{fill:"currentColor",d:"m19.164 12l-6.207-6.207l-1.414 1.414L16.336 12l-4.793 4.793l1.414 1.414zm-5.65 0L7.307 5.793L5.893 7.207L10.686 12l-4.793 4.793l1.414 1.414z"})})})]})]})]})}export{h as P};
