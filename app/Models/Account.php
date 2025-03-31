<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;

class Account extends Model
{
    use HasUuids;
    protected $table = 'accounts';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function transfersTo(): HasMany
    {
        return $this->hasMany(TransferInfo::class, 'to_account_id');;
    }

    public function transfersFrom(): HasMany
    {
        return $this->hasMany(TransferInfo::class, 'from_account_id');;
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'account_id');
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
