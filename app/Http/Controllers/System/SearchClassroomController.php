<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\ClassroomsSubject;
use Illuminate\Http\Request;

class SearchClassroomController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $data = $request->validate([
            'semester_id' => ['required', 'numeric', 'exists:semesters,id'],
            'specialty_id' => ['required', 'numeric', 'exists:specialties,id'],
        ]);

        $classrooms = ClassroomsSubject::where('semester_id', $data['semester_id'])
            ->where('specialty_id', $data['specialty_id'])
            ->get();

        $subjects = [];

        foreach($classrooms as $classroom) {
            $subject = $classroom->subject;

            if($subject->active) {
                $subjects[] = $subject->load('teachers');
            }
        }

        return response()->json($subjects);
    }
}
