import NavigateLink from '@/Components/NavigateLink';
import TeacherForm from '@/Components/TeacherForm';
import useTeachers from '@/Hooks/useTeachers';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, TeacherType } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

type EditProps = {
    teacher: TeacherType;
}

export default function Create({auth, teacher} : PageProps<EditProps>) {

    const {
        data,
        alerts,
        errors,
        processing,
        setData,
        save,
    } = useTeachers();

    useEffect(() => setData(teacher), []);

    return (
        <AuthenticatedLayout
            header="Editar Profesor"
            user={auth.user}
        >
            <Head title="Editar Profesor" />

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
                btnSubmit="Guardar Cambios"
            />
        </AuthenticatedLayout>
    )
}
