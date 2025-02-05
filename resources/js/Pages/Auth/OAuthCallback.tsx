import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Guest from "@/Layouts/GuestLayout";
import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function OAuthCallback({
    id,
    email,
    name,
}: PageProps<{
    id: string,
    email: string,
    name: string,
}>) {
    const { data, setData, processing, errors, post, reset } = useForm({
        id: id,
        email: email,
        name: name,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/auth/callback', {
            onFinish: () => {
                reset('password', 'password_confirmation');
            },
        });
    }

    return (
        <Guest>
            <Head title="Register" />

            <div className="flex justify-between align-baseline">
                <div>
                    <p className="text-md">Welcome to Thriftly</p>
                    <div className="text-xs text-blue-800/35">Securely Track, Smartly Spend</div>
                </div>
            </div>

            <p className="text-5xl mt-6 text-blue-800 font-semibold">Sign up</p>

            <div className="my-1 text-sm text-gray-600 dark:text-gray-400">
                It seems that this Google account is not associated with an account in our platform. By continuing, you will have an account created in Thriftly.
            </div>

            <form className="mt-2" onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        placeholder="Name"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        placeholder="Email Address"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        placeholder="Password"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"    
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <PrimaryButton className="my-4 py-3 w-full" disabled={processing}>
                    Register
                </PrimaryButton>
            </form>
        </Guest>
    )
}