<?php

namespace App\Http\Controllers\System;

use App\Models\Subject;
use Illuminate\Http\Request;
use App\Models\ClassroomsSubject;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class ClassroomsSubjectsController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Subject $subject, Request $request)
    {
        $data = $request->validate([
            'semester_id' => ['required', 'exists:semesters,id'],
            'specialty_id' => ['required', 'exists:specialties,id']
        ]);

        $exists = ClassroomsSubject::where('subject_id', $subject->id)
            ->where('semester_id', $data['semester_id'])
            ->where('specialty_id', $data['specialty_id'])
            ->exists();

        if($exists) {
            throw ValidationException::withMessages([
                'specialty_id' => 'Ya existe un grupo con ese semestre y especialidad',
            ]);
        }

        ClassroomsSubject::create([
            'subject_id' => $subject->id,
            'semester_id' => $data['semester_id'],
            'specialty_id' => $data['specialty_id']
        ]);

        return redirect()->intended(route('subjects.show', $subject, false));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject, ClassroomsSubject $classroomsSubject)
    {
        $classroomsSubject->delete();

        return redirect()->intended(route('subjects.show', $subject, false));
    }
}
