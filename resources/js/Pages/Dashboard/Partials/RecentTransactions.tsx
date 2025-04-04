import PrimaryButton from "@/Components/PrimaryButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Transaction } from "@/types";

export default function RecentTransactions({
    transactions
} : { transactions: Transaction[] }) {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>DATE</TableHead>
                        <TableHead>TYPE</TableHead>
                        <TableHead>CATEGORY</TableHead>
                        <TableHead>AMOUNT</TableHead>
                        <TableHead>ACTION</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction) => {
                        return (
                            <TableRow key={transaction.ref_id}>
                                <TableCell>{transaction.date.toString()}</TableCell>
                                <TableCell>{transaction.type.toUpperCase()}</TableCell>
                                <TableCell>{transaction.type === 'Transfer' ? (
                                    <div>{transaction.amount < 0 ? 'Outgoing' : 'Incoming'}</div>
                                ) : transaction.category}</TableCell>
                                <TableCell><div className={(transaction.type == 'Expense' ? 'bg-red-900' : (transaction.type == 'Income' ? 'bg-green-900' : 'bg-blue-900')) + ' w-auto rounded-lg text-white p-2 text-center' }>{Intl.NumberFormat("en-US", { style: 'currency', 'currency': 'PHP' }).format(Math.abs(transaction.amount))}</div></TableCell>
                                <TableCell><PrimaryButton>Details</PrimaryButton></TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}