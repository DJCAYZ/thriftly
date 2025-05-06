import { Config } from 'ziggy-js';

export interface User {
    id: number;
    username: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    accounts: Account[],
    categories: {
        income: Category[],
        expense: Category[],
    }
    ziggy: Config & { location: string };
    flash: {
        status: string,
        tfaQrCode: string,
        recoveryCodes: string[],
    }
};

export interface Transaction {
    ref_id: string,
    type: 'Income' | 'Expense' | 'Transfer',
    account: Account,
    amount: numner,
    category?: Category,
    created_at: string,
    updated_at: string,
    description?: string,
}

export interface Category {
    ref_id: string,
    name: string,
    type: 'Income' | 'Expense',
}

export interface Account {
    ref_id: string,
    title: string,
    
    balance: number,
    starting_balance: number,

    created_at: string,
    updated_at: string,

}

export interface TransferInfo {
    ref_id: string,
    from_account: Account,
    to_account: Account,
    fromTransaction: Transaction,
    toTransaction: Transaction,
}

export interface ExpenseOverview {
    name: string,
    amount: number,
}

export interface AccountOverviewProp extends Account {
    expenseOverview: ExpenseOverview[],
    recentTransactions: Transaction[],
}