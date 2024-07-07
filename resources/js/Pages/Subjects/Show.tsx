import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ClassroomType, PageProps, SemesterType, SpecialtyType, SubjectType, TeacherType } from '@/types';
import { Head } from '@inertiajs/react';
import NavigateLink from '@/Components/NavigateLink';
import Classrooms from './Partials/Classrooms';
import Teachers from './Partials/Teachers';

type ShowProps = {
    subject: SubjectType;
    classrooms: ClassroomType<{
        specialty: SpecialtyType;
        semester: SemesterType;
    }>[];
    semesters: SemesterType[];
    specialties: SpecialtyType[];
    teachers: TeacherType<{
        pivot: {
            id: number;
            teacher_id: number;
            subject_id: number;
        }
    }>[];
}

export default function Show({auth, subject, classrooms, specialties, semesters, teachers} : PageProps<ShowProps>) {
    const title = subject.subject;

    return (
        <AuthenticatedLayout header={title} user={auth.user}>
            <Head title={title} />

            <NavigateLink name="subjects.index" >
                Volver
            </NavigateLink>

            <div className="bg-white p-4 shadow space-y-6 max-w-2xl my-16">
                <h2 className="text-3xl font-bold text-gray-700">
                    Detalles:
                </h2>

                <p className="text-indigo-700 font-bold text-xl">
                    Materia { subject.active ? 'Activa' : 'No Activa' }
                </p>
            </div>

            <Classrooms
                classrooms={classrooms}
                specialties={specialties}
                semesters={semesters}
                subject={subject}
            />

            <Teachers
                subject={subject}
                currentTeachers={teachers}
            />
        </AuthenticatedLayout>
    )
}
