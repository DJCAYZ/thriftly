import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

import backgroundImage from '../../img/bg.png';
import { SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar';
import { AppSidebar } from '@/Components/AppSidebar';
import { User } from '@/types';


export default function Authenticated({
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-cover bg-center" style={{
            backgroundImage: `url(${backgroundImage})`,
        }}>
            <SidebarProvider>
                <AppSidebar />
                <div className='min-h-screen bg-sidebar opacity-90'>
                    <SidebarTrigger className='w-10 h-10 text-sidebar-foreground'/>
                </div>
                

                <main className='w-screen'>
                    {children}
                </main>
            </SidebarProvider>
        </div>
    );
}
