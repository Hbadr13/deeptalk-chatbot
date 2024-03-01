'use client'
import React, { useState } from 'react'
import Image from 'next/image'
export interface ChaGPTmessageProps {
  message: string
}

const ChaGPTmessage = ({ message }: ChaGPTmessageProps) => {
  const options = [
    { name: 'Copy Text', icon: '/copy.png' },
    { name: 'Regenereted Response', icon: '/repeat.png' },
    { name: 'Save Response', icon: '/save.png' },
  ]

  return (
    <div className="whitespace-pre-wrap flex flex-col justify-start ">
      <div className="max-w-[800px] bg-[#D5DAE7] p-6 rounded-lg space-y-4 relative">
        <div className="flex justify-between">
          <div className="flex space-x-5">
            <button className=' hover:opacity-50' >
              <Image src={'/voice.png'} width={24} height={24} alt='like'></Image>
            </button>
            <button className=' hover:opacity-50' >
              <Image className='flex' src={'/love.png'} width={24} height={24} alt='like'></Image>
            </button>
          </div>
          <div className=" font-semibold">
            2 Mini ago
          </div>
        </div>
        <div className="">
          {message}
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
              <button key={index} className="flex p-3 items-center text-center border-[1px] border-slate-200 rounded-xl space-x-2  bg-white hover:bg-slate-100">
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
