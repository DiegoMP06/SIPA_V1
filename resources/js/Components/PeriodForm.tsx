import { FormEventHandler, useEffect, useState } from "react";
import FormContainer from "./FormContainer";
import FormItem from "./FormItem";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import SelectInput from "./SelectInput";
import SubmitButton from "./SubmitButton";
import TextInput from "./TextInput";
import { PeriodType, TypePayType } from "@/types";
import { setDataByKeyValuePair, setDataByMethod, setDataByObject } from "@/types/global";

type PeriodFormProps = {
    handleSubmit: FormEventHandler;
    alerts: string[];
    data: PeriodType;
    setData: setDataByObject<PeriodType> & setDataByMethod<PeriodType> & setDataByKeyValuePair<PeriodType>;
    errors: Partial<Record<keyof PeriodType, string>>
    typePays: TypePayType[];
    processing: boolean;
    btnSubmit: string;
    edit?: boolean;
}


export default function PeriodForm({handleSubmit, alerts, data, setData, errors, typePays, btnSubmit, processing, edit} : PeriodFormProps) {
    const MONTHS = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ];

    const [years, setYears] = useState<number[]>([]);

    useEffect(() => {
        const currentYear = new Date().getFullYear() + 1;
        const years = [];

        for (let i = currentYear; i >= currentYear - 5; i--) {
            years.push(i);
        }

        setYears(years);
    }, []);

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
            <InputLabel htmlFor="account_number">
                Número de Cuenta:
            </InputLabel>

            <TextInput
                type="text"
                placeholder="Número de Cuenta para el Pago"
                id="account_number"
                name="account_number"
                value={data.account_number}
                onChange={(e) => setData('account_number', e.target.value)}
            />

            <InputError message={errors.account_number} />
        </FormItem>

        <FormItem>
            <InputLabel htmlFor="interbank_code">
                Clabe Interbancaria:
            </InputLabel>

            <TextInput
                type="number"
                placeholder="Clabe Interbancaria para el Pago"
                id="interbank_code"
                name="interbank_code"
                value={data.interbank_code}
                onChange={(e) => setData('interbank_code', e.target.value)}
            />

            <InputError message={errors.interbank_code} />
        </FormItem>

        <FormItem>
            <InputLabel htmlFor="amount">
                Monto:
            </InputLabel>

            <TextInput
                type="number"
                placeholder="Monto para el Pago"
                id="amount"
                name="amount"
                value={data.amount}
                onChange={(e) => setData('amount', Number(e.target.value))}
            />

            <InputError message={errors.amount} />
        </FormItem>

        { !edit && (
            <FormItem>
                <InputLabel htmlFor="type_pay_id">
                    Tipo de Pago:
                </InputLabel>

                <SelectInput
                    id="type_pay_id"
                    name="type_pay_id"
                    value={data.type_pay_id}
                    onChange={(e) => setData('type_pay_id', Number(e.target.value))}
                >
                    { typePays.map((type, index) => (
                        <option key={index} value={type.id}>
                            {type.type}
                        </option>
                    )) }
                </SelectInput>

                <InputError message={errors.type_pay_id} />
            </FormItem>
        ) }


        <FormItem>
            <InputLabel htmlFor="start_month">
                Mes de Inicio:
            </InputLabel>

            <SelectInput
                id="start_month"
                name="start_month"
                value={data.start_month}
                onChange={(e) => setData('start_month', e.target.value)}
            >
                { MONTHS.map((month, index) => (
                    <option key={index} value={month.toUpperCase()}>
                        {month}
                    </option>
                )) }
            </SelectInput>

            <InputError message={errors.start_month} />
        </FormItem>

        <FormItem>
            <InputLabel htmlFor="start_year">
                Año de Inicio:
            </InputLabel>

            <SelectInput
                id="start_year"
                name="start_year"
                value={data.start_year}
                onChange={(e) => setData('start_year', e.target.value)}
            >
                { years.map((year, index) => (
                    <option key={index} value={year}>
                        {year}
                    </option>
                )) }
            </SelectInput>

            <InputError message={errors.start_year} />
        </FormItem>

        <FormItem>
            <InputLabel htmlFor="end_month">
                Mes de Fin:
            </InputLabel>

            <SelectInput
                id="end_month"
                name="end_month"
                value={data.end_month}
                onChange={(e) => setData('end_month', e.target.value)}
            >
                { MONTHS.map((month, index) => (
                    <option key={index} value={month.toUpperCase()}>
                        {month}
                    </option>
                )) }
            </SelectInput>

            <InputError message={errors.end_month} />
        </FormItem>

        <FormItem>
            <InputLabel htmlFor="end_year">
                Año de Fin:
            </InputLabel>

            <SelectInput
                id="end_year"
                name="end_year"
                value={data.end_year}
                onChange={(e) => setData('end_year', e.target.value)}
            >
                { years.map((year, index) => (
                    <option key={index} value={year}>
                        {year}
                    </option>
                )) }
            </SelectInput>

            <InputError message={errors.end_year} />
        </FormItem>

        <SubmitButton value={btnSubmit} disabled={processing} />
    </FormContainer>
  )
}

