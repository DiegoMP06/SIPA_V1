import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function Search() {
    const {data, setData, processing, errors, post} = useForm({search: ''});
    const [alerts, setAlerts] = useState<string[]>([]);

    const handleSearch : FormEventHandler = (e) => {
        e.preventDefault();

        if(data.search.trim() === '') {
            setAlerts(['Ingrese un valor para buscar']);
            return;
        }

        setAlerts([]);
        
        post(route('search.store'), {
            preserveScroll: true,
        });
    }

    return (
        <GuestLayout>
            <Head title="Buscar Ficha de Pago" />

            <form className="flex" onSubmit={handleSearch}>
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

            <InputError message={errors.search} />

            { alerts.map((alert, index) => (
                <InputError key={index} message={alert} />
            )) }
        </GuestLayout>
    )
}
