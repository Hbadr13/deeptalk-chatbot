// 'use client'
import { getSession, signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Navbar({ params }: any) {
    const { data: session, status } = useSession();
    const router = useRouter()
    const pathName = usePathname()
    useEffect(() => {
        console.log('--->', status)
        if (status === 'unauthenticated' && pathName != '/auth/signup') {
            router.push('/auth/signin');
        }
    }, [status]);
    if (pathName == '/auth/signup' || pathName == '/auth/signin') {
        return <div></div>;
    }
    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {session ? (
                <div>
                    {/* <p>Email: {session}</p> */}
                    <p>Email: {session?.user?.phoneNumber}</p>
                    <p>id: {session?.user?.id}</p>
                    <button className='px-4 py-2  bg-red-300' onClick={() => signOut({ callbackUrl: '/auth/signin' })}>log out</button>
                </div>
            ) : (
                <p>No user logged in.</p>
            )}
        </div>
    );
}
