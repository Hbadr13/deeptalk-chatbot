'use client'

import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { Message } from '@prisma/client'
import { getTheTime } from '@/lib/time'
import { Session } from 'next-auth'


const Favorite = () => {

    const [session, setSession] = useState<Session | null>()
    const [messages, setMessages] = useState<Array<Message>>([])
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
        (
            async () => {
                try {

                    if (session) {
                        const res = await fetch(`http://localhost:3000/api/messages/reaction/register_qs`, {
                            headers: {
                                "Authorization": `Bearer ${session.user.accessToken}`
                            },
                            method: "GET"
                        })
                        if (res.ok) {
                            const data = await res.json()
                            setMessages(Array.from(data.messages))
                        }
                    }
                } catch (error) {

                }
            }
        )()
    }, [session])


    if (!session)
        return (
            <div className='h-screen p-5 w-[50%] '>
                <div className=" relative h-full bg-[#f8f8f8] rounded-xl"></div>
            </div>
        )
    return (
        <div className=' relative h-screen p-5 w-[50%] '>
            <div className=" relative h-full bg-[#f8f8f8] rounded-xl overflow-y-scroll overflow-x-hidden hideScroll p-5 space-y-5">
                <div className="  -top-5 -left-5 relative p-8 text-2xl font-extrabold  text-[#212327]  flex space-x-2">
                    <div className="">
                        Saved Question
                    </div>
                    <div className="absolute w-full h-[1px] bg-[#bdbcbc] opacity-25 -left-2 bottom-3"></div>
                </div>
                {
                    messages.map((message, index) => (

                        <div key={index} className="whitespace-pre-wrap  flex justify-end  relative">
                            <div className=" w-full bg-[#fce8e7] p-6 rounded-lg space-y-4 " >
                                <div className="flex justify-between">
                                    <div className=" font-semibold">
                                        {getTheTime(message.createdAt)}
                                    </div>
                                </div>
                                <div className="">
                                    {message.message}
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Favorite
