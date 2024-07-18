import { FormEventHandler, useState } from "react";
import { PeriodType, TypePayType } from "@/types"
import { router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function usePeriods() {
    const [alerts, setAlerts] = useState<string[]>([]);

    const {data, setData, processing, errors, patch, post} = useForm<PeriodType>({
        account_number: '',
        interbank_code: '',
        amount: 0,
        start_month: '',
        start_year: '',
        end_month: '',
        end_year: '',
        type_pay_id: 0,
    });

    const validate = () => {
        let currentAlerts : string[] = [];

        if(Object.values(data).some((value) => value?.toString().trim() === '' || value === 0)){
            currentAlerts = [
                ...currentAlerts,
                'Todos los campos son obligatorios'
            ];
        }

        if(data.interbank_code.toString().length !== 18 || isNaN(Number(data.interbank_code))) {
            currentAlerts = [
                ...currentAlerts,
                'La Clabe Interbancaria debe tener 18 dígitos'
            ];
        }

        if(data.amount < 0) {
            currentAlerts = [
                ...currentAlerts,
                'El Monto debe ser mayor a 0'
            ];
        }

        return currentAlerts;
    }

    const save : FormEventHandler = (e) => {
        e.preventDefault();
        const currentAlerts = validate();

        setAlerts(currentAlerts);

        if(currentAlerts.length !== 0)  return;

        if(data.id) {
            patch(route('periods.update', {period: data.id}), {
                preserveScroll: true,
            });

            return;
        }

        post(route('periods.store'), {
            preserveScroll: true,
        });
    }

    const handleDelete = (id: PeriodType['id']) => {
        Swal.fire({
            title: "Atención",
            text: "¿Desea eliminar el periodo?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: 'No, Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('periods.destroy', { period: id }), {
                    preserveScroll: true,
                    onSuccess() {
                        Swal.fire({
                            title: "Exito",
                            text: "El Periodo se Elimino Correctamente",
                            icon: "success"
                        });
                    },
                    onError() {
                        Swal.fire({
                            title: "Error",
                            text: "Ocurrio un Error al Eliminar el Periodo",
                            icon: "error"
                        });
                    }
                })
            }
        });
    }

    const handleActive = (period: PeriodType) => {
        Swal.fire({
            title: "Atencion",
            text: period.active ? "¿Desea desactivar el periodo?" : "¿Desea activar el periodo?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: 'No, Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.patch(route('periods.update', { period }), {...period, active: !period.active, dashboard: true}, {
                    preserveScroll: true,
                    onSuccess() {
                        Swal.fire({
                            title: "Exito",
                            text: "El Periodo se Actualizo Correctamente",
                            icon: "success"
                        });
                    },
                    onError() {
                        Swal.fire({
                            title: "Error",
                            text: "Ocurrio un Error al Actualizar el Periodo",
                            icon: "error"
                        });
                    }
                });
            }
        });
    }

    return {
        alerts,
        data,
        setData,
        processing,
        errors,
        save,
        handleDelete,
        handleActive,
    }
}
