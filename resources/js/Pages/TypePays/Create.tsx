import NavigateLink from "@/Components/NavigateLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import TypePayForm from "@/Components/TypePayForm";
import useTypePays from "@/Hooks/useTypePays";

export default function Create({ auth }: PageProps) {
    const { alerts, data, setData, processing, errors, save } = useTypePays();

    return (
        <AuthenticatedLayout header="Agregar Tipo de Pago" user={auth.user}>
            <Head title="Agregar Tipo de Pago" />

            <NavigateLink name="type-pays.index">Volver</NavigateLink>

            <TypePayForm
                alerts={alerts}
                btnSubmit="Agregar Tipo de Pago"
                data={data}
                errors={errors}
                handleSubmit={save}
                processing={processing}
                setData={setData}
            />
        </AuthenticatedLayout>
    );
}
