import ReRegistration from "@/Components/ReRegistrationForm";
import useNormalPay from "@/Hooks/useNormalPay";
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

export default function EditReRegistration({specialties, shifts, period, pay, semesters}: EditReRegistrationProps) {
    const {
        data,
        setData,
        errors,
        alerts,
        processing,
        save,
    } = useNormalPay({nameRoute: 're-registration'});

    useEffect(() => setData(pay), []);

    return (
        <FormLayout title="Editar Ficha de Reinscripción" period={period}>
            <Head title="Editar Ficha de Reinscripción" />

            <ReRegistration
                specialties={specialties}
                shifts={shifts}
                handleSubmit={save}
                alerts={alerts}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                btnSubmit="Confirmar"
                semesters={semesters}
                edit={true}
            />
        </FormLayout>
    );
}
