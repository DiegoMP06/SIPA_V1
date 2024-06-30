<?php

namespace App\Http\Controllers\Payments;

use App\Models\Pay;
use Inertia\Inertia;
use App\Models\Shift;
use App\Models\Period;
use App\Models\Semester;
use App\Models\Specialty;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class ReRegistrationController extends Controller
{
    protected $id;
    protected $period_id;
    protected $code;
    protected $curp;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $specialties = Specialty::all();
        $shifts = Shift::all();
        $semesters = Semester::all();
        $period = Period::where('active', 1)->first();

        return Inertia::render('Forms/ReRegistration', [
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
        ]);

        $this->period_id = $data['period_id'];
        $this->curp = $data['curp'];
        $this->code = $data['code'];

        $pay_exists = Pay::where(function($query) {
            $query->where('period_id', $this->period_id)
                ->where('curp', $this->curp);
            })->orWhere(function($query) {
                $query->where('period_id', $this->period_id)
                    ->where('code', $this->code);
            })->first();

        if($pay_exists) {
            throw ValidationException::withMessages([
                'curp' => 'Curp o Número de Control ya Registrados',
            ]);
        }

        $data['type_pay_id'] = 2;
        $pay = Pay::create($data);

        return redirect()->intended(route('re-registration', ['pay' => $pay->id], true));
    }

    /**
     * Display the specified resource.
     */
    public function show(Pay $pay)
    {
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

        return Inertia::render('Forms/EditReRegistration', [
            'specialties' => $specialties,
            'shifts' => $shifts,
            'semesters' => $semesters,
            'period' => $period,
            'pay' => $pay,
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
        ]);

        $this->id = $pay->id;
        $this->period_id = $pay->period_id;
        $this->curp = $data['curp'];
        $this->code = $data['code'];

        $pay_exists = Pay::where(function($query) {
                $query->where('period_id', $this->period_id)
                    ->where('curp', $this->curp)
                    ->where('id', '!=', $this->id);
            })->orWhere(function($query) {
                $query->where('period_id', $this->period_id)
                    ->where('code', $this->code)
                    ->where('id', '!=', $this->id);
            })->first();

        if($pay_exists) {
            throw ValidationException::withMessages([
                'curp' => 'Curp o Número de Control ya Registrados',
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

        return redirect()->intended(route('search.show', $pay, true));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
