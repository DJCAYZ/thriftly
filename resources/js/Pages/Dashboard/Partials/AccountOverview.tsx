import PrimaryButton from "@/Components/PrimaryButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/Components/ui/chart";
import { Separator } from "@/Components/ui/separator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Account, ExpenseOverview, Transaction } from "@/types";
import { Label, Pie, PieChart } from "recharts";

const chartConfig = {
    amount: {
        label: 'Amount',
    },
}

export default function AccountOverview({
    account
} : {
    account: Account
}) {

    const {balance, expenseOverview, recentTransactions} = account;
    const chartData = [
        { title: 'Food', amount: 5000, fill: "hsl(var(--chart-1))" },
        { title: 'Transport', amount: 2500, fill: "hsl(var(--chart-2))" },
        { title: 'Electricity', amount: 2500, fill: "hsl(var(--chart-3))" },
        { title: 'Clothing', amount: 2500, fill: "hsl(var(--chart-4))" },
        { title: 'Accessories', amount: 2500, fill: "hsl(var(--chart-5))" },
    ];

    return (
        <div className="p-5">
            <div className="flex flex-row mb-5 items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-sm text-gray-900">ACCOUNT BALANCE</p>
                    <h1 className="text-[4.5rem]">{balance.toLocaleString("en-US", {style:'currency', 'currency': 'PHP'})}</h1>
                </div>
                <PrimaryButton className="h-10">New Transaction</PrimaryButton>
            </div>
            <Separator />
            <div className="flex w-full flex-row">
                <Card className="flex-1 flex flex-col my-2">
                    <CardHeader className="items-center">
                        <CardTitle>Expense Overview</CardTitle>
                        <CardDescription>Last 30 Days</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ExpenseOverviewChart expenseOverview={expenseOverview} />
                    </CardContent>
                </Card>
                <div className="items-center self-center w-full h-full flex-1 m-2">
                    <h2>Expense Categories</h2>
                    {expenseOverview.map(({title, amount}) => {
                        return (
                            <p>{title} - {amount.toLocaleString("en-US", {style: 'currency', currency: 'PHP'})}</p>
                        )
                    })}
                </div>
            </div>
            <Separator />
            <div className="flex flex-col pt-2">
                <div className="flex flex-row justify-between">
                    <h1 className="">Recent Transactions</h1>
                    <PrimaryButton>All Transactions</PrimaryButton>
                </div>
                <div>
                    <RecentTransactions transactions={recentTransactions} />
                </div>
            </div>
        </div>
    );
}

function ExpenseOverviewChart({
    expenseOverview,
}: { expenseOverview: ExpenseOverview[] }) {

    const totalAmount = expenseOverview.reduce((total: number, current): number => {
        return total + current.amount;
    }, 0);

    const chartData = expenseOverview.map((category, index) => {
        return { 'fill': `hsl(var(--chart-${index+1}))`, ...category }
    })
    return (
        <ChartContainer config={chartConfig}>
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />} 
                />
                <Pie
                    data={chartData}
                    dataKey="amount"
                    nameKey="title"
                    innerRadius={60}
                    strokeWidth={5}
                >
                    <Label
                        content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                            <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                            >
                                <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-xl font-bold"
                                >
                                {totalAmount.toLocaleString("en-US", {style: 'currency', currency: "PHP"})}
                                </tspan>
                                <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                                >
                                Total Expense
                                </tspan>
                            </text>
                            )
                        }
                        }}
                    />
                </Pie>
            </PieChart>
        </ChartContainer>
    )
}

function RecentTransactions({
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