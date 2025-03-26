<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class TransferTransaction extends Model
{
    public function toAccount(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'to_account_id');
    }

    public function transactionInformation(): MorphOne
    {
        return $this->morphOne(TransactionInformation::class, 'transaction', 'transaction_type', 'id');
    }
}
