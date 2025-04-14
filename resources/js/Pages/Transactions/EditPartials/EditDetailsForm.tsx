import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { z } from 'zod';
import { Transaction } from "../Show";
import { Form, FormField, FormItem } from "@/Components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/Components/ui/input";

const formSchema = z.object({
    ref_id: z.string().uuid(),
    account: z.string().uuid(),
    category: z.string().uuid(),
    amount: z.coerce.number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
    }).positive("Amount must be a positive number"),
    description: z.string().optional(),
});

export default function EditDetailsForm({ transaction }: { transaction: Transaction }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            ref_id: transaction.ref_id,
            account: transaction.account.ref_id,
            category: transaction.category?.ref_id,
            amount: transaction.amount,
            description: transaction.description,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // TODO PATCH
    }
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Transaction</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-x-8">
                    <FormField
                        control={form.control}
                        name="ref_id"
                        render={({ field }) => (
                            <FormItem className="hidden">
                                <Input type='hidden' {...field} />
                            </FormItem>
                        )}
                    />
                    
                </form>
            </Form>
        </DialogContent>
    );
}