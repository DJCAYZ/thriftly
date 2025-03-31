import DataTable from "@/Components/DataTable";
import { Button } from "@/Components/ui/button";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Transaction } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/Components/ui/pagination';
import { Input } from "@/Components/ui/input";
import { Plus, Search } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/Components/ui/breadcrumb";


const columns: ColumnDef<Transaction>[] = [
{
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }) => {
            const date = row.getValue('date') as Date;
            const formatted = new Intl.DateTimeFormat('en-US', {
                dateStyle: 'short',
                timeStyle: 'short',
            }).format(date);

            return <div className="font-medium">{formatted}</div>
        }
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

const data = [
    {
        ref_id: '4187ba19-a229-4932-91b7-d001e0368b47',
        date: new Date('March 30, 2025 12:00:00'),
        category: 'Food',
        amount: 100,
    },
    {
        ref_id: '737dd597-ca86-4969-bf1a-e662d93dc9dd',
        date: new Date('March 30, 2025 12:00:00'),
        category: 'Food',
        amount: 100,
    },
    {
        ref_id: '3e869ac2-ce8b-44de-9c3f-652ca63eb50f',
        date: new Date('March 30, 2025 12:00:00'),
        category: 'Food',
        amount: 100,
    },
    {
        ref_id: '0a7737ac-735f-4936-811d-7efb5aec1af2',
        date: new Date('March 30, 2025 12:00:00'),
        category: 'Food',
        amount: 100,
    },
    {
        ref_id: '0a7737ac-735f-4936-811d-7efb5aec1af2',
        date: new Date('March 30, 2025 12:00:00'),
        category: 'Food',
        amount: 100,
    },
    {
        ref_id: '0a7737ac-735f-4936-811d-7efb5aec1af2',
        date: new Date('March 30, 2025 12:00:00'),
        category: 'Food',
        amount: 100,
    },
    {
        ref_id: '0a7737ac-735f-4936-811d-7efb5aec1af2',
        date: new Date('March 30, 2025 12:00:00'),
        category: 'Food',
        amount: 100,
    },
    {
        ref_id: '0a7737ac-735f-4936-811d-7efb5aec1af2',
        date: new Date('March 30, 2025 12:00:00'),
        category: 'Food',
        amount: 100,
    },
    {
        ref_id: '0a7737ac-735f-4936-811d-7efb5aec1af2',
        date: new Date('March 30, 2025 12:00:00'),
        category: 'Food',
        amount: 100,
    },
    {
        ref_id: '0a7737ac-735f-4936-811d-7efb5aec1af2',
        date: new Date('March 30, 2025 12:00:00'),
        category: 'Food',
        amount: 100,
    },
];



export default function List() {
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
                <DataTable columns={columns} data={data} />
            </div>
            
            <Pagination className='mt-5'>
                <PaginationContent>
                    <PaginationItem>
                        <Link href="#">
                            <PaginationPrevious />
                        </Link>
                    </PaginationItem>
                    <PaginationItem>
                    <Link href="#">
                            <PaginationLink isActive>1</PaginationLink>
                        </Link>
                    </PaginationItem>
                    <PaginationItem>
                        <Link href="#">
                            <PaginationLink>2</PaginationLink>
                        </Link>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <Link href="#">
                            <PaginationLink>9</PaginationLink>
                        </Link>
                    </PaginationItem>
                    <PaginationItem>
                        <Link href="#">
                            <PaginationNext />
                        </Link>
                    </PaginationItem>
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