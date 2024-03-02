import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Navbar from './navbar'
import ChatHistory from './chatHistory'
import Favorite from './favorite'
import Saved from './saved'


export interface SidebarStatusProps {
    option: string
    idOfSelectedConv: number,
    setIdOfSelectedConv: (idOfSelectedConv: number) => void
}


const SidebarStatus = ({ idOfSelectedConv, setIdOfSelectedConv, option }: SidebarStatusProps) => {
    const session = useSession()
    if (session.status == 'loading')
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