import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import PrimaryButton from '@/Components/PrimaryButton';
import backgroundImage from '../../img/bg.png';
import { PageProps } from '@/types';


export default function Welcome({
    auth
}: PageProps) {
    
    return (
        <div className='flex flex-col min-h-screen bg-center bg-cover' style={{
            backgroundImage: `url(${backgroundImage})`,
        }}>
            <header className='flex flex-row justify-between bg-white w-screen px-6 py-2'>
                <ApplicationLogo className='h-20' />
                {auth.user ? (
                    <Link href='/dashboard' className='self-center mx-2'>
                        <PrimaryButton>Dashboard</PrimaryButton>
                    </Link>
                ) : (
                    <Link href='/login' className='self-center mx-2'>
                        <PrimaryButton>Sign In</PrimaryButton>
                    </Link>
                )}
            </header>

            <div className="flex flex-col text-white items-center mx-80 my-auto">
                <h1 className='font-[rowdies] text-6xl my-5'>Welcome to Thriftly!</h1>
                <h2 className='font-[rowdies] text-4xl my-5'>Securely Track, Smartly Spend.</h2>
                <p className='text-center my-5'>Thriftly is a web application that helps users manage their finances through organizing their expenses, tracking their income sources, as well as setting financial goals. It can also provide analytics that can reveal insights on a user's spending habits which can empower the user to stay in control with their finances and make smart financial decisions.</p>
                {!auth.user && (
                    <Link href='/register'>
                        <PrimaryButton>Get Started</PrimaryButton>
                    </Link>
                )}
            </div>
        </div>
    );
}
