<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Controllers\OfwController;
use App\Models\Agency;
use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\PersonalDetailController;
use App\Http\Controllers\OfwDocumentController;
use App\Http\Controllers\RegistrationProgressController;

Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);
    }

    return response()->json([
        'message' => 'Login successful',
        'role' => $user->role
    ]);
});

Route::post('/register', function (Request $request) {
    // Validate frontend input
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:6|confirmed',
        'role' => 'required|string|in:Agency,Agent,Ofw',
    ]);

    // Map frontend roles to backend roles
    $roleMap = [
        'Agency' => 'Admin',
        'Agent' => 'Agent',
        'Ofw' => 'Ofw',
    ];

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => $roleMap[$request->role] ?? 'Ofw', // default to Ofw
    ]);

    return response()->json([
        'message' => 'Registration successful',
        'user' => $user
    ], 201);
});

Route::post('/ofws', [OfwController::class, 'store']);

Route::get('/agencies', function () {
    return Agency::where('status', 'approved')->get(['id', 'name']);
});

Route::post('/send-verification-code', [EmailVerificationController::class, 'sendCode']);

Route::post('/verify-code', [EmailVerificationController::class, 'verifyCode']);

Route::post('/personal-details', [PersonalDetailController::class, 'store']);

Route::get('/agencies', function () {
    // Fetch all users with role = Admin (agency accounts)
    $agencies = User::where('role', User::ROLE_ADMIN)
        ->orderBy('name')
        ->get(['id', 'name']);

    return response()->json($agencies);
});

Route::get('/admin-agencies', function () {
    return \App\Models\User::where('role', 'Admin')->get(['id', 'name']);
});

Route::post('/ofws', [OfwController::class, 'store']); // create
Route::put('/ofws/{ofw}', [OfwController::class, 'update']); // update

Route::post('/documents/upload', [OfwDocumentController::class, 'upload']);
Route::get('/documents/{ofwId}', [OfwDocumentController::class, 'getDocuments']);

Route::post('/save-registration-progress', [RegistrationProgressController::class, 'save']);

Route::get('/ping', fn() => ['status' => 'ok']);
