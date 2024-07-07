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
        $canRegister = Period::canRegister() && Semester::canReRegistration();
        $canExtraordinaryExam = Period::canExtraordinaryExam();
        $canIntersemesterAppeal = Period::canIntersemesterAppeal();

        return Inertia::render('Home', [
            'canPay' => $canPay,
            'canRegister' => $canRegister,
            'canExtraordinaryExam' => $canExtraordinaryExam,
            'canIntersemesterAppeal' => $canIntersemesterAppeal,
        ]);
    }
}
