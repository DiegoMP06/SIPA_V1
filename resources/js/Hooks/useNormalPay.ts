import { PayType } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

export default function useReRegistration({nameRoute} : {nameRoute: 're-registration' | 'registration'}) {
    const [alerts, setAlerts] = useState<string[]>([]);

    const {data, setData, post, patch, errors, processing} = useForm<PayType>({
        name: '',
        mother_last_name: '',
        father_last_name: '',
        code: '',
        semester_id: 0,
        shift_id: 0,
        specialty_id: 0,
        period_id: 0,
    });

    const validate = () => {
        let currentAlerts : string[] = [];

        if(Object.values(data).some(value => value?.toString().trim() === '' || value === 0)) {
            currentAlerts = ['Todos los Campos son Obligatorios', ...currentAlerts];
        }

        if(nameRoute == 're-registration' && (data.code.trim().length !== 14 || isNaN(Number(data.code)))) {
            currentAlerts = ['El Numero de Control es Invalido', ...currentAlerts];
        }

        if(nameRoute == 'registration' && (data.code.trim().length > 4 || isNaN(Number(data.code)))) {
            currentAlerts = ['El Numero de Ficha es Invalido', ...currentAlerts];
        }

        return currentAlerts;
    }

    const save : FormEventHandler = (e) => {
        e.preventDefault();

        const currentAlerts = validate();
        setAlerts(currentAlerts)

        if(currentAlerts.length !== 0) return;

        if(data.id) {
            patch(route(nameRoute + ".update", { pay: data.id }), {
                preserveScroll: true,
            });
            return;
        }

        post(route(nameRoute + '.store', nameRoute === 're-registration' ? {semester: data.semester_id} : {}), {
            preserveScroll: true,
            onSuccess(data) {
                console.log(route(nameRoute + '.show', { pay: data.props.pay}));
                location.href = route(nameRoute + '.show', { pay: data.props.pay});
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
