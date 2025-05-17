import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from '@/Components/ui/alert-dialog';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    title: z.string().max(255),
    starting_balance: z.coerce.number().nonnegative(),
})

export default function AddAccountForm({ className = "" }: { className?: string }) {
    const [open, setOpen] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            starting_balance: 0,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post('/accounts/new', values, {
            onFinish: () => setOpen(false),
        });
    }
    
    return (
        <div className={className} >
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <PrimaryButton>Create Account</PrimaryButton>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Account</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Cash" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="starting_balance"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Starting Balance</FormLabel>
                                        <FormControl>
                                            <Input type='number' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <SecondaryButton>Cancel</SecondaryButton>
                                </DialogClose>
                                <PrimaryButton type="submit">Add</PrimaryButton>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
        
    );
}