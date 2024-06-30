import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { PageProps, PaginateProps, PeriodType } from '@/types';
import NavigateLink from '@/Components/NavigateLink';
import Swal from 'sweetalert2';
import Pagination from '@/Components/Pagination';
import { useMemo } from 'react';

type DashboardProps = {
    periods: PaginateProps<PeriodType>;
}

export default function Dashboard({ auth, periods }: PageProps<DashboardProps>) {
    const hasPeriods = useMemo(() => periods.data.length > 0, [periods]);

    const handleDelete = (id: PeriodType['id']) => {
        Swal.fire({
            title: "Atención",
            text: "¿Desea eliminar el periodo?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: 'No, Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('periods.destroy', { period: id }), {
                    preserveScroll: true,
                    onSuccess() {
                        Swal.fire({
                            title: "Exito",
                            text: "El Periodo se Elimino Correctamente",
                            icon: "success"
                        });
                    },
                    onError() {
                        Swal.fire({
                            title: "Error",
                            text: "Ocurrio un Error al Eliminar el Periodo",
                            icon: "error"
                        });
                    }
                })
            }
        });
    }

    const handleActive = (period: PeriodType) => {
        Swal.fire({
            title: "Atencion",
            text: period.active ? "¿Desea desactivar el periodo?" : "¿Desea activar el periodo?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: 'No, Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.patch(route('periods.update', { period }), {...period, active: !period.active, dashboard: true}, {
                    preserveScroll: true,
                    onSuccess() {
                        Swal.fire({
                            title: "Exito",
                            text: "El Periodo se Actualizo Correctamente",
                            icon: "success"
                        });
                    },
                    onError() {
                        Swal.fire({
                            title: "Error",
                            text: "Ocurrio un Error al Actualizar el Periodo",
                            icon: "error"
                        });
                    }
                });
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Periodos"
        >
            <Head title="Periodos" />

            <NavigateLink name="periods.create">
                Agregar Periodo
            </NavigateLink>

            { hasPeriods ?
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
                    { periods.data.map(period => (
                        <div key={period.id} className="bg-white shadow p-4 space-y-4">
                            <Link href={route('periods.show', { period })} className="block text-xl font-bold text-indigo-700 uppercase">
                                Período { period.start_month } { period.start_year } - { period.end_month } { period.end_year }
                            </Link>

                            <div className="flex gap-3">
                                <button title={period.active ? 'Desactivar' : 'Activar' } type="button" className="font-bold transition-colors text-center bg-indigo-700 text-white p-2 hover:bg-indigo-600" onClick={() => handleActive(period)}>
                                    { period.active ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="size-6" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.14v14l11-7z"/></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="size-6" viewBox="0 0 24 24"><path fill="currentColor" d="M14 19V5h4v14zm-8 0V5h4v14z"/></svg>
                                    ) }
                                </button>

                                <Link title="Editar" href={route('periods.edit', { period })} className="font-bold transition-colors text-center bg-indigo-400 text-white p-2 hover:bg-indigo-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="size-6" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"/></svg>
                                </Link>

                                <button title="Eliminar" type="button" onClick={() => handleDelete(period.id)} className="font-bold transition-colors text-center bg-indigo-50 text-indigo-700 p-2 hover:bg-indigo-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="size-6" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/></svg>
                                </button>
                            </div>

                        </div>
                    )) }
                </div>
                 :
                <p className="text-xl font-bold text-gray-600 my-40 text-center">
                    No Hay Peridos Disponibles
                </p>
             }


            <Pagination pagination={periods} />
        </AuthenticatedLayout>
    );
}
