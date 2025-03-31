import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Input } from '@/Components/ui/input';
import PrimaryButton from '@/Components/PrimaryButton';
import { Button } from '@/Components/ui/button';
import { router } from '@inertiajs/react';

const formSchema = z.object({
    account: z.string().uuid(),
    amount: z.coerce.number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
    }).positive("Amount must be a positive number"),
    category: z.string().uuid(),
    description: z.string().optional(),
});

export default function NewIncome() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            amount: 0,
        },
    });

    const accounts = [
        { ref_id: '8f99d24f-fa80-40d4-99de-41177bebf852', 'title': 'Account 1', },
        { ref_id: '1ccaa98d-f01e-4e69-82a6-510499952422', 'title': 'Account 2', },
        { ref_id: 'dd09a6f8-9f47-4a78-a429-c8ee05093a9b', 'title': 'Account 3', },
    ];

    const categories = [
        { ref_id: '108d4138-7619-43c7-83c6-c03fe414edf2', title: 'Food', },
        { ref_id: '7936ed51-e07f-4ca3-a4bd-f443b879b2dc', title: 'Clothing', },
        { ref_id: '173a2ed9-7b6b-40a6-9ad0-166ae86134d3', title: 'Transportation', },
    ];

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post('/transactions/new/income', values);
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name="account"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an account" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {accounts.map((account) => (
                                            <SelectItem key={account.ref_id} value={account.ref_id}>{account.title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    This is the account where this transaction will be recorded.
                                </FormDescription>
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
                                <FormDescription>
                                    How much was spent in this transaction?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        {categories.map((category) => (
                                                <SelectItem key={category.ref_id} value={category.ref_id}>{category.title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    The category for this expense
                                </FormDescription>
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
                                <FormDescription>
                                    Brief Description of the Transaction
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}