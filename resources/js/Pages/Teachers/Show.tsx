import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, SubjectType, TeacherType } from '@/types';
import { Head, Link } from '@inertiajs/react';
import NavigateLink from '@/Components/NavigateLink';
import { useMemo } from 'react';
import useSubjectsTeachers from '@/Hooks/useSubjectsTeachers';

type ShowProps = {
    teacher: TeacherType;
    subjects: SubjectType<{
        pivot: {
            id: number;
            teacher_id: number;
            subject_id: number;
        };
    }>[];
}

export default function Show({auth, teacher, subjects} : PageProps<ShowProps>) {
    const hasSubjects = useMemo(() => subjects.length > 0, [subjects]);
    const title =`${teacher.name} ${teacher.father_last_name} ${teacher.mother_last_name}`;

    const {
        handleDelete,
    } = useSubjectsTeachers({});

    return (
        <AuthenticatedLayout header={title} user={auth.user}>
            <Head title={title} />

            <NavigateLink name="teachers.index" >
                Volver
            </NavigateLink>

            <div className="my-16 bg-white p-4 shadow space-y-6 max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-700">
                    Detalles:
                </h2>

                <div>
                    <p className="text-indigo-700 font-bold text-xl">
                        Profesor { teacher.active ? 'Activo' : 'No Activo' }
                    </p>

                    <p className="text-indigo-700 font-bold text-xl">
                        Correo Electronico: { '' }
                        <span className="text-gray-700">
                            { teacher.email }
                        </span>
                    </p>

                    <p className="text-indigo-700 font-bold text-xl">
                        Número de Telefono: { '' }
                        <span className="text-gray-700">
                            { teacher.phone }
                        </span>
                    </p>
                </div>
            </div>

            <section className="space-y-8 my-16">
                <h2 className="text-2xl font-bold text-indigo-700">
                    Materias del Profesor:
                </h2>

                <div>
                    { hasSubjects ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            { subjects.map(subject => (
                                <div key={subject.id} className="p-4 bg-white shadow-md flex items-center justify-between gap-4">
                                    <Link href={route('subjects.show', {subject: subject.id})} className="font-bold text-gray-700 text-lg">
                                        { subject.subject }
                                    </Link>

                                    <button
                                        type="button"
                                        className="transition-colors bg-indigo-50 text-indigo-700 p-2 hover:bg-indigo-100"
                                        title="Quitar Materia"
                                        onClick={() => handleDelete(subject.pivot.id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="size-6" viewBox="0 0 100 100"><path fill="currentColor" d="M84.707 68.752L65.951 49.998l18.75-18.752a1.989 1.989 0 0 0 0-2.813L71.566 15.295a1.99 1.99 0 0 0-2.814 0L49.999 34.047l-18.75-18.752c-.746-.747-2.067-.747-2.814 0L15.297 28.431a1.992 1.992 0 0 0 0 2.814L34.05 49.998L15.294 68.753a1.993 1.993 0 0 0 0 2.814L28.43 84.704a1.988 1.988 0 0 0 2.814 0l18.755-18.755l18.756 18.754c.389.388.896.583 1.407.583s1.019-.195 1.408-.583l13.138-13.137a1.99 1.99 0 0 0-.001-2.814"/></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-700 font-bold text-xl text-center my-40">
                            No Hay Materias Enlazadas
                        </p>
                    ) }
                </div>
            </section>
        </AuthenticatedLayout>
    )
}
