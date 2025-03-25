import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

import backgroundImage from '../../img/bg-guest.png';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen items-center bg-center px-2 py-2 bg-cover sm:pt-0" style={{
            backgroundImage: `url(${backgroundImage})`
        }}>
            <header className="self-start">
                <Link href='/'>
                    <ApplicationLogo className="h-20" />
                </Link>
            </header>

            <div className="my-auto flex flex-col w-full h-full overflow-hidden bg-white px-6 py-4 sm:max-w-md sm:rounded-xl" style={{
                boxShadow: '0 0 25px #00000035'
            }}>
                {children}
            </div>
        </div>
    );
}
