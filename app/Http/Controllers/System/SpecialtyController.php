<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\Specialty;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpecialtyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $specialties = Specialty::orderBy('id', 'DESC')
            ->paginate(20);

        return Inertia::render('Specialties', [
            'specialties' => $specialties,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Specialties/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'specialty' => ['required', 'string', 'max:100'],
            'code' => ['required', 'string', 'max:100'],
            'active' => ['nullable', 'boolean'],
        ]);

        Specialty::create([
            'specialty' => $data['specialty'],
            'code' => $data['code'],
            'active' => $data['active'] ?? true,
        ]);

        return redirect()->intended(route('specialties.index', absolute: false));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Specialty $specialty)
    {
        return Inertia::render('Specialties/Edit', [
            'specialty' => $specialty,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Specialty $specialty)
    {
        $data = $request->validate([
            'specialty' => ['string', 'max:100'],
            'code' => ['string', 'max:100'],
            'active' => ['nullable', 'boolean'],
        ]);

        $specialty->specialty = $data['specialty'] ?? $specialty->specialty;
        $specialty->code = $data['code'] ?? $specialty->code;
        $specialty->active = $data['active'] ?? $specialty->active;
        $specialty->save();

        return redirect()->intended(route('specialties.index', absolute: false));
    }
}
