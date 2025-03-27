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
    id: number,
    title: string,
    balance: number,
    expenseOverview: ExpenseOverview[],
    recentTransactions: Transaction[],
};

export interface ExpenseOverview {
    title: string,
    amount: number,
}

export interface Transaction {
    id: number,
    category: string,
    date: Date,
    amount: number,
}