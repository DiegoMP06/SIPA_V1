import { FormEventHandler, useMemo, useState } from "react";
import { PaginateProps, SubjectType, TeacherType } from "@/types"
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";
import Services from "@/Services";

type Props = {
    currentTeachers?: TeacherType<{
        pivot: {
            id: number;
            subject_id: number;
            teacher_id: number;
        }
    }>[];
    subject?: SubjectType;
}

export default function useSubjectsTeachers({currentTeachers = [], subject} : Props) {
    const [activeModal, setActiveModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [teachers, setTeachers] = useState<PaginateProps<TeacherType>>({
        data: [],
        current_page: 1,
        first_page_url: '',
        from: 1,
        last_page: 1,
        last_page_url: '',
        links: [],
        next_page_url: '',
        path: '',
        per_page: 1,
        prev_page_url: '',
        to: 1,
        total: 1
    });

    const [data, setData] = useState({
        search: '',
        page: 1,
    });

    const closeModal = () => {
        setActiveModal(false);
    }

    const openModal = () => {
        setActiveModal(true)
        search();
    }

    const handleSearch : FormEventHandler = (e) => {
        e.preventDefault();
        search();
    }

    const handlePaginate = (page: number) =>
        search(page);

    const search = (page?: number) => {
        setLoading(true);
        page && setData({...data, page});

        Services.getSubjectsTeachers(page ? page : data.page, data.search)
        .then(({data}) =>
            setTeachers(data))
        .catch(() => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha Ocurrido un Error'
        }))
        .finally(() =>
            setLoading(false));
    }

    const addTeacher = (teacher_id: TeacherType['id']) => {
        router.post(route('subjects-teachers.store'), {
            subject_id: subject?.id,
            teacher_id,
        }, {
            preserveScroll: true,
            onSuccess() {
                Swal.fire({
                    title: "Exito",
                    text: "El profesor se Asigno Correctamente",
                    icon: "success"
                });

                closeModal();
            },
            onError: (error) => Swal.fire({
                title: "Error",
                text: error.teacher_id ? error.teacher_id : "Ocurrio un Error al Asignar el profesor",
                icon: "error"
            }),
        });
    }

    const handleDelete = (id: number) => {
        Swal.fire({
            title: "Atención",
            text: "¿Desea Desvincular el Profesor?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: 'No, Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('subjects-teachers.destroy', { subjects_teacher: id }), {
                    preserveScroll: true,
                    onSuccess() {
                        Swal.fire({
                            title: "Exito",
                            text: "el Profesor se Devinculo Correctamente",
                            icon: "success"
                        });
                    },
                    onError() {
                        Swal.fire({
                            title: "Error",
                            text: "Ocurrio un Error al Desvincular el Profesor",
                            icon: "error"
                        });
                    }
                })
            }
        });
    }

    const hasTeachers = useMemo(() => teachers.data.length > 0, [teachers]);
    const isLinked = useMemo(() => (teacher_id: TeacherType['id']) => currentTeachers?.some(teacher => teacher.id === teacher_id), [currentTeachers]);
    const hasLinkedTeachers = useMemo(() => currentTeachers?.length > 0, [currentTeachers]);

    return {
        activeModal,
        data,
        setData,
        teachers,
        loading,
        openModal,
        closeModal,
        addTeacher,
        handleDelete,
        handleSearch,
        handlePaginate,
        hasTeachers,
        isLinked,
        hasLinkedTeachers,
    }
}
