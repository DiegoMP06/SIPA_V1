<?php

namespace App\Http\Controllers\Payments;

use App\Models\Pay;
use Inertia\Inertia;
use App\Models\Period;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
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
        return Inertia::render('Search');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'search' => 'required|string',
        ]);

        $this->search = $data['search'];
        $periodActive = Period::where('active', true)->first();

        if(!$periodActive) {
            throw ValidationException::withMessages([
                'search' => 'El periodo actual no esta activo',
            ]);
        }

        $pay = Pay::where(function($query) {
                $query->where('code', $this->search)
                    ->orWhere('curp', $this->search);
            })
            ->where('period_id', $periodActive->id)
            ->first();

        if(!$pay) {
            throw ValidationException::withMessages([
                'search' => 'No Existe Ninguna Ficha con las Caracteristicas',
            ]);
        }

        return redirect()->intended(route('search.show', $pay, false));
    }

    /**
     * Display the specified resource.
     */
    public function show(Pay $pay)
    {
        $semester = $pay->semester;
        $shift = $pay->shift;
        $specialty = $pay->specialty;
        $typePay = $pay->typePay;
        $period = $pay->period;

        return Inertia::render('ShowPay', [
            'pay' => $pay,
            'period' => $period,
            'semester' => $semester,
            'shift' => $shift,
            'specialty' => $specialty,
            'typePay' => $typePay
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pay $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pay $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pay $id)
    {
        //
    }
}
