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
    ];

    public static function canPay() : bool
    {
        $activePeriod = self::where('active', true)
            ->first();

        return $activePeriod ? true : false;
    }

    public function pays()
    {
        return $this->hasMany(Pay::class);
    }
}
