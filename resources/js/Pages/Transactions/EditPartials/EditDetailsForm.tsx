import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/Components/ui/input";
import { Transaction } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";

const formSchema = z.object({
    account_id: z.string().uuid(),
    category_id: z.string().uuid(),
    amount: z.coerce.number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
    }).positive("Amount must be a positive number"),
    description: z.string().optional(),
});

export default function EditDetailsForm({ transaction }: { transaction: Transaction }) {
    const { accounts, categories } = usePage().props;
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            account_id: transaction.account.ref_id,
            category_id: transaction.category?.ref_id,
            amount: transaction.amount,
            description: transaction.description,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.patch(`/transactions/${transaction.ref_id}`, values, {
            onFinish: () => setOpen(false),
        })
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <PrimaryButton>Edit</PrimaryButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Transaction</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="account_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Account</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Account" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {accounts.map((account) => (
                                                <SelectItem key={account.ref_id} value={account.ref_id}>{account.title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {transaction.type === "Income" ?
                                            categories.income.map((category) => (
                                                <SelectItem key={category.ref_id} value={category.ref_id}>{category.name}</SelectItem>
                                            )) :
                                            categories.expense.map((category) => (
                                                <SelectItem key={category.ref_id} value={category.ref_id}>{category.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Amount" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="py-2">
                            <DialogClose asChild>
                                <SecondaryButton>Cancel</SecondaryButton>
                            </DialogClose>
                            <PrimaryButton type="submit">Update</PrimaryButton>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}