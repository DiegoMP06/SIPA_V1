import { FormEventHandler } from "react";
import FormContainer from "./FormContainer";
import FormItem from "./FormItem";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import SubmitButton from "./SubmitButton";
import TextInput from "./TextInput";
import Checkbox from "./Checkbox";
import { SpecialtyType } from "@/types";
import {
    setDataByKeyValuePair,
    setDataByMethod,
    setDataByObject,
} from "@/types/global";

type SpecialtyFormProps = {
    handleSubmit: FormEventHandler;
    alerts: string[];
    data: SpecialtyType;
    setData: setDataByObject<SpecialtyType> &
        setDataByMethod<SpecialtyType> &
        setDataByKeyValuePair<SpecialtyType>;
    errors: Partial<Record<keyof SpecialtyType, string>>;
    processing: boolean;
    btnSubmit: string;
};

export default function SpecialtyForm({
    handleSubmit,
    alerts,
    data,
    setData,
    errors,
    processing,
    btnSubmit,
}: SpecialtyFormProps) {
    return (
        <FormContainer handleSubmit={handleSubmit}>
            <div>
                {alerts.map((alert, index) => (
                    <InputError key={index} message={alert} />
                ))}
            </div>

            <FormItem>
                <InputLabel htmlFor="specialty">Nombre:</InputLabel>
                <TextInput
                    type="text"
                    placeholder="Nombre de la especialidad"
                    id="specialty"
                    name="specialty"
                    value={data.specialty}
                    onChange={(e) => setData("specialty", e.target.value)}
                />
                <InputError message={errors.specialty} />
            </FormItem>

            <FormItem>
                <InputLabel htmlFor="code">Código:</InputLabel>
                <TextInput
                    type="text"
                    placeholder="Código de la especialidad"
                    id="code"
                    name="code"
                    value={data.code}
                    onChange={(e) => setData("code", e.target.value)}
                />
                <InputError message={errors.code} />
            </FormItem>

            <FormItem>
                <label
                    htmlFor="active"
                    className="flex items-center gap-3 text-gray-700 font-bold"
                >
                    <Checkbox
                        id="active"
                        name="active"
                        checked={Boolean(data.active)}
                        onChange={(e) => setData("active", e.target.checked)}
                    />
                    Activo
                </label>
                <InputError message={errors.active} />
            </FormItem>

            <SubmitButton value={btnSubmit} disabled={processing} />
        </FormContainer>
    );
}
