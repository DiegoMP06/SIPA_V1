import { PayType } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

export default function useReRegistration() {
    const [alerts, setAlerts] = useState<string[]>([]);

    const {data, setData, post, patch, errors, processing} = useForm<PayType>({
        name: '',
        mother_last_name: '',
        father_last_name: '',
        code: '',
        curp: '',
        semester_id: 0,
        shift_id: 0,
        specialty_id: 0,
        period_id: 0,
    });

    const validate = () => {
        let currentAlerts : string[] = [];

        const CURP_REGEX = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/

        if(Object.values(data).some(value => value?.toString().trim() === '' || value === 0)) {
            currentAlerts = ['Todos los Campos son Obligatorios', ...currentAlerts];
        }

        if(data.semester_id === 1 && (data.code.trim().length > 5 || isNaN(Number(data.code)))) {
            currentAlerts = ['El Numero de Ficha es Invalido', ...currentAlerts];
        }

        if(data.semester_id !== 1 && (data.code.trim().length !== 14 || isNaN(Number(data.code)))) {
            currentAlerts = ['El Numero de Control es Invalido', ...currentAlerts];
        }

        if(!data.curp.match(CURP_REGEX)) {
            currentAlerts = ['El CURP es Invalido', ...currentAlerts];
        }

        return currentAlerts;
    }

    const save : FormEventHandler = (e) => {
        e.preventDefault();

        const currentAlerts = validate();
        setAlerts(currentAlerts)

        if(currentAlerts.length !== 0) return;

        if(data.id) {
            patch(route("re-registration.update", { pay: data.id }), {
                preserveScroll: true,
            });
            return;
        }

        post(route('re-registration.store'), {
            preserveScroll: true,
            onSuccess(data) {
                location.href = route('re-registration.show', { pay: data.props.pay});
            }
        })
    }

    return {
        alerts,
        data,
        setData,
        errors,
        processing,
        save,
    };
}
