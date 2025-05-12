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
        Schema::table('users', function (Blueprint $table) {
            $table->softDeletes();
        });
        Schema::table('google_users', function (Blueprint $table) {
            $table->softDeletes();
        });
        Schema::table('accounts', function(Blueprint $table) {
            $table->softDeletes();
        });
        Schema::table('transaction_categories', function(Blueprint $table) {
            $table->softDeletes();
        });
        Schema::table('transfer_info', function(Blueprint $table) {
            $table->softDeletes();
        });
        Schema::table('transactions', function(Blueprint $table) {
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table('google_users', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table('accounts', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table('transaction_categories', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table('transfer_info', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
