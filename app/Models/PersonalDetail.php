<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalDetail extends Model
{
    use HasFactory;

    protected $table = 'personal_details';

    protected $fillable = [
        'ofw_id',
        'address',
        'birthdate',
        'civil_status',
    ];

    public function ofw()
    {
        return $this->belongsTo(Ofw::class);
    }
}
