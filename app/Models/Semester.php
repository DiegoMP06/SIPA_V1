<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    use HasFactory;

    public static function canRegistration() : bool
    {
        $activeSemesters = self::where('active', true)
            ->where('id', '=', 1)
            ->exists();

        return $activeSemesters;
    }

    public static function canReRegistration() : bool
    {
        $activeSemesters = self::where('active', true)
            ->where('id', '!=', 1)
            ->get()
            ->count();

        return $activeSemesters > 1 ? true : false;
    }
}
