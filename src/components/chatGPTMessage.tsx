'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Message } from 'ai'
import { getTheTime } from '@/lib/time'
export interface ChaGPTmessageProps {
  message: Message,
  handelReaction: (messageId: number, reaction: string) => void

}

const ChaGPTmessage = ({ message, handelReaction }: ChaGPTmessageProps) => {
  const options = [
    { name: 'Copy Text', icon: '/copy.png' },
    { name: 'Regenereted Response', icon: '/repeat.png' },
    { name: 'Save Response', icon: '/save.png' },
  ]
  const [copied, setCopied] = useState(false);

  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  };
  return (
    <div className="whitespace-pre-wrap flex flex-col justify-start ">
      <div className="max-w-[800px] bg-[#D5DAE7] p-6 rounded-lg space-y-4 relative">
        <div className="flex justify-between">
          <div className="flex space-x-5">
            <button className=' hover:opacity-50' >
              <Image src={'/voice.png'} width={24} height={24} alt='like'></Image>
            </button>
            <button onClick={() => handelReaction(Number(message.id), 'favorite')} className=' hover:opacity-50' >
              {/* black-heart.svg */}
              {/* {message.name} */}
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
        <div className="flex space-x-5">
          <button className=' hover:opacity-50' >
            <Image src={'/like.png'} width={24} height={24} alt='like'></Image>
          </button  >
          <button className=' rotate-180 flex  hover:opacity-50'>
            <Image src={'/like.png'} width={24} height={24} alt='like'></Image>
          </button>
        </div>
        <div className="absolute flex  h-10   -bottom-8  font-medium space-x-3">
          {
            options.map((option, index) => (
              <button
                onClick={option.name == 'Save Response' ? () => handelReaction(Number(message.id), 'register_rs') : option.name == 'Copy Text' ? () => copyTextToClipboard(message.content) : undefined}
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

export default ChaGPTmessage
