import NavigateLink from '@/Components/NavigateLink';
import TeacherForm from '@/Components/TeacherForm';
import useTeachers from '@/Hooks/useTeachers';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function Create({auth} : PageProps) {
    const {
        data,
        alerts,
        errors,
        processing,
        setData,
        save,
    } = useTeachers();

    return (
        <AuthenticatedLayout
            header="Agregar Profesor"
            user={auth.user}
        >
            <Head title="Agregar Profesor" />

            <NavigateLink name="teachers.index">
                Volver
            </NavigateLink>

            <TeacherForm
                handleSubmit={save}
                data={data}
                setData={setData}
                alerts={alerts}
                errors={errors}
                processing={processing}
                btnSubmit="Agregar Profesor"
            />
        </AuthenticatedLayout>
    )
}
