<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountsController extends Controller
{
    public function list(Request $request) {
        return Inertia::render('Accounts/ListAccounts');
    }

    public function create(Request $request) {
        $user = $request->user();

        $validated = $request->validate([
            "title" => "required|max:255",
            "starting_balance" => "gte:0",
        ]);

        $account = new Account();

        $account->fill($validated);

        $user->accounts()->save($account);

        return redirect()->action([static::class, 'list']);
    }
}
