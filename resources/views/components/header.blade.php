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
