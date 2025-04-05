import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import TwoFactorAuthForm from './Partials/TwoFactorAuthForm';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/Components/ui/breadcrumb';

export default function Edit({
    tfaQrCode = '',
    hasEnabledTwoFactorAuth,
    mustVerifyEmail,
    status,
}: PageProps<{ hasEnabledTwoFactorAuth: boolean, mustVerifyEmail: boolean; status?: string, tfaQrCode?: string }>) {
    return (
        <div>
            <Head title="Profile" />
            <div className="bg-white my-2 p-4 shadow sm:rounded-lg sm:p-8">
                <TwoFactorAuthForm
                    status={status}
                    hasEnabledTwoFactorAuth={hasEnabledTwoFactorAuth}
                    className="max-w-xl"
                />
            </div>

            <div className="bg-white my-2 p-4 shadow sm:rounded-lg sm:p-8">
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="max-w-xl"
                />
            </div>

            <div className="bg-white my-2 p-4 shadow sm:rounded-lg sm:p-8">
                <UpdatePasswordForm className="max-w-xl" />
            </div>

            <div className="bg-white my-2 p-4 shadow sm:rounded-lg sm:p-8">
                <DeleteUserForm className="max-w-xl" />
            </div>
        </div>
    );
}

Edit.layout = (page: JSX.Element) => <Authenticated children={page} title={
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbPage>Accounts Settings</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
} />