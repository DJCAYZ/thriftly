import DataTable from "@/Components/DataTable";
import { Button } from "@/Components/ui/button";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/Components/ui/pagination';
import { Input } from "@/Components/ui/input";
import { Plus, Search } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/Components/ui/breadcrumb";
import PrimaryButton from "@/Components/PrimaryButton";


const columns: ColumnDef<Transaction>[] = [
{
        accessorKey: 'created_at',
        header: 'Date',
        cell: ({ row }) => {
            const date = Date.parse(row.getValue('created_at'));
            const formatted = new Intl.DateTimeFormat('en-US', {
                dateStyle: 'short',
                timeStyle: 'short',
            }).format(date);

            return <div className="font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: 'type',
        header: 'Type',
    },
    {
        accessorKey: 'category',
        header: 'Category',
    },
    {
        accessorKey: 'amount',
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const formatted = new Intl.NumberFormat('en-US', {
                style: "currency",
                currency: "PHP", //TODO: connect to user's preferred currency;;
            }).format(amount);

            return <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => <Button>View</Button>
    }
];

export type Transaction = {
    ref_id: string,
    type: 'Income' | 'Expense',
    amount: number,
    category: string,
    description?: string,
    created_at: string,
}

interface TransactionPaginator {
    data: Transaction[],
    path: string,
    
    per_page: number,
    
    prev_cursor: string | null,
    next_cursor: string | null,
    
    prev_page_url: string | null,
    next_page_url: string | null,
}

export default function List({ transactions }: PageProps<{ transactions: TransactionPaginator }>) {
    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-5">
            <Head title="Transactions" />

            <div className="flex flex-row space-x-2">
                <Input className="flex-[6]" placeholder="Search" />
                <Button className="flex-1"><Search /> Search</Button>
                <Link className="flex-1" href="/transactions/new">
                    <Button className="w-full"><Plus /> New</Button>
                </Link>
            </div>

            <div className="mt-5">
                <DataTable columns={columns} data={transactions.data} />
            </div>
            
            <div className="mt-5 w-full flex flex-row justify-end">
                <div className="w-3/12 flex flex-row space-x-2">
                    {transactions.prev_page_url ? (
                        <Link className="w-full" href={transactions.prev_page_url}>
                            <PrimaryButton className="w-full">Previous</PrimaryButton>
                        </Link>
                    ) : (
                        <div className="w-full">
                            <PrimaryButton disabled={true} className="w-full">Previous</PrimaryButton>
                        </div>
                    )}
                    {transactions.next_page_url ? (
                        <Link className='w-full' href={transactions.next_page_url}>
                            <PrimaryButton className="w-full">Next</PrimaryButton>
                        </Link>
                    ) : (
                        <div className="w-full">
                            <PrimaryButton disabled={true} className="w-full">Next</PrimaryButton>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

List.layout = (page: JSX.Element) => <Authenticated children={page} title={
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbPage>Transactions</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
} />