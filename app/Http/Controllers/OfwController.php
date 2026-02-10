<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ofw;
use App\Models\User; // <-- Use User instead of Agency

class OfwController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:ofws,email',
            'phone' => 'nullable|string|max:50',
            'emergency_contact' => 'nullable|string|max:50',
        ]);

        $agencyId = $request->agency_id;

        // Handle "Other / Not Listed" agency
        if ($request->filled('agency_name')) {
            $agency = User::create([
                'name' => $request->agency_name,
                'email' => 'noemail+' . time() . '@example.com', // dummy email
                'password' => bcrypt('temporary123'),           // temporary password
                'role' => 'Admin',
            ]);
            $agencyId = $agency->id;
        }

        // Make sure agency_id exists in users table
        if ($agencyId) {
            $agency = User::where('id', $agencyId)
                ->where('role', 'Admin')
                ->first();

            if (!$agency) {
                return response()->json([
                    'success' => false,
                    'message' => 'Selected agency does not exist or is not an Admin.'
                ], 422);
            }
        }

        $ofw = Ofw::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'emergency_contact' => $request->emergency_contact,
            'agency_id' => $agencyId
        ]);

        return response()->json([
            'success' => true,
            'data' => $ofw
        ], 201);
    }

    public function update(Request $request, Ofw $ofw)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:ofws,email,' . $ofw->id, // ignore current OFW
            'phone' => 'nullable|string|max:50',
            'emergency_contact' => 'nullable|string|max:50',
        ]);

        $ofw->update([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'emergency_contact' => $request->emergency_contact,
            'agency_id' => $request->agency_id,
        ]);

        return response()->json([
            'success' => true,
            'data' => $ofw
        ]);
    }


}
