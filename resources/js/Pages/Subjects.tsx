import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, PaginateProps, SubjectType } from '@/types';
import NavigateLink from '@/Components/NavigateLink';
import { useMemo } from 'react';
import usesubjects from '@/Hooks/useSubjects';
import Pagination from '@/Components/Pagination';

type SubjectsProps = {
    subjects: PaginateProps<SubjectType>;
}

export default function Subjects({ auth, subjects }: PageProps<SubjectsProps>) {
    const hasSubjects = useMemo(() => subjects.data.length > 0, [subjects]);

    const {
        handleActive,
        handleDelete,
    } = usesubjects({});

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Materias"
        >
            <Head title="Materias" />

            <NavigateLink name="subjects.create">
                Agregar Materia
            </NavigateLink>

            { hasSubjects ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
                    { subjects.data.map(subject => (
                        <div key={subject.id} className="bg-white shadow p-4 flex flex-col gap-4 justify-between">
                            <Link href={route('subjects.show', { subject })} className="block text-xl font-bold text-indigo-700 uppercase">
                                { subject.subject }
                            </Link>

                            <div className="flex gap-3">
                                <button title={subject.active ? 'Desactivar' : 'Activar' } type="button" className="font-bold transition-colors text-center bg-indigo-700 text-white p-2 hover:bg-indigo-600" onClick={() => handleActive(subject)}>
                                    { subject.active ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="size-6" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.14v14l11-7z"/></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="size-6" viewBox="0 0 24 24"><path fill="currentColor" d="M14 19V5h4v14zm-8 0V5h4v14z"/></svg>
                                    ) }
                                </button>

                                <Link title="Editar" href={route('subjects.edit', { subject })} className="font-bold transition-colors text-center bg-indigo-400 text-white p-2 hover:bg-indigo-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="size-6" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"/></svg>
                                </Link>

                                <button title="Eliminar" type="button" onClick={() => handleDelete(subject.id)} className="font-bold transition-colors text-center bg-indigo-50 text-indigo-700 p-2 hover:bg-indigo-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="size-6" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/></svg>
                                </button>
                            </div>
                        </div>
                    )) }
                </div>
            ) : (
                <p className="text-xl font-bold text-gray-700 my-40 text-center">
                    No Hay Materias Disponibles
                </p>
            ) }

            <Pagination pagination={subjects} />
        </AuthenticatedLayout>
    );
}
