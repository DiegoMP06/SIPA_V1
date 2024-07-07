import Services from "@/Services";
import { PayType, SubjectType, TeacherType } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

type ExtraordinaryPaymentType = PayType<{
    subject_id: number;
    teacher_id: number;
}>;

export default function useExtraordinaryPay({nameRoute} : {nameRoute: 'extraordinary-exam' | 'intersemester-appeal'}) {
    const [alerts, setAlerts] = useState<string[]>([]);
    const [subjects, setSubjects] = useState<SubjectType<{teachers: TeacherType[]}>[]>([]);

    const {data, setData, post, patch, errors, processing} = useForm<ExtraordinaryPaymentType>({
        name: '',
        mother_last_name: '',
        father_last_name: '',
        code: '',
        curp: '',
        semester_id: 0,
        shift_id: 0,
        specialty_id: 0,
        period_id: 0,
        subject_id: 0,
        teacher_id: 0,
    });

    useEffect(() => {
        if(data.semester_id === 0 || data.specialty_id === 0) return;
        setSubjects([]);

        Services.searchClassrooms(data.specialty_id, data.semester_id)
            .then(({data}) => setSubjects(data))
            .catch(() => Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrio un error al cargar las materias',
            }));
    }, [data.semester_id, data.specialty_id]);


    const validate = () => {
        let currentAlerts : string[] = [];

        const CURP_REGEX = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/

        if(Object.values(data).some(value => value?.toString().trim() === '' || value === 0)) {
            currentAlerts = ['Todos los Campos son Obligatorios', ...currentAlerts];
        }

        if(data.code.trim().length !== 14 || isNaN(Number(data.code))) {
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
            patch(route(nameRoute + ".update", { pay: data.id }), {
                preserveScroll: true,
            });
            return;
        }

        post(route(nameRoute + '.store'), {
            preserveScroll: true,
            onSuccess(data) {
                location.href = route(nameRoute + '.show', { pay: data.props.pay});
            }
        })
    }
    const currentTeachers = useMemo(() =>
        (subjects.find(subject => subject.id === data.subject_id)?.teachers ?? [])
            .filter(teacher => teacher.active), [data, subjects]);

    return {
        alerts,
        subjects,
        currentTeachers,
        data,
        setData,
        errors,
        processing,
        save,
    };
}
