import { FormEventHandler } from "react";
import FormContainer from "./FormContainer";
import FormItem from "./FormItem";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import SubmitButton from "./SubmitButton";
import TextInput from "./TextInput";
import Checkbox from "./Checkbox";
import { TypePayType } from "@/types";
import {
    setDataByKeyValuePair,
    setDataByMethod,
    setDataByObject,
} from "@/types/global";

type TypePayFormProps = {
    handleSubmit: FormEventHandler;
    alerts: string[];
    data: TypePayType;
    setData: setDataByObject<TypePayType> &
        setDataByMethod<TypePayType> &
        setDataByKeyValuePair<TypePayType>;
    errors: Partial<Record<keyof TypePayType, string>>;
    processing: boolean;
    btnSubmit: string;
    edit?: boolean;
};

export default function TypePayForm({
    handleSubmit,
    alerts,
    data,
    setData,
    errors,
    processing,
    btnSubmit,
    edit,
}: TypePayFormProps) {
    return (
        <FormContainer handleSubmit={handleSubmit}>
            <div>
                {alerts.map((alert, index) => (
                    <InputError key={index} message={alert} />
                ))}
            </div>

            <FormItem>
                <InputLabel htmlFor="type">Nombre:</InputLabel>
                <TextInput
                    type="text"
                    placeholder="Nombre del tipo de pago"
                    id="type"
                    name="type"
                    value={data.type}
                    onChange={(e) => setData("type", e.target.value)}
                />
                <InputError message={errors.type} />
            </FormItem>

            <FormItem>
                <InputLabel htmlFor="code">Código:</InputLabel>
                <TextInput
                    type="text"
                    placeholder="Código del tipo de pago"
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
