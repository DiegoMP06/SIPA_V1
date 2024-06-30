<section class="container">
    <header class="header">
        <picture class="header__sep">
            <img
                src="data:image/jpg;base64,{{ $sep }}"
                alt="Logo de La SEP"
                width="100"
                height="100"
                class="header__sep--img"
            />
        </picture>

        <h1 class="header__heading">
            Comité Escolar de Administración Participativa (CEAP)
        </h1>

        <div class="header__logos">
            <picture class="header__logo-211">
                <img
                    src="data:image/jpg;base64,{{ $logo211 }}"
                    alt="Logo del CBTis 211"
                    width="100"
                    height="100"
                    class="header__logo-211--img"
                />
            </picture>

            <picture class="header__dgeti">
                <img
                    src="data:image/jpg;base64,{{ $dgeti }}"
                    alt="Logo de la DGETI"
                    width="100"
                    height="100"
                    class="header__dgeti--img"
                />
            </picture>
        </div>

        <p class="header__date">
            SAN JORGE TEZOQUIPAN, TLAX., A {{ $date->isoFormat('ll') }}
            <br />
            {{ $pay->period->start_month }} {{ $pay->period->start_year }} - {{ $pay->period->end_month }} {{ $pay->period->end_year }}
        </p>
    </header>


    <p class="table__heading">
        Ficha de Deposito
    </p>

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
                    {{ $pay->semester->semester }}
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
                    {{ $pay->typePay->code }}
                </td>
            </tr>

            <tr>
                <th colspan="3">
                    No. de Referencia:
                </th>

                <td colspan="5">
                    {{ $pay->period->reference_number }}
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

    <picture class="sat">
        <img
            src="data:image/jpg;base64,{{ $sat }}"
            alt="Logo de Banco"
            width="100"
            height="100"
            class="sat--img"
        />
    </picture>

    <p class="section-name">
        Copia {{ $section }}
    </p>
</section>
