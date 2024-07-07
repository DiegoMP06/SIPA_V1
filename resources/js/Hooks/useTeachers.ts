import { FormEventHandler, useState } from "react";
import { TeacherType } from "@/types"
import { router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function useTeachers() {
    const [alerts, setAlerts] = useState<string[]>([]);

    const {data, setData, processing, errors, patch, post} = useForm<TeacherType>({
        name: '',
        father_last_name: '',
        mother_last_name: '',
        email: '',
        phone: '',
        active: 1,
    });

    const validate = () => {
        const EMAIL_REGEX = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const PHONE_REGEX = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        let currentAlerts : string[] = [];

        if(Object.values(data).some((value) => value?.toString().trim() === '')){
            currentAlerts = [
                ...currentAlerts,
                'Todos los campos son obligatorios'
            ];
        }

        if(!data.email.match(EMAIL_REGEX)) {
            currentAlerts = [
                ...currentAlerts,
                'El email no es valido'
            ];
        }

        if(!data.phone.match(PHONE_REGEX)) {
            currentAlerts = [
                ...currentAlerts,
                'El telefono no es valido'
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
            patch(route('teachers.update', {teacher: data.id}), {
                preserveScroll: true,
            });

            return;
        }

        post(route('teachers.store'), {
            preserveScroll: true,
        });
    }

    const handleDelete = (id: TeacherType['id']) => {
        Swal.fire({
            title: "Atención",
            text: "¿Desea eliminar el profesor?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: 'No, Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('teachers.destroy', { teacher: id }), {
                    preserveScroll: true,
                    onSuccess() {
                        Swal.fire({
                            title: "Exito",
                            text: "El profesor se Elimino Correctamente",
                            icon: "success"
                        });
                    },
                    onError() {
                        Swal.fire({
                            title: "Error",
                            text: "Ocurrio un Error al Eliminar el profesor",
                            icon: "error"
                        });
                    }
                })
            }
        });
    }

    const handleActive = (teacher: TeacherType) => {
        Swal.fire({
            title: "Atencion",
            text: teacher.active ? "¿Desea desactivar el profesor?" : "¿Desea activar el profesor?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: 'No, Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.patch(route('teachers.update', { teacher }), {...teacher, active: !teacher.active, dashboard: true}, {
                    preserveScroll: true,
                    onSuccess() {
                        Swal.fire({
                            title: "Exito",
                            text: "El profesor se Actualizo Correctamente",
                            icon: "success"
                        });
                    },
                    onError() {
                        Swal.fire({
                            title: "Error",
                            text: "Ocurrio un Error al Actualizar el profesor",
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
