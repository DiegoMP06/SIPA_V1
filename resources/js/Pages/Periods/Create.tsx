import NavigateLink from '@/Components/NavigateLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, TypePayType } from '@/types';
import { Head } from '@inertiajs/react';
import PeriodForm from '@/Components/PeriodForm';
import usePeriods from '@/Hooks/usePeriods';

type CreateProps = {
    typePays: TypePayType[];
};

export default function Create({auth, typePays} : PageProps<CreateProps>) {
    const {
        alerts,
        data,
        setData,
        processing,
        errors,
        save,
    } = usePeriods()

    return (
        <AuthenticatedLayout
            header="Agregar Periodo"
            user={auth.user}
        >
            <Head title="Agregar Periodo" />

            <NavigateLink name="dashboard">
                Volver
            </NavigateLink>

            <PeriodForm
                handleSubmit={save}
                alerts={alerts}
                data={data}
                setData={setData}
                errors={errors}
                typePays={typePays}
                processing={processing}
                btnSubmit="Agregar Periodo"
            />
        </AuthenticatedLayout>
    )
}

