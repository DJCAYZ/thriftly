import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { router } from '@inertiajs/react';
import { Account } from '../New';

const formSchema = z.object({
    account: z.string().uuid(),
    to_account: z.string().uuid(),
    amount: z.coerce.number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
    }).positive("Amount must be a positive number"),
    description: z.string().optional(),
    type: z.literal('transfer'),
}).refine(({ account, to_account }) => account !== to_account, {
    message: 'From Account and To Account are the same',
    path: ['to_account'],
}); 

export default function NewTransfer({ accounts }: { accounts: Account[] }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            amount: 0,
            type: 'transfer',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post('/transactions/new', values, {
            onError({ account = '', to_account = '', amount = '', description = '', type = '' }) {
                if (account) form.setError('account', { message: account });
                if (to_account) form.setError('to_account', { message: to_account });
                if (amount) form.setError('amount', { message: amount });
                if (description) form.setError('description', { message: description });
                if (type) form.setError('type', { message: type });
            },
        });
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
                    
                    <div className='flex flex-row justify-between space-x-5'>
                    <FormField
                        control={form.control}
                        name="account"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>From Account</FormLabel>
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
                                    The account where the amount will be coming from.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="to_account"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>To Account</FormLabel>
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
                                    The account where the amount will be transferred to
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