@if ($pay->period->type_pay_id === 1 || $pay->period->type_pay_id === 2)
    <section class="container pay-normal">
@else
    <section class="container">
@endif
        <x-header
            :$pay
            :$date
            :$sep
            :$logo211
            :$dgeti
        />

        <div class="table__container">
            <table class="table">
                <thead class="table__head">
                    <tr>
                        <th colspan="1">
                            Nombre:
                        </th>
    
                        <td colspan="7">
                            {{ $pay->name }} {{ $pay->father_last_name }} {{ $pay->mother_last_name }}
                        </td>
                    </tr>
    
                    <tr>
                        <th>
                            Semestre:
                        </th>
    
                        <td>
                            {{ $pay->semester->id }}
                        </td>
    
                        <th>
                            Grupo:
                        </th>
    
                        <td>
                            {{ $pay->semester->group }}
                        </td>
    
                        <th>
                            Turno:
                        </th>
    
                        <td>
                            {{ $pay->shift->code }}
                        </td>
    
                        <th>
                            Especialidad:
                        </th>
    
                        <td>
                            {{ $pay->specialty->code }}
                        </td>
                    </tr>
                </thead>
    
                <tbody class="table__body">
                    @if ($pay->period->type_pay_id === 3 || $pay->period->type_pay_id === 4)
                        <tr>
                            <th colspan="1">
                                Materia:
                            </th>
    
                            <td colspan="7">
                                {{ $pay->extraordinaryPayment->subject->subject }}
                            </td>
                        </tr>
    
                        <tr>
                            <th colspan="1">
                                Profesor:
                            </th>
    
                            <td colspan="7">
                                {{ $pay->extraordinaryPayment->teacher->name }} {{ $pay->extraordinaryPayment->teacher->father_last_name }} {{ $pay->extraordinaryPayment->teacher->mother_last_name }}
                            </td>
                        </tr>
                    @endif
    
                    <tr>
                        <th colspan="8">
                            Datos del Deposito
                        </th>
                    </tr>
    
                    <tr>
                        <th colspan="3">
                            Concepto de Pago:
                        </th>
    
                        <td colspan="5">
                            {{  $pay->period->typePay->type }}
                        </td>
                    </tr>
    
                    <tr>
                        <th colspan="3">
                            No. de Cuenta:
                        </th>
    
                        <td colspan="5">
                            {{ $pay->period->account_number }}
                        </td>
                    </tr>
    
                    <tr>
                        <th colspan="3">
                            No. de Referencia:
                        </th>
    
                        <td colspan="5">
                            {{ $pay->code }}
                        </td>
                    </tr>
    
                    <tr>
                        <th colspan="3">
                            Clabe Interbancaria:
                        </th>
    
                        <td colspan="5">
                            {{ $pay->period->interbank_code }}
                        </td>
                    </tr>
                </tbody>
    
                <tfoot>
                    <tr>
                        <th colspan="2">
                            Monto:
                        </th>
    
                        <td colspan="2">
                            ${{ $pay->period->amount }}
                        </td>
    
                        <th colspan="2">
                            Banco:
                        </th>
    
                        <td colspan="2">
                            <img
                                src="data:image/jpg;base64,{{ $banco }}"
                                alt="Logo de Banco"
                                width="100"
                                height="100"
                                class="table__banco"
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <x-footer
            :$sat
            :$section
        />
    </section>
