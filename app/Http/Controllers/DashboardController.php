<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request) {
        $accounts = User::find(Auth::id())->accounts;

        $accounts_info = $accounts->map(function (Account $account) {
            $transactions = $account->transactions;
            $balance = $account->starting_balance;
            $expenseOverview = [];
            $recentTransactions = [];

            if (!$transactions->isEmpty()) {
                $balance += $account->transactions()->sum('amount')->get();
            }

            return [
                'ref_id' => $account->ref_id,
                'title' => $account->title,
                'balance' => $balance,
                'expenseOverview' => $expenseOverview,
                'recentTransactions' => $recentTransactions,
            ];
            
        });

        return Inertia::render('Dashboard/Dashboard', [
            'accounts' => $accounts_info,
        ]);
    }
}
