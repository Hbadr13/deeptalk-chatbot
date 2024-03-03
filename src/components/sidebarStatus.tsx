import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import ChatHistory from './chatHistory'
import { Session } from 'next-auth'




const SidebarStatus = () => {
    const [session, setSession] = useState<Session | null>()
    useEffect(() => {
        (
            async () => {
                const session = await getSession()
                if (session)
                    setSession(session)
            }
        )()
    }, [])
    if (!session)
        return (
            <div className='h-screen p-5 w-[50%] '>
                <div className=" relative h-full bg-[#f8f8f8] rounded-xl"></div>
            </div>
        )
    return (
            < ChatHistory />
    )


}

export default SidebarStatus