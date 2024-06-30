import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import SubmitButton from '@/Components/SubmitButton';
import TextInput from '@/Components/TextInput';
import FormLayout from '@/Layouts/FormLayout';
import { PayType, PeriodType, SemesterType, ShiftType, SpecialtyType } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useMemo, useState } from 'react';

type ReRegistrationProps = {
    specialties: SpecialtyType[];
    shifts: ShiftType[];
    semesters: SemesterType[];
    period: PeriodType;
};

export default function ReRegistration({specialties, shifts, semesters, period} : ReRegistrationProps) {
    const [alerts, setAlerts] = useState<string[]>([]);

    const semestersValidated = useMemo(() => semesters.filter((semester) => semester.active && Number(semester.semester) !== 1), [semesters]);

    const {data, setData, post, errors, processing} = useForm<PayType>({
        name: '',
        mother_last_name: '',
        father_last_name: '',
        code: '',
        curp: '',
        semester_id: 0,
        shift_id: 0,
        specialty_id: 0,
        period_id: period.id,
    });

    const handleSubmit : FormEventHandler = (e) => {
        e.preventDefault();
        let currentAlerts : string[] = [];

        const CURP_REGEX = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/

        if(Object.values(data).some(value => value.toString().trim() === '' || value === 0)) {
            currentAlerts = ['Todos los Campos son Obligatorios', ...currentAlerts];
        }

        if(data.code.trim().length !== 14 || isNaN(Number(data.code))) {
            currentAlerts = ['El Numero de Control es Invalido', ...currentAlerts];
        }

        if(!data.curp.match(CURP_REGEX)) {
            currentAlerts = ['El CURP es Invalido', ...currentAlerts];
        }

        setAlerts(currentAlerts)

        if(currentAlerts.length === 0) {
            post(route('re-registration.store'), {
                preserveScroll: true,
                onSuccess(data) {
                    location.href = route('report', {id: data.props.pay});
                }
            })
        }
    }

    return (
        <FormLayout title="Reinscripción" period={period}>
            <Head title="Reinscripción" />

            <div className="my-16 px-4 max-w-4xl mx-auto">
                <form className="bg-white shadow p-6 grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                    <div>
                        { alerts.map((alert, index) => (
                            <InputError key={index} message={alert} />
                        )) }
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor="name">
                            Nombre(s):
                        </InputLabel>

                        <TextInput
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Nombre del Alumno"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />

                        <InputError message={errors.name} />
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor="father_last_name">
                            Apellido Paterno:
                        </InputLabel>

                        <TextInput
                            type="text"
                            name="father_last_name"
                            id="father_last_name"
                            placeholder="Apellido Paterno del Alumno"
                            value={data.father_last_name}
                            onChange={(e) => setData('father_last_name', e.target.value)}
                        />

                        <InputError message={errors.father_last_name} />
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor="mother_last_name">
                            Apellido Materno:
                        </InputLabel>

                        <TextInput
                            type="text"
                            name="mother_last_name"
                            id="mother_last_name"
                            placeholder="Apellido Materno del Alumno"
                            value={data.mother_last_name}
                            onChange={(e) => setData('mother_last_name', e.target.value)}
                        />

                        <InputError message={errors.mother_last_name} />
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor="code">
                            Número de Control:
                        </InputLabel>

                        <TextInput
                            type="number"
                            name="code"
                            id="code"
                            placeholder="Número de Control del Alumno"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                        />

                        <InputError message={errors.code} />
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor="curp">
                            CURP:
                        </InputLabel>

                        <TextInput
                            type="text"
                            name="curp"
                            id="curp"
                            placeholder="CURP del Alumno"
                            value={data.curp}
                            onChange={(e) => setData('curp', e.target.value)}
                        />

                        <InputError message={errors.curp} />
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor="semester_id">
                            Semestre:
                        </InputLabel>

                        <SelectInput
                            name="semester_id"
                            id="semester_id"
                            value={data.semester_id}
                            onChange={(e) => setData('semester_id', Number(e.target.value))}
                        >
                            { semestersValidated.map((semester) => (
                                <option key={semester.id} value={semester.id}>{semester.semester}</option>
                            )) }
                        </SelectInput>

                        <InputError message={errors.semester_id} />
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor="specialty_id">
                            Especialidad:
                        </InputLabel>

                        <SelectInput
                            name="specialty_id"
                            id="specialty_id"
                            value={data.specialty_id}
                            onChange={(e) => setData('specialty_id', Number(e.target.value))}
                        >
                            { specialties.map((specialty) => (
                                <option key={specialty.id} value={specialty.id}>{specialty.specialty}</option>
                            )) }
                        </SelectInput>

                        <InputError message={errors.specialty_id} />
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor="shift_id">
                            Turno:
                        </InputLabel>

                        <SelectInput
                            name="shift_id"
                            id="shift_id"
                            value={data.shift_id}
                            onChange={(e) => setData('shift_id', Number(e.target.value))}
                        >
                            { shifts.map((shift) => (
                                <option key={shift.id} value={shift.id}>{shift.shift}</option>
                            )) }
                        </SelectInput>

                        <InputError message={errors.shift_id} />
                    </div>

                    <SubmitButton value="Confirmar" disabled={processing} />
                </form>
            </div>
        </FormLayout>
    );
}
