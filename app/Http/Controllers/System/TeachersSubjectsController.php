<?php

namespace App\Http\Controllers\System;

use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;
use App\Models\SubjectsTeacher;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Validation\ValidationException;

class TeachersSubjectsController extends Controller
{
    public function index(Request $request)
    {
        $teachers = Teacher::when($request->search, function(Builder $query, $search) {
            $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('father_last_name', 'like', '%' . $search . '%')
                ->orWhere('mother_last_name', 'like', '%' . $search . '%')
                ->orWhere('email', 'like', '%' . $search . '%')
                ->orWhere('phone', 'like', '%' . $search . '%');
        })
        ->orderBy('id', 'DESC')
        ->paginate(10);

        return response()->json($teachers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'teacher_id' => 'required|exists:teachers,id',
        ]);

        $exists = SubjectsTeacher::where('subject_id', $data['subject_id'])
            ->where('teacher_id', $data['teacher_id'])
            ->exists();

        if($exists) {
            throw ValidationException::withMessages([
                'teacher_id' => 'El profesor ya existe en la asignatura',
            ]);
        }

        SubjectsTeacher::create($data);

        return redirect()->intended(route('subjects.show', $data['subject_id'], false));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubjectsTeacher $subjectsTeacher)
    {
        $subjectsTeacher->delete();

        return redirect()->back();
    }
}
