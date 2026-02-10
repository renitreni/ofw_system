<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ofw extends Model
{
    use HasFactory;

    protected $table = 'ofws';

    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'emergency_contact',
        'agency_id',
        'agency_name',
    ];

    public function agency()
    {
        return $this->belongsTo(Agency::class);
    }
}
