import ReRegistrationForm from '@/Components/ReRegistrationForm';
import useReRegistration from '@/Hooks/useReRegistration';
import FormLayout from '@/Layouts/FormLayout';
import { PeriodType, SemesterType, ShiftType, SpecialtyType } from '@/types';
import { Head } from '@inertiajs/react';
import {  useEffect } from 'react';

type ReRegistrationProps = {
    specialties: SpecialtyType[];
    shifts: ShiftType[];
    semesters: SemesterType[];
    period: PeriodType;
};

export default function ReRegistration({specialties, shifts, semesters, period} : ReRegistrationProps) {
    const {
        data,
        setData,
        errors,
        alerts,
        processing,
        save,
    } = useReRegistration();

    useEffect(() => setData('period_id', period.id), []);

    return (
        <FormLayout title="Inscripción/Reinscripción" period={period}>
            <Head title="Inscripción/Reinscripción" />

            <ReRegistrationForm
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
