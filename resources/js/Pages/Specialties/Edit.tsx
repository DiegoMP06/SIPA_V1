import NavigateLink from "@/Components/NavigateLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps, SpecialtyType } from "@/types";
import SpecialtyForm from "@/Components/SpecialtyForm";
import useSpecialties from "@/Hooks/useSpecialties";
import { useEffect } from "react";

type EditProps = {
    specialty: SpecialtyType;
};

export default function Edit({ auth, specialty }: PageProps<EditProps>) {
    const { alerts, data, setData, processing, errors, save } =
        useSpecialties();

    useEffect(() => {
        setData(specialty);
    }, [specialty]);

    return (
        <AuthenticatedLayout header="Editar Especialidad" user={auth.user}>
            <Head title="Editar Especialidad" />

            <NavigateLink name="specialties.index">Volver</NavigateLink>

            <SpecialtyForm
                alerts={alerts}
                btnSubmit="Guardar Cambios"
                data={data}
                errors={errors}
                handleSubmit={save}
                processing={processing}
                setData={setData}
            />
        </AuthenticatedLayout>
    );
}
