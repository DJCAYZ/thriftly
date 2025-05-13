import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { router } from '@inertiajs/react';
import { Account, Category } from '@/types';

const formSchema = z.object({
    account: z.string().uuid(),
    amount: z.coerce.number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
    }).positive("Amount must be a positive number"),
    category: z.string().uuid(),
    description: z.string().optional(),
    type: z.literal('income'),
});

export default function NewIncome({ accounts, categories }: { accounts: Account[], categories: Category[] }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            amount: 0,
            type: 'income',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post('/transactions/new', values);
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className='hidden'>
                                <Input type='hidden' {...field} />
                            </FormItem>
                        )}
                    />
                    <div className='flex flex-row space-x-5'>
                        <FormField
                            control={form.control}
                            name="account"
                            render={({ field }) => (
                                <FormItem className='w-full'>
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
                            name="category"
                            render={({ field }) => (
                                <FormItem className='w-full'>
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
                                                    <SelectItem key={category.ref_id} value={category.ref_id}>{category.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        The category for this income
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

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