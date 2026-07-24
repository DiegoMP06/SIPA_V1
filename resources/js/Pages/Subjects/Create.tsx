import NavigateLink from '@/Components/NavigateLink';
import SubjectForm from '@/Components/SubjectForm';
import usesubjects from '@/Hooks/useSubjects';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, SemesterType, SpecialtyType } from '@/types';
import { Head } from '@inertiajs/react';

type CreateProps = {
    specialties: SpecialtyType[];
    semesters: SemesterType[];
};

export default function Create({auth, semesters, specialties} : PageProps<CreateProps>) {
    const {
        alerts,
        data,
        errors,
        processing,
        semestersOptions,
        save,
        setData,
        activeSemester,
        addSpecialty,
        isOpen,
    } = usesubjects({semesters});

    return (
        <AuthenticatedLayout
            header="Agregar Materia"
            user={auth.user}
        >
            <Head title="Agregar Materia" />

            <NavigateLink name="subjects.index">
                Volver
            </NavigateLink>

            <SubjectForm
                alerts={alerts}
                btnSubmit="Agregar Materia"
                data={data}
                errors={errors}
                handleSubmit={save}
                processing={processing}
                setData={setData}
                activeSemester={activeSemester}
                addSpecialty={addSpecialty}
                isOpen={isOpen}
                semestersOptions={semestersOptions}
                specialties={specialties}
            />
        </AuthenticatedLayout>
    )
}
