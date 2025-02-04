import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="flex justify-between align-baseline">
                <div>
                    <p className="text-md">Welcome to Thriftly</p>
                    <div className="text-xs text-blue-800/35">Securely Track, Smartly Spend</div>
                </div>
                <div className="mt-2">
                    <p className="text-xs text-gray-400">No Account?</p>
                    <Link href={route('register')}>
                        <p className="text-xs text-blue-800/90 underline">Sign up</p>
                    </Link>
                </div>
            </div>

            <p className="text-5xl mt-6 text-blue-800 font-semibold">Sign in</p>

            {status && (
                <div className="w-full bg-green-600/70 mt-4 px-2 text-sm font-medium text-white rounded-xl">
                    {status}
                </div>
            )}

            <form className="mt-2" onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email address" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        placeholder="Email Address"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>


                <div className="mt-3 mb-5 flex items-center justify-between">
                    <div className="block">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData(
                                        'remember',
                                        (e.target.checked || false) as false,
                                    )
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                Remember me
                            </span>
                        </label>
                    </div>
                    <Link
                        href={route('password.request')}
                        className="rounded-md text-sm text-blue-800/90 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Forgot password?
                    </Link>
                </div>
                <PrimaryButton className="my-5 w-full py-3" disabled={processing}>
                    Sign in
                </PrimaryButton>
            </form>
            <div className="text-center">OR</div>
            <PrimaryButton className="my-5 py-3 w-full" disabled={true}>
                Sign in with Google
            </PrimaryButton>
        </GuestLayout>
    );
}
