import { FormEventHandler, useMemo, useState } from "react";
import { ClassroomType, SemesterType, SpecialtyType, SubjectType } from "@/types"
import { router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

type Props = {
    classrooms: ClassroomType<{
        semester: SemesterType;
        specialty: SpecialtyType;
    }>[];
    subject: SubjectType;
}

export default function useClassrooms({classrooms, subject} : Props) {
    const [activeModal, setActiveModal] = useState(false);
    const [alerts, setAlerts] = useState<string[]>([]);

    const {data, setData, errors, processing, reset, post} = useForm<ClassroomType>({
        semester_id: 0,
        specialty_id: 0,
    });

    const validate = () => {
        let currentErrors : string[] = [];

        if(Object.values(data).some(value => value === 0)) {
            currentErrors = [
                ...currentErrors,
                'Debe seleccionar un semestre y una especialidad'
            ];
        }

        if(classrooms.some(classroom => classroom.semester_id === data.semester_id && classroom.specialty_id === data.specialty_id)) {
            currentErrors = [
                ...currentErrors,
                'Ya existe un grupo con ese semestre y especialidad'
            ];
        }

        return currentErrors;
    }

    const save : FormEventHandler = (e) => {
        e.preventDefault();
        const currentErrors = validate();

        setAlerts(currentErrors);

        if(currentErrors.length > 0) return;

        post(route('classrooms.store', {subject}), {
            preserveScroll: true,
            onSuccess: closeModal,
        });
    }

    const closeModal = () => {
        setActiveModal(false);
        reset();
    }

    const handleDelete = (id: ClassroomType['id']) => {
        Swal.fire({
            title: "Atención",
            text: "¿Desea eliminar el grupo?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: 'No, Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('classrooms.destroy', { subject, classrooms_subject: id }), {
                    preserveScroll: true,
                    onSuccess() {
                        Swal.fire({
                            title: "Exito",
                            text: "El grupo se Elimino Correctamente",
                            icon: "success"
                        });
                    },
                    onError() {
                        Swal.fire({
                            title: "Error",
                            text: "Ocurrio un Error al Eliminar el grupo",
                            icon: "error"
                        });
                    }
                })
            }
        });
    }

    const canDelete = useMemo(() => classrooms.length > 1, [classrooms]);

    return {
        alerts,
        activeModal,
        setActiveModal,
        data,
        setData,
        processing,
        errors,
        save,
        closeModal,
        handleDelete,
        canDelete,
    }
}
