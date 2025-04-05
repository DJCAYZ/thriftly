import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import NewIncome from "./NewFormPartials/NewIncome";
import { Head, Link } from "@inertiajs/react";
import NewExpense from "./NewFormPartials/NewExpense";
import NewTransfer from "./NewFormPartials/NewTransfer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";
import { PageProps } from "@/types";
import { string } from "zod";

export type Account = {
    ref_id: string,
    title: string,
};

export type Category = {
    ref_id: string,
    name: string,
};

export default function New({
    accounts,
    categories,
}: PageProps<{
    accounts: Account[],
    categories: {
        income: Category[],
        expense: Category[],
    },
}>) {
    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-5">
            <Head title="New Transaction" />
            <h2>Transaction Type</h2>
            <Tabs className="w-full" defaultValue="income">
                <TabsList className="w-full justify-around">
                    <TabsTrigger className="w-full" value="income">Income</TabsTrigger>
                    <TabsTrigger className="w-full" value="expense">Expense</TabsTrigger>
                    <TabsTrigger className="w-full" value="transfer">Transfer</TabsTrigger>
                </TabsList>
                <TabsContent value="income"><NewIncome accounts={accounts} categories={categories.income} /></TabsContent>
                <TabsContent value="expense"><NewExpense accounts={accounts} categories={categories.expense} /></TabsContent>
                <TabsContent value="transfer"><NewTransfer accounts={accounts} /></TabsContent>
            </Tabs>
        </div>
    );
}

New.layout = (page: JSX.Element) => <Authenticated children={page} title={
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <Link href="/transactions">
                    <BreadcrumbLink>Transactions</BreadcrumbLink>
                </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>New</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
        
    </Breadcrumb>
} />