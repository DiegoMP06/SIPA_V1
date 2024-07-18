<?php

namespace App\Http\Controllers\Payments;

use App\Models\Pay;
use Inertia\Inertia;
use App\Models\Period;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\TypePay;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;

class SearchController extends Controller
{
    public $search;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $typePays = TypePay::all();

        return Inertia::render('Search', [
            'typePays' => $typePays,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'search' => 'required|string',
            'type_pay_id' => 'required|numeric|exists:type_pays,id',
        ]);

        $this->search = $data['search'];
        $periodActive = Period::where('active', true)
            ->where('type_pay_id', $data['type_pay_id'])
            ->first();

        if(!$periodActive) {
            throw ValidationException::withMessages([
                'search' => 'El Periodo de la Ficha no esta activo',
            ]);
        }

        $pay = Pay::where('code', $this->search)
            ->where('period_id', $periodActive->id)
            ->first();

        if(!$pay) {
            throw ValidationException::withMessages([
                'search' => 'No Existe Ninguna Ficha con las Caracteristicas',
            ]);
        }

        return redirect()->intended(route('search.show', ['type_pay' => $data['type_pay_id'], 'code'=> $pay->code], false));
    }

    /**
     * Display the specified resource.
     */
    public function show(TypePay $typePay, int $code)
    {
        $period = $typePay->periods()->where('active', true)->first();

        if(!$period) {
            return redirect()->intended(route('search'));
        }

        $pays = $period->pays()->where('code', $code)
            ->with('semester', 'shift', 'specialty', 'extraordinaryPayment')
            ->get();

        if($pays->count() === 0) {
            return redirect()->intended(route('search', absolute: false));
        }

        if($typePay->id === 3 || $typePay->id === 4) {
            foreach($pays as $pay) {
                $pay->extraordinaryPayment->load('subject', 'teacher');
            }
        }

        return Inertia::render('ShowPays', [
            'period' => $period,
            'typePay' => $typePay,
            'pays' => $pays,
        ]);
    }
}
