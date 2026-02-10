<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Agency;

class AgencyController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:agencies,name',
            'status' => 'nullable|in:pending,approved',
        ]);

        $agency = Agency::create([
            'name' => $request->name,
            'status' => $request->status ?? 'pending',
        ]);

        return response()->json(['success' => true, 'id' => $agency->id, 'agency' => $agency]);
    }
}
