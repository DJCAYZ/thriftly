import PrimaryButton from "@/Components/PrimaryButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { Account } from "@/types";
import RecentTransactions from "./RecentTransactions";
import ExpenseOverviewChart from "./ExpenseOverviewChart";
import { Link } from "@inertiajs/react";

export default function AccountOverview({
    account
} : {
    account: Account
}) {

    const {balance, expenseOverview, recentTransactions} = account;

    return (
        <div>
            <div className="flex flex-row mb-5 items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-sm text-gray-900">ACCOUNT BALANCE</p>
                    <h1 className="text-[4.5rem]">{balance.toLocaleString("en-US", {style:'currency', 'currency': 'PHP'})}</h1>
                </div>
                <Link href='/transactions/new'>
                    <PrimaryButton className="h-10">New Transaction</PrimaryButton>
                </Link>
            </div>
            {expenseOverview.length > 0 ? ( <>
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
            </>
            ) : <p className="mt-5">No transactions found</p>}
            {recentTransactions.length > 0 ? (<>
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
            </>) : <p className="mt-5">No transactions found</p>}
        </div>
    );
}


