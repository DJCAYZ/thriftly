import PrimaryButton from "@/Components/PrimaryButton";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/Components/ui/breadcrumb"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head, router, usePage } from "@inertiajs/react"
import AddAccountForm from "./ListAccountsPartials/AddAccountForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import DangerButton from "@/Components/DangerButton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/Components/ui/alert-dialog";
import { MouseEventHandler } from "react";

export default function ListAccounts() {

    const accounts = usePage().props.accounts;
    const { toast } = useToast();

    function deleteAccount(ref_id: string): MouseEventHandler {
        return (e: React.MouseEvent) => {
            router.delete(`/accounts/${ref_id}`);
        }
    }

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
                                    <AccordionTrigger><p className="font-bold">Account:</p> {account.title}</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex flex-row justify-between items-start">
                                            <div>
                                                <p><span className="font-bold inline-block w-32">Reference ID:</span>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <span onClick={() => {
                                                                    navigator.clipboard.writeText(account.ref_id);
                                                                    toast({
                                                                        title: 'Copied to Clipboard',
                                                                        description: `The reference ID ${account.ref_id} has been copied to the clipboard.`,
                                                                    });
                                                                }} className="bg-gray-200 px-2 rounded-lg">{account.ref_id.slice(0, 8)}</span>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                {account.ref_id}
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </p>
                                                <p><span className="font-bold inline-block w-32">Balance:</span> {Intl.NumberFormat('en-us', {style: 'currency', 'currency': 'PHP'}).format(account.balance)}</p>
                                                <p><span className="font-bold inline-block w-32">Starting Amount:</span> {Intl.NumberFormat('en-us', {style: 'currency', 'currency': 'PHP'}).format(account.starting_balance)}</p>
                                            </div>
                                            <div className="space-x-2 py-2">
                                                <PrimaryButton>Edit</PrimaryButton>
                                                <AlertDialog>
                                                    <AlertDialogTrigger>
                                                        <DangerButton className="bg-destructive w-full text-center">Delete</DangerButton>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Confirm Transaction Delete</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete this transaction from your account.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={deleteAccount(account.ref_id)} className="bg-destructive hover:bg-destructive">Delete</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
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