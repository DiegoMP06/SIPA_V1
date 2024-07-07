<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    use HasFactory;

    public static function canReRegistration() : bool
    {
        $activeSemesters = self::where('active', true)->get()->count();
        return $activeSemesters > 1 ? true : false;
    }
}
