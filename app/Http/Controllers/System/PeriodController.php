<?php

namespace App\Http\Controllers\System;

use Inertia\Inertia;
use App\Models\Period;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\TypePay;

class PeriodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $periods = Period::orderBy('id', 'DESC')->with('typePay')->paginate(20);

        return Inertia::render('Dashboard', [
            'periods' => $periods
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $typePays = TypePay::all();

        return Inertia::render('Periods/Create', [
            'typePays' => $typePays
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'account_number' => ['required', 'string', 'max:100'],
            'interbank_code' => ['required', 'numeric', 'digits:18'],
            'amount' => ['required', 'numeric', 'min:1'],
            'start_month' => ['required', 'string', 'max:100'],
            'start_year' => ['required', 'numeric', 'digits:4'],
            'end_month' => ['required', 'string', 'max:100'],
            'end_year' => ['required', 'numeric', 'digits:4'],
            'type_pay_id' => ['required', 'numeric', 'exists:type_pays,id'],
        ]);

        $period = Period::create($data);

        return redirect()->intended(route('periods.show', $period, false));
    }

    /**
     * Display the specified resource.
     */
    public function show(Period $period, Request $request)
    {
        $payments = $period->pays()
            ->when($request->search, function($query, $search) {
                $query->where('code', 'like', "%{$search}%")
                    ->orWhere('curp', 'like', "%{$search}%");
            })
            ->with('semester')
            ->with('shift')
            ->with('specialty')
            ->orderBy('id', 'DESC')
            ->paginate(30);

        return Inertia::render('Periods/Show', [
            'period' => $period->load('typePay'),
            'payments' => $payments,
            'search' => $request->search ?? '',
            'page' => $request->page ?? 1,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Period $period)
    {
        $typePays = TypePay::all();

        return Inertia::render('Periods/Edit', [
            'period' => $period,
            'typePays' => $typePays,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Period $period)
    {
        $data = $request->validate([
            'account_number' => ['string', 'max:100'],
            'interbank_code' => ['numeric', 'digits:18'],
            'amount' => ['numeric', 'min:1'],
            'start_month' => ['string', 'max:100'],
            'start_year' => ['numeric', 'digits:4'],
            'end_month' => ['string', 'max:100'],
            'end_year' => ['numeric', 'digits:4'],
            'active' => ['boolean'],
        ]);

        $period->account_number = $data['account_number'] ?? $period->account_number;
        $period->interbank_code = $data['interbank_code'] ?? $period->interbank_code;
        $period->amount = $data['amount'] ?? $period->amount;
        $period->start_month = $data['start_month'] ?? $period->start_month;
        $period->start_year = $data['start_year'] ?? $period->start_year;
        $period->end_month =  $data['end_month'] ?? $period->end_month;
        $period->end_year = $data['end_year'] ?? $period->end_year;
        $period->active = $data['active'] ?? $period->active;
        $period->save();

        if(isset($data['active']) && $data['active'] === true) {
            $periods = Period::where('active', true)
                ->where('id', '!=', $period->id)
                ->where('type_pay_id', $period->type_pay_id)
                ->get();

            foreach($periods as $period) {
                $period->active = false;
                $period->save();
            }
        }

        $route = $request->dashboard ? route('dashboard', absolute: false) : route('periods.show', $period, false);
        return redirect()->intended($route);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Period $period)
    {
        $period->delete();

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
