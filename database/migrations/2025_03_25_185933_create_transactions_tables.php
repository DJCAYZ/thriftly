<?php

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
        Schema::create('income_categories', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->boolean('is_global')->default(false);
            $table->foreignId('creator_id')->nullable()->constrained(
                table: 'users', indexName: 'income_categories_creator_id',
            );
        });

        Schema::create('expense_categories', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->foreignId('creator_id')->nullable()->constrained(
                table: 'users', indexName: 'expense_categories_creator_id',
            );
        });

        Schema::create('income_transactions', function (Blueprint $table) {
            $table->foreignId('id')->constrained(
                table: 'transaction_informations', indexName: 'income_transactions_transaction_information_id',
            );
            $table->decimal('amount');
            $table->foreignId('income_category_id')->constrained(
                table: 'income_categories', indexName: 'income_transactions_income_category_id',
            );
        });

        Schema::create('expense_transactions', function (Blueprint $table) {
            $table->foreignId('id')->constrained(
                table: 'transaction_informations', indexName: 'expense_transactions_transaction_information_id',
            );

            $table->decimal('amount');
            $table->foreignId('expense_category_id')->constrained(
                table: 'expense_categories', indexName: 'expense_transactions_expense_category_id',
            );
        });

        Schema::create('transfer_transactions', function (Blueprint $table) {
            $table->foreignId('id')->constrained(
                table: 'transaction_informations', indexName: 'transfer_transactions_transaction_information_id',
            );
            $table->decimal('amount');
            $table->foreignId('to_account_id')->constrained(
                table: 'accounts', indexName: 'transfer_transactions_to_account_id',
            );
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transfer_transactions');
        Schema::dropIfExists('expense_transactions');
        Schema::dropIfExists('income_transactions');
        Schema::dropIfExists('expense_categories');
        Schema::dropIfExists('income_categories');
    }
};
