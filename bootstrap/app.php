<?php

use App\Http\Middleware\CanPay;
use App\Http\Middleware\OpenArea;
use Illuminate\Foundation\Application;
use App\Http\Middleware\IsRegistration;
use App\Http\Middleware\CanRegistration;
use App\Http\Middleware\IsCurrentPeriod;
use App\Http\Middleware\IsValidSemester;
use App\Http\Middleware\IsReRegistration;
use App\Http\Middleware\CanReRegistration;
use App\Http\Middleware\IsExtraordinaryExam;
use App\Http\Middleware\CanExtraordinaryExam;
use App\Http\Middleware\IsIntersemesterAppeal;
use App\Http\Middleware\CanIntersemesterAppeal;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'is.valid.semester' => IsValidSemester::class,
            'can.pay' => CanPay::class,
            'can.re-registration' => CanReRegistration::class,
            'can.registration' => CanRegistration::class,
            'can.extraordinary-exam' => CanExtraordinaryExam::class,
            'can.intersemester-appeal' => CanIntersemesterAppeal::class,
            'open.area' => OpenArea::class,
            'is.current-period' => IsCurrentPeriod::class,
            'is.registration' => IsRegistration::class,
            'is.re-registration' => IsReRegistration::class,
            'is.extraordinary-exam' => IsExtraordinaryExam::class,
            'is.intersemester-appeal' => IsIntersemesterAppeal::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
