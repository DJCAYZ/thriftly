import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

import backgroundImage from '../../img/bg.png';
import { SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar';
import { AppSidebar } from '@/Components/AppSidebar';


export default function Authenticated({
    children,
    title,
}: PropsWithChildren<{ header?: ReactNode, title: JSX.Element }>) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-cover bg-center" style={{
            backgroundImage: `url(${backgroundImage})`,
        }}>
            <SidebarProvider>
                <AppSidebar />
                <div className='min-h-screen bg-sidebar opacity-90'>
                </div>
                

                <main className='w-screen'>
                    <div className="py-2">
                        <div className="max-w-full sm:px-2 lg:px-4">
                            <div className='mb-2 flex flex-row items-center sticky top-0 bg-white opacity-90 rounded-lg z-50'>
                                <SidebarTrigger className='w-10 h-10 '/>
                                {title}
                            </div>
                            {children}
                        </div>
                    </div>
                </main>
            </SidebarProvider>
        </div>
    );
}
