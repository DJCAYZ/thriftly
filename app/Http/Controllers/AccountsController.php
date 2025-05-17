<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\TransferInfo;
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

        return redirect('/accounts');
    }

    public function delete(Request $request, string $uuid) {
        $account = Account::with(['transfersFrom.transactions', 'transfersTo.transactions'])->where('ref_id', $uuid)->first();

        $account->transfersTo->each(function (TransferInfo $info) {
            $info->transactions->each->delete();
        });

        $account->transfersFrom->each(function (TransferInfo $info) {
            $info->transactions->each->delete();
        });

        $account->transfersTo()->delete();
        $account->transfersFrom()->delete();

        $account->transactions()->delete();

        $account->delete();
        
        return redirect('/accounts');
    }
}
