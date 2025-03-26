<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Account extends Model
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function transactionInformations(): HasMany
    {
        return $this->hasMany(TransactionInformation::class, 'account_id');
    }

    public function transfersTothisAccount(): HasMany
    {
        return $this->hasMany(TransferTransaction::class, 'to_account_id');
    }
}
