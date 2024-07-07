import NavigateLink from '@/Components/NavigateLink';
import SubjectForm from '@/Components/SubjectForm';
import usesubjects from '@/Hooks/useSubjects';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, SubjectType } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

type EditProps = {
    subject: SubjectType;
}

export default function Create({auth, subject} : PageProps<EditProps>) {
    const {
        alerts,
        data,
        errors,
        processing,
        save,
        setData,
    } = usesubjects({});

    useEffect(() => setData(subject), []);

    return (
        <AuthenticatedLayout
            header="Editar Materia"
            user={auth.user}
        >
            <Head title="Editar Materia" />

            <NavigateLink name="subjects.index">
                Volver
            </NavigateLink>

            <SubjectForm
                handleSubmit={save}
                alerts={alerts}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                btnSubmit="Guardar Cambios"
                edit={true}
            />
        </AuthenticatedLayout>
    )
}
