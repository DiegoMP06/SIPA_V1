import RegistrationForm from "@/Components/RegistrationForm";
import useNormalPay from "@/Hooks/useNormalPay";
import FormLayout from "@/Layouts/FormLayout";
import {
    PayType,
    PeriodType,
    SemesterType,
    ShiftType,
    SpecialtyType,
} from "@/types";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";

type EditRegistrationProps = {
    specialties: SpecialtyType[];
    shifts: ShiftType[];
    semesters: SemesterType[];
    period: PeriodType;
    pay: PayType;
};

export default function EditRegistration({
    specialties,
    shifts,
    period,
    pay,
}: EditRegistrationProps) {
    const { data, setData, errors, alerts, processing, save } = useNormalPay({
        nameRoute: "registration",
    });

    useEffect(() => setData(pay), []);

    return (
        <FormLayout
            title="Editar Comprobante de Aportacion Voluntaria de Nuevo Ingreso"
            period={period}
        >
            <Head title="Editar Comprobante de Aportacion Voluntaria de Nuevo Ingreso" />

            <RegistrationForm
                specialties={specialties}
                shifts={shifts}
                handleSubmit={save}
                alerts={alerts}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                btnSubmit="Confirmar"
            />
        </FormLayout>
    );
}
