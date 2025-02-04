import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, MouseEventHandler, useState } from 'react';

export default function TwoFactorChallenge() {
    const { data, setData, post, processing, errors, reset } = useForm({
        recovery_code: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/two-factor-challenge', {
            onFinish: () => {
                reset('recovery_code');
            }
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in - 2FA" />

            <p className="text-3xl mt-6 text-blue-800 font-semibold">Two-Factor Authentication</p>

            <div className="my-1 text-sm text-gray-600 dark:text-gray-400">
                Enter one of your recovery codes to continue
            </div>
            
            <form onSubmit={submit}>
                <div className="mt-6">
                    <InputLabel htmlFor="recovery_code" value="Recovery Code" />

                    <TextInput
                        id="recovery_code"
                        type="text"
                        name="recovery_code"
                        value={data.recovery_code}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('recovery_code', e.target.value)}
                    />

                    <InputError message={errors.recovery_code} className="mt-2" />
                </div>


                <PrimaryButton className="my-5 w-full py-3" disabled={processing}>
                    Sign in
                </PrimaryButton>
            </form>
                <div className="mt-3 mb-5 flex items-center justify-between">
                    <Link href="/two-factor-challenge" className="rounded-md text-sm text-blue-800/90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Enter an authentication code
                    </Link>
                </div>
        </GuestLayout>
    );
}
