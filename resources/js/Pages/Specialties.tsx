import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps, PaginateProps, SpecialtyType } from "@/types";
import NavigateLink from "@/Components/NavigateLink";
import Pagination from "@/Components/Pagination";
import { useMemo } from "react";
import useSpecialties from "@/Hooks/useSpecialties";

type SpecialtiesProps = {
    specialties: PaginateProps<SpecialtyType>;
};

export default function Specialties({
    auth,
    specialties,
}: PageProps<SpecialtiesProps>) {
    const hasSpecialties = useMemo(
        () => specialties.data.length > 0,
        [specialties],
    );
    const { handleActive } = useSpecialties();

    return (
        <AuthenticatedLayout user={auth.user} header="Especialidades">
            <Head title="Especialidades" />

            <NavigateLink name="specialties.create">
                Agregar Especialidad
            </NavigateLink>

            {hasSpecialties ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                    {specialties.data.map((specialty) => (
                        <div
                            key={specialty.id}
                            className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl p-5 flex flex-col gap-4 justify-between border border-rose-200"
                        >
                            <div>
                                <p className="text-xl font-bold text-rose-700 uppercase">
                                    {specialty.specialty}
                                </p>
                                <p className="text-gray-800 font-bold">
                                    Código: {specialty.code}
                                </p>
                                <p className="text-gray-800 font-bold">
                                    Estado:{" "}
                                    {specialty.active ? "Activo" : "Inactivo"}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    title={
                                        specialty.active
                                            ? "Desactivar"
                                            : "Activar"
                                    }
                                    type="button"
                                    className="font-bold transition-colors text-center bg-rose-700 text-white p-2 hover:bg-rose-600"
                                    onClick={() => handleActive(specialty)}
                                >
                                    {specialty.active ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="128"
                                            height="128"
                                            className="size-6"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M8 5.14v14l11-7z"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="128"
                                            height="128"
                                            className="size-6"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M14 19V5h4v14zm-8 0V5h4v14z"
                                            />
                                        </svg>
                                    )}
                                </button>

                                <Link
                                    title="Editar"
                                    href={route("specialties.edit", {
                                        specialty,
                                    })}
                                    className="font-bold transition-colors text-center bg-rose-500 text-white p-2 hover:bg-rose-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="128"
                                        height="128"
                                        className="size-6"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-xl font-bold text-gray-800 my-40 text-center">
                    No Hay Especialidades Disponibles
                </p>
            )}

            <Pagination pagination={specialties} />
        </AuthenticatedLayout>
    );
}
