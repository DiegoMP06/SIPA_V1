import { Head, Link } from '@inertiajs/react';
import FormLayout from '@/Layouts/FormLayout';
import { PayType, PeriodType, SemesterType, ShiftType, SpecialtyType, TypePayType } from '@/types';
import { formatCurrency } from '@/Helpers';

type ShowPayProps = {
    pay: PayType;
    period: PeriodType;
    semester: SemesterType;
    shift: ShiftType;
    specialty: SpecialtyType;
    typePay: TypePayType;
};

export default function ShowPay({period, pay, semester, shift, specialty, typePay} : ShowPayProps) {

    return (
        <FormLayout title="Ficha de Pago" period={period}>
            <Head title="Ficha de Pago" />

            <main className="max-w-4xl px-4 mx-auto my-16">
                <div className="bg-white p-4 shadow space-y-6">
                    <h2 className="text-gray-700 text-2xl font-bold">
                        { pay.name } { pay.mother_last_name } { pay.father_last_name }
                    </h2>

                    <div className="space-y-2 divide-y divide-gray-300">
                        <p className="text-indigo-700 font-bold text-lg flex justify-between p-2">
                            CURP: { '' }
                            <span className="text-gray-700">
                                { pay.curp }
                            </span>
                        </p>

                        <p className="text-indigo-700 font-bold text-lg flex justify-between p-2">
                            { typePay.id === 1 ? 'No. de Ficha' : 'No. de Control' }: { '' }
                            <span className="text-gray-700">
                                { pay.code }
                            </span>
                        </p>

                        <p className="text-indigo-700 font-bold text-lg flex justify-between p-2">
                            Semestre: { '' }
                            <span className="text-gray-700">
                                { semester.semester }{ semester.group }
                            </span>
                        </p>

                        <p className="text-indigo-700 font-bold text-lg flex justify-between p-2">
                            Turno: { '' }
                            <span className="text-gray-700">
                                { shift.shift }
                            </span>
                        </p>

                        <p className="text-indigo-700 font-bold text-lg flex justify-between p-2">
                            Especialidad: { '' }
                            <span className="text-gray-700">
                                { specialty.specialty }
                            </span>
                        </p>

                        <p className="text-indigo-700 font-bold text-lg flex justify-between p-2">
                            Monto: { '' }
                            <span className="text-gray-700">
                                { formatCurrency(period.amount) }
                            </span>
                        </p>
                    </div>
                </div>

                <nav className="my-16 flex justify-between gap-4">
                    <a href={route('report', {pay})} className="text-white font-bold px-4 py-2 bg-indigo-700 hover:bg-indigo-600 transition-colors inline-block uppercase" target="_blank">
                        Ver Ficha
                    </a>

                    <Link href={route(typePay.id === 1 ? 'inscription.edit' : 're-registration.edit', {pay})} className="text-indigo-700 font-bold px-4 py-2 bg-indigo-100 hover:bg-indigo-200 transition-colors inline-block uppercase">
                        Modificar Ficha
                    </Link>
                </nav>
            </main>
        </FormLayout>
    );
}
