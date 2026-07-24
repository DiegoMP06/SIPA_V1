import { useState, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";

type AuthenticatedLayoutProps = {
    user: User;
    header: string;
    children: ReactNode;
};

export default function Authenticated({
    user,
    header,
    children,
}: AuthenticatedLayoutProps) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,91,132,0.18),_transparent_32%),linear-gradient(135deg,_#ffe7ec_0%,_#fff_100%)]">
            <nav className="border-b border-rose-200 bg-white/95 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center">
                            <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-rose-500 rounded-full">
                                <ApplicationLogo className="block size-10 md:size-14" />
                            </Link>
                        </div>

                        <div className="hidden space-x-6 sm:-my-px sm:ms-2 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Periodos
                                </NavLink>
                                <NavLink
                                    href={route("semesters.index")}
                                    active={route().current("semesters.index")}
                                >
                                    Semestres
                                </NavLink>
                                <NavLink
                                    href={route("subjects.index")}
                                    active={route().current("subjects.index")}
                                >
                                    Materias
                                </NavLink>
                                <NavLink
                                    href={route("teachers.index")}
                                    active={route().current("teachers.index")}
                                >
                                    Profesores
                                </NavLink>
                                <NavLink
                                    href={route("specialties.index")}
                                    active={route().current(
                                        "specialties.index",
                                    )}
                                >
                                    Especialidades
                                </NavLink>
                                <NavLink
                                    href={route("type-pays.index")}
                                    active={route().current("type-pays.index")}
                                >
                                    Tipos de Pago
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-full">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-full border border-rose-300 bg-rose-100 px-3 py-2 text-sm font-medium text-rose-800 transition hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                                            >
                                                {user.name}
                                                <svg
                                                    className="ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Perfil
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Cerrar Sesión
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-full p-2 text-rose-800 transition hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                            >
                                <svg
                                    className="size-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Periodos
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("semesters.index")}
                            active={route().current("semesters.index")}
                        >
                            Semestres
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("subjects.index")}
                            active={route().current("subjects.index")}
                        >
                            Materias
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("teachers.index")}
                            active={route().current("teachers.index")}
                        >
                            Profesores
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("specialties.index")}
                            active={route().current("specialties.index")}
                        >
                            Especialidades
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("type-pays.index")}
                            active={route().current("type-pays.index")}
                        >
                            Tipos de Pago
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-rose-200 px-4 pb-3 pt-4">
                        <div className="font-medium text-base text-slate-800">
                            {user.name}
                        </div>
                        <div className="text-sm text-slate-600">
                            {user.email}
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Perfil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Cerrar Sesión
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <header className="border-b border-rose-200 bg-white/95">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-2xl font-bold text-slate-800">
                        {header}
                    </h1>
                </div>
            </header>

            <main className="container mx-auto my-10 px-4 py-2 sm:my-16">
                {children}
            </main>
        </div>
    );
}
