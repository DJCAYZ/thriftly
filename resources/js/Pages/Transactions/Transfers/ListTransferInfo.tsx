import DataTable from "@/Components/DataTable";
import PrimaryButton from "@/Components/PrimaryButton";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";
import { Input } from "@/Components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, TransferInfo } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight, Plus, Search } from "lucide-react";

const columns: ColumnDef<TransferInfo>[] = [
    {
        accessorKey: 'ref_id',
        header: 'ID',
    },
    {
        accessorKey: 'created_at',
        header: 'Date',
        cell: ({ row }) => {
            const date = Date.parse(row.getValue('created_at'));
            const formatted = new Intl.DateTimeFormat('en-US', {
                dateStyle: 'short',
                timeStyle: 'short',
            }).format(date);

            return <div>{formatted}</div>
        }
    },
    {
        accessorKey: 'from_account.title',
        header: 'From',
    },
    {
        id: 'arrow',
        cell: () => {
            return <ArrowRight />
        }
    },
    {
        accessorKey: 'to_account.title',
        header: 'To',
    },
    {
        accessorKey: 'amount',
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const formatted = new Intl.NumberFormat('en-US', {
                style: "currency",
                currency: "PHP", //TODO: connect to user's preferred currency;;
            }).format(Math.abs(amount));

            return <div className="text-right">{formatted}</div>
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <Link className="w-full" href={`/transactions/transfers/${row.getValue("ref_id")}`}>
                <PrimaryButton className="w-full">View</PrimaryButton>
            </Link>
        )
    }
];

interface TransferInfoPaginator {
    data: TransferInfo[],
    path: string,
    
    per_page: number,
    
    links: {
        active: boolean,
        label: string,
        url: string,
    }[],
}

export default function ListTransferInfo({ transferInfo }: PageProps<{ transferInfo: TransferInfoPaginator }>) {
    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-5">
            <Head title="Transactions" />

            <div className="flex flex-row space-x-2 items-center">
                <Input className="flex-[6]" placeholder="Search" />
                <PrimaryButton className="flex-1"><div className="flex flex-row items-center justify-around p-0"><Search /> Search</div></PrimaryButton>
                <Link className="flex-1" href="/transactions/new">
                    <PrimaryButton className="w-full"><div className="flex flex-row items-center justify-around"><Plus /> New</div></PrimaryButton>
                </Link>
            </div>

            <div className="mt-5">
                <DataTable columns={columns} data={transferInfo.data} />
            </div>

            <Pagination className="mt-2">
                <PaginationContent>
                    {transferInfo.links.map((link, i, a) => (
                        <PaginationItem>
                            {i == 0 ? (
                                <PaginationPrevious href={link.url} />
                            ) : i == a.length - 1 ? (
                                <PaginationNext href={link.url} />
                            ) : (
                                <PaginationLink isActive={link.active} href={link.url}>{link.label}</PaginationLink>
                            )}
                        </PaginationItem>
                    ))}
                </PaginationContent>
            </Pagination>
        </div>
    );
}

ListTransferInfo.layout = (page: JSX.Element) => <Authenticated children={page} title={
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <Link href="/transactions">
                    <BreadcrumbLink>Transactions</BreadcrumbLink>
                </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>Transfer Transactions</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
} />