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
    public function __invoke(Request $request)
    {
        $canRegister = Semester::canRegister();
        $canReRegister = Semester::canReRegister();
        $canPay = Period::canPay();

        return Inertia::render('Home', [
            'canRegister' => $canRegister,
            'canReRegister' => $canReRegister,
            'canPay' => $canPay,
        ]);
    }
}
