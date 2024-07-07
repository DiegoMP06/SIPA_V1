<?php

namespace App\Http\Controllers\System;

use Inertia\Inertia;
use App\Models\Semester;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SemesterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $semesters = Semester::all();

        return Inertia::render('Semesters', [
            'semesters' => $semesters,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Semester $semester)
    {
        $data = $request->validate([
            'active' => 'required|boolean',
        ]);

        $semester->active = $data['active'];

        $semester->save();

        return redirect()->intended(route('semesters.index', absolute: true));
    }
}
