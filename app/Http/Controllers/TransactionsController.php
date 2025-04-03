<?php

namespace App\Http\Controllers;

use App\CategoryType;
use App\Models\TransactionCategory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        return $type;
    }
}
