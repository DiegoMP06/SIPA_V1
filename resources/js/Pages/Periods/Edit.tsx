import NavigateLink from '@/Components/NavigateLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, PeriodType, TypePayType } from '@/types';
import { Head } from '@inertiajs/react';
import PeriodForm from '@/Components/PeriodForm';
import usePeriods from '@/Hooks/usePeriods';
import { useEffect } from 'react';

type EditProps = {
    period: PeriodType;
    typePays: TypePayType[];
}

export default function Create({auth, period, typePays} : PageProps<EditProps>) {
    const {
        alerts,
        data,
        setData,
        processing,
        errors,
        save,
    } = usePeriods()

    useEffect(() => {
        const {active, created_at, updated_at, ...periodCopy} = period;
        setData(periodCopy)
    }, []);

    return (
        <AuthenticatedLayout
            header="Editar Periodo"
            user={auth.user}
        >
            <Head title="Editar Periodo" />

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
                btnSubmit="Guardar Cambios"
                edit={true}
            />
        </AuthenticatedLayout>
    )
}
