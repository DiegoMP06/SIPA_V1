import { PayType, SemesterType, ShiftType, SpecialtyType, SubjectType, TeacherType } from "@/types";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import { setDataByKeyValuePair, setDataByMethod, setDataByObject } from "@/types/global";
import { FormEventHandler } from 'react';
import SelectInput from "./SelectInput";
import SubmitButton from "./SubmitButton";
import FormReportContainer from "./FormReportContainer";
import FormItem from "./FormItem";

type ExtraordinaryPaymentType = PayType<{
    subject_id: number;
    teacher_id: number;
}>;

type ExtraordinaryPaymentFormProps = {
    semesters: SemesterType[],
    specialties: SpecialtyType[],
    shifts: ShiftType[],
    handleSubmit: FormEventHandler;
    alerts: string[];
    data: ExtraordinaryPaymentType;
    setData: setDataByObject<ExtraordinaryPaymentType> & setDataByMethod<ExtraordinaryPaymentType> & setDataByKeyValuePair<ExtraordinaryPaymentType>
    errors: Partial<Record<string, string>>
    processing: boolean;
    btnSubmit: string;
    subjects: SubjectType<{
        teachers: TeacherType[];
    }>[];
    currentTeachers: TeacherType[];
}

export default function ExtraordinaryPaymentForm({semesters, handleSubmit, alerts, data, setData, errors, shifts, specialties, processing, btnSubmit, currentTeachers, subjects} : ExtraordinaryPaymentFormProps) {
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
            </FormItem>

            <FormItem>
                <InputLabel htmlFor="semester_id">
                    Semestre:
                </InputLabel>

                <SelectInput
                    name="semester_id"
                    id="semester_id"
                    value={data.semester_id}
                    onChange={(e) => setData({...data, semester_id: Number(e.target.value), subject_id: 0, teacher_id: 0})}
                >
                    { semesters.map((semester) => (
                        <option key={semester.id} value={semester.id}>
                            { semester.semester }
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
                    onChange={(e) => setData({...data, specialty_id: Number(e.target.value), subject_id: 0, teacher_id: 0})}
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
                <InputLabel htmlFor="subject_id">
                    Materia:
                </InputLabel>

                <SelectInput
                    name="subject_id"
                    id="subject_id"
                    value={data.subject_id}
                    onChange={(e) => setData({...data, subject_id: Number(e.target.value), teacher_id: 0})}
                >
                    { subjects.map(subject => (
                        <option key={subject.id} value={subject.id}>
                            {subject.subject}
                        </option>
                    )) }
                </SelectInput>

                <InputError message={errors.subject_id} />
            </FormItem>

            <FormItem>
                <InputLabel htmlFor="teacher_id">
                    Profesor:
                </InputLabel>

                <SelectInput
                    name="teacher_id"
                    id="teacher_id"
                    value={data.teacher_id}
                    onChange={(e) => setData('teacher_id', Number(e.target.value))}
                >
                    { currentTeachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>
                            { teacher.name } { teacher.father_last_name } { teacher.mother_last_name }
                        </option>
                    )) }
                </SelectInput>

                <InputError message={errors.teacher_id} />
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
