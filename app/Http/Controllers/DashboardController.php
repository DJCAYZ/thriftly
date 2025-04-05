<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
                    ->select('transactions.ref_id', 'transactions.type', 'transactions.amount', 'transactions.created_at as date', 'transaction_categories.name as category')
                    ->leftJoin('transaction_categories', 'transactions.category_id', '=', 'transaction_categories.id')
                    ->orderBy('created_at', 'desc')
                    ->take(5)
                    ->get()
                    ->map(function ($transaction) {
                        return [
                            'ref_id' => $transaction['ref_id'],
                            'type' => $transaction['type']->name,
                            'amount' => (int) $transaction['amount'],
                            'date' => $transaction['date'],
                            'category' => $transaction['category'],
                        ];
                    });
                $expenseOverview = $account->transactions()
                    ->select(DB::raw('transaction_categories.name AS name, ABS(SUM(transactions.amount)) AS amount'))
                    ->join('transaction_categories', 'transactions.category_id', '=', 'transaction_categories.id')
                    ->where([
                        ['transactions.type', '=', 'Expense'],
                        ['transactions.created_at', '>=', 'UNIX_TIMESTAMP(DATE(NOW() - INTERVAL 30 DAY))'],
                    ])
                    ->groupBy('transactions.category_id')
                    ->orderBy('amount', 'desc')
                    ->get()
                    ->map(function ($overview) {
                        return [
                            'title' => $overview['name'],
                            'amount' => (int) $overview['amount'],
                        ];
                    });
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
