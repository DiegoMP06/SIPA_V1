<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\TypePay;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypePayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $typePays = TypePay::orderBy('id', 'DESC')
            ->paginate(20);

        return Inertia::render('TypePays', [
            'typePays' => $typePays,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('TypePays/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => ['required', 'string', 'max:100'],
            'code' => ['required', 'string', 'max:100'],
            'active' => ['nullable', 'boolean'],
        ]);

        $typePay = TypePay::create([
            'type' => $data['type'],
            'code' => $data['code'],
            'active' => $data['active'] ?? true,
        ]);

        return redirect()->intended(route('type-pays.index', absolute: false));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TypePay $typePay)
    {
        return Inertia::render('TypePays/Edit', [
            'typePay' => $typePay,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TypePay $typePay)
    {
        $data = $request->validate([
            'type' => ['string', 'max:100'],
            'code' => ['string', 'max:100'],
            'active' => ['nullable', 'boolean'],
        ]);

        $typePay->type = $data['type'] ?? $typePay->type;
        $typePay->code = $data['code'] ?? $typePay->code;
        $typePay->active = $data['active'] ?? $typePay->active;
        $typePay->save();

        return redirect()->intended(route('type-pays.index', absolute: false));
    }
}
