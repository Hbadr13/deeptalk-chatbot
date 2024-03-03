import React, { useEffect, useState } from 'react'
import { getSession, useSession } from 'next-auth/react'
import Navbar from './navbar'
import ChatHistory from './chatHistory'
import Favorite from './favorite'
import Saved from './saved'
import { Session } from 'next-auth'


export interface SidebarStatusProps {
    option: string
    idOfSelectedConv: number,
    setIdOfSelectedConv: (idOfSelectedConv: number) => void
}


const SidebarStatus = ({ idOfSelectedConv, setIdOfSelectedConv, option }: SidebarStatusProps) => {
    // const session = useSession()
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
        option == 'chat' ?
            < ChatHistory idOfSelectedConv={idOfSelectedConv} setIdOfSelectedConv={setIdOfSelectedConv} />
            : option == 'saved_Q' ?
                <Saved />
                : option == 'saved_R' ?
                    <Saved />
                    : <Favorite />
    )


}

export default SidebarStatus