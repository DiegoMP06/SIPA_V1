import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, PaginateProps, PayType, PeriodType, SemesterType, ShiftType, SpecialtyType, TypePayType } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import NavigateLink from '@/Components/NavigateLink';
import Pagination from '@/Components/Pagination';
import { FormEventHandler, useMemo } from 'react';
import Swal from 'sweetalert2';
import { formatCurrency } from '@/Helpers';
import SearchForm from '@/Components/SearchForm';

type ShowProps = {
    period: PeriodType<{
        type_pay: TypePayType;
    }>;
    payments: PaginateProps<PayType<{
        semester: SemesterType;
        specialty: SpecialtyType;
        shift: ShiftType;
    }>>;
    page: number;
    search: string;
}

export default function Show({auth, period, payments, page, search} : PageProps<ShowProps>) {
    const title =`${period.start_month} ${period.start_year} - ${period.end_month} ${period.end_year}`;
    const hasPayments = useMemo(() => payments.data.length > 0, [payments]);

    const nameRoute = {1: 'registration', 2: 're-registration', 3: 'extraordinary-exam', 4: 'intersemester-appeal'}[period.type_pay_id];

    const {data, setData, processing, get} = useForm({search, page});

    const handleSearch : FormEventHandler = (e) => {
        e.preventDefault();

        setData('page', 1);

        get(route('periods.show', {period}), {
            preserveScroll: true,
            onError() {
                Swal.fire({
                    title: "Error",
                    text: "Ocurrio un Error al Obtener los Datos",
                    icon: "error"
                });
            }
        });
    }

    return (
        <AuthenticatedLayout header={title} user={auth.user}>
            <Head title={title} />

            <NavigateLink name="dashboard" >
                Volver
            </NavigateLink>

            <div className="flex flex-col lg:flex-row lg:items-center my-16 gap-8">
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-md border border-rose-200 space-y-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Detalles:
                    </h2>

                    <div>
                        <p className="text-rose-700 font-bold text-xl">
                            Periodo { period.active ? 'Activo' : 'No Activo' }
                        </p>

                        <p className="text-rose-700 font-bold text-xl">
                            { period.type_pay.type }
                        </p>

                        <p className="text-rose-700 font-bold text-xl">
                            Número de Cuenta: { '' }
                            <span className="text-gray-800">
                                { period.account_number }
                            </span>
                        </p>

                        <p className="text-rose-700 font-bold text-xl">
                            Clabe Interbancaria: { '' }
                            <span className="text-gray-800">
                                { period.interbank_code }
                            </span>
                        </p>

                        <p className="text-rose-700 font-bold text-xl">
                            Monto: { '' }
                            <span className="text-gray-800">
                                { formatCurrency(period.amount) }
                            </span>
                        </p>
                    </div>
                </div>

                <SearchForm
                    data={data}
                    setData={setData}
                    processing={processing}
                    handleSearch={handleSearch}
                    className="flex-1"
                />
            </div>

            { hasPayments ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    { payments.data.map(payment => (
                        <div key={payment.id} className="space-y-4 p-5 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl border border-rose-200">
                            <h3 className="font-bold text-rose-700 text-xl lg:text-2xl">
                                { payment.name } { payment.father_last_name } { payment.mother_last_name }
                            </h3>

                            <div className="space-y-1">
                                <p className="font-bold text-rose-700">
                                    { payment.semester_id === 1 ? 'Número de Ficha' : 'Número de Control' }: { '' }
                                    <span className="text-gray-800">
                                        { payment.code }
                                    </span>
                                </p>

                                <p className="font-bold text-rose-700">
                                    Grupo: { '' }
                                    <span className="text-gray-800">
                                        { payment.semester.semester }{ payment.semester.group }
                                    </span>
                                </p>

                                <p className="font-bold text-rose-700">
                                    Especialidad: { '' }
                                    <span className="text-gray-800">
                                        { payment.specialty.specialty }
                                    </span>
                                </p>

                                <p className="font-bold text-rose-700">
                                    Turno: { '' }
                                    <span className="text-gray-800">
                                        { payment.shift.shift }
                                    </span>
                                </p>
                            </div>

                            <div>
                                <a target="_blank" href={route(nameRoute + '.show', {id: payment.id})} className="text-white font-bold bg-rose-700 hover:bg-rose-600 transition-colors px-4 py-2 inline-block">
                                    Ver Ficha de Pago
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-xl font-bold text-gray-700 my-40 text-center">
                    No Hay Pagos Disponibles
                </p>
            ) }

            <Pagination pagination={payments} />
        </AuthenticatedLayout>
    )
}
