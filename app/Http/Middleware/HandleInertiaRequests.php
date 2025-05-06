<?php

namespace App\Http\Middleware;

use App\CategoryType;
use App\Models\TransactionCategory;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $accounts = $user ? $user->accounts()->orderBy('id')->get()->map(function ($account) {
            return [
                ...$account->toArray(),
                'balance' => $account->transactions()->sum('amount') + $account->starting_balance,
                'starting_balance' => (float) $account->starting_balance,
            ];
        }) : [];
        $categories = $user ? [
            'expense' => TransactionCategory::where('type', CategoryType::Expense)->leftJoin('users', 'transaction_categories.user_id', '=', 'users.id')->select('transaction_categories.*')->get(),
            'income' => TransactionCategory::where('type', CategoryType::Income)->leftJoin('users', 'transaction_categories.user_id', '=', 'users.id')->select('transaction_categories.*')->get(),
        ] : [];

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'accounts' => $accounts,
            'categories' => $categories,
            'flash' => [
                'status' =>  fn () => $request->session()->get('status'),
                'tfaQrCode' => fn () => $request->session()->get('status') == 'two-factor-authentication-enabled' ? $request->user()->twoFactorQrCodeSvg() : null,
                'recoveryCodes' => fn() => $request->session()->get('status') == 'two-factor-authentication-confirmed' ? $request->user()->recoveryCodes() : null,
            ],
        ];
    }
}
