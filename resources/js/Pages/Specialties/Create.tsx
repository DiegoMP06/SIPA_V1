import NavigateLink from "@/Components/NavigateLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import SpecialtyForm from "@/Components/SpecialtyForm";
import useSpecialties from "@/Hooks/useSpecialties";

export default function Create({ auth }: PageProps) {
    const { alerts, data, setData, processing, errors, save } =
        useSpecialties();

    return (
        <AuthenticatedLayout header="Agregar Especialidad" user={auth.user}>
            <Head title="Agregar Especialidad" />

            <NavigateLink name="specialties.index">Volver</NavigateLink>

            <SpecialtyForm
                alerts={alerts}
                btnSubmit="Agregar Especialidad"
                data={data}
                errors={errors}
                handleSubmit={save}
                processing={processing}
                setData={setData}
            />
        </AuthenticatedLayout>
    );
}
