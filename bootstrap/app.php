<?php

use App\Http\Middleware\Inscription;
use App\Http\Middleware\IsCurrentPeriod;
use App\Http\Middleware\isInscription;
use App\Http\Middleware\isReRegister;
use App\Http\Middleware\OpenArea;
use App\Http\Middleware\PointOfPayActive;
use App\Http\Middleware\ReRegister;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'can.pay' => PointOfPayActive::class,
            'can.register' => Inscription::class,
            'can.re-register' => ReRegister::class,
            'open.area' => OpenArea::class,
            'current.period' => IsCurrentPeriod::class,
            'is.inscription' => isInscription::class,
            'is.re-register' => isReRegister::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
