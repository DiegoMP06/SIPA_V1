import ExtraordinaryPaymentForm from "@/Components/ExtraordinaryPaymentForm";
import useExtraordinaryPay from "@/Hooks/useExtraordinaryPay";
import FormLayout from "@/Layouts/FormLayout";
import { ExtraordinaryPaymentType, PayType, PeriodType, SemesterType, ShiftType, SpecialtyType, SubjectType, TeacherType} from "@/types";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";

type EditExtraordinaryExamProps = {
    specialties: SpecialtyType[];
    shifts: ShiftType[];
    semesters: SemesterType[];
    period: PeriodType;
    pay: PayType;
    extraordinaryPayment: ExtraordinaryPaymentType;
};

export default function EditExtraordinaryExam({specialties, shifts, semesters, period, pay, extraordinaryPayment}: EditExtraordinaryExamProps) {
    const {
        data,
        setData,
        save,
        alerts,
        errors,
        processing,
        currentTeachers,
        subjects,
    } = useExtraordinaryPay({nameRoute: 'extraordinary-exam'});

    useEffect(() => {
        const {
            id,
            name,
            father_last_name,
            mother_last_name,
            code,
            curp,
            specialty_id,
            shift_id,
            period_id,
            semester_id,
            created_at,
            updated_at,
        } = pay;

        const {
            subject_id,
            teacher_id,
        } = extraordinaryPayment;

        setData({
            id,
            name,
            mother_last_name,
            father_last_name,
            code,
            curp,
            specialty_id,
            shift_id,
            period_id,
            semester_id,
            created_at,
            updated_at,
            subject_id,
            teacher_id,
        })
    }, []);

    return (
        <FormLayout title="Editar Solicitud de Examen Extraordinario" period={period}>
            <Head title="Editar Solicitud de Examen Extraordinario" />

            <ExtraordinaryPaymentForm
                semesters={semesters}
                specialties={specialties}
                shifts={shifts}
                handleSubmit={save}
                alerts={alerts}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                btnSubmit="Guardar Cambios"
                currentTeachers={currentTeachers}
                subjects={subjects}
            />
        </FormLayout>
    );
}
