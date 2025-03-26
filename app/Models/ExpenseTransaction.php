<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class ExpenseTransaction extends Model
{
    public function expenseCategory(): BelongsTo
    {
        return $this->belongsTo(ExpenseCategory::class, 'category_id');
    }
    
    public function transactionInformation(): MorphOne
    {
        return $this->morphOne(TransactionInformation::class, 'transaction', 'transaction_type', 'id');
    }
}
