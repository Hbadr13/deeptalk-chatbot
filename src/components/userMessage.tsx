import React from 'react'
import Image from 'next/image'
import { Message } from 'ai'
import { getTheTime } from '@/lib/time'

export interface UserMessageProps {
  message: Message
  handelReaction: (messageId: number, reaction: string) => void
}

const UserMessage = ({ message, handelReaction }: UserMessageProps) => {

  const options = [
    { name: 'Copy Text', icon: '/copy.png' },
    { name: 'Save Question', icon: '/save.png' },
  ]

  return (
    <div className="whitespace-pre-wrap  flex justify-end  relative">
      <div className="max-w-[800px] min-w-[500px] bg-[#fce8e7] p-6 rounded-lg space-y-4 " >
        <div className="flex justify-between">
          <div className="flex space-x-5">
            <button className=' hover:opacity-50' >
              <Image src={'/voice.png'} width={24} height={24} alt='voice'></Image>
            </button>
            <button onClick={() => handelReaction(Number(message.id), 'favorite')} className=' hover:opacity-50' >
              <Image className='flex' src={'/love.png'} width={24} height={24} alt='like'></Image>
            </button>
          </div>
          <div className=" font-semibold">
            {getTheTime(message.createdAt)}
          </div>
        </div>
        <div className="">
          {message.content}
        </div>
        <div className="absolute flex  h-10   -bottom-8  font-medium space-x-3">
          {
            options.map((option, index) => (
              <button
                onClick={option.name == 'Save Question' ? () => handelReaction(Number(message.id), 'register_qs') : undefined}
                key={index} className="flex p-3 items-center text-center border-[1px] border-slate-200 rounded-xl space-x-2  bg-white hover:bg-slate-100">
                <Image src={option.icon} width={20} height={20} alt='like'></Image>
                <div className=''>
                  {option.name}
                </div>
              </button>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default UserMessage
