import ExtraordinaryPaymentForm from '@/Components/ExtraordinaryPaymentForm';
import useExtraordinaryPay from '@/Hooks/useExtraordinaryPay';
import FormLayout from '@/Layouts/FormLayout';
import { PeriodType, SemesterType, ShiftType, SpecialtyType } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

type ExtraordinaryExamProps = {
    specialties: SpecialtyType[];
    shifts: ShiftType[];
    semesters: SemesterType[];
    period: PeriodType;
};

export default function ExtraordinaryExam({specialties, shifts, semesters, period} : ExtraordinaryExamProps) {
    const {
        data,
        setData,
        save,
        alerts,
        errors,
        processing,
        currentTeachers,
        subjects
    } = useExtraordinaryPay({nameRoute: 'extraordinary-exam'});

    useEffect(() => setData('period_id', period.id), []);

    return (
        <FormLayout title="Solicitud de Examen Extraordinario" period={period}>
            <Head title="Solicitud de Examen Extraordinario" />

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
                btnSubmit="Confirmar"
                currentTeachers={currentTeachers}
                subjects={subjects}
            />
        </FormLayout>
    );
}
