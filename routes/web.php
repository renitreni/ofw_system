<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function () {
    return view('app'); 
});

Route::get('/{any}', function () {
    return view('app'); 
})->where('any', '^(?!api).*$'); 


