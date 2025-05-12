<?php

namespace App\Models;

use App\CategoryType;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Ramsey\Uuid\Uuid;

class TransactionCategory extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'transaction_categories';
    public $timestamps = false;

    protected $fillable = ['type', 'user_id', 'name'];
    protected $hidden = ['id', 'user_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'category_id');
    }
    
    protected function casts(): array
    {
        return [
            'type' => CategoryType::class,
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
