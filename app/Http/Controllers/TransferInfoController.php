<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\TransferInfo;
use App\TransactionType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransferInfoController extends Controller
{
    public function list(Request $request) {
        $transferInfo = TransferInfo::with(['fromAccount', 'toAccount'])
            ->where([
                ['user_id', '=', $request->user()->id],
            ]);

        return Inertia::render('Transactions/Transfers/ListTransferInfo', [
            'transferInfo' => $transferInfo->paginate(10),
        ]);
    }

    public function show(Request $request, string $uuid) {
        $transferInfo = TransferInfo::with(['fromAccount', 'toAccount'])->where('ref_id', $uuid)->first();
        $fromTransaction= $transferInfo->transactions()->where('account_id', $transferInfo->from_account_id)->first();
        $toTransaction = $transferInfo->transactions()->where('account_id', $transferInfo->to_account_id)->first();

        return Inertia::render('Transactions/Transfers/ShowTransferInfo', [
            'transferInfo' => [
                ...$transferInfo->toArray(),
                'fromTransaction' => $fromTransaction,
                'toTransaction' => $toTransaction,
            ],
        ]);
    }

    public function update(Request $request) {
        // update it
    }

    public function delete(Request $request, string $uuid) {
        $transferInfo = TransferInfo::firstWhere('ref_id', $uuid);
        // TODO create security policies for transfer info models

        $transferInfo->transactions()->delete();

        $transferInfo->delete();

        return redirect('/transactions/transfers');
    }
}
