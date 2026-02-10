<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class agency extends Model
{
    use HasFactory;

    protected $table = 'agencies';

    protected $fillable = ['name', 'status'];

    public function ofws()
    {
        return $this->hasMany(Ofw::class);
    }
}
