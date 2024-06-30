import FormContainer from '@/Components/FormContainer';
import FormItem from '@/Components/FormItem';
import InputLabel from '@/Components/InputLabel';
import NavigateLink from '@/Components/NavigateLink';
import SelectInput from '@/Components/SelectInput';
import SubmitButton from '@/Components/SubmitButton';
import usePeriods from '@/Hooks/usePeriods';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import { PageProps, PeriodType } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import Swal from 'sweetalert2';
import TextInput from '@/Components/TextInput';


export default function Create({auth} : PageProps) {
    const {MONTHS, years, alerts, setAlerts} = usePeriods();

    const {data, setData, processing, errors, post} = useForm<PeriodType>({
        reference_number: '',
        account_number: '',
        interbank_code: '',
        amount: 0,
        start_month: '',
        start_year: '',
        end_month: '',
        end_year: '',
    });

    const handleSubmit : FormEventHandler = (e) => {
        e.preventDefault();

        let currentAlerts : string[] = [];

        if(Object.values(data).some((value) => value.toString().trim() === '' || value === 0)){
            currentAlerts = [
                ...currentAlerts,
                'Todos los campos son obligatorios'
            ];
        }

        if(data.interbank_code.toString().length !== 18 || isNaN(Number(data.interbank_code))) {
            currentAlerts = [
                ...currentAlerts,
                'La Clabe Interbancaria debe tener 18 dígitos'
            ];
        }

        if(data.amount < 0) {
            currentAlerts = [
                ...currentAlerts,
                'El Monto debe ser mayor a 0'
            ];
        }

        setAlerts(currentAlerts);

        if(currentAlerts.length === 0) {
            post(route('periods.store'), {
                preserveScroll: true,
            });
        }
    }

    return (
        <AuthenticatedLayout
            header="Agregar Periodo"
            user={auth.user}
        >
            <Head title="Agregar Periodo" />

            <NavigateLink name="dashboard">
                Volver
            </NavigateLink>

            <FormContainer
                handleSubmit={handleSubmit}
            >
                <div>
                    { alerts.map((alert, index) => (
                        <InputError key={index} message={alert} />
                    )) }
                </div>

                <FormItem>
                    <InputLabel htmlFor="reference_number">
                        Número de Referencia:
                    </InputLabel>

                    <TextInput
                        type="number"
                        placeholder="Número de Referencia del Pago"
                        id="reference_number"
                        name="reference_number"
                        value={data.reference_number}
                        onChange={(e) => setData('reference_number', e.target.value)}
                    />

                    <InputError message={errors.reference_number} />
                </FormItem>

                <FormItem>
                    <InputLabel htmlFor="account_number">
                        Número de Cuenta:
                    </InputLabel>

                    <TextInput
                        type="text"
                        placeholder="Número de Cuenta para el Pago"
                        id="account_number"
                        name="account_number"
                        value={data.account_number}
                        onChange={(e) => setData('account_number', e.target.value)}
                    />

                    <InputError message={errors.account_number} />
                </FormItem>

                <FormItem>
                    <InputLabel htmlFor="interbank_code">
                        Clabe Interbancaria:
                    </InputLabel>

                    <TextInput
                        type="number"
                        placeholder="Clabe Interbancaria para el Pago"
                        id="interbank_code"
                        name="interbank_code"
                        value={data.interbank_code}
                        onChange={(e) => setData('interbank_code', e.target.value)}
                    />

                    <InputError message={errors.interbank_code} />
                </FormItem>

                <FormItem>
                    <InputLabel htmlFor="amount">
                        Monto:
                    </InputLabel>

                    <TextInput
                        type="number"
                        placeholder="Monto para el Pago"
                        id="amount"
                        name="amount"
                        value={data.amount}
                        onChange={(e) => setData('amount', Number(e.target.value))}
                    />

                    <InputError message={errors.amount} />
                </FormItem>

                <FormItem>
                    <InputLabel htmlFor="start_month">
                        Mes de Inicio:
                    </InputLabel>

                    <SelectInput
                        id="start_month"
                        name="start_month"
                        value={data.start_month}
                        onChange={(e) => setData('start_month', e.target.value)}
                    >
                        { MONTHS.map((month, index) => (
                            <option key={index} value={month.toUpperCase()}>
                                {month}
                            </option>
                        )) }
                    </SelectInput>

                    <InputError message={errors.start_month} />
                </FormItem>

                <FormItem>
                    <InputLabel htmlFor="start_year">
                        Año de Inicio:
                    </InputLabel>

                    <SelectInput
                        id="start_year"
                        name="start_year"
                        value={data.start_year}
                        onChange={(e) => setData('start_year', e.target.value)}
                    >
                        { years.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        )) }
                    </SelectInput>

                    <InputError message={errors.start_year} />
                </FormItem>

                <FormItem>
                    <InputLabel htmlFor="end_month">
                        Mes de Fin:
                    </InputLabel>

                    <SelectInput
                        id="end_month"
                        name="end_month"
                        value={data.end_month}
                        onChange={(e) => setData('end_month', e.target.value)}
                    >
                        { MONTHS.map((month, index) => (
                            <option key={index} value={month.toUpperCase()}>
                                {month}
                            </option>
                        )) }
                    </SelectInput>

                    <InputError message={errors.end_month} />
                </FormItem>

                <FormItem>
                    <InputLabel htmlFor="end_year">
                        Año de Fin:
                    </InputLabel>

                    <SelectInput
                        id="end_year"
                        name="end_year"
                        value={data.end_year}
                        onChange={(e) => setData('end_year', e.target.value)}
                    >
                        { years.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        )) }
                    </SelectInput>

                    <InputError message={errors.end_year} />
                </FormItem>

                <SubmitButton value="Agregar Periodo" disabled={processing} />
            </FormContainer>
        </AuthenticatedLayout>
    )
}

