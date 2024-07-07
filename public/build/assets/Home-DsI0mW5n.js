import{j as e,Y as o,a}from"./app-BL-A_wWN.js";const n="/build/assets/dgeti_dark-DWkZI-X2.webp";function d({auth:s,canRegister:i,canPay:t,canExtraordinaryExam:l,canIntersemesterAppeal:r}){return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Home"}),e.jsx("div",{className:"bg-main bg-no-repeat bg-cover bg-center min-h-screen bg-fixed flex",children:e.jsxs("div",{className:"bg-black-0.6 flex-1 flex flex-col overflow-y-auto",children:[e.jsx("header",{className:"bg-indigo-950",children:e.jsxs("div",{className:"container mx-auto px-4 flex justify-between py-2 items-center",children:[e.jsx(a,{href:route("home"),children:e.jsx("picture",{children:e.jsx("img",{src:n,alt:"Logo Plano de la Dgeti",title:"Logo Plano de la Dgeti",loading:"eager",decoding:"async",width:"100",height:"100",className:"block invert size-10 md:size-14"})})}),e.jsxs("nav",{className:"flex items-center gap-4",children:[e.jsx(a,{href:"#tramites",className:"text-white font-bold",children:"Tramites"}),s.user?e.jsx(a,{href:route("dashboard"),className:"text-white font-bold",children:"Dashboard"}):e.jsx(a,{href:route("login"),className:"text-white font-bold",children:"Iniciar Sesión"})]})]})}),e.jsx("h1",{className:"text-4xl my-10 max-w-2xl lg:text-5xl text-center font-bold text-white mx-auto px-4",children:"Sistema Institucional de Pagos Academicos 211"}),e.jsxs("section",{className:"mb-16 mt-10 px-4 container mx-auto space-y-16",children:[e.jsxs("div",{className:"bg-indigo-950 p-4 rounded-lg border border-indigo-600 max-w-2xl space-y-4 place-self-start mx-auto",children:[e.jsx("h2",{className:"text-indigo-100 font-bold text-2xl",children:"Facilitando tu Trayectoria Educativa"}),e.jsx("p",{className:"font-bold text-white",children:"En nuestro Sistema Institucional de Pagos Académicos, hemos diseñado una plataforma que simplifica y agiliza los procesos financieros relacionados con tu educación. Aquí están algunas de las características clave:"})]}),e.jsxs("ul",{role:"list",className:"max-w-5xl grid grid-cols-1 mx-auto gap-6",children:[e.jsxs("li",{className:"bg-indigo-950 border-l-4 border-indigo-600 p-4 space-y-4 rounded max-w-2xl place-self-start",children:[e.jsx("h3",{className:"text-indigo-100 font-bold text-xl",children:"Registro de Solicitud:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-white pl-4",children:"- Solicita servicios académicos, como inscripciones o reinscripciones, directamente desde la plataforma."}),e.jsx("p",{className:"text-white pl-4",children:"- Todo en un solo lugar, sin complicaciones."})]})]}),e.jsxs("li",{className:"bg-indigo-950 border-l-4 border-indigo-600 p-4 space-y-4 rounded max-w-2xl place-self-end",children:[e.jsx("h3",{className:"text-indigo-100 font-bold text-xl",children:"Ficha de Depósito Digital Referenciada (FDDR):"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-white pl-4",children:"- Descarga tu FDDR de manera rápida y sencilla."}),e.jsx("p",{className:"text-white pl-4",children:"- Este documento te permite realizar pagos en cualquier sucursal bancaria autorizada."})]})]}),e.jsxs("li",{className:"bg-indigo-950 border-l-4 border-indigo-600 p-4 space-y-4 rounded max-w-2xl place-self-start",children:[e.jsx("h3",{className:"text-indigo-100 font-bold text-xl",children:"Seguridad y Confidencialidad:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-white pl-4",children:"- Protegemos tus datos personales."}),e.jsx("p",{className:"text-white pl-4",children:"- Utilizamos medidas de seguridad avanzadas para garantizar la confidencialidad de tus datos."})]})]}),e.jsxs("li",{className:"bg-indigo-950 border-l-4 border-indigo-600 p-4 space-y-4 rounded max-w-2xl place-self-end",children:[e.jsx("h3",{className:"text-indigo-100 font-bold text-xl",children:"Notificaciones y Recordatorios:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-white pl-4",children:"- Recibirás noticias sobre fechas límite, pagos pendientes y otros eventos importantes en nuestra página de Facebook."}),e.jsx("p",{className:"text-white pl-4",children:"- No te perderás ningún detalle relevante para tu proceso académico."})]})]}),e.jsxs("li",{className:"bg-indigo-950 border-l-4 border-indigo-600 p-4 space-y-4 rounded max-w-2xl place-self-start",children:[e.jsx("h3",{className:"text-indigo-100 font-bold text-xl",children:"Soporte Personalizado:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-white pl-4",children:"- Nuestro equipo está disponible para resolver tus dudas y brindarte asistencia."}),e.jsx("p",{className:"text-white pl-4",children:"- Siempre estamos dispuestos a ayudarte en tu camino educativo."})]})]})]}),e.jsx("p",{className:"bg-indigo-950 p-4 rounded-lg border border-indigo-600 max-w-2xl space-y-4 place-self-start mx-auto font-bold text-white",children:"En resumen, nuestro Sistema Institucional de Pagos Académicos es una herramienta pensada para ti. Simplifica tus trámites financieros y concéntrate en lo más importante: tu formación académica."})]}),e.jsx("main",{id:"tramites",className:"my-16 px-4 mx-auto container",children:e.jsxs("div",{className:"bg-indigo-950 border border-indigo-600 max-w-2xl mx-auto p-4 rounded-lg space-y-10",children:[e.jsx("h2",{className:"text-center text-indigo-100 font-bold text-2xl",children:"Tramites"}),t&&!s.user?e.jsxs("nav",{className:"flex flex-col gap-6",children:[i&&e.jsx(a,{href:route("re-registration"),className:"bg-indigo-100 hover:bg-indigo-200 text-center font-bold text-indigo-950 px-4 py-2 uppercase",children:"Generar Ficha de Inscripción/Reinscripción"}),l&&e.jsx(a,{href:route("extraordinary-exam"),className:"bg-indigo-100 hover:bg-indigo-200 text-center font-bold text-indigo-950 px-4 py-2 uppercase",children:"Generar Ficha de Examen Extraordinario"}),r&&e.jsx(a,{href:route("intersemester-appeal"),className:"bg-indigo-100 hover:bg-indigo-200 text-center font-bold text-indigo-950 px-4 py-2 uppercase",children:"Generar Ficha de Recursamiento Intersemestral"}),e.jsx(a,{href:route("search"),className:"bg-indigo-100 hover:bg-indigo-200 text-center font-bold text-indigo-950 px-4 py-2 uppercase",children:"Buscar Ficha de Pago"})]}):e.jsx("p",{className:"text-center text-white font-bold text-lg my-16",children:"No Hay Tramites Disponibles"})]})}),e.jsx("footer",{className:"bg-indigo-950",children:e.jsxs("p",{className:"max-w-4xl text-lg lg:text-xl font-bold text-center mx-auto px-4 py-3 text-white",children:["Todos los Derechos Reservado CBTis No. 211 ",new Date().getFullYear(),"©. Made by Diego Meneses."]})})]})})]})}export{d as default};