import { Head, Link } from '@inertiajs/react';
import FormLayout from '@/Layouts/FormLayout';
import { ExtraordinaryPaymentType, PayType, PeriodType, SemesterType, ShiftType, SpecialtyType, SubjectType, TeacherType, TypePayType } from '@/types';
import { formatCurrency } from '@/Helpers';
import { useMemo } from 'react';

type ShowPayProps = {
    pays: PayType<{
        semester: SemesterType;
        shift: ShiftType;
        specialty: SpecialtyType;
        extraordinary_payment?: ExtraordinaryPaymentType<{
            subject: SubjectType;
            teacher: TeacherType;
        }>;
    }>[];
    period: PeriodType;
    typePay: TypePayType;
};

export default function ShowPay({period, pays, typePay} : ShowPayProps) {
    const nameRoute = useMemo(() => ({1: 're-registration', 2: 'extraordinary-exam', 3: 'intersemester-appeal'}[typePay.id ?? 1]), [typePay]);
    const isExtraordinary = useMemo(() => typePay.id !== 1, [typePay]);

    return (
        <FormLayout title="Fichas de Pago" period={period}>
            <Head title="Fichas de Pago" />

            <main className="max-w-4xl px-4 mx-auto my-16 grid grid-cols-1 gap-8">
            { pays.map(pay => (
                    <div key={pay.id} className="bg-white p-4 shadow space-y-6">
                        <h2 className="text-gray-700 text-2xl font-bold">
                            { pay.name } { pay.father_last_name } { pay.mother_last_name }
                        </h2>

                        <div className="space-y-2 divide-y divide-gray-300">
                            <p className="text-indigo-700 font-bold text-lg flex justify-between p-2 gap-4">
                                Concepto de Pago: { '' }
                                <span className="text-gray-700">
                                    { typePay.id === 1 ?
                                        Number(pay.semester.semester) === 1 ? 'Inscripción' : 'Reinscripción'
                                        :
                                        typePay.type
                                    }
                                </span>
                            </p>

                            <p className="text-indigo-700 font-bold text-lg flex justify-between p-2 gap-4">
                                CURP: { '' }
                                <span className="text-gray-700">
                                    { pay.curp }
                                </span>
                            </p>

                            <p className="text-indigo-700 font-bold text-lg flex justify-between p-2 gap-4">
                                { typePay.id === 1 && Number(pay.semester.semester) === 1 ? 'No. de Ficha' : 'No. de Control' }: { '' }
                                <span className="text-gray-700">
                                    { pay.code }
                                </span>
                            </p>

                            <p className="text-indigo-700 font-bold text-lg flex justify-between p-2 gap-4">
                                Semestre: { '' }
                                <span className="text-gray-700">
                                    { pay.semester.semester }{ pay.semester.group }
                                </span>
                            </p>

                            <p className="text-indigo-700 font-bold text-lg flex justify-between p-2 gap-4">
                                Turno: { '' }
                                <span className="text-gray-700">
                                    { pay.shift.shift }
                                </span>
                            </p>

                            <p className="text-indigo-700 font-bold text-lg flex justify-between p-2 gap-4">
                                Especialidad: { '' }
                                <span className="text-gray-700">
                                    { pay.specialty.specialty }
                                </span>
                            </p>

                            { isExtraordinary && (
                                <>
                                    <p className="text-indigo-700 font-bold text-lg flex justify-between p-2 gap-4">
                                        Materia: { '' }
                                        <span className="text-gray-700">
                                            { pay.extraordinary_payment?.subject.subject }
                                        </span>
                                    </p>

                                    <p className="text-indigo-700 font-bold text-lg flex justify-between p-2 gap-4">
                                        Profesor: { '' }
                                        <span className="text-gray-700">
                                            { pay.extraordinary_payment?.teacher.name } { pay.extraordinary_payment?.teacher.mother_last_name } { pay.extraordinary_payment?.teacher.father_last_name }
                                        </span>
                                    </p>
                                </>
                            ) }

                            <p className="text-indigo-700 font-bold text-lg flex justify-between p-2 gap-4">
                                Monto: { '' }
                                <span className="text-gray-700">
                                    { formatCurrency(period.amount) }
                                </span>
                            </p>
                        </div>

                        <nav className="my-16 flex justify-between gap-4">
                            <a href={route(nameRoute + '.show', {pay})} className="text-white font-bold px-4 py-2 bg-indigo-700 hover:bg-indigo-600 transition-colors inline-block uppercase" target="_blank">
                                Ver Ficha
                            </a>

                            <Link href={route(nameRoute + '.edit', {pay})} className="text-indigo-700 font-bold px-4 py-2 bg-indigo-100 hover:bg-indigo-200 transition-colors inline-block uppercase">
                                Modificar Ficha
                            </Link>
                        </nav>
                    </div>
                )) }
            </main>
        </FormLayout>
    );
}
