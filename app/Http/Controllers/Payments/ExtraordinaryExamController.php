<?php

namespace App\Http\Controllers\Payments;

use Carbon\Carbon;
use App\Models\Pay;
use Inertia\Inertia;
use App\Models\Shift;
use App\Models\Period;
use App\Models\Semester;
use App\Models\Specialty;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class ExtraordinaryExamController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $specialties = Specialty::all();
        $shifts = Shift::all();
        $semesters = Semester::all();
        $period = Period::where('active', 1)
            ->where('type_pay_id', 3)
            ->first();

        return Inertia::render('Forms/ExtraordinaryExam', [
            'specialties' => $specialties,
            'shifts' => $shifts,
            'semesters' => $semesters,
            'period' => $period,
            'pay' => $request->pay ?? null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "name" => ["required", "string", "max:100"],
            "mother_last_name" => ["required", "string", "max:100"],
            "father_last_name" => ["required", "string", "max:100"],
            "code" => ["required", "numeric", "digits:14"],
            "semester_id" => ["required", "numeric", "exists:semesters,id"],
            "shift_id" => ["required", "numeric", "exists:shifts,id"],
            "specialty_id" => ["required", "numeric", "exists:specialties,id"],
            "period_id" => ["required", "numeric", "exists:periods,id"],
            "subject_id" => ["required", "numeric", "exists:subjects,id"],
            "teacher_id" => ["required", "numeric", "exists:teachers,id"],
        ]);

        $count = Pay::where('period_id', $request->period_id)
            ->where('code', $request->code)
            ->count();

        if($count > 10) {
            throw ValidationException::withMessages([
                'code' => 'Demasiados Registros en este Número de Control',
            ]);
        }

        $pay = Pay::create([
            'name' => $data['name'],
            'mother_last_name' => $data['mother_last_name'],
            'father_last_name' => $data['father_last_name'],
            'code' => $data['code'],
            'semester_id' => $data['semester_id'],
            'shift_id' => $data['shift_id'],
            'specialty_id' => $data['specialty_id'],
            'period_id' => $data['period_id'],
        ]);

        $pay->extraordinaryPayment()->create([
            'subject_id' => $data['subject_id'],
            'teacher_id' => $data['teacher_id'],
        ]);

        return redirect()->intended(route('extraordinary-exam', ['pay' => $pay->id], false));
    }

    /**
     * Display the specified resource.
     */
    public function show(Pay $pay)
    {
        $date = Carbon::now('America/Mexico_City')->locale('es');

        $dgeti = base64_encode(file_get_contents(public_path('img/dgeti.webp')));
        $sep = base64_encode(file_get_contents(public_path('img/sep.webp')));
        $logo_211 = base64_encode(file_get_contents(public_path('img/logo_211.webp')));
        $banco = base64_encode(file_get_contents(public_path('img/banco.webp')));
        $sat = base64_encode(file_get_contents(public_path('img/sat.webp')));

        $pdf = Pdf::loadView('PDF.ReportPay', [
            'pay' => $pay,
            'logo_211' => $logo_211,
            'sep' => $sep,
            'dgeti' => $dgeti,
            'banco' => $banco,
            'sat' => $sat,
            'date' => $date,
        ]);

        return $pdf->stream('FICHA_EEXAMEN_EXTRAORDINARIO_'.$pay->code.'.pdf');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pay $pay)
    {
        $specialties = Specialty::all();
        $shifts = Shift::all();
        $semesters = Semester::all();
        $period = $pay->period;
        $extraordinaryPayment = $pay->extraordinaryPayment;

        return Inertia::render('Forms/EditExtraordinaryExam', [
            'specialties' => $specialties,
            'shifts' => $shifts,
            'semesters' => $semesters,
            'period' => $period,
            'pay' => $pay,
            'extraordinaryPayment' => $extraordinaryPayment,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pay $pay)
    {
        $data = $request->validate([
            "name" => ["required", "string", "max:100"],
            "mother_last_name" => ["required", "string", "max:100"],
            "father_last_name" => ["required", "string", "max:100"],
            "code" => ["required", "numeric", "digits:14"],
            "semester_id" => ["required", "numeric", "exists:semesters,id"],
            "shift_id" => ["required", "numeric", "exists:shifts,id"],
            "specialty_id" => ["required", "numeric", "exists:specialties,id"],
            "subject_id" => ["required", "numeric", "exists:subjects,id"],
            "teacher_id" => ["required", "numeric", "exists:teachers,id"],
        ]);

        $count = Pay::where('period_id', $pay->period_id)
            ->where('code', $request->code)
            ->where('id', '!=', $pay->id)
            ->count();

        if($count > 10) {
            throw ValidationException::withMessages([
                'code' => 'Demasiados Registros en este Número de Control',
            ]);
        }

        $pay->name = $data['name'];
        $pay->mother_last_name = $data['mother_last_name'];
        $pay->father_last_name = $data['father_last_name'];
        $pay->code = $data['code'];
        $pay->semester_id = $data['semester_id'];
        $pay->shift_id = $data['shift_id'];
        $pay->specialty_id = $data['specialty_id'];
        $pay->save();

        $extraordinaryPayment = $pay->extraordinaryPayment;
        $extraordinaryPayment->subject_id = $data['subject_id'];
        $extraordinaryPayment->teacher_id = $data['teacher_id'];
        $extraordinaryPayment->save();

        return redirect()->intended(route('search.show', ['code' => $pay->code, 'type_pay' => $pay->period->type_pay_id], false));
    }
}
