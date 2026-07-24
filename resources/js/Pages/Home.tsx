import { Link, Head } from "@inertiajs/react";
import { PageProps, SemesterType } from "@/types";
import DGETIDARK from "@/Assets/dgeti_dark.webp";

type HomeProps = {
    canPay: boolean;
    canRegister: boolean;
    canReRegister: boolean;
    canExtraordinaryExam: boolean;
    canIntersemesterAppeal: boolean;
    semesters: SemesterType[];
};

const steps = [
    {
        title: "1. Elige tu trámite",
        description:
            "Selecciona el tipo de ficha que necesitas según tu situación académica.",
    },
    {
        title: "2. Completa tus datos",
        description:
            "Ingresa la información solicitada para generar tu comprobante con precisión.",
    },
    {
        title: "3. Realiza tu pago",
        description:
            "Descarga tu ficha y acércate a cualquier sucursal bancaria autorizada.",
    },
];

const benefits = [
    {
        title: "Proceso guiado",
        text: "Una experiencia clara y ordenada para evitar confusiones en cada trámite.",
    },
    {
        title: "Acceso rápido",
        text: "Consulta y descarga tus comprobantes en minutos desde cualquier dispositivo.",
    },
    {
        title: "Soporte institucional",
        text: "Tu información se gestiona de forma segura y respaldada por el sistema escolar.",
    },
];

