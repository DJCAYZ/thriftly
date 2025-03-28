import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import TwoFactorAuthForm from './Partials/TwoFactorAuthForm';

export default function Edit({
    tfaQrCode = '',
    hasEnabledTwoFactorAuth,
    mustVerifyEmail,
    status,
}: PageProps<{ hasEnabledTwoFactorAuth: boolean, mustVerifyEmail: boolean; status?: string, tfaQrCode?: string }>) {
    return (
        <AuthenticatedLayout
            title="Edit Profile"
        >
            <Head title="Profile" />
            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                <TwoFactorAuthForm
                    status={status}
                    hasEnabledTwoFactorAuth={hasEnabledTwoFactorAuth}
                    className="max-w-xl"
                />
            </div>

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="max-w-xl"
                />
            </div>

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                <UpdatePasswordForm className="max-w-xl" />
            </div>

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                <DeleteUserForm className="max-w-xl" />
            </div>
        </AuthenticatedLayout>
    );
}
