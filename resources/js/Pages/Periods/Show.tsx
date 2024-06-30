import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, PaginateProps, PaymentType, PeriodType } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import NavigateLink from '@/Components/NavigateLink';
import Pagination from '@/Components/Pagination';
import { FormEventHandler, useMemo } from 'react';
import Swal from 'sweetalert2';
import { formatCurrency } from '@/Helpers';

type ShowProps = {
    period: PeriodType;
    payments: PaginateProps<PaymentType>;
    page: number;
    search: string;
}

export default function Show({auth, period, payments, page, search} : PageProps<ShowProps>) {
    const hasPayments = useMemo(() => payments.data.length > 0, [payments]);

    const title =`${period.start_month} ${period.start_year} - ${period.end_month} ${period.end_year}`;

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


            <div className="bg-white p-4 shadow my-16 max-w-4xl space-y-4">
                <h2 className="text-3xl font-bold text-gray-700">
                    Detalles:
                </h2>

                <p className="bg-indigo-700 text-white px-4 py-2 inline-block font-bold text-2xl">
                    Perido { period.active ? 'Activo' : 'No Activo' }
                </p>

                <div>
                    <p className="text-indigo-700 font-bold text-xl">
                        Número de Cuenta: { '' }
                        <span className="text-gray-700">
                            { period.account_number }
                        </span>
                    </p>

                    <p className="text-indigo-700 font-bold text-xl">
                        Número de Referencia: { '' }
                        <span className="text-gray-700">
                            { period.reference_number }
                        </span>
                    </p>

                    <p className="text-indigo-700 font-bold text-xl">
                        Clabe Interbancaria: { '' }
                        <span className="text-gray-700">
                            { period.interbank_code }
                        </span>
                    </p>

                    <p className="text-indigo-700 font-bold text-xl">
                        Monto: { '' }
                        <span className="text-gray-700">
                            { formatCurrency(period.amount) }
                        </span>
                    </p>
                </div>
            </div>

            <form className="my-10 max-w-xl flex"onSubmit={handleSearch}>
                <input
                    type="search"
                    name="search"
                    id="search"
                    className="flex-1 block rounded-tl rounded-bl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Buscar [CURP, No. Control, No. Ficha]"
                    onChange={(e) => setData('search', e.target.value)}
                    value={data.search}
                />

                <button type="submit" disabled={processing} className="bg-indigo-700 text-white px-4 py-2 rounded-tr rounded-br hover:bg-indigo-600 transition-colors disabled:opacity-25 disabled:bg-indigo-700 disabled:cursor-default cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </form>

                { hasPayments ?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                        { payments.data.map(payment => (
                            <div key={payment.id} className="space-y-4 p-4 bg-white shadow-md">
                                <h3 className="font-bold text-indigo-700 text-xl lg:text-2xl">
                                    { payment.name } { payment.father_last_name } { payment.mother_last_name }
                                </h3>

                                <div className="space-y-1">
                                    <p className="font-bold text-indigo-700">
                                        Tipo de Pago: { '' }
                                        <span className="text-gray-700">
                                            { payment.type_pay.type }
                                        </span>
                                    </p>

                                    <p className="font-bold text-indigo-700">
                                        { payment.type_pay_id === 1 ? 'Número de Ficha' : 'Número de Control' }: { '' }
                                        <span className="text-gray-700">
                                            { payment.code }
                                        </span>
                                    </p>

                                    <p className="font-bold text-indigo-700">
                                        CURP: { '' }
                                        <span className="text-gray-700">
                                            { payment.curp }
                                        </span>
                                    </p>

                                    <p className="font-bold text-indigo-700">
                                        Grupo: { '' }
                                        <span className="text-gray-700">
                                            { payment.semester.semester }{ payment.semester.group }
                                        </span>
                                    </p>

                                    <p className="font-bold text-indigo-700">
                                        Especialidad: { '' }
                                        <span className="text-gray-700">
                                            { payment.specialty.specialty }
                                        </span>
                                    </p>

                                    <p className="font-bold text-indigo-700">
                                        Turno: { '' }
                                        <span className="text-gray-700">
                                            { payment.shift.shift }
                                        </span>
                                    </p>
                                </div>

                                <div className="">
                                    <a target="_blank" href={route('report', {id: payment.id})} className="text-white font-bold bg-indigo-700 hover:bg-indigo-600 transition-colors px-4 py-2 inline-block">
                                        Ver Ficha de Pago
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <p className="text-xl font-bold text-gray-600 my-40 text-center">
                        No Hay Pagos Disponibles
                    </p>
                }

            <Pagination pagination={payments} />
        </AuthenticatedLayout>
    )
}
