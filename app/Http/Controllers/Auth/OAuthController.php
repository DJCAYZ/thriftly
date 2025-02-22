<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\GoogleUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Validation\Rules;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Laravel\Fortify\Events\TwoFactorAuthenticationChallenged;

class OAuthController extends Controller
{
    public function show(Request $request) {
        $googleUser = Socialite::driver('google')->user();

        $user = GoogleUser::updateOrCreate([
            'id' => $googleUser->getId(),
        ], [
            'token' => $googleUser->token,
            'refresh_token' => $googleUser->refreshToken,
            'expires_in' => $googleUser->expiresIn,
        ]);

        if (is_null($user->user_id)) {
            return Inertia::render('Auth/OAuthCallback', [
                'id' => $googleUser->getId(),
                'email' => $googleUser->getEmail(),
                'name' => $googleUser->getName(),
            ]);
        }

        $authUser = $user->user;

        if ($authUser->hasEnabledTwoFactorAuthentication()) {
            $request->session()->put([
                'login.id' => $authUser->getKey(),
                'login.remember' => true,
            ]);

            TwoFactorAuthenticationChallenged::dispatch($authUser);
            return redirect('/two-factor-challenge');
        } else {
            Auth::login($authUser, true);
            return redirect('/dashboard');
        }
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $googleUser = GoogleUser::find($request->id);
        $googleUser->user_id = $user->id;
        $googleUser->save();

        event(new Registered($user));

        if ($user->hasEnabledTwoFactorAuthentication()) {
            $request->session()->put([
                'login.id' => $user->getKey(),
                'login.remember' => true,
            ]);

            TwoFactorAuthenticationChallenged::dispatch($user);
            return redirect('/two-factor-challenge');
        } else {
            Auth::login($user, true);
            return redirect('/dashboard');
        } 
    }
}
