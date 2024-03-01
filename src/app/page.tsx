'use client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { useState } from "react"
import { useChat } from 'ai/react';
import UserMessage from "@/components/userMessage";
import ChaGPTmessage from "@/components/chatGPTMessage";
import Navbar from "@/components/navbar";
import { Textarea } from "@nextui-org/react";
import { SunIcon } from "@heroicons/react/20/solid";
import Sidebar from "@/components/sidebar";
import SidebarStatus from "@/components/sidebarStatus";
export default function Home() {

  // console.log('---', session?.user)
  // const [inputValue, setInputValue] = useState('')
  // console.log('location->', Location)
  const [idOfSelectedConv, setIdOfSelectedConv] = useState(0)
  const [a, aa] = useState('')
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  // const session = await getServerSession(authOptions)


  return (
    <div className="flex bg-[#0f1e46]  ">
      <Sidebar  />
      <SidebarStatus idOfSelectedConv={idOfSelectedConv} setIdOfSelectedConv={setIdOfSelectedConv}/>
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
                <div className=" relative flex rounded-lg pl-10 ">
                  <SunIcon className="w-8 absolute top-2 left-2 cursor-pointer hover:bg-slate-200  rounded-xl " />
                  <Textarea
                    style={{ outline: 'none' }}
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                    className=" focus:outline-none  flex-grow px-2  bg-transparent text-black   w-full "
                  />
                  <div className=" px-4 py-2 flex justify-center items-center">
                    <button className="p-2 bg-slate-200 rounded-lg hover:bg-slate-300 ">
                      <SunIcon width={40} height={40} className="  rounded-xl " />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div >


  );
}
// import React from 'react';

// const Page = () => {
//   return (
//     <div>
//       <textarea
//         placeholder="Say something..."
//         className="text-white flex-grow px-4 py-2 bg-transparent w-full h-[200px] outline-none resize-none" // Use CSS to control the appearance
//         style={{ overflowWrap: 'break-word', wordWrap: 'break-word' }} // Additional style for text wrapping
//       />
//     </div>
//   );
// };

// export default Page;
