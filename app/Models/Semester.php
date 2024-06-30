<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    use HasFactory;

    public static function canRegister() : bool
    {
        $firstSemester = self::where('semester', 1)
            ->first();

        return $firstSemester->active ? true : false;
    }

    public static function canReRegister() : bool
    {
        $activeSemesters = self::where('active', true)
            ->where('semester', '!=', 1)
            ->get();

        return count($activeSemesters) > 1 ? true : false;
    }
}
