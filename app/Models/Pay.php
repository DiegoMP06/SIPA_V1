<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pay extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "mother_last_name",
        "father_last_name",
        "code",
        "curp",
        "semester_id",
        "shift_id",
        "specialty_id",
        "period_id",
        "type_pay_id",
    ];

    public function isActive()
    {
        $currentPeriod = Period::where('active', true)->first();
        return $currentPeriod && $this->period_id === $currentPeriod->id;
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

    public function shift()
    {
        return $this->belongsTo(Shift::class);
    }

    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }

    public function period()
    {
        return $this->belongsTo(Period::class);
    }

    public function typePay()
    {
        return $this->belongsTo(TypePay::class);
    }
}
