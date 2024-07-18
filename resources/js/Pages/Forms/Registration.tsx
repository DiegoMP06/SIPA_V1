import RegistrationForm from '@/Components/RegistrationForm';
import useNormalPay from '@/Hooks/useNormalPay';
import FormLayout from '@/Layouts/FormLayout';
import { PeriodType, SemesterType, ShiftType, SpecialtyType } from '@/types';
import { Head } from '@inertiajs/react';
import {  useEffect } from 'react';

type RegistrationProps = {
    specialties: SpecialtyType[];
    shifts: ShiftType[];
    semesters: SemesterType[];
    period: PeriodType;
};

export default function Registration({specialties, shifts, period} : RegistrationProps) {
    const {
        data,
        setData,
        errors,
        alerts,
        processing,
        save,
    } = useNormalPay({nameRoute: 'registration'});

    useEffect(() => setData({...data, period_id: period.id, semester_id: 1}), []);

    return (
        <FormLayout title="Ficha de Nuevo Ingreso" period={period}>
            <Head title="Ficha de Nuevo Ingreso" />

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
