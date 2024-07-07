import { FormEventHandler, useEffect, useMemo, useState } from "react";
import { ClassroomType, SemesterType, SpecialtyType, SubjectType } from "@/types"
import { router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

type DataType = SubjectType<{
    classrooms?: ClassroomType[];
}>;

type SemesterOptionType = SemesterType<{
    open: boolean;
}>;

export default function usesubjects({semesters = []} : {semesters?: SemesterType[]}) {
    const [alerts, setAlerts] = useState<string[]>([]);
    const [semestersOptions, setSemestersOptions] = useState<SemesterOptionType[]>([]);

    const {data, setData, processing, errors, patch, post} = useForm<DataType>({
        subject: '',
        active: 1,
        classrooms: [],
    });

    useEffect(() => {
        if(semesters && semesters.length > 0) {
            const formatSemesters = semesters.map(semester => ({
                ...semester,
                open: false,
            }));

            setSemestersOptions(formatSemesters);
        }
    }, [semesters]);

    const activeSemester = (open : boolean, id : SemesterType['id']) => {
        if(!open) {
            const updatedClassroms = data.classrooms?.filter(classroom => classroom.semester_id !== id);
            setData('classrooms', updatedClassroms);
        }

        const semestersUpdated = semestersOptions.map(semester => semester.id === id ? {...semester, open} : semester);
        setSemestersOptions(semestersUpdated);
    }

    const addSpecialty = (specialty_id: SpecialtyType['id'], semester_id: SemesterType['id']) => {
        if(!data.classrooms) return;

        const classroomFind = data.classrooms.find(classroom => classroom.specialty_id === specialty_id && classroom.semester_id === semester_id);

        if(classroomFind) {
            const classroomsUpdated = data.classrooms.filter(classroom => classroom.id !== classroomFind.id);
            setData('classrooms', classroomsUpdated);
            return;
        }

        const classroomsUpdated = [...data.classrooms, {
            id: Date.now(),
            specialty_id,
            semester_id,
        }];

        setData('classrooms', classroomsUpdated);
    }

    const validate = () => {
        let currentAlerts : string[] = [];

        if(data.subject.trim() === '') {
            currentAlerts = [
                ...currentAlerts,
                'El Nombre de la Materia es Obligatoria'
            ];
        }

        if(!data.id && data.classrooms?.length === 0) {
            currentAlerts = [
                ...currentAlerts,
                'Debe agregar al menos un aula'
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
            patch(route('subjects.update', {subject: data.id}), {
                preserveScroll: true,
            });

            return;
        }

        post(route('subjects.store'), {
            preserveScroll: true,
        });
    }

    const handleDelete = (id: SubjectType['id']) => {
        Swal.fire({
            title: "Atención",
            text: "¿Desea eliminar la materia?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: 'No, Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('subjects.destroy', { subject: id }), {
                    preserveScroll: true,
                    onSuccess() {
                        Swal.fire({
                            title: "Exito",
                            text: "La Materia se Elimino Correctamente",
                            icon: "success"
                        });
                    },
                    onError() {
                        Swal.fire({
                            title: "Error",
                            text: "Ocurrio un Error al Eliminar la materia",
                            icon: "error"
                        });
                    }
                })
            }
        });
    }

    const handleActive = (subject: SubjectType) => {
        Swal.fire({
            title: "Atencion",
            text: subject.active ? "¿Desea desactivar la materia?" : "¿Desea activar la materia?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: 'No, Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.patch(route('subjects.update', { subject }), {...subject, active: !subject.active, dashboard: true}, {
                    preserveScroll: true,
                    onSuccess() {
                        Swal.fire({
                            title: "Exito",
                            text: "La Materia se Actualizo Correctamente",
                            icon: "success"
                        });
                    },
                    onError() {
                        Swal.fire({
                            title: "Error",
                            text: "Ocurrio un Error al Actualizar la materia",
                            icon: "error"
                        });
                    }
                });
            }
        });
    }

    const isOpen = useMemo(() => (semester: SemesterOptionType) => semester.open, [semestersOptions]);

    return {
        alerts,
        data,
        semestersOptions,
        setData,
        processing,
        errors,
        save,
        addSpecialty,
        activeSemester,
        handleDelete,
        handleActive,
        isOpen,
    }
}
