import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen items-center bg-[url(/imgs/bg.png)] bg-cover pt-6 sm:pt-0">
            <header className="absolute self-start mt-2">
                <Link href='/'>
                    {/* <ApplicationLogo hasBrandText className="m-2 h-20 w-20" /> */}
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
