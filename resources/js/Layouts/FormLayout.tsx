import { ReactNode } from "react";
import LOGO211 from '@/Assets/logo_211.webp';
import DGETI from '@/Assets/dgeti.webp';
import SEP from '@/Assets/sep.webp';
import { Link } from "@inertiajs/react";
import { PeriodType } from "@/types";

type FormLayoutProps = {
  children: ReactNode;
  title: string;
  period: PeriodType;
}

export default function FormLayout({ children, title, period } : FormLayoutProps) {
  return (
    <>
        <header className="max-w-4xl mx-auto px-4 mt-6">
            <div className="flex p-4 bg-white shadow-lg rounded-2xl items-center justify-between gap-4 border border-rose-200">
                <picture>
                    <img
                        src={LOGO211}
                        alt="Logo del cbtis 211"
                        title="Logo del cbtis 211"
                        loading="eager"
                        decoding="async"
                        width="100"
                        height="100"
                        className="block h-10 w-auto md:h-16"
                    />
                </picture>

                <div>
                    <p className="text-xl font-bold text-gray-700 md:text-2xl text-center">
                        SIPA 211
                    </p>

                    <p className="text-lg font-bold text-gray-700 text-center text-wrap">
                        { period.start_month } { period.start_year } - { period.end_month } { period.end_year }
                    </p>
                </div>

                <picture>
                    <img
                        src={DGETI}
                        alt="Logo de la Dgeti"
                        title="Logo de la Dgeti"
                        loading="eager"
                        decoding="async"
                        width="100"
                        height="100"
                        className="block h-10 w-auto md:h-16 "
                    />
                </picture>
            </div>
        </header>

        <div className="max-w-4xl my-6 px-4 mx-auto">
            <Link href={route('home')} className="bg-rose-700 hover:bg-rose-600 text-white font-bold py-2 px-4 inline-block">
                Volver
            </Link>
        </div>

        <h1 className="text-4xl font-bold text-center text-rose-700 px-4">
            { title }
        </h1>

        { children }

        <section className="max-w-4xl mx-auto px-4 py-6 mt-16 border-t-2 border-rose-300 flex justify-around gap-4">
            <picture>
                <img
                    src={LOGO211}
                    alt="Logo del cbtis 211"
                    title="Logo del cbtis 211"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="600"
                    className="block max-h-20 w-auto grayscale"
                />
            </picture>

            <picture>
                <img
                    src={SEP}
                    alt="Logo de la sep"
                    title="Logo de la sep"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="600"
                    className="block max-h-20 w-auto grayscale"
                />
            </picture>

            <picture>
                <img
                    src={DGETI}
                    alt="Logo de la Dgeti"
                    title="Logo de la Dgeti"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="600"
                    className="block max-h-20 w-auto grayscale"
                />
            </picture>
        </section>

        <footer className="bg-rose-700">
            <p className="max-w-4xl text-lg lg:text-xl font-bold text-center mx-auto px-4 py-3 text-white">
                Todos los Derechos Reservados CBTis No. 211 { new Date().getFullYear() }&copy;. Made by Diego Meneses.
            </p>
        </footer>
    </>
  )
}
