import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";
import { Separator } from "@/Components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

interface Transaction {
    ref_id: string,
    amount: number,
    type: 'Income' | 'Expense' | 'Transfer',
    account: {
        ref_id: string,
        title: string,
    },
    category: {
        ref_id: string,
        name: string,
    },
    description?: string,
    created_at: string,
}

export default function Show({
    transaction
}: PageProps<{ transaction: Transaction }>) {
    const short_uuid = transaction.ref_id.slice(0, 4);
    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-5">
            <Head title={`Transaction ${short_uuid}`} />
            <div className="flex flex-row items-baseline space-x-2 text-lg mb-2">
                <h1>Transaction</h1>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="bg-gray-200 px-1 rounded-lg">{short_uuid}</TooltipTrigger>
                        <TooltipContent>
                            <p>{transaction.ref_id}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="flex flex-row w-full justify-between items-center mt-5 px-5 my-2">
                <div>
                    <p className="text-gray-500">Account</p>
                    <p className="font-bold">{transaction.account.title}</p>
                </div>
                <p className="text-gray-500">{Intl.DateTimeFormat('en-us', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                }).format(Date.parse(transaction.created_at))}</p>
            </div>
            <Separator />
            <div className="mt-5 px-3 flex flex-row items-center justify-between">
                <div>
                    <p className="text-4xl">{Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'PHP',
                        }).format(Math.abs(transaction.amount))
                    }
                    </p>
                    <p className="text-gray-500">Amount</p>
                </div>
                <p className={(transaction.type === 'Expense' ? 'bg-red-900' : transaction.type === 'Income' ? 'bg-green-900' : 'bg-blue-900') + " text-white p-2 rounded-lg"}>{transaction.type}</p>
            </div>

            <div className="mt-2 p-3 border border-black border-solid rounded-lg">
                {transaction.description && (
                    <div>
                        <p className="text-gray-500">Description</p>
                        <p>{transaction.description}</p>
                        <Separator className="my-2" />
                    </div>
                )}
                <p className="text-gray-500">Category</p>
                <p>{transaction.category.name}</p>
            </div>
        </div>
    );
}

Show.layout = (page: JSX.Element) => <Authenticated children={page} title={
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <Link href="/transactions">
                    <BreadcrumbLink>Transactions</BreadcrumbLink>
                </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>Transaction Details</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
} />
