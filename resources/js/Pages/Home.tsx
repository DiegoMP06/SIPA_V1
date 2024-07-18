import { Link, Head } from '@inertiajs/react';
import { PageProps, SemesterType } from '@/types';
import DGETIDARK from '@/Assets/dgeti_dark.webp';

type HomeProps = {
    canPay: boolean;
    canRegister: boolean,
    canReRegister: boolean,
    canExtraordinaryExam: boolean,
    canIntersemesterAppeal: boolean,
    semesters: SemesterType[];
}

export default function Welcome({ auth, canRegister, canReRegister, canPay, canExtraordinaryExam, canIntersemesterAppeal, semesters }: PageProps<HomeProps>) {

    return (
        <>
            <Head title="Home" />

            <div className="bg-main bg-no-repeat bg-cover bg-center min-h-screen bg-fixed flex">
                <div className="bg-black-0.6 flex-1 flex flex-col overflow-y-auto">
                    <header className="bg-indigo-950">
                        <div className="container mx-auto px-4 flex justify-between py-2 items-center">
                            <Link href={route('home')}>
                                <picture>
                                    <img
                                        src={DGETIDARK}
                                        alt="Logo Plano de la Dgeti"
                                        title="Logo Plano de la Dgeti"
                                        loading="eager"
                                        decoding="async"
                                        width="100"
                                        height="100"
                                        className="block invert size-10 md:size-14"
                                    />
                                </picture>
                            </Link>

                            <nav className="flex items-center gap-4">
                                <Link
                                    href="#tramites"
                                    className="text-white font-bold"
                                >
                                    Tramites
                                </Link>

                                { auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="text-white font-bold"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="text-white font-bold"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                ) }
                            </nav>
                        </div>
                    </header>

                    <h1 className="text-4xl my-10 max-w-2xl lg:text-5xl text-center font-bold text-white mx-auto px-4">
                        Sistema Institucional de Pagos Academicos 211
                    </h1>

                    <main id="tramites" className="my-16 px-4 mx-auto container">
                        <div className="bg-indigo-950 border border-indigo-600 max-w-2xl mx-auto p-4 rounded-lg space-y-10">
                            <h2 className="text-center text-indigo-100 font-bold text-2xl">
                                Tramites
                            </h2>

                            { (canPay && !auth.user) ? (
                                <nav className="flex flex-col gap-6">
                                    { canRegister &&
                                        <Link href={route('registration')} className="bg-indigo-100 hover:bg-indigo-200 text-center font-bold text-indigo-950 px-4 py-2 uppercase">
                                            Generar Ficha de Nuevo Ingreso
                                        </Link>
                                    }

                                    { canReRegister && semesters.map(semester => (
                                            <Link key={semester.id} href={route('re-registration', {semester})} className="bg-indigo-100 hover:bg-indigo-200 text-center font-bold text-indigo-950 px-4 py-2 uppercase">
                                                Generar Ficha de Reinscripción de { semester.semester } Semestre
                                            </Link>
                                        ))
                                    }

                                    { canExtraordinaryExam &&
                                        <Link href={route('extraordinary-exam')} className="bg-indigo-100 hover:bg-indigo-200 text-center font-bold text-indigo-950 px-4 py-2 uppercase">
                                            Generar Ficha de Examen Extraordinario
                                        </Link>
                                    }

                                    { canIntersemesterAppeal &&
                                        <Link href={route('intersemester-appeal')} className="bg-indigo-100 hover:bg-indigo-200 text-center font-bold text-indigo-950 px-4 py-2 uppercase">
                                            Generar Ficha de Recursamiento Intersemestral
                                        </Link>
                                    }

                                    <Link href={route('search')} className="bg-indigo-100 hover:bg-indigo-200 text-center font-bold text-indigo-950 px-4 py-2 uppercase">
                                        Buscar Ficha de Pago
                                    </Link>
                                </nav>
                            ) : (
                                <p className="text-center text-white font-bold text-lg my-16">
                                    No Hay Tramites Disponibles
                                </p>
                            )}
                        </div>
                    </main>

                    <section className="mb-16 mt-10 px-4 container mx-auto space-y-16">
                        <div className="bg-indigo-950 p-4 rounded-lg border border-indigo-600 max-w-2xl space-y-4 place-self-start mx-auto">
                            <h2 className="text-indigo-100 font-bold text-2xl">
                                Facilitando tu Trayectoria Educativa
                            </h2>

                            <p className="font-bold text-white">
                                En nuestro Sistema Institucional de Pagos Académicos, hemos diseñado una plataforma que simplifica y agiliza los procesos financieros relacionados con tu educación. Aquí están algunas de las características clave:
                            </p>
                        </div>

                        <ul role="list" className="max-w-5xl grid grid-cols-1 mx-auto gap-6">
                            <li className="bg-indigo-950 border-l-4 border-indigo-600 p-4 space-y-4 rounded max-w-2xl place-self-start">
                                <h3 className="text-indigo-100 font-bold text-xl">
                                    Registro de Solicitud:
                                </h3>

                                <div className="space-y-2">
                                    <p className="text-white pl-4">
                                        - Solicita servicios académicos, como inscripciones o reinscripciones, directamente desde la plataforma.
                                    </p>

                                    <p className="text-white pl-4">
                                        - Todo en un solo lugar, sin complicaciones.
                                    </p>
                                </div>
                            </li>

                            <li className="bg-indigo-950 border-l-4 border-indigo-600 p-4 space-y-4 rounded max-w-2xl place-self-end">
                                <h3 className="text-indigo-100 font-bold text-xl">
                                    Ficha de Depósito Digital Referenciada (FDDR):
                                </h3>

                                <div className="space-y-2">
                                    <p className="text-white pl-4">
                                        - Descarga tu FDDR de manera rápida y sencilla.
                                    </p>

                                    <p className="text-white pl-4">
                                        - Este documento te permite realizar pagos en cualquier sucursal bancaria autorizada.
                                    </p>
                                </div>
                            </li>

                            <li className="bg-indigo-950 border-l-4 border-indigo-600 p-4 space-y-4 rounded max-w-2xl place-self-start">
                                <h3 className="text-indigo-100 font-bold text-xl">
                                    Seguridad y Confidencialidad:
                                </h3>

                                <div className="space-y-2">
                                    <p className="text-white pl-4">
                                        - Protegemos tus datos personales.
                                    </p>

                                    <p className="text-white pl-4">
                                        - Utilizamos medidas de seguridad avanzadas para garantizar la confidencialidad de tus datos.
                                    </p>
                                </div>
                            </li>

                            <li className="bg-indigo-950 border-l-4 border-indigo-600 p-4 space-y-4 rounded max-w-2xl place-self-end">
                                <h3 className="text-indigo-100 font-bold text-xl">
                                    Notificaciones y Recordatorios:
                                </h3>

                                <div className="space-y-2">
                                    <p className="text-white pl-4">
                                        - Recibirás noticias sobre fechas límite, pagos pendientes y otros eventos importantes en nuestra página de Facebook.
                                    </p>

                                    <p className="text-white pl-4">
                                        - No te perderás ningún detalle relevante para tu proceso académico.
                                    </p>
                                </div>
                            </li>

                            <li className="bg-indigo-950 border-l-4 border-indigo-600 p-4 space-y-4 rounded max-w-2xl place-self-start">
                                <h3 className="text-indigo-100 font-bold text-xl">
                                    Soporte Personalizado:
                                </h3>

                                <div className="space-y-2">
                                    <p className="text-white pl-4">
                                        - Nuestro equipo está disponible para resolver tus dudas y brindarte asistencia.
                                    </p>

                                    <p className="text-white pl-4">
                                        - Siempre estamos dispuestos a ayudarte en tu camino educativo.
                                    </p>
                                </div>
                            </li>
                        </ul>

                        <p className="bg-indigo-950 p-4 rounded-lg border border-indigo-600 max-w-2xl space-y-4 place-self-start mx-auto font-bold text-white">
                            En resumen, nuestro Sistema Institucional de Pagos Académicos es una herramienta pensada para ti. Simplifica tus trámites financieros y concéntrate en lo más importante: tu formación académica.
                        </p>
                    </section>

                    <footer className="bg-indigo-950">
                        <p className="max-w-4xl text-lg lg:text-xl font-bold text-center mx-auto px-4 py-3 text-white">
                            Todos los Derechos Reservado CBTis No. 211 { new Date().getFullYear() }&copy;. Made by Diego Meneses.
                        </p>
                    </footer>
                </div>
            </div>

        </>
    );
}
