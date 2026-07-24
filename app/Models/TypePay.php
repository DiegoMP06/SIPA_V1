<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypePay extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'code',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public function periods()
    {
        return $this->hasMany(Period::class);
    }
}
