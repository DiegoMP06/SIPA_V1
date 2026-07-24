import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, SubjectType, TeacherType } from "@/types";
import { Head, Link } from "@inertiajs/react";
import NavigateLink from "@/Components/NavigateLink";
import { useMemo } from "react";
import useSubjectsTeachers from "@/Hooks/useSubjectsTeachers";

type ShowProps = {
    teacher: TeacherType;
    subjects: SubjectType<{
        pivot: {
            id: number;
            teacher_id: number;
            subject_id: number;
        };
    }>[];
};

export default function Show({
    auth,
    teacher,
    subjects,
}: PageProps<ShowProps>) {
    const hasSubjects = useMemo(() => subjects.length > 0, [subjects]);
    const title = `${teacher.name} ${teacher.father_last_name} ${teacher.mother_last_name}`;

    const { handleDelete } = useSubjectsTeachers({});

    return (
        <AuthenticatedLayout header={title} user={auth.user}>
            <Head title={title} />

            <NavigateLink name="teachers.index">Volver</NavigateLink>

            <div className="my-16 bg-white rounded-2xl p-6 shadow-md border border-rose-200 space-y-6 max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-800">Detalles:</h2>

                <div>
                    <p className="text-rose-700 font-bold text-xl">
                        Profesor {teacher.active ? "Activo" : "No Activo"}
                    </p>
                </div>
            </div>

            <section className="space-y-8 my-16">
                <h2 className="text-2xl font-bold text-rose-700">
                    Materias del Profesor:
                </h2>

                <div>
                    {hasSubjects ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {subjects.map((subject) => (
                                <div
                                    key={subject.id}
                                    className="p-5 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl flex items-center justify-between gap-4 border border-rose-200"
                                >
                                    <Link
                                        href={route("subjects.show", {
                                            subject: subject.id,
                                        })}
                                        className="font-bold text-gray-800 text-lg"
                                    >
                                        {subject.subject}
                                    </Link>

                                    <button
                                        type="button"
                                        className="transition-colors bg-rose-100 text-rose-800 p-2 hover:bg-rose-200"
                                        title="Quitar Materia"
                                        onClick={() =>
                                            handleDelete(subject.pivot.id)
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="128"
                                            height="128"
                                            className="size-6"
                                            viewBox="0 0 100 100"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M84.707 68.752L65.951 49.998l18.75-18.752a1.989 1.989 0 0 0 0-2.813L71.566 15.295a1.99 1.99 0 0 0-2.814 0L49.999 34.047l-18.75-18.752c-.746-.747-2.067-.747-2.814 0L15.297 28.431a1.992 1.992 0 0 0 0 2.814L34.05 49.998L15.294 68.753a1.993 1.993 0 0 0 0 2.814L28.43 84.704a1.988 1.988 0 0 0 2.814 0l18.755-18.755l18.756 18.754c.389.388.896.583 1.407.583s1.019-.195 1.408-.583l13.138-13.137a1.99 1.99 0 0 0-.001-2.814"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-800 font-bold text-xl text-center my-40">
                            No Hay Materias Enlazadas
                        </p>
                    )}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
