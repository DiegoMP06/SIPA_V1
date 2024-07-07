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

class IntersemesterAppealController extends Controller
{
    protected $id;
    protected $period_id;
    protected $code;
    protected $curp;

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

        return Inertia::render('Forms/IntersemesterAppeal', [
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
            "curp" => ["required", "string", "regex:/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/"],
            "semester_id" => ["required", "numeric", "exists:semesters,id"],
            "shift_id" => ["required", "numeric", "exists:shifts,id"],
            "specialty_id" => ["required", "numeric", "exists:specialties,id"],
            "period_id" => ["required", "numeric", "exists:periods,id"],
            "subject_id" => ["required", "numeric", "exists:subjects,id"],
            "teacher_id" => ["required", "numeric", "exists:teachers,id"],
        ]);

        $this->period_id = $data['period_id'];
        $this->curp = $data['curp'];
        $this->code = $data['code'];

        $count = Pay::where(function($query) {
                $query->where('period_id', $this->period_id)
                    ->where('curp', $this->curp);
            })->orWhere(function($query) {
                $query->where('period_id', $this->period_id)
                    ->where('code', $this->code);
            })->count();

        if($count > 10) {
            throw ValidationException::withMessages([
                'curp' => 'Demasiados Registros en este CURP o Número de Control',
            ]);
        }

        $pay = Pay::create([
            'name' => $data['name'],
            'mother_last_name' => $data['mother_last_name'],
            'father_last_name' => $data['father_last_name'],
            'code' => $data['code'],
            'curp' => $data['curp'],
            'semester_id' => $data['semester_id'],
            'shift_id' => $data['shift_id'],
            'specialty_id' => $data['specialty_id'],
            'period_id' => $data['period_id'],
        ]);

        $pay->extraordinaryPayment()->create([
            'subject_id' => $data['subject_id'],
            'teacher_id' => $data['teacher_id'],
        ]);

        return redirect()->intended(route('intersemester-appeal', ['pay' => $pay->id], true));
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

        return $pdf->stream('FICHA_RECURSAMIENTO_INTERSEMESTRAL_'.$pay->curp.'.pdf');
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

        return Inertia::render('Forms/EditIntersemesterAppeal', [
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
            "curp" => ["required", "string", "regex:/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/"],
            "semester_id" => ["required", "numeric", "exists:semesters,id"],
            "shift_id" => ["required", "numeric", "exists:shifts,id"],
            "specialty_id" => ["required", "numeric", "exists:specialties,id"],
            "subject_id" => ["required", "numeric", "exists:subjects,id"],
            "teacher_id" => ["required", "numeric", "exists:teachers,id"],
        ]);

        $this->id = $pay->id;
        $this->period_id = $pay->period_id;
        $this->curp = $data['curp'];
        $this->code = $data['code'];

        $count = Pay::where(function($query) {
                $query->where('period_id', $this->period_id)
                    ->where('curp', $this->curp)
                    ->where('id', '!=', $this->id);
            })->orWhere(function($query) {
                $query->where('period_id', $this->period_id)
                    ->where('code', $this->code)
                    ->where('id', '!=', $this->id);
            })->count();

        if($count > 10) {
            throw ValidationException::withMessages([
                'curp' => 'Demasiados Registros en este CURP o Número de Control',
            ]);
        }

        $pay->name = $data['name'];
        $pay->mother_last_name = $data['mother_last_name'];
        $pay->father_last_name = $data['father_last_name'];
        $pay->code = $data['code'];
        $pay->curp = $data['curp'];
        $pay->semester_id = $data['semester_id'];
        $pay->shift_id = $data['shift_id'];
        $pay->specialty_id = $data['specialty_id'];
        $pay->save();

        $extraordinaryPayment = $pay->extraordinaryPayment;
        $extraordinaryPayment->subject_id = $data['subject_id'];
        $extraordinaryPayment->teacher_id = $data['teacher_id'];
        $extraordinaryPayment->save();

        return redirect()->intended(route('search.show', ['curp' => $pay->curp, 'type_pay' => $pay->period->type_pay_id], false));

    }
}
