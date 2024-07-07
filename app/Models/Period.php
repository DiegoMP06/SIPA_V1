<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Period extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference_number',
        'account_number',
        'interbank_code',
        'amount',
        'start_month',
        'start_year',
        'end_month',
        'end_year',
        'active',
        'type_pay_id',
    ];

    public static function canPay() : bool
    {
        $activePeriod = self::where('active', true)
            ->first();

        return $activePeriod ? true : false;
    }

    public static function canRegister() : bool
    {
        $periodRegister = self::where('active', true)
            ->where('type_pay_id', 1)
            ->first();

        return $periodRegister ? true : false;
    }

    public static function canExtraordinaryExam() : bool
    {
        $periodRegister = self::where('active', true)
            ->where('type_pay_id', 2)
            ->first();

        return $periodRegister ? true : false;
    }

    public static function canIntersemesterAppeal() : bool
    {
        $periodRegister = self::where('active', true)
            ->where('type_pay_id', 3)
            ->first();

        return $periodRegister ? true : false;
    }

    public function pays()
    {
        return $this->hasMany(Pay::class);
    }

    public function typePay()
    {
        return $this->belongsTo(TypePay::class);
    }
}
