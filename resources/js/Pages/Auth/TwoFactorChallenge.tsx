import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, MouseEventHandler, useState } from 'react';

export default function TwoFactorChallenge({
    errors: propErrors
}: {
    errors: { recovery_code: string }
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/two-factor-challenge', {
            onFinish: () => {
                reset('code');
            }
        });
    };
    
    return (
        <GuestLayout>
            <Head title="Log in - 2FA" />

            <p className="text-3xl mt-6 text-blue-800 font-semibold">Two-Factor Authentication</p>

            <div className="my-1 text-sm text-gray-600 dark:text-gray-400">
                Enter the code from your authentication app to continue
            </div>

            {propErrors.recovery_code && (
                <div className="w-full bg-red-600/70 mt-4 px-3 py-1 text-sm font-medium text-white rounded-xl">
                    {propErrors.recovery_code}
                </div>
            )}
            
            <form onSubmit={submit}>
                <div className="mt-6">
                    <InputLabel htmlFor="code" value="Authentication Code" />

                    <TextInput
                        id="code"
                        type="text"
                        name="code"
                        value={data.code}
                        className="mt-1 block w-full"
                        placeholder=""
                        isFocused={true}
                        onChange={(e) => setData('code', e.target.value)}
                    />

                    <InputError message={errors.code} className="mt-2" />
                </div>

                <PrimaryButton className="my-5 w-full py-3" disabled={processing}>
                    Sign in
                </PrimaryButton>
            </form>
                <div className="mt-3 mb-5 flex items-center justify-between">
                    <Link href="/two-factor-challenge/recovery-code" className="rounded-md text-sm text-blue-800/90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Enter a recovery code
                    </Link>
                </div>
        </GuestLayout>
    );
}
