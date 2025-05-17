<?php

namespace App\Models;

use App\TransactionType;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Ramsey\Uuid\Uuid;

class Transaction extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'transactions';

    protected $fillable = [ 'amount', 'type', 'description' ];
    protected $hidden = ['account_id', 'category_id', 'id', 'user_id', 'transfer_info_id'];

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
