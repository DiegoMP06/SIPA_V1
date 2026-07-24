<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'father_last_name',
        'mother_last_name',
        'active',
    ];

    public function casts()
    {
        return [
            'active' => 'boolean',
        ];
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'subjects_teachers')->withPivot('id');
    }
}
