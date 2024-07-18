<?php

namespace App\Http\Controllers\System;

use Inertia\Inertia;
use App\Models\Subject;
use App\Models\Semester;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ClassroomsSubject;
use App\Models\Specialty;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subjects = Subject::orderBy('id', 'DESC')
            ->paginate(20);

        return Inertia::render('Subjects', [
            'subjects' => $subjects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $semesters = Semester::all();
        $specialties = Specialty::all();

        return Inertia::render('Subjects/Create', [
            'semesters' => $semesters,
            'specialties' => $specialties,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'subject' => ['required', 'string', 'max:100'],
            'classrooms' => ['required', 'array', 'min:1']
        ]);

        $subject = Subject::create($data);

        foreach($data['classrooms'] as $classroom) {
            ClassroomsSubject::create([
                'semester_id' => $classroom['semester_id'],
                'specialty_id' => $classroom['specialty_id'],
                'subject_id' => $subject->id,
            ]);
        }

        return redirect()->intended(route('subjects.show', $subject, false));
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {
        $clasrooms = $subject->classrooms()
            ->with('semester')
            ->with('specialty')
            ->orderBy('id', 'DESC')
            ->get();
        $teachers = $subject->teachers;
        $semesters = Semester::all();
        $specialties = Specialty::all();

        return Inertia::render('Subjects/Show', [
            'subject' => $subject,
            'teachers' => $teachers,
            'classrooms' => $clasrooms,
            'semesters' => $semesters,
            'specialties' => $specialties,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subject $subject)
    {
        return Inertia::render('Subjects/Edit', [
            'subject' => $subject,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subject $subject)
    {
        $data = $request->validate([
            'subject' => ['string', 'max:100'],
            'active' => ['boolean']
        ]);

        $subject->subject = $data['subject'] ?? $subject->subject;
        $subject->active = $data['active'] ?? $subject->active;
        $subject->save();

        $route = $request->dashboard ? route('subjects.index', absolute: false) : route('subjects.show', $subject, false);
        return redirect()->intended($route);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        $subject->delete();

        return redirect()->intended(route('subjects.index', absolute: false));
    }
}
