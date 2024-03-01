import { EyeIcon } from '@heroicons/react/16/solid'
import { KeyIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
// import { Conversation } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { getAllConversation } from '@/app/actions/conversation/converation'
import { Conversation } from '@prisma/client'
import { getTheTime } from '@/lib/time'
export interface SidebarStatusProps {
    idOfSelectedConv: number,
    setIdOfSelectedConv: (idOfSelectedConv: number) => void
}

const SidebarStatus = ({ idOfSelectedConv, setIdOfSelectedConv }: SidebarStatusProps) => {
    const [conversations, setConversations] = useState<Conversation[]>([])
    const session = useSession()

    useEffect(() => {
        (
            async () => {
                if (session.data?.user) {
                    const res = await fetch(`http://localhost:3000/api/conversation`, {
                        headers: {
                            "Authorization": `Bearer ${session.data.user.accessToken}`
                        },
                        method: "GET"
                    })
                    const data = await res.json()
                    setConversations(data)
                    console.log('conv->', data)
                }
            }
        )()
    }, [session])
    const handelCreatNewGroup = async () => {
        if (!session.data?.user)
            return
        const res = await fetch(`http://localhost:3000/api/conversation`, {
            headers: {
                "Authorization": `Bearer ${session.data.user.accessToken}`
            },
            method: "POST",
            body: JSON.stringify({
                name: ""
            })

        })
    }
    if (session.status == 'loading')
        return (
            <div className='h-screen p-5 w-[50%] '>
                <div className=" relative h-full bg-[#f8f8f8] rounded-xl"></div>
            </div>
        )
    return (
        <div className='h-screen p-5 w-[50%] '>

            <div className=" relative h-full bg-[#f8f8f8] rounded-xl">
                <div className="relative p-8 text-2xl font-extrabold  text-[#212327]  flex space-x-2">
                    <div className="">
                        chat History
                    </div>
                    <div className="absolute w-full h-[1px] bg-[#bdbcbc] opacity-25 -left-2 bottom-3"></div>
                </div>
                {
                    conversations.map((conversation, index) =>
                    (
                        <div key={index}
                            onClick={() => setIdOfSelectedConv(conversation.id)}
                            className={`${conversation.id == idOfSelectedConv ? 'bg-slate-300' : ''} cursor-pointer relative  font-extrabold  text-[#212327]  flex flex-col space-y-6 py-6 px-10`}>
                            <div className="w-full flex justify-between  p-2">
                                <div className="">
                                    {
                                        conversation.name ??
                                        'New Chat'
                                    }
                                </div>
                                <div className="flex space-x-2">
                                    <div className="">
                                        {getTheTime(conversation.createdAt)}
                                    </div>
                                    <button className="">
                                        <EyeIcon width={30} />
                                    </button>
                                </div>
                            </div>
                            <div className=" w-full  -left-2bottom-3  flex  justify-center">
                                <div className="w-[120%] h-[2px] bg-[#a6a5a5] opacity-25 -left-2 bottom-3 "></div>
                            </div>
                        </div>
                    )
                    )
                }
                <div className="w-full   absolute bottom-0 p-10 flex justify-center">
                    <button onClick={handelCreatNewGroup} className="bg-[#f08d86] hover:bg-[#ffb9b4] duration-200 transition-colors px-16 py-4 rounded-lg flex space-x-2">
                        <KeyIcon width={30} />
                        <div className="">
                            Add New Group
                        </div>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default SidebarStatus