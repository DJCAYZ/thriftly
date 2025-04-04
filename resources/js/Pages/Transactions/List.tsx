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
import { link } from "fs";


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
        cell: () => <PrimaryButton>View</PrimaryButton>
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
    
    links: {
        active: boolean,
        label: string,
        url: string,
    }[],
    
    // prev_cursor: string | null,
    // next_cursor: string | null,
    
    // prev_page_url: string | null,
    // next_page_url: string | null,
}

export default function List({ transactions }: PageProps<{ transactions: TransactionPaginator }>) {
    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-5">
            <Head title="Transactions" />

            <div className="flex flex-row space-x-2">
                <Input className="flex-[6]" placeholder="Search" />
                <PrimaryButton className="flex-1"><div className="flex flex-row items-center justify-around"><Search /> Search</div></PrimaryButton>
                <Link className="flex-1" href="/transactions/new">
                    <PrimaryButton className="w-full"><div className="flex flex-row items-center justify-around"><Plus /> New</div></PrimaryButton>
                </Link>
            </div>

            <div className="mt-5">
                <DataTable columns={columns} data={transactions.data} />
            </div>

            <Pagination className="mt-2  ">
                <PaginationContent>
                    {transactions.links.map((link, i, a) => (
                        <PaginationItem>
                            {i == 0 ? (
                                <PaginationPrevious href={link.url} />
                            ) : i == a.length - 1 ? (
                                <PaginationNext href={link.url} />
                            ) : (
                                <PaginationLink href={link.url}>{link.label}</PaginationLink>
                            )}
                        </PaginationItem>
                    ))}
                </PaginationContent>
            </Pagination>
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