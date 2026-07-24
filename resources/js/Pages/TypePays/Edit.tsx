import NavigateLink from "@/Components/NavigateLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps, TypePayType } from "@/types";
import TypePayForm from "@/Components/TypePayForm";
import useTypePays from "@/Hooks/useTypePays";
import { useEffect } from "react";

type EditProps = {
    typePay: TypePayType;
};

export default function Edit({ auth, typePay }: PageProps<EditProps>) {
    const { alerts, data, setData, processing, errors, save } = useTypePays();

    useEffect(() => {
        setData(typePay);
    }, [typePay]);

    return (
        <AuthenticatedLayout header="Editar Tipo de Pago" user={auth.user}>
            <Head title="Editar Tipo de Pago" />

            <NavigateLink name="type-pays.index">Volver</NavigateLink>

            <TypePayForm
                alerts={alerts}
                btnSubmit="Guardar Cambios"
                data={data}
                errors={errors}
                handleSubmit={save}
                processing={processing}
                setData={setData}
                edit
            />
        </AuthenticatedLayout>
    );
}
