import { PayType, SemesterType, ShiftType, SpecialtyType } from "@/types";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import { setDataByKeyValuePair, setDataByMethod, setDataByObject } from "@/types/global";
import { FormEventHandler, useMemo } from 'react';
import SelectInput from "./SelectInput";
import SubmitButton from "./SubmitButton";
import FormReportContainer from "./FormReportContainer";
import FormItem from "./FormItem";

type RegisterFormProps = {
    semesters: SemesterType[],
    specialties: SpecialtyType[],
    shifts: ShiftType[],
    handleSubmit: FormEventHandler;
    alerts: string[];
    data: PayType;
    setData: setDataByObject<PayType> & setDataByMethod<PayType> & setDataByKeyValuePair<PayType>
    errors: Partial<Record<string, string>>
    processing: boolean;
    btnSubmit: string;
}

export default function RegistrationForm({semesters,handleSubmit, alerts, data, setData, errors, shifts, specialties, processing, btnSubmit} : RegisterFormProps) {
    const semestersValidated = useMemo(() => semesters.filter((semester) => semester.active), [semesters]);

    return (
        <FormReportContainer handleSubmit={handleSubmit}>
            <div>
                { alerts.map((alert, index) => (
                    <InputError key={index} message={alert} />
                )) }
            </div>

            <FormItem>
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
            </FormItem>

            <FormItem>
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
            </FormItem>

            <FormItem>
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
            </FormItem>

            <FormItem>
                <InputLabel htmlFor="code">
                    Número de Control o de Ficha:
                </InputLabel>

                <TextInput
                    type="number"
                    name="code"
                    id="code"
                    placeholder="Número de Control o de Ficha del Alumno"
                    value={data.code}
                    onChange={(e) => setData('code', e.target.value)}
                />

                <InputError message={errors.code} />
            </FormItem>

            <FormItem>
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
            </FormItem>

            <FormItem>
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
                        <option key={semester.id} value={semester.id}>
                            { Number(semester.semester) === 1 ? 'Nuevo Ingreso (Inscripción)' : semester.semester }
                        </option>
                    )) }
                </SelectInput>

                <InputError message={errors.semester_id} />
            </FormItem>

            <FormItem>
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
                        <option key={specialty.id} value={specialty.id}>
                            {specialty.specialty}
                        </option>
                    )) }
                </SelectInput>

                <InputError message={errors.specialty_id} />
            </FormItem>

            <FormItem>
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
                        <option key={shift.id} value={shift.id}>
                            {shift.shift}
                        </option>
                    )) }
                </SelectInput>

                <InputError message={errors.shift_id} />
            </FormItem>

            <SubmitButton value={btnSubmit} disabled={processing} />
        </FormReportContainer>
    )
}
