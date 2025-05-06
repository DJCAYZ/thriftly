import PrimaryButton from "@/Components/PrimaryButton";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/Components/ui/breadcrumb"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head, usePage } from "@inertiajs/react"
import AddAccountForm from "./ListAccountsPartials/AddAccountForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

export default function ListAccounts() {

    const accounts = usePage().props.accounts;

    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-5">
            <Head title="Accounts" />
            {accounts.length < 1 ? (
                <div className="w-full flex flex-col items-center space-y-2">
                    <p>No accounts found.</p>
                    <AddAccountForm />
                </div>
            ) : (
                <div>
                    <div className="flex flex-row justify-between items-end py-2">
                        <h1 className="text-2xl">Accounts</h1>
                        <AddAccountForm />
                    </div>

                    <Card>
                        <CardContent>
                            <Accordion type="single" collapsible>
                            {accounts.map((account) => (
                                <AccordionItem value={account.ref_id}>
                                    <AccordionTrigger>{account.title}</AccordionTrigger>
                                    <AccordionContent>
                                        <p><span className="font-bold inline-block w-32">Account Title:</span> {account.title}</p>
                                        <p><span className="font-bold inline-block w-32">Balance:</span> {Intl.NumberFormat('en-us', {style: 'currency', 'currency': 'PHP'}).format(account.balance)}</p>
                                        <p><span className="font-bold inline-block w-32">Starting Balance:</span> {Intl.NumberFormat('en-us', {style: 'currency', 'currency': 'PHP'}).format(account.starting_balance)}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                                </Accordion>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}

ListAccounts.layout = (page: JSX.Element) => (
    <Authenticated children={page} title={
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage>Accounts</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    }/>
)