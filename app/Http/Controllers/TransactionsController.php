<?php

namespace App\Http\Controllers;

use App\CategoryType;
use App\Models\Account;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use App\Models\TransferInfo;
use App\TransactionType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TransactionsController extends Controller
{
    public function list(Request $request) {
        return Inertia::render('Transactions/List', [
            'transactions' => DB::table('transactions')
                ->select('transactions.ref_id', 'transactions.amount', 'transactions.type', 'accounts.title as account', 'transaction_categories.name as category', 'transactions.created_at')
                ->join('transaction_categories', 'transactions.category_id', '=', 'transaction_categories.id')
                ->join('accounts', 'transactions.account_id', '=', 'accounts.id')
                ->where('transactions.type', '<>', TransactionType::Transfer)
                ->orderBy('transactions.created_at', 'desc')
                ->paginate(10),
        ]);
    }

    public function show(Request $request, string $uuid) {
        $transaction = Transaction::firstWhere('ref_id', $uuid);
        $account = $transaction->account;
        $category = $transaction->category;
        return Inertia::render('Transactions/Show', [
            'transaction' => [
                'ref_id' => $transaction->ref_id,
                'amount' => $transaction->amount,
                'type' => $transaction->type->name,
                'description' => $transaction->description,
                'created_at' => $transaction->created_at,
                'account' => [
                    'ref_id' => $account->ref_id,
                    'title' => $account->title,
                ],
                'category' => [
                    'ref_id' => $category->ref_id,
                    'name' => $category->name,
                ],
            ],
        ]);
    }

    public function delete(Request $request, string $uuid) {
        $transaction = Transaction::firstWhere('ref_id', $uuid);
        Gate::authorize('delete', $transaction);

        $transaction->delete();
        
        return redirect()->intended('/transactions');
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

    public function create(Request $request) {
        $request->validate([
            'account' => 'required|uuid|exists:accounts,ref_id',
            'amount' => 'required|gt:0',
            'category' => 'uuid|exists:transaction_categories,ref_id',
            'description' => 'nullable',
            'type' => ['required', Rule::in(['expense', 'income', 'transfer'])],
            'to_account' => 'uuid|exists:accounts,ref_id|different:account',
        ]);
        $account = Account::firstWhere('ref_id', $request->input('account'));
        Gate::authorize('createTransactionInAccount', $account);

        if ($request->input('type') == 'transfer') {
            $toAccount = Account::firstWhere('ref_id', $request->input('to_account'));
            
            $transferInfo = new TransferInfo();
            $fromTransaction = new Transaction();
            $toTransaction = new Transaction();

            $fromTransaction->fill([
                'type' => TransactionType::Transfer,
                'amount' => $request->input('amount') * -1,
                'description' => $request->input('description'),
            ]);

            $toTransaction->fill([
                'type' => TransactionType::Transfer,
                'amount' => $request->input('amount'),
                'description' => $request->input('description'),
            ]);

            $transferInfo->fromAccount()->associate($account);
            $transferInfo->toAccount()->associate($toAccount);
            $transferInfo->save();
            
            $fromTransaction->user()->associate($request->user());
            $fromTransaction->account()->associate($account);
            $fromTransaction->transferInfo()->associate($transferInfo);
            
            $toTransaction->user()->associate($request->user());
            $toTransaction->account()->associate($toAccount);
            $toTransaction->transferInfo()->associate($transferInfo);

            $fromTransaction->save();
            $toTransaction->save();
        } else {
            $category = TransactionCategory::firstWhere('ref_id', $request->input('category'));
            $transaction = new Transaction();
            $transaction->fill([
                'type' => ($request->input('type') === 'income' ? TransactionType::Income : TransactionType::Expense),  
                'amount' => ((int) $request->input('amount')) * ($request->input('type') === 'expense' ? -1 : 1),
                'description' => $request->input('description'),
            ]);
    
            $transaction->user()->associate($request->user());
            $transaction->account()->associate($account);
            $transaction->category()->associate($category);
    
            $transaction->save();

        }
        

        return redirect()->intended('/dashboard');
    }
}
