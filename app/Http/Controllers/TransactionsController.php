<?php

namespace App\Http\Controllers;

use App\CategoryType;
use App\Models\Account;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use App\TransactionType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class TransactionsController extends Controller
{
    public function list(Request $request) {
        return Inertia::render('Transactions/List');
    }

    public function new(Request $request) {
        $user = Auth::user();

        return Inertia::render('Transactions/New', [
            'accounts' => $user->accounts()->select('ref_id', 'title')->get(),
            'categories' => [
                'income' => TransactionCategory::select('ref_id', 'name')
                    ->where('type', CategoryType::Income)
                    ->whereNull('user_id')
                    ->orWhere('user_id', $user->id)
                    ->get(),
                'expense' => TransactionCategory::select('ref_id', 'name')
                    ->where('type', CategoryType::Expense)
                    ->whereNull('user_id')
                    ->orWhere('user_id', $user->id)
                    ->get(),
            ],
        ]);
    }

    public function create(Request $request, string $type) {
        $request->validate([
            'account' => 'required|uuid|exists:accounts,ref_id',
            'amount' => 'required|gt:0',
            'category' => 'required|uuid|exists:transaction_categories,ref_id',
            'description' => 'nullable',
            'to_account' => 'uuid|exists:accounts,ref_id|different:account',
        ]);
        $account = Account::firstWhere('ref_id', $request->input('account'));
        Gate::authorize('createTransactionInAccount', $account);
        
        $category = TransactionCategory::firstWhere('ref_id', $request->input('category'));
        $transaction = new Transaction();
        $transaction->fill([
            'amount' => ((int) $request->input('amount')) * ($type === 'expense' ? -1 : 1),
            'type' => ($type === 'income' ? TransactionType::Income : ($type === 'expense' ? TransactionType::Expense : TransactionType::Transfer)),
            'description' => $request->input('description'),
        ]);

        $transaction->user()->associate($request->user());
        $transaction->account()->associate($account);
        $transaction->category()->associate($category);
        if ($type == 'transfer') {
            // create transfer info here
        }

        $transaction->save();

        return redirect()->intended('/dashboard');
    }
}
