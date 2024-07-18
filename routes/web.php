<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Payments\ExtraordinaryExamController;
use App\Http\Controllers\Payments\IntersemesterAppealController;
use App\Http\Controllers\Payments\RegistrationController;
use App\Http\Controllers\Payments\ReRegistrationController;
use App\Http\Controllers\Payments\SearchController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\System\ClassroomsSubjectsController;
use App\Http\Controllers\System\PeriodController;
use App\Http\Controllers\System\SemesterController;
use App\Http\Controllers\System\SubjectController;
use App\Http\Controllers\System\TeacherController;
use App\Http\Controllers\System\TeachersSubjectsController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::middleware(['guest', 'can.pay'])->group(function() {
    Route::get('/registration/report', [RegistrationController::class, 'create'])->name('registration')->middleware(['can.registration']);
    Route::post('/registration/report', [RegistrationController::class, 'store'])->name('registration.store')->middleware(['can.registration']);
    Route::get('/registration/report/{pay}/edit', [RegistrationController::class, 'edit'])->name('registration.edit')->middleware(['can.registration', 'is.current-period', 'is.registration']);
    Route::patch('/registration/report/{pay}', [RegistrationController::class, 'update'])->name('registration.update')->middleware(['can.registration', 'is.current-period', 'is.registration']);

    Route::get('/re-registration/{semester}/report', [ReRegistrationController::class, 'create'])->name('re-registration')->middleware(['can.re-registration', 'is.valid.semester']);
    Route::post('/re-registration/{semester}/report', [ReRegistrationController::class, 'store'])->name('re-registration.store')->middleware(['can.re-registration', 'is.valid.semester']);
    Route::get('/re-registration/report/{pay}/edit', [ReRegistrationController::class, 'edit'])->name('re-registration.edit')->middleware(['can.re-registration', 'is.current-period', 'is.re-registration']);
    Route::patch('/re-registration/report/{pay}', [ReRegistrationController::class, 'update'])->name('re-registration.update')->middleware(['can.re-registration', 'is.current-period', 'is.re-registration']);

    Route::get('/extraordinary-exam/report', [ExtraordinaryExamController::class, 'create'])->name('extraordinary-exam')->middleware(['can.extraordinary-exam']);
    Route::post('/extraordinary-exam/report', [ExtraordinaryExamController::class, 'store'])->name('extraordinary-exam.store')->middleware(['can.extraordinary-exam']);
    Route::get('/extraordinary-exam/report/{pay}/edit', [ExtraordinaryExamController::class, 'edit'])->name('extraordinary-exam.edit')->middleware(['can.extraordinary-exam', 'is.current-period', 'is.extraordinary-exam']);
    Route::patch('/extraordinary-exam/report/{pay}', [ExtraordinaryExamController::class, 'update'])->name('extraordinary-exam.update')->middleware(['can.extraordinary-exam', 'is.current-period', 'is.extraordinary-exam']);

    Route::get('/intersemester-appeal/report', [IntersemesterAppealController::class, 'create'])->name('intersemester-appeal')->middleware(['can.intersemester-appeal']);
    Route::post('/intersemester-appeal/report', [IntersemesterAppealController::class, 'store'])->name('intersemester-appeal.store')->middleware(['can.intersemester-appeal']);
    Route::get('/intersemester-appeal/report/{pay}/edit', [IntersemesterAppealController::class, 'edit'])->name('intersemester-appeal.edit')->middleware(['can.intersemester-appeal', 'is.current-period', 'is.intersemester-appeal']);
    Route::patch('/intersemester-appeal/report/{pay}', [IntersemesterAppealController::class, 'update'])->name('intersemester-appeal.update')->middleware(['can.intersemester-appeal', 'is.current-period', 'is.intersemester-appeal']);

    Route::get('/search', [SearchController::class, 'index'])->name('search');
    Route::post('/search', [SearchController::class, 'store'])->name('search.store');
    Route::get('/search/{type_pay}/{code}', [SearchController::class, 'show'])->name('search.show')->where('code', '[0-9]+');
});

Route::middleware(['open.area'])->group(function() {
    Route::get('/registration/report/{pay}', [RegistrationController::class, 'show'])->name('registration.show')->middleware(['is.registration']);
    Route::get('/re-registration/report/{pay}', [ReRegistrationController::class, 'show'])->name('re-registration.show')->middleware(['is.re-registration']);
    Route::get('/extraordinary-exam/report/{pay}', [ExtraordinaryExamController::class, 'show'])->name('extraordinary-exam.show')->middleware(['is.extraordinary-exam']);
    Route::get('/intersemester-appeal/report/{pay}', [IntersemesterAppealController::class, 'show'])->name('intersemester-appeal.show')->middleware(['is.intersemester-appeal']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/semesters', [SemesterController::class, 'index'])->name('semesters.index');

    Route::get('/dashboard', [PeriodController::class, 'index'])->name('dashboard');
    Route::get('/periods/create', [PeriodController::class, 'create'])->name('periods.create');
    Route::post('/periods', [PeriodController::class, 'store'])->name('periods.store');

    Route::get('/subjects', [SubjectController::class, 'index'])->name('subjects.index');
    Route::get('/subjects/create', [SubjectController::class, 'create'])->name('subjects.create');
    Route::post('/subjects', [SubjectController::class, 'store'])->name('subjects.store');

    Route::get('/teachers', [TeacherController::class, 'index'])->name('teachers.index');
    Route::get('/teachers/create', [TeacherController::class, 'create'])->name('teachers.create');
    Route::post('/teachers', [TeacherController::class, 'store'])->name('teachers.store');

    Route::patch('/semesters/{semester}', [SemesterController::class, 'update'])->name('semesters.update');

    Route::get('/periods/{period}', [PeriodController::class, 'show'])->name('periods.show');
    Route::get('/periods/{period}/edit', [PeriodController::class, 'edit'])->name('periods.edit');
    Route::patch('/periods/{period}', [PeriodController::class, 'update'])->name('periods.update');
    Route::delete('/periods/{period}', [PeriodController::class, 'destroy'])->name('periods.destroy');

    Route::get('/subjects/{subject}', [SubjectController::class, 'show'])->name('subjects.show');
    Route::get('/subjects/{subject}/edit', [SubjectController::class, 'edit'])->name('subjects.edit');
    Route::patch('/subjects/{subject}', [SubjectController::class, 'update'])->name('subjects.update');
    Route::delete('/subjects/{subject}', [SubjectController::class, 'destroy'])->name('subjects.destroy');

    Route::get('/teachers/{teacher}', [TeacherController::class, 'show'])->name('teachers.show');
    Route::get('/teachers/{teacher}/edit', [TeacherController::class, 'edit'])->name('teachers.edit');
    Route::patch('/teachers/{teacher}', [TeacherController::class, 'update'])->name('teachers.update');
    Route::delete('/teachers/{teacher}', [TeacherController::class, 'destroy'])->name('teachers.destroy');

    Route::post('/subjects/{subject}/classrooms', [ClassroomsSubjectsController::class, 'store'])->name('classrooms.store');
    Route::delete('/subjects/{subject}/classrooms/{classrooms_subject}', [ClassroomsSubjectsController::class, 'destroy'])->name('classrooms.destroy');

    Route::post('/subjects-teachers', [TeachersSubjectsController::class, 'store'])->name('subjects-teachers.store');
    Route::delete('/subjects-teachers/{subjects_teacher}', [TeachersSubjectsController::class, 'destroy'])->name('subjects-teachers.destroy');
});

require __DIR__.'/auth.php';
