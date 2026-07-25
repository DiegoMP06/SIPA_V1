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

// Simple inline icons (no extra dependency needed)
function IconDocument({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <path
                d="M14 3v5h5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <path
                d="M9 12.5h6M9 15.5h6M9 9.5h2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

function IconBank({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M3 10 12 4l9 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <path
                d="M5 10v9M9.5 10v9M14.5 10v9M19 10v9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M3 20h18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

function IconShield({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M12 3.5 19 6v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-2.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <path
                d="m9.2 12 2 2 3.6-3.8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function IconHelp({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="1.6"
            />
            <path
                d="M9.5 9.3a2.5 2.5 0 1 1 3.7 2.2c-.8.5-1.2.9-1.2 1.8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="12" cy="16.7" r="0.9" fill="currentColor" />
        </svg>
    );
}

// Guided steps shown in the educational section
const steps = [
    {
        icon: IconDocument,
        title: "Elige tu trámite",
        description:
            "Selecciona la ficha de Aportación Voluntaria que corresponde a tu situación académica.",
    },
    {
        icon: IconBank,
        title: "Descarga tu FDDR",
        description:
            "Obtén tu Ficha de Depósito Digital Referenciada lista para pagar en el banco.",
    },
    {
        icon: IconShield,
        title: "Paga con confianza",
        description:
            "Acude a cualquier sucursal autorizada; tus datos están protegidos en todo momento.",
    },
];

// Short FAQ entries to orient students unfamiliar with the process
const faqs = [
    {
        question: "¿Qué es la Aportación Voluntaria?",
        answer: "Es una contribución que ayuda a mantener y mejorar los servicios académicos de la escuela.",
    },
    {
        question: "¿Dónde puedo pagar mi ficha?",
        answer: "En cualquier sucursal bancaria autorizada, usando el código que aparece en tu FDDR.",
    },
    {
        question: "No encuentro mi ficha, ¿qué hago?",
        answer: 'Usa la opción "Buscar Ficha de Pago" con tu matrícula para recuperarla al instante.',
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
    return (
        <>
            <Head title="Home" />

            <div className="bg-main bg-no-repeat bg-cover bg-center min-h-screen bg-fixed flex">
                <div className="bg-black/70 flex-1 flex flex-col overflow-y-auto">
                    <header className="bg-rose-950/80 border-b border-rose-800/60 backdrop-blur-sm">
                        <div className="container mx-auto px-4 flex justify-between py-3 items-center">
                            <Link
                                href={route("home")}
                                className="flex items-center gap-3"
                            >
                                <picture className="block rounded-full bg-rose-800 p-2">
                                    <img
                                        src={DGETIDARK}
                                        alt="Logo de la DGETI"
                                        title="Logo de la DGETI"
                                        loading="eager"
                                        decoding="async"
                                        width="100"
                                        height="100"
                                        className="invert size-6 md:size-8"
                                    />
                                </picture>
                                <span className="font-bold text-rose-50 hidden sm:inline">
                                    CBTis 211
                                </span>
                            </Link>

                            <nav className="flex items-center gap-4">
                                <Link
                                    href="#tramites"
                                    className="text-rose-100 font-semibold transition-colors hover:text-rose-300"
                                >
                                    Trámites
                                </Link>

                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-950 transition-colors hover:bg-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route("login")}
                                        className="rounded-full border border-rose-400/50 px-4 py-2 text-sm font-semibold text-rose-100 transition-colors hover:bg-rose-900"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                )}
                            </nav>
                        </div>
                    </header>

                    <main className="flex-1">
                        <section className="text-center px-4 py-12 md:py-16">
                            <span className="inline-block rounded-full bg-rose-900/80 text-rose-200 text-sm font-semibold px-3 py-1 tracking-wide uppercase border border-rose-700/50">
                                Sistema Institucional de Pagos Académicos
                            </span>
                            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-white max-w-2xl mx-auto tracking-tight">
                                Genera y paga tu ficha de Aportación Voluntaria
                            </h1>
                            <p className="mt-4 text-rose-100 max-w-xl mx-auto">
                                CBTis No. 211 ofrece un proceso claro, guiado y
                                seguro para toda la comunidad estudiantil.
                            </p>
                        </section>

                        <section id="tramites" className="px-4 pb-16">
                            <div className="bg-rose-900/80 border border-rose-700/50 shadow-lg shadow-rose-950/30 max-w-2xl mx-auto p-6 rounded-2xl space-y-6 backdrop-blur-sm">
                                <h2 className="text-center text-rose-50 font-bold text-2xl">
                                    Trámites disponibles
                                </h2>

                                {canPay && !auth.user ? (
                                    <nav className="flex flex-col gap-3">
                                        {canRegister && (
                                            <Link
                                                href={route("registration")}
                                                className="rounded-xl bg-rose-50 text-rose-950 text-center font-semibold px-4 py-3 transition-all duration-200 hover:bg-white hover:-translate-y-0.5"
                                            >
                                                Ficha de Aportación Voluntaria
                                                de Nuevo Ingreso
                                            </Link>
                                        )}

                                        {canReRegister &&
                                            semesters.map((semester) => (
                                                <Link
                                                    key={semester.id}
                                                    href={route(
                                                        "re-registration",
                                                        { semester },
                                                    )}
                                                    className="rounded-xl bg-rose-50 text-rose-950 text-center font-semibold px-4 py-3 transition-all duration-200 hover:bg-white hover:-translate-y-0.5"
                                                >
                                                    Ficha de Aportación
                                                    Voluntaria de{" "}
                                                    {semester.semester}°
                                                    Semestre
                                                </Link>
                                            ))}

                                        {canExtraordinaryExam && (
                                            <Link
                                                href={route(
                                                    "extraordinary-exam",
                                                )}
                                                className="rounded-xl bg-rose-50 text-rose-950 text-center font-semibold px-4 py-3 transition-all duration-200 hover:bg-white hover:-translate-y-0.5"
                                            >
                                                Ficha de Examen Extraordinario
                                            </Link>
                                        )}

                                        {canIntersemesterAppeal && (
                                            <Link
                                                href={route(
                                                    "intersemester-appeal",
                                                )}
                                                className="rounded-xl bg-rose-50 text-rose-950 text-center font-semibold px-4 py-3 transition-all duration-200 hover:bg-white hover:-translate-y-0.5"
                                            >
                                                Ficha de Recursamiento
                                                Intersemestral
                                            </Link>
                                        )}

                                        <Link
                                            href={route("search")}
                                            className="rounded-xl border border-rose-400/70 text-rose-50 text-center font-semibold px-4 py-3 transition-all duration-200 hover:bg-rose-800/50"
                                        >
                                            Buscar Ficha de Pago
                                        </Link>
                                    </nav>
                                ) : (
                                    <p className="text-center text-rose-200 font-medium py-10">
                                        No hay trámites disponibles por el
                                        momento.
                                    </p>
                                )}
                            </div>
                        </section>

                        <section className="bg-rose-950/80 border-y border-rose-800/50 px-4 py-16">
                            <div className="container mx-auto max-w-5xl">
                                <div className="text-center max-w-2xl mx-auto mb-10">
                                    <h2 className="text-2xl md:text-3xl font-bold text-rose-50">
                                        ¿Cómo funciona tu trámite?
                                    </h2>
                                    <p className="mt-2 text-rose-200">
                                        Sigue estos pasos para completar tu
                                        Aportación Voluntaria sin contratiempos.
                                    </p>
                                </div>

                                <div className="grid gap-6 md:grid-cols-3">
                                    {steps.map((step, index) => {
                                        const Icon = step.icon;
                                        return (
                                            <div
                                                key={step.title}
                                                className="rounded-2xl border border-rose-800/50 bg-rose-900 p-6 text-center"
                                            >
                                                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-rose-700 text-rose-50">
                                                    <Icon className="size-6" />
                                                </div>
                                                <p className="mt-4 text-sm font-semibold text-rose-200">
                                                    Paso {index + 1}
                                                </p>
                                                <h3 className="mt-1 font-bold text-rose-50">
                                                    {step.title}
                                                </h3>
                                                <p className="mt-2 text-sm text-rose-200 leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>

                        <section className="px-4 py-16">
                            <div className="container mx-auto max-w-4xl">
                                <div className="flex items-center gap-3 justify-center mb-8">
                                    <IconHelp className="size-6 text-rose-300" />
                                    <h2 className="text-2xl font-bold text-rose-50">
                                        Preguntas frecuentes
                                    </h2>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    {faqs.map((faq) => (
                                        <div
                                            key={faq.question}
                                            className="rounded-xl border border-rose-800/50 bg-rose-900 p-5"
                                        >
                                            <h3 className="font-semibold text-rose-50">
                                                {faq.question}
                                            </h3>
                                            <p className="mt-2 text-sm text-rose-100 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 rounded-xl border border-amber-700/40 bg-amber-900/40 p-4 text-center text-sm text-amber-100">
                                    Recuerda: la Aportación Voluntaria fortalece
                                    los servicios y espacios que usa toda la
                                    comunidad estudiantil.
                                </div>
                            </div>
                        </section>
                    </main>

                    <footer className="bg-rose-950/95 border-t border-rose-800/80">
                        <p className="max-w-4xl text-sm text-center mx-auto px-4 py-4 text-rose-300">
                            &copy; {new Date().getFullYear()} CBTis No. 211. Todos los derechos{" "}
                            reservados. Hecho con ❤ por Diego Meneses.
                        </p>
                    </footer>
                </div>
            </div>
        </>
    );
}
