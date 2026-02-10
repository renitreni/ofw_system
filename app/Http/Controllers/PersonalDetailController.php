<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PersonalDetail;

class PersonalDetailController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'ofw_id' => 'required|exists:ofws,id',
            'address' => 'required',
            'birthdate' => 'required|date',
            'civil_status' => 'required',
        ]);

        PersonalDetail::create($request->all());

        return response()->json([
            'success' => true
        ]);
    }

}
