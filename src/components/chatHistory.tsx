'use client'

import { KeyIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { getSession, useSession } from 'next-auth/react'
import { Conversation } from '@prisma/client'
import { getTheTime } from '@/lib/time'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Session } from 'next-auth'


const getAllConversation = async ({ accessToken }: { accessToken: string }) => {
    const res = await fetch(`http://localhost:3000/api/conversations`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "GET"
    })
    return res
}

const ChatHistory = () => {
    const [idOfSelectedConv, setIdOfSelectedConv] = useState(0)
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [session, setSession] = useState<Session | null>()
    const pathname = usePathname()
    const router = useRouter()


    useEffect(() => {
        (
            async () => {
                const session = await getSession()
                if (session)
                    setSession(session)
            }
        )()
    }, [])

    useEffect(() => {
        setIdOfSelectedConv(Number(pathname.split('/')[2]))
    }, [pathname])

    useEffect(() => {
        (
            async () => {
                if (session) {
                    try {

                        const res = await getAllConversation({ accessToken: session.user.accessToken })

                        if (res.status == 201) {
                            const data: any[] = await res.json()
                            setConversations(data)
                        }
                    } catch (error) {

                    }
                }
            }
        )()
    }, [session])

    const handelCreatNewGroup = async () => {
        try {
            if (!session)
                return
            const res = await fetch(`http://localhost:3000/api/conversations`, {
                headers: {
                    "Authorization": `Bearer ${session.user.accessToken}`
                },
                method: "POST",
                body: JSON.stringify({
                    name: ""
                })
            })
            if (res.ok) {
                const res2 = await getAllConversation({ accessToken: session.user.accessToken })
                if (res2.ok) {
                    const data = await res2.json()
                    setConversations(data)
                }
            }
        } catch (error) {

        }
    }
    const handelDeleteConvesation = async (convid: number) => {
        try {

            if (!session || !convid)
                return
            const res = await fetch(`http://localhost:3000/api/conversations/${convid}`, {
                headers: {
                    "Authorization": `Bearer ${session.user.accessToken}`
                },
                method: "DELETE",
            })
            if (res.ok) {
                const res2 = await getAllConversation({ accessToken: session.user.accessToken })
                if (res2.ok) {
                    const data = await res2.json()
                    if (data.length && convid == idOfSelectedConv) {
                        router.push(`/conv/${data[0].id}`)
                    }
                    else if (!data.length)
                        router.push(`/`)
                    setConversations(data)
                }
            }
        } catch (error) {

        }
    }

    if (!session)
        return (
            <div className='h-screen p-5 w-[50%] '>
                <div className=" relative h-full bg-[#f8f8f8] rounded-xl"></div>
            </div>
        )
    return (
        <div className=' relative h-screen p-5 w-[50%] '>
            <div className=" relative h-full bg-[#f8f8f8] rounded-xl overflow-y-scroll overflow-x-hidden hideScroll">
                <div className="relative p-8 text-2xl font-extrabold  text-[#212327]  flex space-x-2">
                    <div className="">
                        chat History
                    </div>
                    <div className="absolute w-full h-[1px] bg-[#bdbcbc] opacity-25 -left-2 bottom-3"></div>
                </div>
                {
                    conversations.map((conversation, index) =>
                    (
                        <div key={index} className={` relative  font-extrabold  text-[#212327]  flex flex-col space-y-6 py-3 px-10`}>
                            <div
                                onClick={() => (setIdOfSelectedConv(conversation.id), router.push(`/conv/${conversation.id}`))}
                                className={`w-full  cursor-pointer flex justify-between rounded-lg  p-2 border-b-2 ${conversation.id == idOfSelectedConv ? 'bg-slate-300' : ''}`}>
                                <div className="">
                                    {
                                        conversation.name
                                            ? conversation.name
                                            : 'New Chat'
                                    }
                                </div>
                                <div className="flex space-x-2">
                                    <div className="">
                                        {getTheTime(conversation.createdAt)}
                                    </div>
                                    <button className=" bg-white rounded-lg p-1">
                                        <Image height={30} width={30} src={'/delete.svg'} alt='delete' />
                                    </button>
                                </div>
                            </div>
                            <button onClick={() => handelDeleteConvesation(conversation.id)} className=" -top-1  right-12 absolute bg-white rounded-lg p-1">
                                <Image height={30} width={30} src={'/delete.svg'} alt='delete' />
                            </button>
                        </div>
                    )
                    )
                }
                <div className={` opacity-0 cursor-pointer relative  font-extrabold  text-[#212327]  flex flex-col space-y-6 py-10 px-10`}>
                    empty
                </div>
            </div>
            <div className="w-full    absolute bottom-0 p-10 flex justify-center">
                <button onClick={handelCreatNewGroup} className=" relative z-10 bg-[#f08d86] hover:bg-[#ffb9b4] duration-200 transition-colors px-16 py-4 rounded-lg flex space-x-2">
                    <KeyIcon width={30} />
                    <div className="">
                        Add New Group
                    </div>
                </button>
                <div className=" absolute w-full h-full bg-slate-400 opacity-15  brightness-50 blur-xl z-0  top-0"></div>
            </div>

        </div>
    )
}

export default ChatHistory
