<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class IncomeTransaction extends Model
{
    public function incomeCategory(): BelongsTo
    {
        return $this->belongsTo(IncomeCategory::class, 'income_category_id');
    }

    public function transactionInformation(): MorphOne
    {
        return $this->morphOne(TransactionInformation::class, 'transaction', 'transaction_type', 'id');
    }

}
