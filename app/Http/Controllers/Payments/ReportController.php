<?php

namespace App\Http\Controllers\Payments;

use Carbon\Carbon;
use App\Models\Pay;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Controllers\Controller;

class ReportController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Pay $pay, Request $request)
    {
        $date = Carbon::now('America/Mexico_City')->locale('es');

        $dgeti = base64_encode(file_get_contents(public_path('img/dgeti.webp')));
        $sep = base64_encode(file_get_contents(public_path('img/sep.webp')));
        $logo_211 = base64_encode(file_get_contents(public_path('img/logo_211.webp')));
        $banco = base64_encode(file_get_contents(public_path('img/banco.webp')));
        $sat = base64_encode(file_get_contents(public_path('img/sat.webp')));

        $pdf = Pdf::loadView('PDF.ReportPay', [
            'pay' => $pay,
            'logo_211' => $logo_211,
            'sep' => $sep,
            'dgeti' => $dgeti,
            'banco' => $banco,
            'sat' => $sat,
            'date' => $date,
        ]);

        return $pdf->stream('FICHA_PAGO_'.$pay->curp.'.pdf');
    }
}
