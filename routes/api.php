<?php

use App\Http\Controllers\System\SearchClassroomController;
use App\Http\Controllers\System\SearchTeachersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\System\TeachersSubjectsController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['auth.session'])->group(function() {
    Route::get('/subjects-teachers', [TeachersSubjectsController::class, 'index'])->name('subjects-teachers.index');
});

Route::middleware(['guest'])->group(function () {
    Route::get('/search-classrooms', SearchClassroomController::class)->name('search-classrooms');
});
