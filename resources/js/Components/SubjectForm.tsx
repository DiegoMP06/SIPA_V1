import { ChangeEventHandler, FormEventHandler, useEffect, useMemo, useState } from "react";
import FormContainer from "./FormContainer";
import FormItem from "./FormItem";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import SubmitButton from "./SubmitButton";
import TextInput from "./TextInput";
import { ClassroomType, SemesterType, SpecialtyType, SubjectType } from "@/types";
import { setDataByKeyValuePair, setDataByMethod, setDataByObject } from "@/types/global";
import Checkbox from "./Checkbox";

type DataType = SubjectType<{
    classrooms?: ClassroomType[];
}>;

type SemesterOptionType = SemesterType<{
    open: boolean;
}>;

type SubjectFormProps = {
    handleSubmit: FormEventHandler;
    alerts: string[];
    data: DataType;
    setData: setDataByObject<DataType> & setDataByMethod<DataType> & setDataByKeyValuePair<DataType>;
    errors: Partial<Record<keyof DataType, string>>
    processing: boolean;
    btnSubmit: string;
    specialties?: SpecialtyType[];
    semestersOptions?: SemesterOptionType[];
    isOpen?: (semester: SemesterOptionType) => boolean;
    activeSemester?: (open: boolean, id: SemesterType["id"]) => void;
    addSpecialty?: (specialty_id: SpecialtyType["id"], semester_id: SemesterType["id"]) => void;
    edit?: boolean;
}


export default function SubjectForm({alerts, handleSubmit, data, setData, errors, processing, btnSubmit, specialties, semestersOptions, activeSemester, addSpecialty, isOpen, edit} :  SubjectFormProps) {

    return (
        <FormContainer
            handleSubmit={handleSubmit}
        >
            <div>
                { alerts.map((alert, index) => (
                    <InputError key={index} message={alert} />
                )) }
            </div>

            <FormItem>
                <InputLabel htmlFor="subject">
                    Nombre:
                </InputLabel>

                <TextInput
                    type="text"
                    placeholder="Nombre de la Materia"
                    id="subject"
                    name="subject"
                    value={data.subject}
                    onChange={(e) => setData('subject', e.target.value)}
                />

                <InputError message={errors.subject} />
            </FormItem>

            { (!edit && activeSemester && isOpen  && addSpecialty) && (
                <FormItem>
                    <p className="text-gray-700 font-bold block">
                        Disponible en:
                    </p>

                    <ul role="list" className="grid grid-cols-1 gap-4">
                        { semestersOptions?.map(semester => (
                            <li key={semester.id} className="space-y-2">
                                <label htmlFor={`semester_${semester.id}`} className="flex items-center gap-4">
                                    <Checkbox
                                        name={`semester_${semester.id}`}
                                        id={`semester_${semester.id}`}
                                        onChange={(e) => activeSemester(e.target.checked, semester.id)}
                                    />

                                    <span className="text-indigo-700 font-bold text-lg">
                                        Semestre {semester.semester}
                                    </span>
                                </label>

                                { isOpen(semester) && (
                                    <div className="grid grid-cols-1 gap-2 pl-4">
                                        { specialties?.map(specialty => (
                                            <label key={specialty.id} htmlFor={`semester_${semester.id}_${specialty.id}`} className="flex items-center gap-4">
                                                <Checkbox
                                                    name={`semester_${semester.id}_${specialty.id}`}
                                                    id={`semester_${semester.id}_${specialty.id}`}
                                                    onChange={() => addSpecialty(specialty.id, semester.id)}
                                                />

                                                <span className="text-gray-700 font-bold">
                                                    {specialty.specialty}
                                                </span>
                                            </label>
                                        )) }
                                    </div>
                                ) }
                            </li>
                        )) }
                    </ul>

                    <InputError message={errors.classrooms} />
                </FormItem>
            ) }

            <SubmitButton value={btnSubmit} disabled={processing} />
        </FormContainer>
    )
}

