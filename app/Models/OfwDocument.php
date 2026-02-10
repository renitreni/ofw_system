<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OfwDocument extends Model
{
    use HasFactory;

    protected $table = 'ofw_documents';

    protected $fillable = [
        'ofw_id',
        'type',
        'file_path',
        'status',
        'verified_by',
    ];

    public function ofw()
    {
        return $this->belongsTo(\App\Models\Ofw::class);
    }
}
