<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ env('APP_NAME') }} - Reporte {{ $pay->curp }}</title>

    <x-style />
</head>
<body>
    <x-pay-section
        :$pay
        :$sep
        :$dgeti
        :logo211="$logo_211"
        :$date
        :$banco
        :$sat
        section="Banco"
    />

    <x-pay-section
        :$pay
        :$sep
        :$dgeti
        :logo211="$logo_211"
        :$date
        :$banco
        :$sat
        section="Financieros"
    />

    <x-pay-section
        :$pay
        :$sep
        :$dgeti
        :logo211="$logo_211"
        :$date
        :$banco
        :$sat
        section="Estudiante"
    />
</body>
</html>
