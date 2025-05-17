<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Transaction;
use App\Models\User;
use App\TransactionType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function Pest\Laravel\put;

class DashboardController extends Controller
{
    public function index(Request $request) {
        $accounts = $request->user()->accounts()->orderBy('id')->get();

        
        $accounts_overview = $accounts->reduce(function (array $info, Account $account) {
            $info[$account->ref_id] = [
                'recentTransactions' => Transaction::with('category')
                    ->where('user_id', $account->user_id)
                    ->where('account_id', $account->id)
                    ->orderBy('created_at', 'DESC')
                    ->take(5)
                    ->get()
                    ->map(function ($transaction) {
                        return [
                            ...$transaction->toArray(),
                            'amount' => (float) $transaction['amount'],
                        ];
                    }),
                'expenseOverview' => $account->transactions()
                    ->where([
                        ['transactions.type', '=', TransactionType::Expense],
                        ['transactions.created_at', '>=', 'UNIX_TIMESTAMP(DATE(NOW() - INTERVAL 30 DAY))'],
                    ])
                    ->join('transaction_categories', 'transactions.category_id', '=', 'transaction_categories.id')
                    ->groupBy('transactions.category_id')
                    ->orderBy('amount', 'desc')
                    ->select(
                        'transaction_categories.name',
                        DB::raw('SUM(ABS(transactions.amount)) AS amount'),
                    )
                    ->get()
                    ->map(function ($overview) {
                        return [
                            ...$overview->toArray(),
                            'amount' => (float) $overview['amount'],
                        ];
                    }),
            ];

            return $info;
        }, []);

        return Inertia::render('Dashboard/Dashboard', [
            'accounts_overview' => $accounts_overview,
        ]);
    }
}
