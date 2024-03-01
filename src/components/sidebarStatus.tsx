import { EyeIcon } from '@heroicons/react/16/solid'
import { KeyIcon } from '@heroicons/react/24/solid'
import React, { useEffect } from 'react'
// import { Conversation } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { getAllConversation } from '@/app/actions/conversation/converation'
const SidebarStatus = () => {
    // const convs: Conversation[] = []
    const session = useSession()


    // useEffect(() => {
    //     (
    //         async () => {
    //             if (session.data?.user?.id) {
    //                 // const conversations = await getAllConversation({ userid: session.data.user.id })
    //                 // console.log('conversations', conversations)
    //             }
    //         }
    //     )()
    // }, [session])

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
                        chat History {session.data?.user.phoneNumber}
                    </div>
                    <div className="absolute w-full h-[1px] bg-[#bdbcbc] opacity-25 -left-2 bottom-3"></div>
                </div>

                <div className="relative  font-extrabold  text-[#212327]  flex flex-col space-y-6 py-6 px-10">
                    <div className="w-full flex justify-between">
                        <div className="">
                            creat webserver/{session.data?.user.accessToken}/
                        </div>
                        <div className="flex space-x-2">
                            <div className="">
                                2 Min ago
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
                <div className="w-full   absolute bottom-0 p-10 flex justify-center">
                    <button className="bg-[#f08d86] hover:bg-[#ffb9b4] duration-200 transition-colors px-16 py-4 rounded-lg flex space-x-2">
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