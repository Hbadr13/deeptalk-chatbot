// 'use client'
import { getSession, signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Navbar({ params }: any) {

    const { data: session, status } = useSession();

    // const { status } = useSession({
    //     required: true,
    //     onUnauthenticated() {
    //         // The user is not authenticated, handle it here.
    //     },
    // })
    
    const router = useRouter()
    const pathName = usePathname()

    useEffect(() => {
        if (status === 'unauthenticated' && pathName != '/auth/signup') {
            router.push('/auth/signin');
        }
    }, [status]);
    if (pathName == '/auth/signup' || pathName == '/auth/signin') {
        return <div></div>;
    }
    if (status === 'loading') {
        return <div></div>;
    }
    return (
        <></>
    );
}
