<?php

namespace App;

enum TransactionType
{
    case Expense;
    case Income;
    case Transfer;
}
