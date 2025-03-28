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
                        <TableHead>CATEGORY</TableHead>
                        <TableHead>AMOUNT</TableHead>
                        <TableHead>ACTION</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction) => {
                        return (
                            <TableRow key={transaction.id}>
                                <TableCell>{Intl.DateTimeFormat("en-US").format(transaction.date)}</TableCell>
                                <TableCell>{transaction.category}</TableCell>
                                <TableCell>{Intl.NumberFormat("en-US", { style: 'currency', 'currency': 'PHP' }).format(transaction.amount)}</TableCell>
                                <TableCell><PrimaryButton>Details</PrimaryButton></TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}