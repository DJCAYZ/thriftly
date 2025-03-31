import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import NewIncome from "./NewFormPartials/NewIncome";
import { Head, Link } from "@inertiajs/react";
import NewExpense from "./NewFormPartials/NewExpense";
import NewTransfer from "./NewFormPartials/NewTransfer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";

export default function New() {
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
                <TabsContent value="income"><NewIncome /></TabsContent>
                <TabsContent value="expense"><NewExpense /></TabsContent>
                <TabsContent value="transfer"><NewTransfer /></TabsContent>
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