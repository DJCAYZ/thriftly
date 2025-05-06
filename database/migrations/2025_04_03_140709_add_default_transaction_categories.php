<?php

use App\CategoryType;
use App\Models\TransactionCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        TransactionCategory::create([
            'type' => CategoryType::Expense,
            'name' => 'Bills',
        ]);
        TransactionCategory::create([
            'type' => CategoryType::Expense,
            'name' => 'Clothing',
        ]);
        TransactionCategory::create([
            'type' => CategoryType::Expense,
            'name' => 'Entertainment',
        ]);
        TransactionCategory::create([
            'type' => CategoryType::Expense,
            'name' => 'Foods',
        ]);
        TransactionCategory::create([
            'type' => CategoryType::Expense,
            'name' => 'Transportation',
        ]);

        TransactionCategory::create([
            'type' => CategoryType::Income,
            'name' => 'Allowance',
        ]);
        TransactionCategory::create([
            'type' => CategoryType::Income,
            'name' => 'Salary',
        ]);
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        TransactionCategory::whereDoesntHave('user')->delete();
    }
};
