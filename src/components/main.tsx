'use client'
import React from 'react'
import { getServerSession } from "next-auth/next"
import { useState } from "react"
import { useChat } from 'ai/react';
import UserMessage from "@/components/userMessage";
import ChaGPTmessage from "@/components/chatGPTMessage";
import Navbar from "@/components/navbar";
import { Textarea } from "@nextui-org/react";
import { SunIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
const Main = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="w-full h-screen flex flex-col items-cente p-5">
      <div className=" relative   bg-white h-full rounded-xl pb-[170px] ">
        <div className="w-full flex h-full   justify-center overflow-x-hidden hideScroll ">
          <div className="max-w-[1000px] w-full py-24  space-y-16 ">
            {messages.map((message, index) => (
              message.role === 'user' ?
                <UserMessage key={index} message={message.content} />
                :
                <ChaGPTmessage key={index} message={message.content} />
            ))}
          </div>
        </div>
        <div className=" absolute   right-0 bottom-0 w-full   rounded-xl  ">
          <div className="px-4 pb-4">
            <div className="w-full bg-slate-200 h-10 rounded-t-xl  border-2 border-b-0 border-slate-200 "></div>
            <form onSubmit={handleSubmit} className="  flex-none p-1  bg-white rounded-b-xl border-2 border-t-0 border-slate-200"
            >
              <div className=" relative flex items-center rounded-lg pl-6    overflow-x-hidden hideScroll">
                <button className=" hover:bg-slate-100 p-2 rounded-md" >
                  <Image src={'/microphone.svg'} alt='saved' width={30} height={30} className="" />
                </button>
                <Textarea
                  // isDisabled
                  labelPlacement="outside"
                  // defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
                  style={{ outline: 'none' }}
                  value={input}
                  minRows={0}
                  maxRows={15}
                  placeholder="Say something..."
                  onChange={handleInputChange}
                  className=" focus:outline-none  flex-grow px-2  bg-transparent text-black  w-full overflow-x-hidden hideScroll "
                />
                <div className=" px-4 py-2 flex justify-center items-center">
                  <button className="p-2 bg-slate-200 rounded-lg hover:bg-slate-300  ">
                    <Image src={'/send.svg'} alt='saved' width={30} height={30} className="-rotate-45" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main