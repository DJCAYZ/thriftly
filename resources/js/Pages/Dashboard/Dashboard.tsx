import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Account, AccountOverviewProp, PageProps } from "@/types";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/Components/ui/breadcrumb";
import AccountOverview from "./Partials/AccountOverview";

export default function Dashboard({ accounts_overview }: PageProps<{ accounts_overview: Record<string, AccountOverviewProp> }>) {

    const { accounts } = usePage().props;

    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-5">
            <Head title="Dashboard" />
            {accounts.length > 0 ? (
                <Tabs defaultValue={accounts[0].ref_id}>
                <TabsList className="w-full justify-around">
                    {accounts.map((account) => {
                        return (
                            <TabsTrigger className="w-full" value={account.ref_id}>{account.title}</TabsTrigger>
                        )
                    })}
                </TabsList>
                {accounts.map((account) => {
                    return (
                        <TabsContent value={account.ref_id}>
                            <AccountOverview account={account} account_overview={accounts_overview[account.ref_id]} />
                        </TabsContent>
                    )
                })}
            </Tabs>
            ) : (
                <h1>Create an account to get started.</h1>
            )}
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
