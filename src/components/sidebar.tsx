import React from 'react'
import Image from 'next/image'
import { ChartBarIcon } from '@heroicons/react/20/solid'
import { signOut } from 'next-auth/react'
const Sidebar = () => {
    return (
        <div className='relative p-3 flex flex-col space-y-6 w-[25%]    h-screen   text-lg font-medium'>

            <div className="relative p-10 text-2xl font-extrabold  text-white flex space-x-2">
                <ChartBarIcon className='w-4' color='white' />
                <div className="">
                    Chat Bot
                </div>
                <div className="absolute w-full h-[1px] bg-[#bdbcbc] opacity-25 -left-2 bottom-5"></div>
            </div>
            <div className="py-4 px-6  flex bg-[#f08d86] rounded-lg space-x-3">
                <ChartBarIcon className='w-4' color='white' />
                <div className="text-[#0f1e46] font-semibold">
                    Chat Generator
                </div>
            </div>
            <div className="py-4 px-6  flex  rounded-lg space-x-3">
                <ChartBarIcon className='w-4' color='white' />
                <div className="text-[#ffffff] ">
                    Favorite
                </div>
            </div>
            <div className="py-4 px-6  flex  rounded-lg space-x-3">
                <ChartBarIcon className='w-4' color='white' />
                <div className="text-[#ffffff] ">
                    Saved Questions
                </div>
            </div>
            <div className="py-4 px-6  flex  rounded-lg space-x-3">
                <ChartBarIcon className='w-4' color='white' />
                <div className="text-[#ffffff] ">
                    Saved Responses
                </div>
            </div>
            <div className=" w-full h-[1px] bg-[#bdbcbc] opacity-25 -left-2 bottom-5"></div>
            <div className="py-4 px-6  flex  rounded-lg space-x-3">
                <ChartBarIcon className='w-4' color='white' />
                <button onClick={() => signOut({ callbackUrl: '/auth/signin' })} className="text-[#ffffff] ">
                    Log Out
                </button>
            </div>
            <div className=" relative   flex  rounded-lg space-x-3 h-full ">
                <div className=" absolute  bottom-3 bg-[#2e3f6c] w-full p-4  rounded-lg space-y-3 ">
                    <div className="flex space-x-3">
                        <div className="w-14 h-14 relative">
                            <Image className=' rounded-full' src={'/profile.jpg'} alt='proflie' fill objectFit='cover'></Image>
                        </div>
                        <div className="">
                            <div className="text-white text-xl font-medium">hamza</div>
                            <div className="text-slate-50 opacity-35">+23434242342</div>
                        </div>
                    </div>
                    <button className="flex items-center  justify-center w-full py-2 bg-slate-100 rounded-xl space-x-4">
                        <ChartBarIcon className='w-4' color='black' />
                        <div className="text-black">
                            Upgrade To Pro
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar