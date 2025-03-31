import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AccountOverview from "./Partials/AccountOverview";
import { Account } from "@/types";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/Components/ui/breadcrumb";

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
                { 'ref_id': 'b8dfedb1-a1d8-4051-9bee-2b3b2baf7775', 'category': 'food', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '093da935-f190-4e7a-93ff-f4775a11945d', 'category': 'transport', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '18f194cc-5c23-499e-b1a1-791101aade14', 'category': 'electricity', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '88ceb5b5-99b8-4cf5-904d-d5e31deef006', 'category': 'clothing', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '88ceb5b5-99b8-4cf5-904d-d5e31deef006', 'category': 'accessories', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
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
                { 'ref_id': 'b8dfedb1-a1d8-4051-9bee-2b3b2baf7775', 'category': 'food', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '093da935-f190-4e7a-93ff-f4775a11945d', 'category': 'transport', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '18f194cc-5c23-499e-b1a1-791101aade14', 'category': 'electricity', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '88ceb5b5-99b8-4cf5-904d-d5e31deef006', 'category': 'clothing', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '88ceb5b5-99b8-4cf5-904d-d5e31deef006', 'category': 'accessories', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
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
                { 'ref_id': 'b8dfedb1-a1d8-4051-9bee-2b3b2baf7775', 'category': 'food', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '093da935-f190-4e7a-93ff-f4775a11945d', 'category': 'transport', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '18f194cc-5c23-499e-b1a1-791101aade14', 'category': 'electricity', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '88ceb5b5-99b8-4cf5-904d-d5e31deef006', 'category': 'clothing', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '88ceb5b5-99b8-4cf5-904d-d5e31deef006', 'category': 'accessories', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
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
                { 'ref_id': 'b8dfedb1-a1d8-4051-9bee-2b3b2baf7775', 'category': 'food', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '093da935-f190-4e7a-93ff-f4775a11945d', 'category': 'transport', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '18f194cc-5c23-499e-b1a1-791101aade14', 'category': 'electricity', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '88ceb5b5-99b8-4cf5-904d-d5e31deef006', 'category': 'clothing', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '88ceb5b5-99b8-4cf5-904d-d5e31deef006', 'category': 'accessories', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
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
                { 'ref_id': 'b8dfedb1-a1d8-4051-9bee-2b3b2baf7775', 'category': 'food', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '093da935-f190-4e7a-93ff-f4775a11945d', 'category': 'transport', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '18f194cc-5c23-499e-b1a1-791101aade14', 'category': 'electricity', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '88ceb5b5-99b8-4cf5-904d-d5e31deef006', 'category': 'clothing', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '88ceb5b5-99b8-4cf5-904d-d5e31deef006', 'category': 'accessories', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
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
                { 'ref_id': 'b8dfedb1-a1d8-4051-9bee-2b3b2baf7775', 'category': 'food', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '093da935-f190-4e7a-93ff-f4775a11945d', 'category': 'transport', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '18f194cc-5c23-499e-b1a1-791101aade14', 'category': 'electricity', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '88ceb5b5-99b8-4cf5-904d-d5e31deef006', 'category': 'clothing', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
                { 'ref_id': '88ceb5b5-99b8-4cf5-904d-d5e31deef006', 'category': 'accessories', 'amount': 1000, date: new Date("March 25, 2025 13:00:00") },
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

Dashboard.layout = (page: JSX.Element) => <Authenticated children={page} title={
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
} />
