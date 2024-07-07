import { FormEventHandler } from "react";
import FormContainer from "./FormContainer";
import InputError from "./InputError";
import SubmitButton from "./SubmitButton";
import { setDataByKeyValuePair, setDataByMethod, setDataByObject } from "@/types/global";
import FormItem from "./FormItem";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import { TeacherType } from "@/types";

type TeacherFormProps = {
    handleSubmit: FormEventHandler;
    data: TeacherType;
    setData: setDataByObject<TeacherType> & setDataByMethod<TeacherType> & setDataByKeyValuePair<TeacherType>;
    alerts: string[];
    errors: Partial<Record<keyof TeacherType, string>>;
    processing: boolean;
    btnSubmit: string;
};


export default function TeacherForm({alerts, handleSubmit, data, setData, errors, processing, btnSubmit} :  TeacherFormProps) {

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
                <InputLabel htmlFor="name">
                    Nombre:
                </InputLabel>

                <TextInput
                    type="text"
                    placeholder="Nombre del Profesor"
                    id="name"
                    name="name"
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
                    placeholder="Apellido Paterno del Profesor"
                    id="father_last_name"
                    name="father_last_name"
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
                    placeholder="Apellido Materno del Profesor"
                    id="mother_last_name"
                    name="mother_last_name"
                    value={data.mother_last_name}
                    onChange={(e) => setData('mother_last_name', e.target.value)}
                />

                <InputError message={errors.mother_last_name} />
            </FormItem>

            <FormItem>
                <InputLabel htmlFor="email">
                    Correo Electronico:
                </InputLabel>

                <TextInput
                    type="email"
                    placeholder="Correo Electronico del Profesor"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} />
            </FormItem>

            <FormItem>
                <InputLabel htmlFor="phone">
                    Número de Telefono:
                </InputLabel>

                <TextInput
                    type="tel"
                    placeholder="XXX-XXX-XXXX"
                    id="phone"
                    name="phone"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                />

                <InputError message={errors.phone} />
            </FormItem>

            <SubmitButton value={btnSubmit} disabled={processing} />
        </FormContainer>
    )
}

