<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Payments\InscriptionController;
use App\Http\Controllers\Payments\ReportController;
use App\Http\Controllers\Payments\ReRegistrationController;
use App\Http\Controllers\Payments\SearchController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\System\PeriodController;
use App\Http\Controllers\System\SemesterController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::middleware(['guest', 'can.pay'])->group(function() {
    Route::get('/inscription', [InscriptionController::class, 'create'])->name('inscription')->middleware(['can.register']);
    Route::post('/inscription', [InscriptionController::class, 'store'])->name('inscription.store')->middleware(['can.register']);
    Route::get('/inscription/{pay}/edit', [InscriptionController::class, 'edit'])->name('inscription.edit')->middleware(['can.register', 'current.period', 'is.inscription']);
    Route::patch('/inscription/{pay}', [InscriptionController::class, 'update'])->name('inscription.update')->middleware(['can.register', 'current.period', 'is.inscription']);

    Route::get('/re-registration', [ReRegistrationController::class, 'create'])->name('re-registration')->middleware(['can.re-register']);
    Route::post('/re-registration', [ReRegistrationController::class, 'store'])->name('re-registration.store')->middleware(['can.re-register']);
    Route::get('/re-registration/{pay}/edit', [ReRegistrationController::class, 'edit'])->name('re-registration.edit')->middleware(['can.re-register', 'current.period', 'is.re-register']);
    Route::patch('/re-registration/{pay}', [ReRegistrationController::class, 'update'])->name('re-registration.update')->middleware(['can.re-register', 'current.period', 'is.re-register']);

    Route::get('/search', [SearchController::class, 'index'])->name('search');
    Route::post('/search', [SearchController::class, 'store'])->name('search.store');
    Route::get('/search/{pay}', [SearchController::class, 'show'])->name('search.show')->middleware(['current.period']);
});

Route::get('/report/{pay}', ReportController::class)->name('report')->middleware(['open.area']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/semesters', [SemesterController::class, 'index'])->name('semesters.index');
    Route::patch('/semesters/{semester}', [SemesterController::class, 'update'])->name('semesters.update');

    Route::get('/dashboard', [PeriodController::class, 'index'])->name('dashboard');

    Route::get('/periods/create', [PeriodController::class, 'create'])->name('periods.create');
    Route::post('/periods', [PeriodController::class, 'store'])->name('periods.store');
    Route::get('/periods/{period}', [PeriodController::class, 'show'])->name('periods.show');
    Route::get('/periods/{period}/edit', [PeriodController::class, 'edit'])->name('periods.edit');
    Route::patch('/periods/{period}', [PeriodController::class, 'update'])->name('periods.update');
    Route::delete('/periods/{period}', [PeriodController::class, 'destroy'])->name('periods.destroy');
});

require __DIR__.'/auth.php';
