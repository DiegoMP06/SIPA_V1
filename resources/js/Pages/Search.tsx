import FormContainer from '@/Components/FormContainer';
import FormItem from '@/Components/FormItem';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import SubmitButton from '@/Components/SubmitButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { TypePayType } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

type SearchProps = {
    typePays: TypePayType[];
};

export default function Search({typePays} : SearchProps) {
    const {data, setData, processing, errors, post} = useForm({search: '', type_pay_id: 0});
    const [alerts, setAlerts] = useState<string[]>([]);

    const handleSearch : FormEventHandler = (e) => {
        e.preventDefault();

        if(Object.values(data).some(value => value === '' || value === 0)) {
            setAlerts(['Los Campos son Obligatorios']);
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

            <form className="grid grid-cols-1 gap-4" onSubmit={handleSearch}>

                <FormItem>
                    <InputLabel htmlFor="search">
                        Buscar:
                    </InputLabel>

                    <TextInput
                        type="search"
                        name="search"
                        id="search"
                        placeholder="CURP, No. Control, No. Ficha"
                        onChange={(e) => setData('search', e.target.value)}
                        value={data.search}
                    />
                </FormItem>

                <FormItem>
                    <InputLabel htmlFor="search">
                        Tipo de Ficha:
                    </InputLabel>

                    <SelectInput
                        name="type_pay_id"
                        id="type_pay_id"
                        onChange={(e) => setData('type_pay_id', Number(e.target.value))}
                        value={data.type_pay_id}
                    >
                        { typePays.map(type => (
                            <option key={type.id} value={type.id}>
                                { type.type }
                            </option>
                        )) }
                    </SelectInput>
                </FormItem>

                <SubmitButton value="Buscar" />
            </form>

            <InputError message={errors.search} />

            { alerts.map((alert, index) => (
                <InputError key={index} message={alert} />
            )) }
        </GuestLayout>
    )
}
