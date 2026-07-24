<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassroomsSubject extends Model
{
    use HasFactory;

    protected $fillable = [
        'semester_id',
        'specialty_id',
        'subject_id',
    ];

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
