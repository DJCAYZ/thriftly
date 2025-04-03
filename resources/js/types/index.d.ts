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
    ziggy: Config & { location: string };
    flash: {
        status: string,
        tfaQrCode: string,
        recoveryCodes: string[],
    }
};

export interface Account {
    ref_id: string,
    title: string,
    balance?: number,
    expenseOverview?: ExpenseOverview[],
    recentTransactions?: Transaction[],
};

export type ExpenseOverview = {
    title: string,
    amount: number,
}

export type Transaction = {
    ref_id: string,
    type: 'Income' | 'Expense' | 'Transfer',
    category: string,
    date: Date,
    amount: number,
}