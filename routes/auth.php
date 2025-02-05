<?php

use App\Http\Controllers\Auth\OAuthController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

Route::middleware('guest')->group(function () {
    Route::get('/auth/redirect', function () {
        return Socialite::driver('google')->redirect();
    });

    Route::get('/auth/callback', [OAuthController::class, 'show']);
    Route::post('/auth/callback', [OAuthController::class, 'store']);
});
