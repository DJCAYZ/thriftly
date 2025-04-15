import PrimaryButton from "@/Components/PrimaryButton";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";
import { Dialog, DialogTrigger } from "@/Components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import EditDetailsForm from "../EditPartials/EditDetailsForm";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/Components/ui/alert-dialog";
import DangerButton from "@/Components/DangerButton";
import { PageProps, TransferInfo } from "@/types";
import { Separator } from "@/Components/ui/separator";
import { ArrowRight } from "lucide-react";

export default function ShowTransferInfo({ transferInfo }: PageProps<{ transferInfo: TransferInfo }>) {
    const { toast } = useToast();

    const short_uuid = transferInfo.ref_id.slice(0, 4);

    const deleteTransfer = () => {
        router.delete(`/transactions/transfers/${transferInfo.ref_id}`);
    }

    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-5">
            <Head title={`Transfer ${short_uuid}`} />
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-baseline space-x-2 text-lg mb-2">
                    <h1>Transfer Transaction</h1>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger onClick={() => {
                                navigator.clipboard.writeText(transferInfo.ref_id);
                                toast({
                                    title: 'Copied to clipboard',
                                    description: `The UUID ${transferInfo.ref_id} has been copied to clipboard`,
                                });
                            }} className="bg-gray-200 px-1 rounded-lg">{short_uuid}</TooltipTrigger>
                            <TooltipContent>
                                <p>{transferInfo.ref_id}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="flex flex-row space-x-2">
                    {/* <Dialog>
                        <DialogTrigger>
                            <PrimaryButton className="w-full text-center">Edit</PrimaryButton>
                        </DialogTrigger>
                        <EditDetailsForm transaction={transferInfo.fromTransaction} />
                    </Dialog> */}
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
                                <AlertDialogAction onClick={deleteTransfer} className="bg-destructive hover:bg-destructive">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <div className="flex flex-row w-full justify-between items-center mt-5 px-5 my-2">
                <div>
                    <p className="text-gray-500">Account</p>
                    <p className="font-bold">{transferInfo.from_account.title}</p>
                </div>
                <ArrowRight />
                <div className="text-right">
                    <p className="text-gray-500">Account</p>
                    <p className="font-bold">{transferInfo.to_account.title}</p>
                </div>
                <p className="text-gray-500">{Intl.DateTimeFormat('en-us', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                }).format(Date.parse(transferInfo.fromTransaction.created_at))}</p>
            </div>
            <Separator />
            <div className="mt-5 px-3 flex flex-row items-center justify-between">
                <div>
                    <p className="text-4xl">{Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'PHP',
                        }).format(Math.abs(transferInfo.fromTransaction.amount))
                    }
                    </p>
                    <p className="text-gray-500">Amount</p>
                </div>
            </div>

            {transferInfo.fromTransaction.description && (
                <div className="mt-2 p-3 border border-black border-solid rounded-lg">
                    <p className="text-gray-500">Description</p>
                    <p>{transferInfo.fromTransaction.description}</p>
                </div>
            )}
        </div>
    );
}

ShowTransferInfo.layout = (page: JSX.Element) => (
    <Authenticated children={page} title={
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link href="/transactions">
                        <BreadcrumbLink>Transactions</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <Link href="/transactions/transfers">
                        <BreadcrumbLink>Transfer Transactions</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Transfer Details</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    }/>
);