<?php

namespace App\Models;

use App\TransactionType;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Ramsey\Uuid\Uuid;

class Transaction extends Model
{
    protected $table = 'transactions';

    use HasUuids;

    protected $fillable = [ 'amount', 'type', 'description' ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'account_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(TransactionCategory::class, 'category_id');
    }

    public function transferInfo(): BelongsTo
    {
        return $this->belongsTo(TransferInfo::class, 'transfer_info_id');
    }


    protected function casts(): array
    {
        return [
            'type' => TransactionType::class,
            'amount' => 'decimal:2'
        ];
    }

    public function newUniqueId(): string
    {
        return (string) Uuid::uuid4();
    }

    public function uniqueIds(): array
    {
        return ['ref_id'];
    }
}
