import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/forgot-password');
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <p className="text-4xl mt-6 text-blue-800 font-semibold">Forgot your password?</p>

            <div className="my-4 text-sm text-gray-600 dark:text-gray-400">
                Enter your email below to recover your password
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {status}
                </div>
            )}
            
            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    placeholder="Email Address"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Submit
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
