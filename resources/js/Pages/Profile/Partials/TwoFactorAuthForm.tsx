import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function TwoFactorAuthForm({
    status = '',
    hasEnabledTwoFactorAuth,
    className = ''
} : {
    status?: string,
    hasEnabledTwoFactorAuth: boolean,
    className?: string
}) {
    
    const content = hasEnabledTwoFactorAuth ? (
        <DisableTwoFactorAuth status={status} className="mt-4" />
    ) : status === 'two-factor-authentication-enabled' ? (
        <ConfirmTwoFactorAuth className="mt-4" />
    ) : ( <EnableTwoFactorAuth className="mt-4" /> );

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Two Factor Authentication
                </h2>
    
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Increase your account security by utilizing two factor authentication
                </p>
            </header>
    
            {content}
        </section>
    );
}

function EnableTwoFactorAuth({ className = '' }: { className?: string }) {
    const onEnableTwoFactorAuth: FormEventHandler = (e) => {
        e.preventDefault();

        router.post('/user/two-factor-authentication');
    }

    return (
        <form className={className} onSubmit={onEnableTwoFactorAuth}>
            <PrimaryButton>Enable 2FA</PrimaryButton>
        </form>
    );
}

function DisableTwoFactorAuth({ status = '', className = '' }: { className?: string, status?: string }) {
    const { flash } = usePage().props;
    const onDisableTwoFactorAuth: FormEventHandler = (e) => {
        e.preventDefault();

        router.delete('/user/two-factor-authentication');
    }

    const alert = status === 'two-factor-authentication-confirmed' ? (
        <div className="w-full bg-green-600/70 mt-4 px-2 text-sm font-medium text-white rounded-xl">
            Two Factor Authentication enabled! Your recovery codes are:
            
            <ol>
                {flash.recoveryCodes.map((code, i) => {
                    return ( <li key={i}>{code}</li> )
                })} 
            </ol>
        </div>
    ) : null;

    return (
        <div>
            {alert}
            <form className={className} onSubmit={onDisableTwoFactorAuth}>
                <DangerButton>Disable 2FA</DangerButton>
            </form>
        </div>
    );
}

function ConfirmTwoFactorAuth({ className = '' }: { className?: string }) {
    const { flash } = usePage().props;
    
    const { data, setData, post, processing, errors } = useForm({
        code: ''
    });

    const onConfirmTwoFactorAuth: FormEventHandler = (e) => {
        e.preventDefault();

        post('/user/confirmed-two-factor-authentication');
    }

    return (
        <div>
            <div className="bg-white w-fit p-2" dangerouslySetInnerHTML={{__html: flash.tfaQrCode}}></div>
            <form className={className} onSubmit={onConfirmTwoFactorAuth}>
                <div>
                    <InputLabel
                        htmlFor="code"
                        value="Confirm 2FA Code"
                    />

                    <TextInput
                        id="code"
                        value={data.code}
                        onChange={(e) =>
                            setData('code', e.target.value)
                        }
                        className="mt-1 block w-full"
                    />

                    <InputError
                        message={errors.code}
                        className="mt-2"
                    />
                </div>
                <PrimaryButton disabled={processing}>Confirm 2FA Code</PrimaryButton>
            </form>
        </div>
    );
}
