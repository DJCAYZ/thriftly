import DataTable from "@/Components/DataTable";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transaction } from "@/types";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<Transaction>[] = [
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
                dateStyle: 'medium',
                timeStyle: 'short',
            }).format(date);

            return <div>{formatted}</div>
        }
    },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => {
            const value = row.getValue("type") as string;
            return value.toUpperCase();
        }
    },
    {
        accessorKey: 'category.name',
        header: 'Category',
        cell: ({ row }) => {
            if (row.getValue('type') === 'Transfer') {
                return (row.getValue('amount') as number) < 0 ? 'Out' : 'In'
            } else {
                return row.getValue('category_name');
            }
        }
    },
    
    {
        accessorKey: 'amount',
        header: "Amount",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const type = row.getValue('type') as string;
            const formatted = new Intl.NumberFormat('en-US', {
                style: "currency",
                currency: "PHP", //TODO: connect to user's preferred currency;;
            }).format(Math.abs(amount));

            return (
                <div className={(amount < 0 ? 'bg-red-900' : 'bg-green-900') + ' w-auto rounded-lg text-white p-2 text-center' }>{formatted}</div>
            );
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <Link className="w-full" href={`/transactions/${row.getValue("ref_id")}`}>
                <PrimaryButton className="w-full">View</PrimaryButton>
            </Link>
        )
    }
];

export default function RecentTransactions({
    transactions
} : { transactions: Transaction[] }) {
    return (
        <div>
            <DataTable columns={columns} data={transactions} />
        </div>
    );
}