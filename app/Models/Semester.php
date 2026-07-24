<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    use HasFactory;

    public static function canRegistration() : bool
    {
        return self::where('active', true)
            ->where('id', '=', 1)
            ->exists();
    }

    public static function canReRegistration() : bool
    {
        return self::where('active', true)
            ->where('id', '!=', 1)
            ->count() > 0;
    }
}
