<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RegistrationProgress;

class RegistrationProgressController extends Controller
{
    public function save(Request $request)
    {
        $request->validate([
            'ofw_id' => 'required|exists:ofws,id',
            'form_data' => 'nullable|array',
            'completed_steps' => 'nullable|array',
        ]);

        $progress = RegistrationProgress::updateOrCreate(
            ['ofw_id' => $request->ofw_id],
            [
                'form_data' => $request->form_data,
                'completed_steps' => $request->completed_steps,
            ]
        );

        return response()->json([
            'success' => true,
            'data' => $progress,
        ]);
    }
}
