import { FormEventHandler, useState } from "react";
import { TypePayType } from "@/types";
import { router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function useTypePays() {
    const [alerts, setAlerts] = useState<string[]>([]);

    const { data, setData, processing, errors, patch, post } =
        useForm<TypePayType>({
            type: "",
            code: "",
            active: true,
        });

    const validate = () => {
        const currentAlerts: string[] = [];

        if (data.type.trim() === "") {
            currentAlerts.push("El nombre del tipo de pago es obligatorio");
        }

        if (data.code.trim() === "") {
            currentAlerts.push("El código es obligatorio");
        }

        return currentAlerts;
    };

    const save: FormEventHandler = (e) => {
        e.preventDefault();
        const currentAlerts = validate();
        setAlerts(currentAlerts);

        if (currentAlerts.length !== 0) return;

        if (data.id) {
            patch(route("type-pays.update", { typePay: data.id }), {
                preserveScroll: true,
            });
            return;
        }

        post(route("type-pays.store"), {
            preserveScroll: true,
        });
    };

    const handleActive = (typePay: TypePayType) => {
        Swal.fire({
            title: "Atención",
            text: typePay.active
                ? "¿Desea desactivar este tipo de pago?"
                : "¿Desea activar este tipo de pago?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No, Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                router.patch(
                    route("type-pays.update", { typePay: typePay.id }),
                    { ...typePay, active: !typePay.active, dashboard: true },
                    {
                        preserveScroll: true,
                        onSuccess() {
                            Swal.fire({
                                title: "Éxito",
                                text: "El tipo de pago se actualizó correctamente",
                                icon: "success",
                            });
                        },
                        onError() {
                            Swal.fire({
                                title: "Error",
                                text: "Ocurrió un error al actualizar el tipo de pago",
                                icon: "error",
                            });
                        },
                    },
                );
            }
        });
    };

    return {
        alerts,
        data,
        setData,
        processing,
        errors,
        save,
        handleActive,
    };
}