export default function Welcome({
    auth,
    canRegister,
    canReRegister,
    canPay,
    canExtraordinaryExam,
    canIntersemesterAppeal,
    semesters,
}: PageProps<HomeProps>) {
    const actions = [
        ...(canRegister
            ? [
                  {
                      href: route("registration"),
                      title: "Nuevo ingreso",
                      subtitle: "Aportación voluntaria",
                      description:
                          "Genera tu ficha para iniciar tu proceso académico con el trámite adecuado.",
                  },
              ]
            : []),
        ...(canReRegister
            ? semesters.map((semester) => ({
                  href: route("re-registration", { semester }),
                  title: `${semester.semester}° Semestre`,
                  subtitle: "Aportación voluntaria",
                  description:
                      "Genera tu comprobante para continuar con tu trayectoria educativa.",
              }))
            : []),
        ...(canExtraordinaryExam
            ? [
                  {
                      href: route("extraordinary-exam"),
                      title: "Examen extraordinario",
                      subtitle: "Ficha especial",
                      description:
                          "Solicita la ficha para presentar evaluaciones extraordinarias.",
                  },
              ]
            : []),
        ...(canIntersemesterAppeal
            ? [
                  {
                      href: route("intersemester-appeal"),
                      title: "Recursamiento intersemestral",
                      subtitle: "Ficha especial",
                      description:
                          "Genera tu comprobante para tramitar tu apoyo académico correspondiente.",
                  },
              ]
            : []),
    ];

    return (
        <>
            <Head title="Home" />

            <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,91,132,0.28),_transparent_30%),linear-gradient(135deg,_#ffe7ec_0%,_#ffd0da_40%,_#fff_100%)] text-slate-800">
                <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
                    <header className="rounded-2xl border border-rose-200 bg-white/95 px-4 py-3 shadow-lg shadow-rose-200/50 backdrop-blur-xl sm:rounded-full">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <Link
                                href={route("home")}
                                className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-xl"
                            >
                                <picture className="bg-rose-500 block size-10 rounded-full p-2 sm:size-12">
                                    <img
                                        src={DGETIDARK}
                                        alt="Logo Plano de la Dgeti"
                                        title="Logo Plano de la Dgeti"
                                        loading="eager"
                                        decoding="async"
                                        width="100"
                                        height="100"
                                        className="invert"
                                    />
                                </picture>
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
                                        CBTis 211
                                    </p>
                                    <p className="text-sm text-slate-700">
                                        Sistema institucional de pagos
                                    </p>
                                </div>
                            </Link>

                            <nav
                                className="flex items-center gap-3"
                                aria-label="Navegación principal"
                            >
                                <Link
                                    href="#tramites"
                                    className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                                >
                                    Trámites
                                </Link>
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route("login")}
                                        className="rounded-full border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-800 transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                                    >
                                        Iniciar sesión
                                    </Link>
                                )}
                            </nav>
                        </div>
                    </header>

                    <main className="flex-1 py-8 sm:py-12 lg:py-16">
                        <section className="grid items-center gap-8 rounded-[2rem] border border-rose-200 bg-white/95 p-6 shadow-xl shadow-rose-200/50 backdrop-blur-xl transition-all duration-300 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10 lg:p-10">
                            <div className="space-y-6">
                                <span className="inline-flex w-fit rounded-full border border-rose-300 bg-rose-100 px-3 py-1 text-sm font-semibold uppercase tracking-[0.25em] text-rose-700">
                                    Gestión académica y financiera
                                </span>
                                <div className="space-y-4">
                                    <h1 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                                        Paga tus fichas de forma rápida, segura
                                        y clara.
                                    </h1>
                                    <p className="max-w-2xl text-lg leading-8 text-slate-700">
                                        Una plataforma pensada para que
                                        estudiantes y familias gestionen sus
                                        trámites de pago sin complicaciones, con
                                        información ordenada y acompañamiento
                                        institucional.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <Link
                                        href="#tramites"
                                        className="rounded-full bg-rose-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                                    >
                                        Iniciar trámite
                                    </Link>
                                    <Link
                                        href={route("search")}
                                        className="rounded-full border border-rose-300 bg-white px-6 py-3 text-center font-semibold text-rose-800 transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                                    >
                                        Buscar comprobante
                                    </Link>
                                </div>
                            </div>

                            <div className="rounded-[1.5rem] border border-rose-200 bg-gradient-to-br from-rose-100 via-white to-rose-100 p-6">
                                <div className="space-y-4">
                                    <div className="rounded-2xl border border-rose-300 bg-white p-4">
                                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-700">
                                            Acceso inmediato
                                        </p>
                                        <p className="mt-3 text-3xl font-bold text-slate-900">
                                            Trámites digitales
                                        </p>
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-2xl border border-rose-200 bg-white/95 p-4">
                                            <p className="text-2xl font-bold text-slate-900">
                                                100%
                                            </p>
                                            <p className="text-sm text-slate-700">
                                                orientado al estudiante
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-rose-200 bg-white/95 p-4">
                                            <p className="text-2xl font-bold text-slate-900">
                                                24/7
                                            </p>
                                            <p className="text-sm text-slate-700">
                                                disponible en línea
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            id="tramites"
                            className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
                        >
                            <div className="rounded-[2rem] border border-rose-200 bg-white/95 p-6 shadow-lg shadow-rose-200/50 backdrop-blur-xl transition-all duration-300 lg:p-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-700">
                                            Trámites disponibles
                                        </p>
                                        <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                            Elige el proceso que necesitas
                                        </h2>
                                    </div>
                                </div>

                                {canPay && !auth.user ? (
                                    <div className="mt-8 grid gap-4">
                                        {actions.length > 0 ? (
                                            actions.map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className="group rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-100 to-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-rose-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-700">
                                                                {item.subtitle}
                                                            </p>
                                                            <h3 className="mt-2 text-lg font-bold text-slate-900">
                                                                {item.title}
                                                            </h3>
                                                            <p className="mt-2 text-sm leading-6 text-slate-700">
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                        </div>
                                                        <span className="mt-1 shrink-0 rounded-full bg-rose-200 px-3 py-1 text-sm font-semibold text-rose-800 transition group-hover:bg-rose-300">
                                                            Ir al trámite
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <div
                                                className="rounded-2xl border border-dashed border-rose-300 bg-rose-100/50 p-6 text-center text-slate-700"
                                                role="status"
                                            >
                                                No hay trámites disponibles en
                                                este momento.
                                            </div>
                                        )}

                                        <Link
                                            href={route("search")}
                                            className="rounded-2xl border border-rose-300 bg-rose-100 p-5 text-center font-semibold text-rose-800 transition hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                                        >
                                            Buscar comprobante de aportación
                                            voluntaria
                                        </Link>
                                    </div>
                                ) : (
                                    <div
                                        className="mt-8 rounded-2xl border border-dashed border-rose-300 bg-rose-100/50 p-8 text-center text-slate-700"
                                        role="status"
                                    >
                                        Inicia sesión para acceder a tus
                                        opciones de trámites institucionales.
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="rounded-[2rem] border border-rose-200 bg-white/95 p-6 shadow-lg shadow-rose-200/50 backdrop-blur-xl transition-all duration-300 lg:p-8">
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-700">
                                        ¿Cómo funciona?
                                    </p>
                                    <div className="mt-6 space-y-4">
                                        {steps.map((step, index) => (
                                            <div
                                                key={step.title}
                                                className="rounded-2xl border border-rose-200 bg-rose-100/50 p-4 transition-all duration-300 hover:bg-rose-200/50"
                                            >
                                                <h3 className="text-lg font-semibold text-slate-900">
                                                    {step.title}
                                                </h3>
                                                <p className="mt-2 text-sm leading-6 text-slate-700">
                                                    {step.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-[2rem] border border-rose-200 bg-gradient-to-br from-rose-100 to-white p-6 shadow-lg shadow-rose-200/50 backdrop-blur-xl transition-all duration-300 lg:p-8">
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-700">
                                        Beneficios del sistema
                                    </p>
                                    <div className="mt-6 space-y-4">
                                        {benefits.map((benefit) => (
                                            <div
                                                key={benefit.title}
                                                className="rounded-2xl border border-rose-200 bg-white/95 p-4 transition-all duration-300 hover:bg-white"
                                            >
                                                <h3 className="text-lg font-semibold text-slate-900">
                                                    {benefit.title}
                                                </h3>
                                                <p className="mt-2 text-sm leading-6 text-slate-700">
                                                    {benefit.text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>

                    <footer className="border-t border-rose-200 py-6 text-center text-sm text-slate-600">
                        <p>
                            Todos los derechos reservados CBTis No. 211{" "}
                            {new Date().getFullYear()} &mdash; Made with ❤ for
                            Diego Meneses Pérez.
                        </p>
                    </footer>
                </div>
            </div>
        </>
    );
}
