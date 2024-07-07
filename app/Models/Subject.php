<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject',
        'sctive',
    ];

    public function classrooms()
    {
        return $this->hasMany(ClassroomsSubject::class);
    }

    public function teachers()
    {
        return $this->belongsToMany(Teacher::class, 'subjects_teachers')->withPivot('id');
    }
}
