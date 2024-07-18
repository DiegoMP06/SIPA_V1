<?php

namespace App\Http\Controllers;

use App\Models\Period;
use App\Models\Semester;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $canPay = Period::canPay();
        $canRegister = Period::canRegister() && Semester::canRegistration();
        $canReRegister = Period::canReRegister() && Semester::canReRegistration();
        $canExtraordinaryExam = Period::canExtraordinaryExam();
        $canIntersemesterAppeal = Period::canIntersemesterAppeal();
        $semesters = Semester::where('active', 1)->where('id', '!=', 1)->get();

        return Inertia::render('Home', [
            'canPay' => $canPay,
            'canRegister' => $canRegister,
            'canReRegister' => $canReRegister,
            'canExtraordinaryExam' => $canExtraordinaryExam,
            'canIntersemesterAppeal' => $canIntersemesterAppeal,
            'semesters' => $semesters,
        ]);
    }
}
