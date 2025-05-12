<?php

use App\Http\Controllers\AccountsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\TransferInfoController;
use App\Models\Transaction;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('accounts')->controller(AccountsController::class)->group(function() {
    Route::get('/', 'list');
    Route::post('/new', 'create');
    Route::delete('/{uuid}', 'delete');
});

Route::middleware(['auth', 'verified'])->prefix('transactions')->group(function () {
    Route::prefix('transfers')->controller(TransferInfoController::class)->group(function() {
        Route::get('/', 'list');
        Route::get('/{uuid}', 'show');
        Route::delete('/{uuid}', 'delete');
    });

    Route::controller(TransactionsController::class)->group(function() {
        Route::get('/', 'list');
        Route::get('/new', 'new');
        Route::post('/new', 'create');
        Route::get('/{uuid}', 'show');
        Route::delete('/{uuid}', 'delete');
    });

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/two-factor-challenge/recovery-code', function () {
    return Inertia::render('Auth/TwoFactorRecoveryCode');
});

include __DIR__ . '/auth.php';   
