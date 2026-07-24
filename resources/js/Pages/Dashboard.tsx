import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { PageProps, PaginateProps, PeriodType, TypePayType } from "@/types";
import NavigateLink from "@/Components/NavigateLink";
import Swal from "sweetalert2";
import Pagination from "@/Components/Pagination";
import { useMemo } from "react";
import { formatCurrency } from "@/Helpers";
import usePeriods from "@/Hooks/usePeriods";

type DashboardProps = {
    periods: PaginateProps<
        PeriodType<{
            type_pay: TypePayType;
        }>
    >;
};

export default function Dashboard({
    auth,
    periods,
}: PageProps<DashboardProps>) {
    const hasPeriods = useMemo(() => periods.data.length > 0, [periods]);

    const { handleActive, handleDelete } = usePeriods();

    return (
        <AuthenticatedLayout user={auth.user} header="Periodos">
            <Head title="Periodos" />

            <NavigateLink name="periods.create">Agregar Periodo</NavigateLink>

            {hasPeriods ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                    {periods.data.map((period) => (
                        <div
                            key={period.id}
                            className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl p-5 flex flex-col gap-4 justify-between border border-rose-200"
                        >
                            <div>
                                <Link
                                    href={route("periods.show", { period })}
                                    className="block text-xl font-bold text-rose-700 uppercase"
                                >
                                    {period.start_month} {period.start_year} -{" "}
                                    {period.end_month} {period.end_year}
                                </Link>

                                <p className="text-gray-800 font-bold">
                                    {period.type_pay.type}
                                </p>

                                <p className="text-gray-800 font-bold">
                                    {formatCurrency(period.amount)}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    title={
                                        period.active ? "Desactivar" : "Activar"
                                    }
                                    type="button"
                                    className="font-bold transition-colors text-center bg-rose-700 text-white p-2 hover:bg-rose-600"
                                    onClick={() => handleActive(period)}
                                >
                                    {period.active ? (
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
                                    href={route("periods.edit", { period })}
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

                                <button
                                    title="Eliminar"
                                    type="button"
                                    onClick={() => handleDelete(period.id)}
                                    className="transition-colors bg-rose-100 text-rose-800 p-2 hover:bg-rose-200"
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
                                            d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-xl font-bold text-gray-800 my-40 text-center">
                    No Hay Períodos Disponibles
                </p>
            )}

            <Pagination pagination={periods} />
        </AuthenticatedLayout>
    );
}
