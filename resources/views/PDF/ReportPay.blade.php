@extends('PDF.Layout')

@section('title')
    Ficha de Pago {{ $pay->name }} {{ $pay->father_last_name }} {{ $pay->mother_last_name }}
@endsection

@section('body')
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
@endsection
