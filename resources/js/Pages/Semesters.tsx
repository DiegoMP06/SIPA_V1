import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, SemesterType } from '@/types';
import { Head, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

type SemestersProps = {
    semesters: SemesterType[];
}

export default function Semesters({auth, semesters} : PageProps<SemestersProps>) {
    const handleActive = (semester: SemesterType) => {
        Swal.fire({
            title: "Atencion",
            text: semester.active ? "¿Desea desactivar el Semestre?" : "¿Desea activar el Semestre?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: 'No, Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.patch(route('semesters.update', { semester }), {...semester, active: !semester.active}, {
                    preserveScroll: true,
                    onSuccess() {
                        Swal.fire({
                            title: "Exito",
                            text: "El Semestre se Actualizo Correctamente",
                            icon: "success"
                        });
                    },
                    onError() {
                        Swal.fire({
                            title: "Error",
                            text: "Ocurrio un Error al Actualizar el Semestre",
                            icon: "error"
                        });
                    }
                });
            }
        });
    }

    return (
        <AuthenticatedLayout
            header="Semestres"
            user={auth.user}
        >
            <Head title="Semestres" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                { semesters.map(semester => (
                    <div key={semester.id} className="bg-white p-5 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl flex gap-4 justify-between items-center border border-rose-200">
                        <h3 className="text-2xl font-bold text-rose-700 uppercase">
                            { semester.semester } { semester.group }
                        </h3>

                        <button title={semester.active ? 'Desactivar' : 'Activar' } type="button" className="font-bold transition-colors text-center bg-rose-700 text-white p-2 hover:bg-rose-600" onClick={() => handleActive(semester)}>
                            { semester.active ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="size-6" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.14v14l11-7z"/></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="size-6" viewBox="0 0 24 24"><path fill="currentColor" d="M14 19V5h4v14zm-8 0V5h4v14z"/></svg>
                            ) }
                        </button>
                    </div>
                )) }
            </div>
        </AuthenticatedLayout>
    )
}
