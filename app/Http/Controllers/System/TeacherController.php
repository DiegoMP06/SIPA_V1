<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teachers = Teacher::orderBy('id', 'DESC')
            ->paginate(20);

        return Inertia::render('Teachers', [
            'teachers' => $teachers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Teachers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'max:100', 'string'],
            'father_last_name' => ['required', 'max:100', 'string'],
            'mother_last_name' => ['required', 'max:100', 'string'],
            'active' => ['nullable', 'boolean'],
        ]);

        $teacher = Teacher::create([
            'name' => $data['name'],
            'father_last_name' => $data['father_last_name'],
            'mother_last_name' => $data['mother_last_name'],
            'active' => $data['active'] ?? true,
        ]);

        return redirect()->intended(route('teachers.show', $teacher, false));
    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        $subjects = $teacher->subjects;

        return Inertia::render('Teachers/Show', [
            'teacher' => $teacher,
            'subjects' => $subjects,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Teacher $teacher)
    {
        return Inertia::render('Teachers/Edit', [
            'teacher' => $teacher,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Teacher $teacher)
    {
        $data = $request->validate([
            'name' => ['max:100', 'string'],
            'father_last_name' => ['max:100', 'string'],
            'mother_last_name' => ['max:100', 'string'],
            'active' => ['boolean'],
        ]);

        $teacher->name = $data['name'] ?? $teacher->name;
        $teacher->father_last_name = $data['father_last_name'] ?? $teacher->father_last_name;
        $teacher->mother_last_name = $data['mother_last_name'] ?? $teacher->mother_last_name;
        $teacher->active = $data['active'] ?? $teacher->active;
        $teacher->save();

        $route = $request->dashboard ? route('teachers.index', absolute: false) : route('teachers.show', $teacher, false);
        return redirect()->intended($route);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        $teacher->delete();

        return redirect()->intended(route('teachers.index', false));
    }
}
