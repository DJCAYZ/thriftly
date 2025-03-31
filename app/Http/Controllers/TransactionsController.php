<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionsController extends Controller
{
    public function list(Request $request) {
        return Inertia::render('Transactions/List');
    }

    public function new(Request $request) {
        return Inertia::render('Transactions/New');
    }

    public function create(Request $request, string $type) {
        return $type;
    }
}
