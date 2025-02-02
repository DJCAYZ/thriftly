import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen items-center bg-gray-100 pt-6 sm:pt-0">
            <header className="absolute self-start mt-2">
                <Link href='/'>
                    <ApplicationLogo className="h-20 w-20 fill text-gray-500" />
                </Link>
            </header>

            <div className="my-auto flex flex-col w-full h-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-xl sm:rounded-xl">
                {children}
            </div>
        </div>
    );
}
