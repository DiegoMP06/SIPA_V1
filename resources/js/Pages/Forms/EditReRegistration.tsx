import ReRegistration from "@/Components/ReRegistrationForm";
import useReRegistration from "@/Hooks/useReRegistration";
import FormLayout from "@/Layouts/FormLayout";
import { PayType, PeriodType, SemesterType, ShiftType, SpecialtyType} from "@/types";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";

type EditReRegistrationProps = {
    specialties: SpecialtyType[];
    shifts: ShiftType[];
    semesters: SemesterType[];
    period: PeriodType;
    pay: PayType;
};

export default function EditReRegistration({specialties, shifts, semesters, period, pay}: EditReRegistrationProps) {
    const {
        data,
        setData,
        errors,
        alerts,
        processing,
        save,
    } = useReRegistration();

    useEffect(() => setData(pay), []);

    return (
        <FormLayout title="Editar Ficha de Inscripción/Reinscripción" period={period}>
            <Head title="Editar Ficha de Inscripción/Reinscripción" />

            <ReRegistration
                semesters={semesters}
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
