import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[radial-gradient(circle_at_top_left,_rgba(244,91,132,0.25),_transparent_32%),linear-gradient(135deg,_#ffe7ec_0%,_#ffd0da_100%)] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
                <Link
                    href="/"
                    className="flex items-center justify-center mx-auto rounded-full bg-white p-3 shadow-sm ring-1 ring-rose-300"
                >
                    <ApplicationLogo className="size-16 sm:size-20" />
                </Link>
            </div>

            <div className="w-full max-w-md rounded-2xl border border-rose-200 bg-white p-6 shadow-xl shadow-rose-200/50 backdrop-blur-sm transition-all duration-300 sm:p-8">
                {children}
            </div>
        </div>
    );
}
