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
        Schema::create('transaction_categories', function (Blueprint $table) {
            $table->id();
            $table->uuid('ref_id');
            $table->string('name');
            $table->string('type');
            
            $table->foreignId('user_id')->nullable()->constrained(
                table: 'users',
            );
        });

        Schema::create('transfer_info', function (Blueprint $table) {
            $table->id();

            $table->foreignId('from_account_id')->constrained(
                table: 'accounts',
            );

            $table->foreignId('to_account_id')->constrained(
                table: 'accounts',
            );
        });
            
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->uuid('ref_id');
            $table->string('type');
            $table->decimal('amount', total: 8, places: 2);
            $table->string('description')->nullable();
            $table->timestamps();

            $table->foreignId('user_id')->constrained(
                table: 'users',
            );
            
            $table->foreignId('account_id')->constrained(
                table: 'accounts',
            );

            $table->foreignId('category_id')->constrained(
                table:'transaction_categories',
            );

            $table->foreignId('transfer_info_id')->nullable()->constrained(
                table: 'transfer_info',
            );
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('transfer_info');
        Schema::dropIfExists('transaction_categories');
    }
};
