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
                $balance += $account->transactions()->sum('amount');
                $recentTransactions = $account->transactions()
                    ->select('transactions.ref_id', 'transactions.amount', 'transactions.created_at as date', 'transaction_categories.name as category')
                    ->join('transaction_categories', 'transactions.category_id', '=', 'transaction_categories.id')
                    ->orderBy('created_at', 'desc')
                    ->take(5)
                    ->get();
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
