<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RegistrationProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'ofw_id',
        'form_data',
        'completed_steps',
    ];

    protected $casts = [
        'form_data' => 'array',
        'completed_steps' => 'array',
    ];

    public function ofw()
    {
        return $this->belongsTo(Ofw::class);
    }
}
