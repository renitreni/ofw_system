<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EmailVerificationCode;
use App\Models\Ofw;
use Illuminate\Support\Facades\Mail;

class EmailVerificationController extends Controller
{
    public function sendCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $code = rand(100000, 999999); // 6-digit code

        // Save or update code
        EmailVerificationCode::updateOrCreate(
            ['email' => $request->email],
            ['code' => $code]
        );

        // Send email
        Mail::raw("Your verification code is: $code", function ($message) use ($request) {
            $message->to($request->email)
                ->subject('Email Verification Code');
        });

        return response()->json(['success' => true, 'message' => 'Verification code sent']);
    }

    public function verifyCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string'
        ]);

        $record = EmailVerificationCode::where('email', $request->email)
            ->where('code', $request->code)
            ->first();

        if (!$record) {
            return response()->json(['success' => false, 'message' => 'Invalid code']);
        }

        // Save OFW data if formData is provided
        if ($request->has('formData')) {
            Ofw::create($request->formData);
        }

        // Delete the code after verification
        $record->delete();

        return response()->json(['success' => true, 'message' => 'Email verified']);
    }
}
