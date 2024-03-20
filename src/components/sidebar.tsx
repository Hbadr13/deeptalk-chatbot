import React from 'react'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

export interface SidebarProps {
    option: string
    setOption: (option: string) => void
}


const navigations = [
    { label: 'chat', name: "Chat Generator", icon: '/conversation.svg', width: 20, height: 20, link: '/' },
    { label: 'saved_Q', name: "Saved Questions", icon: '/icon _Saved_.svg', width: 15, height: 15, link: '/savedquestion' },
    { label: 'saved_R', name: "Saved Responses", icon: '/icon _Saved_.svg', width: 15, height: 15, link: '/savedresponses' },
    { label: 'favorite', name: "Favorite", icon: '/icon _heart_.svg', width: 20, height: 20, link: '/favorite' },
]

const Sidebar = ({ option, setOption }: SidebarProps) => {

    const router = useRouter()
    const session = useSession()
    const pathname = usePathname()

    if (pathname == '/auth/signin/' || pathname == '/auth/signup/')
        return <></>
    if (session.status == 'loading')
        return (
            <div className='relative p-3 flex flex-col space-y-6 w-[25%]    h-screen '>
            </div>
        )
    return (
        <div className='relative p-3 flex flex-col space-y-6 w-[25%]    h-screen   text-lg font-medium  '>

            <div className="relative p-10 text-2xl font-extrabold  text-white flex items-center space-x-3 ">
                <div className=" relative w-10 h-10 ">
                    <Image src={'/deeptalk.jpg'} alt='deepleaf' fill objectFit='cover' className='' />
                </div>
                <div className="">
                    DeepTalk
                </div>
                <div className="absolute w-full h-[1px] bg-[#bdbcbc] opacity-25 -left-2 bottom-5"></div>
            </div>
            {
                navigations.map((nav, index) =>
                (
                    <button
                        key={index}
                        onClick={() => {
                            setOption(nav.label)
                            router.push(nav.link)
                        }}
                        className={`${nav.label == option ? 'bg-[#f08d86]' : ''} py-4 px-6  flex  rounded-lg space-x-3`}>
                        <Image src={nav.icon} alt='deepleaf' width={nav.width} height={nav.height} className='' />
                        <div className={`${nav.label != option ? 'text-[#ffffff]' : ''} text-[#0f1e46] `}>
                            {nav.name}
                        </div>
                    </button>
                )
                )
            }
            <div className=" w-full h-[1px] bg-[#bdbcbc] opacity-25 -left-2 bottom-5"></div>
            <div className="py-4 px-6  flex  rounded-lg space-x-2">
                <Image src={'/logout.svg'} alt='saved' width={20} height={20} />
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
                            <div className="text-white text-xl font-medium capitalize">{session.data?.user.username}</div>
                            <div className="text-slate-50 opacity-35">{session.data?.user.phoneNumber}</div>
                        </div>
                    </div>
                    <button className="flex items-center  justify-center w-full py-2 bg-slate-100 hover:bg-slate-200 rounded-xl space-x-4">
                        <Image src={'/rocket.svg'} alt='saved' width={20} height={20} />
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
