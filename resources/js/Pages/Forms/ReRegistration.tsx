import ReRegistrationForm from '@/Components/ReRegistrationForm';
import useNormalPay from '@/Hooks/useNormalPay';
import FormLayout from '@/Layouts/FormLayout';
import { PeriodType, SemesterType, ShiftType, SpecialtyType } from '@/types';
import { Head } from '@inertiajs/react';
import {  useEffect } from 'react';

type ReRegistrationProps = {
    specialties: SpecialtyType[];
    shifts: ShiftType[];
    semester: SemesterType;
    period: PeriodType;
};

export default function ReRegistration({specialties, shifts, semester, period} : ReRegistrationProps) {
    const name = `Reinscripción ${semester.semester} Semestre`;

    const {
        data,
        setData,
        errors,
        alerts,
        processing,
        save,
    } = useNormalPay({nameRoute: 're-registration'});

    useEffect(() => setData({...data, period_id: period.id, semester_id: semester.id}), []);

    return (
        <FormLayout title={name} period={period}>
            <Head title={name} />

            <ReRegistrationForm
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
