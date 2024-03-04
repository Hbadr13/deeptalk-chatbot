'use client'

import React, { useEffect, useRef } from 'react'
import { useState } from "react"
import { useChat } from 'ai/react';
import UserMessage from "@/components/userMessage";
import ChaGPTmessage from "@/components/chatGPTMessage";
import { Textarea } from "@nextui-org/react";
import Image from "next/image";
import { Message } from 'ai';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';


const MainComponent = ({ conversationId }: { conversationId: number }) => {

  const [initialMessages, setinitialMessages] = useState<Message[]>([])
  const [session, setSession] = useState<Session | null>()
  const chatEndElementRef = useRef<any>(null);


  useEffect(() => {
    (
      async () => {
        if (!session)
          return
        setinitialMessages([])
        const res = await fetch(`http://localhost:3000/api/conversations/${conversationId}`, {
          headers: {
            "Authorization": `Bearer ${session.user.accessToken}`
          }
        })
        if (res.ok) {
          var data = await res.json()
          data = Array.from(data.messages)
          const tmp: Message[] = []
          for (const item of data) {
            tmp.push({ id: String(item.id), role: item.role, content: item.message, createdAt: item.createdAt })

          }
          setinitialMessages(tmp)
        }
      })()
  }, [session])

  useEffect(() => {
    (
      async () => {
        const session = await getSession()
        if (session)
          setSession(session)
      }
    )()
  }, [])



  const handelOnFinish = async (message: Message) => {
    try {
      if (!session)
        return
      const res = await fetch(`http://localhost:3000/api/conversations/${conversationId}`, {
        headers: {
          "Authorization": `Bearer ${session.user.accessToken}`
        }
      })
      if (res.ok) {
        var data = await res.json()
        data = Array.from(data.messages)
        const tmp: Message[] = []
        for (const item of data) {
          tmp.push({ id: String(item.id), role: item.role, content: item.message, createdAt: item.createdAt })
        }
        setMessages(tmp)
      }
    } catch (error) {

    }
  }

  const handelReaction = async (messageId: number, reaction: string) => {
    try {
      if (!session)
        return
      const res1 = await fetch(`http://localhost:3000/api/messages/${messageId}`, {
        headers: {
          "Authorization": `Bearer ${session.user.accessToken}`
        },
        method: "PUT",
        body: JSON.stringify({
          reaction
        })
      })
    } catch (error) {

    }
  }


  const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading } = useChat({ onFinish: handelOnFinish, initialMessages: initialMessages, body: { conversationId, userid: session?.user.id, accessToken: session?.user.accessToken } });

  useEffect(() => {
    chatEndElementRef.current?.scrollIntoView() 
  }, [messages])

  return (
    <div className="w-full h-screen flex flex-col items-cente p-5 ">
      <div className=" relative   bg-white h-full rounded-xl pb-[120px] px-2 ">
        <div className="w-full flex h-full  justify-center overflow-x-hidden hideScroll ">
          <div id='chatMessages' className=" max-w-[1000px] w-full py-24  space-y-16 ">
            {messages.map((message, index) => (
              message.role === 'user' ?
                <UserMessage handelReaction={handelReaction} key={index} message={message} />
                :
                <ChaGPTmessage handelReaction={handelReaction} key={index} message={message} />
            ))}
            <div ref={chatEndElementRef}></div>
          </div>
        </div>
        <div className=" absolute   right-0 bottom-0 w-full   rounded-xl    ">
          <div className="px-4 pb-4">
            <div className="w-full bg-slate-200 h-10 rounded-t-xl  border-2 border-b-0 border-slate-200 "></div>
            <form onSubmit={handleSubmit} className="  flex-none p-1  bg-white rounded-b-xl border-2 border-t-0 border-slate-200"
            >
              <div className=" relative flex items-center rounded-lg pl-6    overflow-x-hidden hideScroll">
                <button className=" hover:bg-slate-100 p-2 rounded-md" >
                  <Image src={'/microphone.svg'} alt='saved' width={30} height={30} className="" />
                </button>
                <Textarea
                  isDisabled={isLoading}
                  labelPlacement="outside"
                  style={{ outline: 'none' }}
                  value={input}
                  minRows={0}
                  maxRows={15}
                  placeholder="Say something..."
                  onChange={handleInputChange}
                  className=" focus:outline-none  flex-grow px-2  bg-transparent text-black  w-full overflow-x-hidden hideScroll "
                />
                <div className={`  ${isLoading ? 'hidden' : 'flex'}   px-4 py-2  justify-center items-center`}>
                  <button type='submit' className="p-2 bg-slate-200 rounded-lg hover:bg-slate-300  ">
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

export default MainComponent