import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AccountOverview from "./Partials/AccountOverview";
import { Account, PageProps } from "@/types";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/Components/ui/breadcrumb";

export default function Dashboard({ accounts }: PageProps<{ accounts: Account[] }>) {
    
    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <Head title="Dashboard" />
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
