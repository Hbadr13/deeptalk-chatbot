'use client'
import React, { useEffect, useRef } from 'react'
import { getServerSession } from "next-auth/next"
import { useState } from "react"
import { useChat } from 'ai/react';
import UserMessage from "@/components/userMessage";
import ChaGPTmessage from "@/components/chatGPTMessage";
import Navbar from "@/components/navbar";
import { Textarea } from "@nextui-org/react";
import { SunIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { Message } from 'ai';
import { getSession, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
const MainComponent = ({ conversationId }: { conversationId: number }) => {
  const [session, setSession] = useState<Session | null>()
  useEffect(() => {
    (
      async () => {
        const session = await getSession()
        if (session)
          setSession(session)
      }
    )()
  }, [])

  const [initialMessages, setinitialMessages] = useState<Message[]>([])
  const handelOnFinish = async (message: Message) => {
    // console.log('user:', input)
    // console.log('ai:', message.content)
    if (!session)
      return
    const res1 = await fetch(`http://localhost:3000/api/conversations/${conversationId}`, {
      headers: {
        "Authorization": `Bearer ${session.user.accessToken}`
      },
      method: "POST",
      body: JSON.stringify({
        "message": input,
        "role": "user"
      })
    })
    const res2 = await fetch(`http://localhost:3000/api/conversations/${conversationId}`, {
      headers: {
        "Authorization": `Bearer ${session.user.accessToken}`
      },
      method: "POST",
      body: JSON.stringify({
        "message": message.content,
        "role": "assistant"
      })
    })
  }
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
          // console.log(110, data.messages)
          const tmp: Message[] = []
          for (const item of data) {
            tmp.push({ id: String(item.id), role: item.role, content: item.message })
          }

          var chatMessages = document.getElementById("chatMessages");
          // console.log('restart------------>cbat hieght', chatMessages?.scrollHeight)
          // if (chatMessages)
          //   chatMessages.scrollTo({ top: 1000 });
          // chatMessages.scrollTo({ top: chatMessages.scrollHeight });
          setinitialMessages(tmp)
          // setinitialMessages([{ id: '1', role: 'user', content: 'hello' }, { id: '2', role: 'assistant', content: 'how i can assit you' }])
        }
      })()
  }, [session])

  const chatEndElementRef = useRef<any>(null);
  // function scrollToBottom() {
  //   var chatMessages = document.getElementById("chatMessages");
  //   if (chatMessages)
  //     chatMessages.scrollTo({ top: chatMessages.scrollHeight });
  // }

  // // Call scrollToBottom function when the window is loaded
  // window.onload = function () {
  //   // console.log('restart------------>', conversationId)
  //   scrollToBottom();
  // };


  // useEffect(() => {
  //   const element = elementRef.current;

  //   if (!element) return;

  //   const observer = new ResizeObserver(entries => {
  //     for (let entry of entries) {
  //       const newHeight = entry.contentRect.height;
  //       console.log('New height:', newHeight);
  //       // Perform actions based on the new height
  //     }
  //   });

  //   observer.observe(element);

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({ onFinish: handelOnFinish, initialMessages: initialMessages });
  useEffect(() => {
    console.log('message eddite-->')
    chatEndElementRef.current?.scrollIntoView()
  }, [messages])
  return (
    <div className="w-full h-screen flex flex-col items-cente p-5">
      <div className=" relative   bg-white h-full rounded-xl pb-[120px] ">
        <div onChange={() => console.log('change')} className="w-full flex h-full  justify-center overflow-x-hidden hideScroll ">
          <div id='chatMessages' className=" max-w-[1000px] w-full py-24  space-y-16 ">
            {messages.map((message, index) => (
              message.role === 'user' ?
                <UserMessage key={index} message={message.content} />
                :
                <ChaGPTmessage key={index} message={message.content} />
            ))}
            <div ref={chatEndElementRef}></div>
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