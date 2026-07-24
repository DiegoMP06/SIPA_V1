import { FormEventHandler, useState } from "react";
import { SpecialtyType } from "@/types";
import { router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function useSpecialties() {
    const [alerts, setAlerts] = useState<string[]>([]);

    const { data, setData, processing, errors, patch, post } =
        useForm<SpecialtyType>({
            specialty: "",
            code: "",
            active: true,
        });

    const validate = () => {
        const currentAlerts: string[] = [];

        if (data.specialty.trim() === "") {
            currentAlerts.push("El nombre de la especialidad es obligatorio");
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
            patch(route("specialties.update", { specialty: data.id }), {
                preserveScroll: true,
            });
            return;
        }

        post(route("specialties.store"), {
            preserveScroll: true,
        });
    };

    const handleActive = (specialty: SpecialtyType) => {
        Swal.fire({
            title: "Atención",
            text: specialty.active
                ? "¿Desea desactivar esta especialidad?"
                : "¿Desea activar esta especialidad?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No, Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                router.patch(
                    route("specialties.update", { specialty: specialty.id }),
                    {
                        ...specialty,
                        active: !specialty.active,
                        dashboard: true,
                    },
                    {
                        preserveScroll: true,
                        onSuccess() {
                            Swal.fire({
                                title: "Éxito",
                                text: "La especialidad se actualizó correctamente",
                                icon: "success",
                            });
                        },
                        onError() {
                            Swal.fire({
                                title: "Error",
                                text: "Ocurrió un error al actualizar la especialidad",
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
