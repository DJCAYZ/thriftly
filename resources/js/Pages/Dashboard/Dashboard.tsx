import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AccountOverview from "./Partials/AccountOverview";
import { Account } from "@/types";

export default function Dashboard() {
    const accounts: Account[] = [
        {
            'id': 1,
            'title': 'CASH',
            'balance': 100,
            'expenseOverview': [
                { title: 'Food', amount: 5000 },
                { title: 'Transport', amount: 2500 },
                { title: 'Electricity', amount: 2500 },
                { title: 'Clothing', amount: 2500 },
                { title: 'Others', amount: 2500 },
            ],
            'recentTransactions': [
                { 'id': 1, 'category': 'food', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 2, 'category': 'transport', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 3, 'category': 'electricity', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 4, 'category': 'clothing', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 5, 'category': 'accessories', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
            ],
        },
        {
            'id': 2,
            'title': 'CREDIT',
            'balance': 1000,
            'expenseOverview': [
                { title: 'Food', amount: 10000 },
                { title: 'Transport', amount: 200 },
                { title: 'Electricity', amount: 500 },
                { title: 'Clothing', amount: 5000 },
                { title: 'Others', amount: 7000 },
            ],
            'recentTransactions': [
                { 'id': 1, 'category': 'food', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 2, 'category': 'transport', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 3, 'category': 'electricity', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 4, 'category': 'clothing', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 5, 'category': 'accessories', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
            ],
            
        },
        {
            'id': 3,
            'title': 'SAVINGS1',
            'balance': 100000,
            'expenseOverview': [
                { title: 'Food', amount: 5000 },
                { title: 'Transport', amount: 2500 },
                { title: 'Electricity', amount: 2500 },
                { title: 'Clothing', amount: 2500 },
                { title: 'Accessories', amount: 2500 },
            ],
            'recentTransactions': [
                { 'id': 1, 'category': 'food', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 2, 'category': 'transport', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 3, 'category': 'electricity', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 4, 'category': 'clothing', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 5, 'category': 'accessories', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
            ],
        },
        {
            'id': 4,
            'title': 'SAVINGS2',
            'balance': 100000,
            'expenseOverview': [
                { title: 'Food', amount: 5000 },
                { title: 'Transport', amount: 2500 },
                { title: 'Electricity', amount: 2500 },
                { title: 'Clothing', amount: 2500 },
                { title: 'Accessories', amount: 2500 },
            ],
            'recentTransactions': [
                { 'id': 1, 'category': 'food', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 2, 'category': 'transport', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 3, 'category': 'electricity', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 4, 'category': 'clothing', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 5, 'category': 'accessories', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
            ],
        },
        {
            'id': 5,
            'title': 'SAVINGS3',
            'balance': 100000,
            'expenseOverview': [
                { title: 'Food', amount: 5000 },
                { title: 'Transport', amount: 2500 },
                { title: 'Electricity', amount: 2500 },
                { title: 'Clothing', amount: 2500 },
                { title: 'Accessories', amount: 2500 },
            ],
            'recentTransactions': [
                { 'id': 1, 'category': 'food', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 2, 'category': 'transport', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 3, 'category': 'electricity', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 4, 'category': 'clothing', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 5, 'category': 'accessories', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
            ],
        },
        {
            'id': 6,
            'title': 'SAVINGS4',
            'balance': 100000,
            'expenseOverview': [
                { title: 'Food', amount: 5000 },
                { title: 'Transport', amount: 2500 },
                { title: 'Electricity', amount: 2500 },
                { title: 'Clothing', amount: 2500 },
                { title: 'Accessories', amount: 2500 },
            ],
            'recentTransactions': [
                { 'id': 1, 'category': 'food', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 2, 'category': 'transport', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 3, 'category': 'electricity', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 4, 'category': 'clothing', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'id': 5, 'category': 'accessories', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
            ],
        },
    ]
    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <Head title="Dashboard" />
            <Tabs defaultValue={accounts[0].id.toString()}>
                <TabsList className="w-full justify-around">
                    {accounts.map((account) => {
                        return (
                            <TabsTrigger className="w-full" value={account.id.toString()}>{account.title}</TabsTrigger>
                        )
                    })}
                </TabsList>
                {accounts.map((account) => {
                    return (
                        <TabsContent value={account.id.toString()}>
                            <AccountOverview account={account} />
                        </TabsContent>
                    )
                })}
            </Tabs>
    </div>
    );
}

Dashboard.layout = (page: JSX.Element) => <Authenticated children={page} title="Dashboard" />
